/* eslint-disable @typescript-eslint/no-namespace */
/* eslint-disable no-redeclare */

import { default as SchemaEntity } from '@sprucelabs/schema'
import * as SpruceSchema from '@sprucelabs/schema'





export declare namespace SpruceErrors.NodeTaskScheduler {

	
	export interface SchedulerNotStarted {
		
	}

	export interface SchedulerNotStartedSchema extends SpruceSchema.Schema {
		id: 'schedulerNotStarted',
		namespace: 'NodeTaskScheduler',
		name: 'Scheduler Not Started',
		    fields: {
		    }
	}

	export type SchedulerNotStartedEntity = SchemaEntity<SpruceErrors.NodeTaskScheduler.SchedulerNotStartedSchema>

}



export declare namespace SpruceErrors.NodeTaskScheduler {

	
	export interface NoScheduledTasks {
		
	}

	export interface NoScheduledTasksSchema extends SpruceSchema.Schema {
		id: 'noScheduledTasks',
		namespace: 'NodeTaskScheduler',
		name: 'No Scheduled Tasks',
		    fields: {
		    }
	}

	export type NoScheduledTasksEntity = SchemaEntity<SpruceErrors.NodeTaskScheduler.NoScheduledTasksSchema>

}




