import { TaskModel } from './task.model.js'
import { UserData } from './user.data.js'

export class TaskData {
  attributes = {
    user: () => UserData,
  }
  // @BelongsTo(() => UserData)
  // user = null

  constructor(private readonly model: TaskModel) {}
}
