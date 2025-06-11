import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { CommentProps, Comments } from './comment'
import { Optional } from '@/core/type/optional'

export interface AnswerCommentProps extends CommentProps {
  answerId: UniqueEntityID
}

export class AnswerComment extends Comments<AnswerCommentProps> {
  static create(
    props: Optional<AnswerCommentProps, 'createdAt'>,
    id?: UniqueEntityID
  ) {
    const answerComments = new AnswerComment({
      ...props,
      createdAt: props.createdAt ?? new Date(),
    })

    return answerComments
  }

  get answerId(): UniqueEntityID {
    return this.props.answerId
  }
}
