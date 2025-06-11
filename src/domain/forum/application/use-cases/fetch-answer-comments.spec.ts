import { makeAnswerComment } from 'tests/factories/make-answer-comment'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { makeFetchAnswerCommentsSut } from 'tests/factories/make-fetch-answer-comments-sut'

describe('Fetch Answer Comments Use Case', () => {
  it('should be able to fetch answer comments', async () => {
    const { sut, answerCommentsRepository } = makeFetchAnswerCommentsSut()

    await answerCommentsRepository.create(
      makeAnswerComment({ answerId: new UniqueEntityID('answer-1') })
    )
    await answerCommentsRepository.create(
      makeAnswerComment({ answerId: new UniqueEntityID('answer-1') })
    )
    await answerCommentsRepository.create(
      makeAnswerComment({ answerId: new UniqueEntityID('answer-1') })
    )

    const result = await sut.execute({
      answerId: 'answer-1',
      page: 1,
    })

    expect(result.isRight()).toBe(true)
    expect(result.value?.answerComments).toHaveLength(3)
    expect(answerCommentsRepository.items).toHaveLength(3)
  })

  it('should be able to fetch paginated answer comments', async () => {
    const { sut, answerCommentsRepository } = makeFetchAnswerCommentsSut()

    for (let i = 0; i <= 22; i++) {
      await answerCommentsRepository.create(
        makeAnswerComment({ answerId: new UniqueEntityID('author-1') })
      )
    }

    const result = await sut.execute({
      answerId: 'author-1',
      page: 2,
    })

    expect(result.value?.answerComments).toHaveLength(3)
    expect(answerCommentsRepository.items).toHaveLength(23)
  })
})
