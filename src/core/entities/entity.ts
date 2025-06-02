import { UniqueEntityID } from './unique-entity-id'

/**
 * This class represents a base entity in the domain model.
 * It provides a unique identifier and a set of properties that define the entity.
 * The entity can be extended to create specific domain entities with their own properties.
 * @template Props - The type of properties that the entity will hold.
 * @class Entity
 * @property {UniqueEntityID} id - The unique identifier for the entity.
 * @property {Props} props - The properties of the entity.
 */
export class Entity<Props> {
  private _id: UniqueEntityID
  protected readonly props: Props

  protected constructor(props: Props, id?: UniqueEntityID) {
    this._id = id ?? new UniqueEntityID()
    this.props = props
  }

  get id(): UniqueEntityID {
    return this._id
  }
}
