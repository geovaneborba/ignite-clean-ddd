import { Slug } from '@/domain/forum/enterprise/entities/value-objects/slug'
import { makeQuestion } from 'tests/factories/make-question'
import { makeGetQuestionBySlugSut } from 'tests/factories/make-get-question-by-slug-sut'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

describe('Get Question By Slug Use Case', () => {
  it('should be able to get a question by slug', async () => {
    const { sut, inMemoryQuestionsRepository } = makeGetQuestionBySlugSut()

    const newQuestion = makeQuestion({
      slug: Slug.create('example-question'),
    })

    await inMemoryQuestionsRepository.create(newQuestion)

    const result = await sut.execute({
      slug: 'example-question',
    })

    expect(result.value?.question.id).toBeTruthy()
    expect(result.value?.question.title).toBe(newQuestion.title)
    expect(result.value?.question.id).toBe(newQuestion.id)
    expect(result.value?.question.slug.value).toBe(newQuestion.slug.value)
  })

  it('should not be able to get a question by slug', async () => {
    const { sut } = makeGetQuestionBySlugSut()

    const result = await sut.execute({
      slug: 'example-question',
    })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(ResourceNotFoundError)
  })
})
