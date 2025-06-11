import { makeQuestion } from 'tests/factories/make-question'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { makeEditQuestionSut } from 'tests/factories/make-edit-question-sut'
import { NotAllowedError } from './errors/not-allowed-error'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

describe('Edit Question Use Case', () => {
  it('should be able to edit a question', async () => {
    const { sut, inMemoryQuestionsRepository } = makeEditQuestionSut()

    const newQuestion = makeQuestion(
      {
        authorId: new UniqueEntityID('author-1'),
      },
      new UniqueEntityID('question-1')
    )

    await inMemoryQuestionsRepository.create(newQuestion)

    await sut.execute({
      questionId: newQuestion.id.toString(),
      authorId: 'author-1',
      title: 'New title',
      content: 'New content',
    })

    expect(inMemoryQuestionsRepository.items[0]).toMatchObject({
      title: 'New title',
      content: 'New content',
    })
  })

  it('should not be able to edit a question from another user', async () => {
    const { sut, inMemoryQuestionsRepository } = makeEditQuestionSut()

    const newQuestion = makeQuestion(
      {
        authorId: new UniqueEntityID('author-1'),
      },
      new UniqueEntityID('question-1')
    )

    await inMemoryQuestionsRepository.create(newQuestion)

    const result = await sut.execute({
      questionId: newQuestion.id.toString(),
      authorId: 'author-2',
      title: 'New title',
      content: 'New content',
    })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(NotAllowedError)
  })

  it('should not be able to edit a question that does not exist', async () => {
    const { sut } = makeEditQuestionSut()

    const result = await sut.execute({
      questionId: 'question-1',
      authorId: 'author-1',
      title: 'New title',
      content: 'New content',
    })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(ResourceNotFoundError)
  })
})
