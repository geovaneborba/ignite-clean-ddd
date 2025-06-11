import { DeleteAnswerUseCase } from '@/domain/forum/application/use-cases/delete-answer'
import { InMemoryAnswersRepository } from 'tests/repositories/in-memory-answers-repository'

export function makeDeleteAnswerSut() {
  const inMemoryAnswersRepository = new InMemoryAnswersRepository()
  const sut = new DeleteAnswerUseCase(inMemoryAnswersRepository)

  return {
    sut,
    inMemoryAnswersRepository,
  }
}
