import { makeAnswer } from 'tests/factories/make-answer'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { makeFetchQuestionAnswersSut } from 'tests/factories/make-fetch-question-answers-sut'

describe('Fetch Question Answers Use Case', () => {
  it('should be able to fetch question answers', async () => {
    const { sut, inMemoryAnswersRepository } = makeFetchQuestionAnswersSut()

    await inMemoryAnswersRepository.create(
      makeAnswer({
        questionId: new UniqueEntityID('question-1'),
      })
    )
    await inMemoryAnswersRepository.create(
      makeAnswer({
        questionId: new UniqueEntityID('question-1'),
      })
    )
    await inMemoryAnswersRepository.create(
      makeAnswer({
        questionId: new UniqueEntityID('question-1'),
      })
    )

    const result = await sut.execute({
      questionId: 'question-1',
      page: 1,
    })

    expect(result.isRight()).toBe(true)
    expect(result.value?.answers).toHaveLength(3)
  })

  it('should be able to fetch paginated question answers', async () => {
    const { sut, inMemoryAnswersRepository } = makeFetchQuestionAnswersSut()

    for (let i = 1; i <= 22; i++) {
      await inMemoryAnswersRepository.create(
        makeAnswer({
          questionId: new UniqueEntityID('question-1'),
        })
      )
    }

    const result = await sut.execute({
      questionId: 'question-1',
      page: 2,
    })

    expect(result.value?.answers).toHaveLength(2)
  })
})
