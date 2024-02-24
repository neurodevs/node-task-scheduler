import { SchemaRegistry } from '@sprucelabs/schema'
import { SpruceErrors } from '../errors.types'



const noScheduledTasksSchema: SpruceErrors.NodeTaskScheduler.NoScheduledTasksSchema  = {
	id: 'noScheduledTasks',
	namespace: 'NodeTaskScheduler',
	name: 'No Scheduled Tasks',
	    fields: {
	    }
}

SchemaRegistry.getInstance().trackSchema(noScheduledTasksSchema)

export default noScheduledTasksSchema
