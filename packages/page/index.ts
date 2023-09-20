import {
 StarryUITrait,
 StarryUITraitConfig,
 applyTraits,
 starryComponent,
} from '@starryui/traits'

export const defaultPageConfig: StarryUITraitConfig = { themeFacet: 'column' }

export const page = starryComponent<StarryUIPage>(function (
 traits: StarryUITrait[]
) {
 return function (config?: StarryUITraitConfig) {
  const elem = document.createElement('div')

  const startUpTasks: StarryUITaskSchedule = {
   initial: [],
   final: [],
  }

  const cleanUpTasks: StarryUITaskSchedule = {
   initial: [],
   final: [],
  }

  applyTraits(
   elem,
   traits,
   Object.assign({ startUpTasks, cleanUpTasks }, defaultPageConfig, config)
  )

  async function onLoad(final: boolean) {
   if (final) {
    for (const task of startUpTasks.final) {
     await task()
    }
   } else {
    for (const task of startUpTasks.initial) {
     await task()
    }
   }
  }

  async function onUnload(final: boolean) {
   if (final) {
    for (const task of cleanUpTasks.final) {
     await task()
    }
   } else {
    for (const task of cleanUpTasks.initial) {
     await task()
    }
   }
  }

  return {
   cleanUpTasks,
   element: elem,
   onLoad,
   onUnload,
   startUpTasks,
   title: config?.title ?? 'page',
  }
 }
})

export interface StarryUIPage {
 cleanUpTasks: StarryUITaskSchedule
 element: HTMLElement
 onLoad: (final: boolean) => Promise<void>
 onUnload: (final: boolean) => Promise<void>
 startUpTasks: StarryUITaskSchedule
 title: string
}

export type StarryUITask = () => void | Promise<void>

export interface StarryUITaskSchedule {
 initial: StarryUITask[]
 final: StarryUITask[]
}
