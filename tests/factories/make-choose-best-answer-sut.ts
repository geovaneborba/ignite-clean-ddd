import { ChooseQuestionBestAnswerUseCase } from '@/domain/forum/application/use-cases/choose-question-best-answer'
import { InMemoryAnswersRepository } from 'tests/repositories/in-memory-answers-repository'
import { InMemoryQuestionsRepository } from 'tests/repositories/in-memory-questions-repository'

export function makeChooseQuestionBestAnswerSut() {
  const inMemoryQuestionsRepository = new InMemoryQuestionsRepository()
  const inMemoryAnswersRepository = new InMemoryAnswersRepository()

  const sut = new ChooseQuestionBestAnswerUseCase(
    inMemoryQuestionsRepository,
    inMemoryAnswersRepository
  )
  return {
    sut,
    inMemoryQuestionsRepository,
    inMemoryAnswersRepository,
  }
}
