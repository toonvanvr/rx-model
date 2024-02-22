import zod from 'zod'
import { Model } from '../../lib/model.class.js'
import { mainStore } from '../stores/main.store.js'

export class Task extends Model(mainStore, 'tasks', {
  title: zod.string(),
}) {}
