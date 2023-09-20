export interface ApplicationPage {
 cleanUpTasks: { initial: ApplicationTask[]; final: ApplicationTask[] }
 element: HTMLElement
 onLoad: (final: boolean) => Promise<void>
 onUnload: (final: boolean) => Promise<void>
 startUpTasks: { initial: ApplicationTask[]; final: ApplicationTask[] }
 title: string
}

export type ApplicationTask = () => void | Promise<void>
