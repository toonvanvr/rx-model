import {
  BehaviorSubject,
  EMPTY,
  Observable,
  Subject,
  combineLatest,
  sample,
  shareReplay,
  switchMap,
} from 'rxjs'
import zod, { ZodType } from 'zod'
import { RelationType } from './relation-type.js'
import { Store } from './store.class.js'

export type ModelConstructor<
  Schema extends Record<PropertyKey, ZodType | RelationType> = any,
  StoreModels extends Record<string, any> = any,
> = ReturnType<typeof Model<StoreModels, Schema>>

export type Model<
  Schema extends Record<PropertyKey, ZodType | RelationType> = any,
> = InstanceType<ModelConstructor<Schema>>

export function Model<
  StoreModels extends Record<string, any>,
  Schema extends Record<PropertyKey, ZodType | RelationType>,
>(store: Store<StoreModels>, storeKey: keyof StoreModels, schema: Schema) {
  type ZodSchema = {
    [K in keyof Schema]: Schema[K] extends ZodType ? Schema[K] : never
  }
  type Data = { [K in keyof ZodSchema]: zod.infer<ZodSchema[K]> }

  type Data_Observables = {
    [K in keyof Data as K extends symbol
      ? K
      : `${Exclude<K, symbol>}$`]: Observable<Data[K]>
  }
  type Data_Subjects = { [K in keyof Data]: Subject<Data[K]> }

  return class {
    // Inner implementation
    /** Setters for the data attributes */
    readonly #data: Readonly<Data_Subjects>
    /** Local data transaction, atomic */
    readonly #transaction$ = new BehaviorSubject(false)
    /** In-memory store where relations are indexed */

    // Public interface
    /** Emits after transaction */
    public readonly data$: Observable<Data>
    /** Emits after transaction and data$ emits */
    public readonly data: Readonly<Data_Observables>
    /** Shows whether a transaction is in progress; although this should be atomic */
    public readonly transaction$ = this.#transaction$.asObservable()

    // Constructor
    constructor(data?: Partial<Data>) {
      this.#data = Object.freeze(
        Object.fromEntries(
          Object.entries(schema)
            .filter(([key, type]) => type instanceof ZodType)
            .map(([key]) => {
              return [key, new Subject()]
            }),
        ) as Data_Subjects,
      )
      this.data$ = this.transaction$.pipe(
        // FIXME: this might emit upon unlock, we only want to emit when it changed too
        switchMap((lock) =>
          lock ? EMPTY : combineLatest(this.#data).pipe(shareReplay(1)),
        ),
      )
      this.data = Object.freeze(
        Object.fromEntries(
          Object.entries(this.#data).map(
            ([k, v$]: [PropertyKey, Subject<any>]) => [
              k,
              v$.asObservable().pipe(sample(this.data$)),
            ],
          ),
        ) as Data_Observables,
      )

      if (data) {
        this.update(data)
      }
    }

    // Protected interface
    protected update(data: Partial<Data>): this {
      this.#transaction$.next(true)
      for (const k of Object.keys(data)) {
        this.#data[k].next(data[k])
      }
      this.#transaction$.next(false)
      return this
    }

    // TODO: isValid
  }
}
