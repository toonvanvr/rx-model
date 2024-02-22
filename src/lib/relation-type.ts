import { ModelConstructor } from './model.class.js'

export class RelationType {
  constructor(ModelFactory: () => ModelConstructor<any>) {}
}
