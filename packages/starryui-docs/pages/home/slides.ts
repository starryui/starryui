export interface Slide {
 href: string
 subtitle: string
 title: string
 imgSrc?: string
}

export const homeSlide1: Slide = {
 href: '/#/about',
 subtitle: 'TypeScript component library',
 title: 'StarryUI',
 imgSrc: '/pages/home/starryui.png',
}

export const homeSlide2: Slide = {
 href: '/#/components',
 subtitle: 'Gallery of components and documentation',
 title: 'Components',
 imgSrc: '/pages/home/components.png',
}

export const homeSlide3: Slide = {
 href: '/#/tutorials',
 subtitle: 'StarryUI examples & getting started',
 title: 'Tutorials',
 imgSrc: '/pages/home/tutorials.png',
}
