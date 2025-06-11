import { makeQuestion } from 'tests/factories/make-question'
import { makeCommentOnQuestionSut } from 'tests/factories/make-comment-on-question-sut'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

describe('Comment on Question Use Case', () => {
  it('should be able to comment on question', async () => {
    const {
      sut,
      inMemoryQuestionsRepository,
      inMemoryQuestionCommentsRepository,
    } = makeCommentOnQuestionSut()

    const question = makeQuestion()
    await inMemoryQuestionsRepository.create(question)

    await sut.execute({
      questionId: question.id.toString(),
      authorId: question.authorId.toString(),
      content: 'Comentário teste',
    })

    expect(inMemoryQuestionCommentsRepository.items[0].content).toEqual(
      'Comentário teste'
    )
  })

  it('should not be able to comment on a non-existing question', async () => {
    const { sut } = makeCommentOnQuestionSut()

    const result = await sut.execute({
      questionId: 'question-1',
      authorId: 'author-1',
      content: 'Comentário teste',
    })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(ResourceNotFoundError)
  })
})
