import { DeleteQuestionUseCase } from '@/domain/forum/application/use-cases/delete-question'
import { InMemoryQuestionsRepository } from 'tests/repositories/in-memory-questions-repository'

export function makeDeleteQuestionSut() {
  const inMemoryQuestionsRepository = new InMemoryQuestionsRepository()
  const sut = new DeleteQuestionUseCase(inMemoryQuestionsRepository)

  return {
    sut,
    inMemoryQuestionsRepository,
  }
}
