import { BehaviorSubject, Observable, map } from 'rxjs'

// TODO: cache pipes?
export class RxMap<K, V> {
  #items = new Map<K, V>()
  #items$ = new BehaviorSubject(this.#items)

  // Static read only

  get size() {
    return this.#items.size
  }

  has(key: K): boolean {
    return this.#items.has(key)
  }

  get(key: K): V | undefined {
    return this.#items.get(key)
  }

  entries(): Iterable<[K, V]> {
    return this.#items.entries()
  }

  // Static write

  set(key: K, value: V): this {
    this.#items.set(key, value)
    this.#items$.next(this.#items)
    return this
  }

  clear(): void {
    this.#items.clear()
  }

  delete(key: K): boolean {
    const deleted = this.#items.delete(key)
    this.#items$.next(this.#items)
    return deleted
  }

  // Observable read only

  get size$() {
    return this.#items$.pipe(map((items) => items.size))
  }

  has$(key: K): Observable<boolean> {
    return this.#items$.pipe(map((items) => items.has(key)))
  }

  get$(key: K): Observable<V | undefined> {
    return this.#items$.pipe(map((items) => items.get(key)))
  }

  entries$(): Observable<Iterable<[K, V]>> {
    return this.#items$.pipe(map((items) => items.entries()))
  }
}
