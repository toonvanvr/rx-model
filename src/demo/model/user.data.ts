import { TaskData } from './task.data.js'
import { UserModel } from './user.model.js'

export class UserData {
  attributes = {
    task: () => TaskData,
  }
  // @HasMany(() => TaskData)
  // tasks = new Set<TaskData>()

  constructor(private readonly model: UserModel) {}
}
