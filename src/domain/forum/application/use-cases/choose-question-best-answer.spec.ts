import { makeQuestion } from 'tests/factories/make-question'
import { makeAnswer } from 'tests/factories/make-answer'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { makeChooseQuestionBestAnswerSut } from 'tests/factories/make-choose-best-answer-sut'
import { NotAllowedError } from './errors/not-allowed-error'

describe('Choose Question Best Answer Use Case', () => {
  it('should be able to choose the question best answer', async () => {
    const { sut, inMemoryAnswersRepository, inMemoryQuestionsRepository } =
      makeChooseQuestionBestAnswerSut()

    const question = makeQuestion()

    const answer = makeAnswer({
      questionId: question.id,
    })

    await inMemoryAnswersRepository.create(answer)
    await inMemoryQuestionsRepository.create(question)

    await sut.execute({
      answerId: answer.id.toString(),
      authorId: question.authorId.toString(),
    })

    expect(inMemoryQuestionsRepository.items[0].bestAnswerId).toEqual(answer.id)
  })

  it('should not be able to choose another question best answer', async () => {
    const { sut, inMemoryAnswersRepository, inMemoryQuestionsRepository } =
      makeChooseQuestionBestAnswerSut()

    const question = makeQuestion({
      authorId: new UniqueEntityID('author-1'),
    })

    const answer = makeAnswer({
      questionId: question.id,
    })

    inMemoryQuestionsRepository.create(question)
    inMemoryAnswersRepository.create(answer)

    const result = await sut.execute({
      answerId: answer.id.toString(),
      authorId: 'author-2',
    })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(NotAllowedError)
  })
})
