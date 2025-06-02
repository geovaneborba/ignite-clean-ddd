import { Entity } from '@/core/entities/entity'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Optional } from '@/core/type/optional'

interface QuestionProps {
  authorId: UniqueEntityID
  questionId: UniqueEntityID
  content: string
  createdAt: Date
  updatedAt?: Date
}

export class Answer extends Entity<QuestionProps> {
  /**
   * Factory method to create an Answer entity.
   * This method allows for the creation of an Answer entity with the provided properties.
   * It ensures that the `createdAt` property is set to the current date if not provided.
   * It also allows for an optional unique identifier to be passed in.
   * @param props - The properties to create the Answer entity.
   * @param id - The unique identifier for the Answer entity.
   * @returns A new Answer entity.
   */
  static create(
    props: Optional<QuestionProps, 'createdAt'>,
    id?: UniqueEntityID
  ) {
    const answer = new Answer( // call the constructor of the parent class Entity with the provided properties
      {
        ...props,
        createdAt: props.createdAt ?? new Date(),
      },
      id
    )

    return answer
  }

  get authorId(): UniqueEntityID {
    return this.props.authorId
  }

  get questionId(): UniqueEntityID {
    return this.props.questionId
  }

  get content(): string {
    return this.props.content
  }

  get createdAt(): Date {
    return this.props.createdAt
  }

  get updatedAt(): Date | undefined {
    return this.props.updatedAt
  }

  private touch() {
    this.props.updatedAt = new Date()
  }

  set content(content: string) {
    this.props.content = content
    this.touch
  }
}
