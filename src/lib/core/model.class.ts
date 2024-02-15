export class Model {
  /**
   * Decorator
   */
  public static attribute() {
    return function (value: any, context: ClassFieldDecoratorContext) {
      return value
    }
  }
}
