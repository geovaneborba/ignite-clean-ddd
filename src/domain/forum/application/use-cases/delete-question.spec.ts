import { makeQuestion } from 'tests/factories/make-question'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { makeDeleteQuestionSut } from 'tests/factories/make-delete-question-sut'
import { NotAllowedError } from './errors/not-allowed-error'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

describe('Delete Question Use Case', () => {
  it('should be able to delete a question', async () => {
    const { sut, inMemoryQuestionsRepository } = makeDeleteQuestionSut()

    const question1 = makeQuestion(
      {
        authorId: new UniqueEntityID('author-1'),
      },
      new UniqueEntityID('question-1')
    )

    const question2 = makeQuestion()

    await inMemoryQuestionsRepository.create(question1)
    await inMemoryQuestionsRepository.create(question2)

    await sut.execute({
      questionId: 'question-1',
      authorId: 'author-1',
    })

    expect(inMemoryQuestionsRepository.items).toHaveLength(1)
    expect(inMemoryQuestionsRepository.items[0]).toEqual(question2)
  })

  it('should not be able to delete a question from another user', async () => {
    const { sut, inMemoryQuestionsRepository } = makeDeleteQuestionSut()

    const question1 = makeQuestion(
      {
        authorId: new UniqueEntityID('author-1'),
      },
      new UniqueEntityID('question-1')
    )
    const question2 = makeQuestion()

    await inMemoryQuestionsRepository.create(question1)
    await inMemoryQuestionsRepository.create(question2)

    const result = await sut.execute({
      questionId: 'question-1',
      authorId: 'author-2',
    })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(NotAllowedError)

    expect(inMemoryQuestionsRepository.items).toHaveLength(2)
  })

  it('should not be able to delete a question that does not exist', async () => {
    const { sut } = makeDeleteQuestionSut()

    const result = await sut.execute({
      questionId: 'question-1',
      authorId: 'author-1',
    })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(ResourceNotFoundError)
  })
})
