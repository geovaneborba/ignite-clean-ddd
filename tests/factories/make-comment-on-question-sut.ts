import { CommentOnQuestionUseCase } from '@/domain/forum/application/use-cases/comment-on-question'
import { InMemoryQuestionCommentsRepository } from 'tests/repositories/in-memory-question-comments-repository'
import { InMemoryQuestionsRepository } from 'tests/repositories/in-memory-questions-repository'

export function makeCommentOnQuestionSut() {
  const inMemoryQuestionsRepository = new InMemoryQuestionsRepository()
  const inMemoryQuestionCommentsRepository =
    new InMemoryQuestionCommentsRepository()

  const sut = new CommentOnQuestionUseCase(
    inMemoryQuestionsRepository,
    inMemoryQuestionCommentsRepository
  )
  return {
    sut,
    inMemoryQuestionsRepository,
    inMemoryQuestionCommentsRepository,
  }
}
