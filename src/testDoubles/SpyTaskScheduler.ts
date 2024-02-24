import TaskScheduler from '../TaskScheduler'

export default class SpyTaskScheduler extends TaskScheduler {
	public getScheduledTasks() {
		return this.scheduledTasks
	}
}
