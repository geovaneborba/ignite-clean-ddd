import { CommentOnAnswerUseCase } from '@/domain/forum/application/use-cases/comment-on-answer'
import { InMemoryAnswerCommentsRepository } from 'tests/repositories/in-memory-answer-comments-repository'
import { InMemoryAnswersRepository } from 'tests/repositories/in-memory-answers-repository'

export function makeCommentOnAnswerSut() {
  const inMemoryAnswersRepository = new InMemoryAnswersRepository()
  const inMemoryAnswerCommentsRepository =
    new InMemoryAnswerCommentsRepository()

  const sut = new CommentOnAnswerUseCase(
    inMemoryAnswersRepository,
    inMemoryAnswerCommentsRepository
  )

  return {
    sut,
    inMemoryAnswersRepository,
    inMemoryAnswerCommentsRepository,
  }
}
