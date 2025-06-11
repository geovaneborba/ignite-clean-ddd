import { DeleteAnswerCommentUseCase } from '@/domain/forum/application/use-cases/delete-answer-comment'
import { InMemoryAnswerCommentsRepository } from 'tests/repositories/in-memory-answer-comments-repository'

export function makeDeleteAnswerCommentSut() {
  const inMemoryAnswerCommentsRepository =
    new InMemoryAnswerCommentsRepository()

  const sut = new DeleteAnswerCommentUseCase(inMemoryAnswerCommentsRepository)

  return {
    sut,
    inMemoryAnswerCommentsRepository,
  }
}
