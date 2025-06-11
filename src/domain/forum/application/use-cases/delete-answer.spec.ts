import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { makeAnswer } from 'tests/factories/make-answer'
import { makeDeleteAnswerSut } from 'tests/factories/make-delete-answer-sut'
import { NotAllowedError } from './errors/not-allowed-error'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

describe('Delete Answer Use Case', () => {
  it('should be able to delete a answer', async () => {
    const { sut, inMemoryAnswersRepository } = makeDeleteAnswerSut()

    const answer1 = makeAnswer(
      {
        authorId: new UniqueEntityID('author-1'),
      },
      new UniqueEntityID('answer-1')
    )
    const answer2 = makeAnswer()

    await inMemoryAnswersRepository.create(answer1)
    await inMemoryAnswersRepository.create(answer2)

    await sut.execute({
      answerId: 'answer-1',
      authorId: 'author-1',
    })

    expect(inMemoryAnswersRepository.items).toHaveLength(1)
    expect(inMemoryAnswersRepository.items[0]).toEqual(answer2)
  })

  it('should not be able to delete a answer from another user', async () => {
    const { sut, inMemoryAnswersRepository } = makeDeleteAnswerSut()

    const answer1 = makeAnswer(
      {
        authorId: new UniqueEntityID('author-1'),
      },
      new UniqueEntityID('answer-1')
    )

    const answer2 = makeAnswer()

    await inMemoryAnswersRepository.create(answer1)
    await inMemoryAnswersRepository.create(answer2)

    const result = await sut.execute({
      answerId: 'answer-1',
      authorId: 'author-2',
    })

    expect(result.isLeft()).toBe(true)
    expect(inMemoryAnswersRepository.items).toHaveLength(2)
    expect(result.value).toBeInstanceOf(NotAllowedError)
  })

  it('should not be able to delete a answer that does not exist', async () => {
    const { sut } = makeDeleteAnswerSut()

    const result = await sut.execute({
      answerId: 'answer-1',
      authorId: 'author-1',
    })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(ResourceNotFoundError)
  })
})
