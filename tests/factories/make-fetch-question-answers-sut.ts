import { FetchQuestionAnswersUseCase } from '@/domain/forum/application/use-cases/fetch-question-answers'
import { InMemoryAnswersRepository } from 'tests/repositories/in-memory-answers-repository'

export function makeFetchQuestionAnswersSut() {
  const inMemoryAnswersRepository = new InMemoryAnswersRepository()
  const sut = new FetchQuestionAnswersUseCase(inMemoryAnswersRepository)

  return {
    sut,
    inMemoryAnswersRepository,
  }
}
