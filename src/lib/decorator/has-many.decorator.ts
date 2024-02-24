export function HasMany<This, Model>(
  modelCb: () => new (...args: any[]) => Model,
) {
  // const subject = new Subject<Set<Model>>()
  return function (
    value: undefined,
    context: ClassFieldDecoratorContext<This, Set<Model>>,
  ) {
    console.log('hasMany', modelCb, value, context)
  }
}
