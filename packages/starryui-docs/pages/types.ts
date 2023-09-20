export interface ApplicationPage {
 cleanUpTasks: ApplicationTask[]
 element: HTMLElement
 onLoad: (final: boolean) => Promise<void>
 onUnload: (final: boolean) => Promise<void>
 startUpTasks: ApplicationTask[]
 title: string
}

export type ApplicationTask = () => void | Promise<void>
