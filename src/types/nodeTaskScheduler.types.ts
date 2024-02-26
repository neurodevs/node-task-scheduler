export interface Scheduler {
	scheduleTask(callback: () => void, waitMs: number): void
	start(): Promise<void>
	stop(): Promise<void>
}

export interface Task {
	callback: () => void
	waitMs: number
}
