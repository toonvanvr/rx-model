import { Subject } from 'rxjs'
import { Model } from '../lib/core/model.class'

export class Task {
  @Model.attribute()
  readonly id = new Subject<string>()
}

new Task()
