import { makeAnswer } from 'tests/factories/make-answer'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { makeEditAnswerSut } from 'tests/factories/make-edit-answer-sut'
import { NotAllowedError } from './errors/not-allowed-error'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

describe('Edit Answer Use Case', () => {
  it('should be able to edit a answer', async () => {
    const { sut, answersRepository } = makeEditAnswerSut()

    const newAnswer = makeAnswer(
      {
        authorId: new UniqueEntityID('author-1'),
      },
      new UniqueEntityID('answer-1')
    )
    await answersRepository.create(newAnswer)

    await sut.execute({
      answerId: newAnswer.id.toString(),
      authorId: 'author-1',
      content: 'Conteúdo teste',
    })

    expect(answersRepository.items[0]).toMatchObject({
      content: 'Conteúdo teste',
    })
  })
  it('should not be able to edit a answer from another user', async () => {
    const { sut, answersRepository } = makeEditAnswerSut()

    const newAnswer = makeAnswer(
      {
        authorId: new UniqueEntityID('author-1'),
      },
      new UniqueEntityID('answer-1')
    )

    await answersRepository.create(newAnswer)

    const result = await sut.execute({
      answerId: newAnswer.id.toString(),
      authorId: 'author-2',
      content: 'Conteúdo teste',
    })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(NotAllowedError)
  })

  it('should not be able to edit a answer that does not exist', async () => {
    const { sut } = makeEditAnswerSut()

    const result = await sut.execute({
      answerId: 'answer-1',
      authorId: 'author-1',
      content: 'Conteúdo teste',
    })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(ResourceNotFoundError)
  })
})
