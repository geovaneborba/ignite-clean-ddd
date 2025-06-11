import { CreateQuestionUseCase } from '@/domain/forum/application/use-cases/create-question'
import { InMemoryQuestionsRepository } from 'tests/repositories/in-memory-questions-repository'

export function makeCreateQuestionSut() {
  const inMemoryQuestionsRepository = new InMemoryQuestionsRepository()
  const sut = new CreateQuestionUseCase(inMemoryQuestionsRepository)

  return {
    sut,
    inMemoryQuestionsRepository,
  }
}
