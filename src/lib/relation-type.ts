import { Model } from './model.class.js'

const T = Symbol('Task')

export class RelationType {
  static readonly #models = new Map<PropertyKey, Model>()

  static register(key: PropertyKey, model: Model) {
    if (this.#models.has(key)) {
      throw new Error(`Model ${key.toString()} is already registered`)
    }
    this.#models.set(key, model)
  }

  constructor() {}
}
