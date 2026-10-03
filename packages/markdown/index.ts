import {
 StarryUITrait,
 StarryUITraitConfig,
 applyTraits,
 starryComponent,
} from '@starryui/traits'

export interface MarkdownConfig extends StarryUITraitConfig {
 source?: string
}

export function renderMarkdown(source: string, root: HTMLElement) {
 const lines = source.replace(/\r\n/g, '\n').split('\n')
 let index = 0
 while (index < lines.length) {
  const line = lines[index]
  if (line.startsWith('```')) {
   const body: string[] = []
   index += 1
   while (index < lines.length && !lines[index].startsWith('```')) {
    body.push(lines[index])
    index += 1
   }
   index += 1
   const pre = document.createElement('pre')
   const code = document.createElement('code')
   code.textContent = body.join('\n')
   pre.appendChild(code)
   root.appendChild(pre)
   continue
  }
  const heading = /^(#{1,6}) (.*)$/.exec(line)
  if (heading) {
   const level = heading[1].length
   const tag = `h${level}` as 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
   const elem = document.createElement(tag)
   appendInline(elem, heading[2])
   root.appendChild(elem)
   index += 1
   continue
  }
  if (/^(-|\*) /.test(line)) {
   const list = document.createElement('ul')
   while (index < lines.length && /^(-|\*) /.test(lines[index])) {
    const item = document.createElement('li')
    appendInline(item, lines[index].slice(2))
    list.appendChild(item)
    index += 1
   }
   root.appendChild(list)
   continue
  }
  if (/^\d+\. /.test(line)) {
   const list = document.createElement('ol')
   while (index < lines.length && /^\d+\. /.test(lines[index])) {
    const item = document.createElement('li')
    appendInline(item, lines[index].replace(/^\d+\. /, ''))
    list.appendChild(item)
    index += 1
   }
   root.appendChild(list)
   continue
  }
  if (line.trim() === '---') {
   root.appendChild(document.createElement('hr'))
   index += 1
   continue
  }
  if (line.trim() === '') {
   index += 1
   continue
  }
  const paragraph = document.createElement('p')
  const body = [line]
  index += 1
  while (index < lines.length && lines[index].trim() !== '' && !blockStart(lines[index])) {
   body.push(lines[index])
   index += 1
  }
  appendInline(paragraph, body.join(' '))
  root.appendChild(paragraph)
 }
}

function blockStart(line: string) {
 return (
  line.startsWith('```') ||
  /^(#{1,6}) /.test(line) ||
  /^(-|\*) /.test(line) ||
  /^\d+\. /.test(line) ||
  line.trim() === '---'
 )
}

function appendInline(parent: HTMLElement, source: string) {
 const pattern = /(`[^`]+`|\*\*[^*]+\*\*|\*[^*]+\*|\[[^\]]+\]\([^)]+\))/g
 let cursor = 0
 for (const match of source.matchAll(pattern)) {
  const text = match[0]
  const at = match.index ?? 0
  if (at > cursor) {
   parent.appendChild(document.createTextNode(source.slice(cursor, at)))
  }
  parent.appendChild(inlineNode(text))
  cursor = at + text.length
 }
 if (cursor < source.length) {
  parent.appendChild(document.createTextNode(source.slice(cursor)))
 }
}

function inlineNode(token: string) {
 if (token.startsWith('`')) {
  const code = document.createElement('code')
  code.textContent = token.slice(1, -1)
  return code
 }
 if (token.startsWith('**')) {
  const strong = document.createElement('strong')
  strong.textContent = token.slice(2, -2)
  return strong
 }
 if (token.startsWith('*')) {
  const em = document.createElement('em')
  em.textContent = token.slice(1, -1)
  return em
 }
 const link = /\[([^\]]+)\]\(([^)]+)\)/.exec(token)
 const anchor = document.createElement('a')
 if (link) {
  anchor.textContent = link[1]
  anchor.href = link[2]
 }
 return anchor
}

export const markdown = starryComponent<HTMLElement, MarkdownConfig>(function (
 traits: StarryUITrait[]
) {
 return function (config?: MarkdownConfig) {
  const elem = document.createElement('div')
  applyTraits(
   elem,
   traits,
   Object.assign({}, { themeFacet: 'document' }, config, { content: undefined })
  )
  renderMarkdown(config?.source ?? '', elem)
  if (config?.content) {
   config.content(elem, config)
  }
  return elem
 }
})
