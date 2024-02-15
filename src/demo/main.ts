// @ts-nocheck

@Model({
  primaryKey: 'id',
})
export class Task {
  @Model.hasOne<User>()
  readonly user = new RxRelation<User>()

  @Model.hasMany<Tag>()
  readonly tags = new RxRelation<Tag>()

  @Model.belongsToOne<User>()
  readonly channel = new RxRelation<User>()

  @Model.belongsToMany<Donation>()
  readonly seenBy = new RxRelation<Donation>()

  @Model.attribute()
  readonly id = Subject<string>()
}
