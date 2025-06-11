import { GetQuestionBySlugUseCase } from '@/domain/forum/application/use-cases/get-question-by-slug'
import { InMemoryQuestionsRepository } from 'tests/repositories/in-memory-questions-repository'

export function makeGetQuestionBySlugSut() {
  const inMemoryQuestionsRepository = new InMemoryQuestionsRepository()
  const sut = new GetQuestionBySlugUseCase(inMemoryQuestionsRepository)
  return { sut, inMemoryQuestionsRepository }
}
