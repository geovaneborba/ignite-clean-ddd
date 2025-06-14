import { makeAnswerComment } from 'tests/factories/make-answer-comment'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { makeDeleteAnswerCommentSut } from 'tests/factories/make-delete-answer-comment-sut'
import { NotAllowedError } from './errors/not-allowed-error'

describe('Delete Answer Comment Use Case', () => {
  it('should be able to delete a answer comment', async () => {
    const { sut, inMemoryAnswerCommentsRepository } =
      makeDeleteAnswerCommentSut()

    const answerComment = makeAnswerComment()

    await inMemoryAnswerCommentsRepository.create(answerComment)

    await sut.execute({
      answerCommentId: answerComment.id.toString(),
      authorId: answerComment.authorId.toString(),
    })

    expect(inMemoryAnswerCommentsRepository.items).toHaveLength(0)
  })

  it('should not be able to delete another user answer comment', async () => {
    const { sut, inMemoryAnswerCommentsRepository } =
      makeDeleteAnswerCommentSut()

    const answerComment = makeAnswerComment({
      authorId: new UniqueEntityID('author-1'),
    })

    await inMemoryAnswerCommentsRepository.create(answerComment)

    const result = await sut.execute({
      answerCommentId: answerComment.id.toString(),
      authorId: 'author-2',
    })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(NotAllowedError)
  })
})
