import { HasMany } from '../../lib/decorator/has-many.decorator.js'
import { TaskData } from './task.data.js'
import { UserModel } from './user.model.js'

export class UserData {
  @HasMany(() => TaskData)
  tasks = new Set<TaskData>()

  constructor(private readonly model: UserModel) {}
}
