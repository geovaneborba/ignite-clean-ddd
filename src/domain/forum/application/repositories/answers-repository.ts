import { PaginationParams } from '@/core/repositories/pagination-params'
import { Answer } from '@/domain/forum/enterprise/entities/answer'

/**
 * Interface for the Answers Repository.
 * This interface defines the contract for the answers repository,
 * which is responsible for managing the persistence of Answer entities.
 */
export interface AnswersRepository {
  save(answer: Answer): Promise<void>
  create(answer: Answer): Promise<void>
  delete(answer: Answer): Promise<void>
  findById(id: string): Promise<Answer | null>
  findManyByQuestionId(
    questionId: string,
    params: PaginationParams
  ): Promise<Answer[]>
}
