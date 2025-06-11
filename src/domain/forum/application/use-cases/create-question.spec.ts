import { makeCreateQuestionSut } from 'tests/factories/make-create-question-sut'

describe('Create Question Use Case', () => {
  it('should be able to create a question', async () => {
    const { sut, inMemoryQuestionsRepository } = makeCreateQuestionSut()

    const result = await sut.execute({
      title: 'new question',
      content: 'content of the question',
      authorId: '1',
    })

    expect(result.isRight()).toBe(true)

    expect(result.value?.question.id).toEqual(
      inMemoryQuestionsRepository.items[0].id
    )
  })
})
