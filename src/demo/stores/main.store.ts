import { Store } from '../../lib/store.class.js'
import { Task } from '../model/task.model.js'
import { User } from '../model/user.model.js'

export const mainStore = new Store<{
  users: User
  tasks: Task
}>()
