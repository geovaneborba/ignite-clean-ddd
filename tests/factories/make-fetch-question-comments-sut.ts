import { FetchQuestionCommentsUseCase } from '@/domain/forum/application/use-cases/fetch-question-comments'
import { InMemoryQuestionCommentsRepository } from 'tests/repositories/in-memory-question-comments-repository'

export function makeFetchQuestionCommentsSut() {
  const inMemoryQuestionCommentsRepository =
    new InMemoryQuestionCommentsRepository()
  const sut = new FetchQuestionCommentsUseCase(
    inMemoryQuestionCommentsRepository
  )

  return {
    sut,
    inMemoryQuestionCommentsRepository,
  }
}
