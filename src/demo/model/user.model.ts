import zod from 'zod'
import { Model } from '../../lib/model.class.js'
import { mainStore } from '../stores/main.store.js'

export class User extends Model(mainStore, 'users', {
  name: zod.string(),
}) {}
