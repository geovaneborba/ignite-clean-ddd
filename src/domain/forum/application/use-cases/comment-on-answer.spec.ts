import { makeAnswer } from 'tests/factories/make-answer'
import { makeCommentOnAnswerSut } from 'tests/factories/make-comment-on-answer-sut'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

describe('Comment on Answer Use Case', () => {
  it('should be able to comment on answer', async () => {
    const { sut, inMemoryAnswersRepository, inMemoryAnswerCommentsRepository } =
      makeCommentOnAnswerSut()

    const answer = makeAnswer()

    await inMemoryAnswersRepository.create(answer)

    await sut.execute({
      answerId: answer.id.toString(),
      authorId: answer.authorId.toString(),
      content: 'Comentário teste',
    })

    expect(inMemoryAnswerCommentsRepository.items[0].content).toEqual(
      'Comentário teste'
    )
  })

  it('should not be able to comment on a non-existing answer', async () => {
    const { sut } = makeCommentOnAnswerSut()

    const result = await sut.execute({
      answerId: 'answer-1',
      authorId: 'author-1',
      content: 'Comentário teste',
    })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(ResourceNotFoundError)
  })
})
