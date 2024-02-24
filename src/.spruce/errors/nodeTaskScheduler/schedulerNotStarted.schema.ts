import { SchemaRegistry } from '@sprucelabs/schema'
import { SpruceErrors } from '../errors.types'



const schedulerNotStartedSchema: SpruceErrors.NodeTaskScheduler.SchedulerNotStartedSchema  = {
	id: 'schedulerNotStarted',
	namespace: 'NodeTaskScheduler',
	name: 'Scheduler Not Started',
	    fields: {
	    }
}

SchemaRegistry.getInstance().trackSchema(schedulerNotStartedSchema)

export default schedulerNotStartedSchema
