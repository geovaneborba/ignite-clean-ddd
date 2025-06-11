import { AnswerQuestionUseCase } from '@/domain/forum/application/use-cases/answer-question'
import { InMemoryAnswersRepository } from 'tests/repositories/in-memory-answers-repository'

export function makeAnswerQuestionSut() {
  const inMemoryAnswersRepository = new InMemoryAnswersRepository()
  const sut = new AnswerQuestionUseCase(inMemoryAnswersRepository)

  return {
    sut,
    inMemoryAnswersRepository,
  }
}
