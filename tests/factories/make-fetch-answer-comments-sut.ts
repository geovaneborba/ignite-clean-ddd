import { FetchAnswerCommentsUseCase } from '@/domain/forum/application/use-cases/fetch-answer-comments'
import { InMemoryAnswerCommentsRepository } from 'tests/repositories/in-memory-answer-comments-repository'

export function makeFetchAnswerCommentsSut() {
  const answerCommentsRepository = new InMemoryAnswerCommentsRepository()
  const sut = new FetchAnswerCommentsUseCase(answerCommentsRepository)

  return {
    sut,
    answerCommentsRepository,
  }
}
