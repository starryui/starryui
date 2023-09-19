export interface Slide {
 subtitle: string
 title: string
 imgSrc?: string
}

export const homeSlide1: Slide = {
 subtitle: 'TypeScript component library',
 title: 'StarryUI',
 imgSrc: '/pages/home/starryui.png',
}

export const homeSlide2: Slide = {
 subtitle: 'Gallery of components and documentation',
 title: 'Components',
 imgSrc: '/pages/home/components.png',
}

export const homeSlide3: Slide = {
 subtitle: 'StarryUI examples & getting started',
 title: 'Tutorials',
 imgSrc: '/pages/home/tutorials.png',
}
