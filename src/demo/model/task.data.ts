import { BelongsTo } from '../../lib/decorator/belongs-to.decorator.js'
import { TaskModel } from './task.model.js'
import { UserData } from './user.data.js'

export class TaskData {
  @BelongsTo(() => UserData)
  user = null

  constructor(private readonly model: TaskModel) {}
}
