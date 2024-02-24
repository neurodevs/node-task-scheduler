import BaseSpruceError from '@sprucelabs/error'
import ErrorOptions from '#spruce/errors/options.types'

export default class SpruceError extends BaseSpruceError<ErrorOptions> {
	/** an easy to understand version of the errors */
	public friendlyMessage(): string {
		const { options } = this
		let message
		switch (options?.code) {
			case 'NO_SCHEDULED_TASKS':
				message = 'Cannot start task scheduler if no tasks are scheduled!'
				break

			case 'SCHEDULER_NOT_STARTED':
				message = 'Cannot stop task scheduler if it has not been started!'
				break

			default:
				message = super.friendlyMessage()
		}

		const fullMessage = options.friendlyMessage
			? options.friendlyMessage
			: message

		return fullMessage
	}
}
