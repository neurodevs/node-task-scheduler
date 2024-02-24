export interface Scheduler {
	scheduleTask(durationMs: number, callback: () => void): void
	start(): Promise<void>
	stop(): Promise<void>
}

export interface Task {
	durationMs: number
	callback: () => void
}
