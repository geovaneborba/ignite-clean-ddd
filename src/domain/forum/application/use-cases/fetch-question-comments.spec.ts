import { makeQuestionComment } from 'tests/factories/make-question-comment'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { makeFetchQuestionCommentsSut } from 'tests/factories/make-fetch-question-comments-sut'

describe('Fetch Question Comments Use Case', () => {
  it('should be able to fetch question comments', async () => {
    const { sut, inMemoryQuestionCommentsRepository } =
      makeFetchQuestionCommentsSut()

    await inMemoryQuestionCommentsRepository.create(
      makeQuestionComment({ questionId: new UniqueEntityID('question-1') })
    )
    await inMemoryQuestionCommentsRepository.create(
      makeQuestionComment({ questionId: new UniqueEntityID('question-1') })
    )
    await inMemoryQuestionCommentsRepository.create(
      makeQuestionComment({ questionId: new UniqueEntityID('question-1') })
    )

    const result = await sut.execute({
      questionId: 'question-1',
      page: 1,
    })

    expect(result.isRight()).toBe(true)
    expect(result.value?.questionComments).toHaveLength(3)
  })

  it('should be able to fetch paginated question comments', async () => {
    const { sut, inMemoryQuestionCommentsRepository } =
      makeFetchQuestionCommentsSut()

    for (let i = 1; i <= 22; i++) {
      await inMemoryQuestionCommentsRepository.create(
        makeQuestionComment({ questionId: new UniqueEntityID('question-1') })
      )
    }

    const result = await sut.execute({
      questionId: 'question-1',
      page: 2,
    })

    expect(result.value?.questionComments).toHaveLength(2)
  })
})
