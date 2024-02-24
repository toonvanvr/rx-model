export function BelongsTo<This, Model>(
  modelCb: () => new (...args: any[]) => Model,
) {
  return function (
    value: undefined,
    context: ClassFieldDecoratorContext<This, Model | null>,
  ) {
    console.log('belongsTo', modelCb, value, context)
  }
}
