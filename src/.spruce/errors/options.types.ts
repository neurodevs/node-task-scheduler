import { SpruceErrors } from "#spruce/errors/errors.types"
import { ErrorOptions as ISpruceErrorOptions} from "@sprucelabs/error"

export interface SchedulerNotStartedErrorOptions extends SpruceErrors.NodeTaskScheduler.SchedulerNotStarted, ISpruceErrorOptions {
	code: 'SCHEDULER_NOT_STARTED'
}
export interface NoScheduledTasksErrorOptions extends SpruceErrors.NodeTaskScheduler.NoScheduledTasks, ISpruceErrorOptions {
	code: 'NO_SCHEDULED_TASKS'
}

type ErrorOptions =  | SchedulerNotStartedErrorOptions  | NoScheduledTasksErrorOptions 

export default ErrorOptions
