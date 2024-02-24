import { SpruceErrors } from "#spruce/errors/errors.types"
import { ErrorOptions as ISpruceErrorOptions} from "@sprucelabs/error"

export interface NoScheduledTasksErrorOptions extends SpruceErrors.NodeTaskScheduler.NoScheduledTasks, ISpruceErrorOptions {
	code: 'NO_SCHEDULED_TASKS'
}

type ErrorOptions =  | NoScheduledTasksErrorOptions 

export default ErrorOptions
