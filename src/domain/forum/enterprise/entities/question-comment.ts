import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { CommentProps, Comments } from './comment'
import { Optional } from '@/core/type/optional'

export interface QuestionCommentProps extends CommentProps {
  questionId: UniqueEntityID
}

export class QuestionComment extends Comments<QuestionCommentProps> {
  static create(
    props: Optional<QuestionCommentProps, 'createdAt'>,
    id?: UniqueEntityID
  ) {
    const questionComments = new QuestionComment({
      ...props,
      createdAt: props.createdAt ?? new Date(),
    })
    return questionComments
  }

  get questionId(): UniqueEntityID {
    return this.props.questionId
  }
}
