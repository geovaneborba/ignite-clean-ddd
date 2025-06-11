import { EditAnswerUseCase } from '@/domain/forum/application/use-cases/edit-answer'
import { InMemoryAnswersRepository } from 'tests/repositories/in-memory-answers-repository'

export function makeEditAnswerSut() {
  const answersRepository = new InMemoryAnswersRepository()
  const sut = new EditAnswerUseCase(answersRepository)
  return {
    sut,
    answersRepository,
  }
}
