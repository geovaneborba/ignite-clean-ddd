import { DeleteQuestionCommentUseCase } from '@/domain/forum/application/use-cases/delete-question-comment'
import { InMemoryQuestionCommentsRepository } from 'tests/repositories/in-memory-question-comments-repository'

export function makeDeleteQuestionCommentSut() {
  const inMemoryQuestionCommentsRepository =
    new InMemoryQuestionCommentsRepository()

  const sut = new DeleteQuestionCommentUseCase(
    inMemoryQuestionCommentsRepository
  )

  return {
    sut,
    inMemoryQuestionCommentsRepository,
  }
}
