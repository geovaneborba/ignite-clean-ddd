import { makeQuestion } from 'tests/factories/make-question'
import { makeFetchRecentQuestionsSut } from 'tests/factories/make-fetch-recent-questions-sut'

describe('Fetch Recent Questions Use Case', () => {
  it('it should be able to fetch recent questions', async () => {
    const { sut, inMemoryQuestionsRepository } = makeFetchRecentQuestionsSut()

    await inMemoryQuestionsRepository.create(
      makeQuestion({ createdAt: new Date(2025, 5, 4) })
    )

    await inMemoryQuestionsRepository.create(
      makeQuestion({ createdAt: new Date(2025, 5, 2) })
    )

    await inMemoryQuestionsRepository.create(
      makeQuestion({ createdAt: new Date(2025, 5, 6) })
    )

    const result = await sut.execute({ page: 1 })

    expect(result.value?.questions).toEqual([
      expect.objectContaining({ createdAt: new Date(2025, 5, 6) }),
      expect.objectContaining({ createdAt: new Date(2025, 5, 4) }),
      expect.objectContaining({ createdAt: new Date(2025, 5, 2) }),
    ])
  })

  it('should be able to fetch paginated recent questions', async () => {
    const { sut, inMemoryQuestionsRepository } = makeFetchRecentQuestionsSut()

    for (let i = 1; i <= 22; i++) {
      await inMemoryQuestionsRepository.create(makeQuestion())
    }

    const result = await sut.execute({
      page: 2,
    })

    expect(result.value?.questions).toHaveLength(2)
  })
})
