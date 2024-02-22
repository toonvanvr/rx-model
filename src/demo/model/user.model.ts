import { Model } from '../../lib/model.class.js'
import { SCHM } from '../../lib/schema.js'
import { TaskRef } from './task.model.js'

export const UserRef = Symbol('User')

export class User extends Model(UserRef, {
  name: SCHM.string(),
  tasks: SCHM.hasMany(TaskRef),
}) {}
