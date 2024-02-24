export interface Scheduler {
	start(): Promise<void>
	scheduleTask(delayMs: number, callback: () => void): void
}

export interface Task {
	durationMs: number
	callback: () => void
}
