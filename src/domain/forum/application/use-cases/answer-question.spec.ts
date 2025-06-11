import { makeAnswerQuestionSut } from 'tests/factories/make-answer-question-sut'

describe('Answer Question Use Case', () => {
  it('should be able to create an answer', async () => {
    const { sut, inMemoryAnswersRepository } = makeAnswerQuestionSut()

    const result = await sut.execute({
      questionId: '1',
      instructorId: '1',
      content: 'Conteúdo da respostas',
    })

    expect(result.isRight()).toBe(true)
    expect(inMemoryAnswersRepository.items[0]).toEqual(result.value?.answer)
  })
})
