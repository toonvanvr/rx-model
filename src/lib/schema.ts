import zod from 'zod'
import { RelationType } from './relation-type.js'

export const SCHM = {
  ...zod,
  hasMany: (ref: PropertyKey) => new RelationType(),
  belongsToOne: (ref: PropertyKey) => new RelationType(),
}
