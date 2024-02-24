export class Relation<Model> {
  constructor(private readonly model: Model) {
    console.log('Relation model', model)
  }
}
