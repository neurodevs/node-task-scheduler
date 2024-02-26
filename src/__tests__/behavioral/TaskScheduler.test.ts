import { randomInt } from 'crypto'
import AbstractSpruceTest, {
	test,
	assert,
	errorAssert,
} from '@sprucelabs/test-utils'
import SpyTaskScheduler from '../../testDoubles/SpyTaskScheduler'

export default class TaskSchedulerTest extends AbstractSpruceTest {
	private static scheduler: SpyTaskScheduler
	private static callback: () => void
	private static waitMs: number

	protected static async beforeEach() {
		await super.beforeEach()

		this.scheduler = new SpyTaskScheduler()
		this.callback = () => {}
		this.waitMs = randomInt(20, 50)

		assert.isTruthy(this.scheduler)
	}

	@test()
	protected static async throwsOnStartIfNoScheduledTasks() {
		const err = await assert.doesThrowAsync(
			() => this.scheduler.start(),
			'Cannot start task scheduler if no tasks are scheduled!'
		)
		errorAssert.assertError(err, 'NO_SCHEDULED_TASKS')
	}

	@test()
	protected static async throwsOnStopIfNotAlreadyStarted() {
		const err = await assert.doesThrowAsync(
			() => this.scheduler.stop(),
			'Cannot stop task scheduler if it has not been started!'
		)
		errorAssert.assertError(err, 'SCHEDULER_NOT_STARTED')
	}

	@test()
	protected static async schedulesOneTask() {
		const task = this.scheduleTask()
		const scheduledTasks = this.scheduler.getScheduledTasks()
		assert.isEqualDeep(scheduledTasks, [task])
	}

	@test()
	protected static async schedulesTwoTasks() {
		const task1 = this.scheduleTask()
		const task2 = this.scheduleTask()
		const scheduledTasks = this.scheduler.getScheduledTasks()
		assert.isEqualDeep(scheduledTasks, [task1, task2])
	}

	@test()
	protected static async startExecutesCallbackForOneScheduledTask() {
		let wasHit = false

		const mockCallback = () => {
			wasHit = true
		}

		this.scheduler.scheduleTask(mockCallback, this.waitMs)
		await this.start()
		assert.isTrue(wasHit)
	}

	@test()
	protected static async startExecutesCallbackForTwoScheduledTasks() {
		let wasHit1 = false
		let wasHit2 = false

		const mockCallback1 = () => {
			wasHit1 = true
		}

		const mockCallback2 = () => {
			wasHit2 = true
		}

		this.scheduler.scheduleTask(mockCallback1, this.waitMs)
		this.scheduler.scheduleTask(mockCallback2, this.waitMs)
		await this.start()
		assert.isTrue(wasHit1)
		assert.isTrue(wasHit2)
	}

	@test()
	protected static async startWaitsForExpectedDuration() {
		this.scheduleTask()
		const startTime = Date.now()
		await this.start()
		const endTime = Date.now()

		const duration = endTime - startTime
		assert.isAbove(duration, 0.9 * this.waitMs)
		assert.isBelow(duration, 1.1 * this.waitMs)
	}

	@test()
	protected static async stopCancelsOneScheduledTasks() {
		this.scheduleTask()
		const startPromise = this.start()
		await this.scheduler.stop()
		const scheduledTasks = this.scheduler.getScheduledTasks()
		assert.isEqualDeep(scheduledTasks, [])

		await startPromise
	}

	@test()
	protected static async stopCancelsTwoScheduledTasks() {
		this.scheduleTask()
		this.scheduleTask()
		const startPromise = this.start()
		await this.scheduler.stop()
		const scheduledTasks = this.scheduler.getScheduledTasks()
		assert.isEqualDeep(scheduledTasks, [])

		await startPromise
	}

	@test()
	protected static async stopPreventsCallbackFromBeingExecuted() {
		let wasHit = false

		const mockCallback = () => {
			wasHit = true
		}

		this.scheduleTask()
		this.scheduleTask({ callback: mockCallback, waitMs: 1000 })
		const startPromise = this.start()
		await this.scheduler.stop()
		await startPromise
		assert.isFalse(wasHit)
	}

	private static scheduleTask(options?: {
		callback?: () => void
		waitMs?: number
	}) {
		const { callback = this.callback, waitMs = this.waitMs } = options ?? {}
		this.scheduler.scheduleTask(callback, waitMs)
		return { callback, waitMs }
	}

	private static async start() {
		await this.scheduler.start()
	}
}
