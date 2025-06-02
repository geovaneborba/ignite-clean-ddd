import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Answer } from '@/domain/forum/enterprise/entities/answer'
import { IAnswersRepository } from '@/domain/forum/application/repositories/answers-repository'

interface AnswerQuestionUseCaseRequest {
  questionId: string
  instructorId: string
  content: string
}

export class AnswerQuestionUseCase {
  constructor(private answerRepository: IAnswersRepository) {}

  async execute({
    questionId,
    instructorId,
    content,
  }: AnswerQuestionUseCaseRequest) {
    const answer = Answer.create({
      questionId: new UniqueEntityID(questionId),
      authorId: new UniqueEntityID(instructorId),
      content,
    })

    return answer
  }
}
