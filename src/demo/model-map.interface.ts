import type { Task, TaskRef } from './model/task.model.js'
import type { User, UserRef } from './model/user.model.js'

export interface ModelMap {
  [UserRef]: User
  [TaskRef]: Task
}
