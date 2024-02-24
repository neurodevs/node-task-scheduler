import SpruceError from './errors/SpruceError'
import { Task, Scheduler } from './types/nodeTaskScheduler.types'

export default class TaskScheduler implements Scheduler {
	protected scheduledTasks: Task[]

	public constructor() {
		this.scheduledTasks = []
	}

	public scheduleTask(durationMs: number, callback: () => void) {
		this.scheduledTasks.push({ durationMs, callback })
	}

	public async start() {
		this.assertAtLeastOneTaskScheduled()
		await this.executeTasks()
	}

	private assertAtLeastOneTaskScheduled() {
		if (this.scheduledTasks.length === 0) {
			throw new SpruceError({ code: 'NO_SCHEDULED_TASKS' })
		}
	}

	private async executeTasks() {
		for (const task of this.scheduledTasks) {
			const { callback, durationMs } = task
			callback()
			await this.wait(durationMs)
		}
	}

	private async wait(durationMs: number) {
		await new Promise((resolve) => setTimeout(resolve, durationMs))
	}
}
