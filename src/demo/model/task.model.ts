import { Model } from '../../lib/model.class.js'
import { SCHM } from '../../lib/schema.js'
import { UserRef } from './user.model.js'

export const TaskRef = Symbol('Task')

export class Task extends Model(TaskRef, {
  title: SCHM.string(),
  users: SCHM.belongsToOne(UserRef),
}) {}
