import { makeQuestionComment } from 'tests/factories/make-question-comment'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { makeDeleteQuestionCommentSut } from 'tests/factories/make-delete-question-comment-sut'
import { NotAllowedError } from './errors/not-allowed-error'

describe('Delete Question Comment Use Case', () => {
  it('should be able to delete a question comment', async () => {
    const { sut, inMemoryQuestionCommentsRepository } =
      makeDeleteQuestionCommentSut()

    const questionComment = makeQuestionComment()

    await inMemoryQuestionCommentsRepository.create(questionComment)

    await sut.execute({
      questionCommentId: questionComment.id.toString(),
      authorId: questionComment.authorId.toString(),
    })

    expect(inMemoryQuestionCommentsRepository.items).toHaveLength(0)
  })

  it('should not be able to delete another user question comment', async () => {
    const { sut, inMemoryQuestionCommentsRepository } =
      makeDeleteQuestionCommentSut()

    const questionComment = makeQuestionComment({
      authorId: new UniqueEntityID('author-1'),
    })

    await inMemoryQuestionCommentsRepository.create(questionComment)

    const result = await sut.execute({
      questionCommentId: questionComment.id.toString(),
      authorId: 'author-2',
    })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(NotAllowedError)
  })
})
