import { Answer } from '@/domain/forum/enterprise/entities/answer'

/**
 * Interface for the Answers Repository.
 * This interface defines the contract for the answers repository,
 * which is responsible for managing the persistence of Answer entities.
 */
export interface IAnswersRepository {
  create(answer: Answer): Promise<void>
}
