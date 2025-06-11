import { PaginationParams } from '@/core/repositories/pagination-params'
import { AnswersRepository } from '@/domain/forum/application/repositories/answers-repository'
import { Answer } from '@/domain/forum/enterprise/entities/answer'

export class InMemoryAnswersRepository implements AnswersRepository {
  public items: Answer[]

  constructor() {
    this.items = []
  }

  async create(answer: Answer): Promise<void> {
    this.items.push(answer)
  }

  async delete(answer: Answer): Promise<void> {
    const itemIndex = this.items.findIndex((item) => item.id === answer.id)

    if (itemIndex === -1) {
      throw new Error('Answer not found')
    }

    this.items.splice(itemIndex, 1)
  }

  async save(answer: Answer): Promise<void> {
    const itemIndex = this.items.findIndex((item) => item.id === answer.id)

    if (itemIndex === -1) {
      throw new Error('Answer not found')
    }

    this.items[itemIndex] = answer
  }

  async findById(id: string): Promise<Answer | null> {
    const answer = this.items.find((item) => item.id.toString() === id)

    if (!answer) {
      return null
    }

    return answer
  }

  async findManyByQuestionId(questionId: string, { page }: PaginationParams) {
    const ITEMS_PER_PAGE = 20

    const answers = this.items
      .filter((item) => item.questionId.toString() === questionId)
      .slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE)

    return answers
  }
}
