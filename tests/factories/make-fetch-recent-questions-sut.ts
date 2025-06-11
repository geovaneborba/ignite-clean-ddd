import { FetchRecentQuestionsUseCase } from '@/domain/forum/application/use-cases/fetch-recent-questions'
import { InMemoryQuestionsRepository } from 'tests/repositories/in-memory-questions-repository'

export function makeFetchRecentQuestionsSut() {
  const inMemoryQuestionsRepository = new InMemoryQuestionsRepository()
  const sut = new FetchRecentQuestionsUseCase(inMemoryQuestionsRepository)

  return { sut, inMemoryQuestionsRepository }
}
