import { EditQuestionUseCase } from '@/domain/forum/application/use-cases/edit-question'
import { InMemoryQuestionsRepository } from 'tests/repositories/in-memory-questions-repository'

export function makeEditQuestionSut() {
  const inMemoryQuestionsRepository = new InMemoryQuestionsRepository()
  const sut = new EditQuestionUseCase(inMemoryQuestionsRepository)
  return {
    sut,
    inMemoryQuestionsRepository,
  }
}
