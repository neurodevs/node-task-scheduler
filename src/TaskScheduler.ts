import SpruceError from './errors/SpruceError'
import { Task, Scheduler } from './types/nodeTaskScheduler.types'

export default class TaskScheduler implements Scheduler {
	protected scheduledTasks: Task[]
	private isRunning: boolean

	public constructor() {
		this.scheduledTasks = []
		this.isRunning = false
	}

	public scheduleTask(callback: () => void, waitMs: number) {
		this.scheduledTasks.push({ callback, waitMs })
	}

	public async start() {
		this.assertAtLeastOneTaskScheduled()
		this.isRunning = true
		await this.executeTasks()
	}

	private assertAtLeastOneTaskScheduled() {
		if (this.scheduledTasks.length === 0) {
			throw new SpruceError({ code: 'NO_SCHEDULED_TASKS' })
		}
	}

	private async executeTasks() {
		for (const task of this.scheduledTasks) {
			if (!this.isRunning) {
				break
			}
			const { callback, waitMs } = task
			callback()
			await this.wait(waitMs)
		}
	}

	private async wait(waitMs: number) {
		await new Promise((resolve) => setTimeout(resolve, waitMs))
	}

	public async stop() {
		if (!this.isRunning) {
			throw new SpruceError({ code: 'SCHEDULER_NOT_STARTED' })
		}
		this.isRunning = false
		this.scheduledTasks = []
	}
}
