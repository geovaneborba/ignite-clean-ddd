import { PaginationParams } from '@/core/repositories/pagination-params'
import { AnswerCommentsRepository } from '@/domain/forum/application/repositories/answer-comments-repository'
import { AnswerComment } from '@/domain/forum/enterprise/entities/answer-comment'

export class InMemoryAnswerCommentsRepository
  implements AnswerCommentsRepository
{
  public items: AnswerComment[]

  constructor() {
    this.items = []
  }

  async create(answer: AnswerComment): Promise<void> {
    this.items.push(answer)
  }

  async delete(answer: AnswerComment): Promise<void> {
    const itemIndex = this.items.findIndex((item) => item.id === answer.id)

    if (itemIndex === -1) {
      throw new Error('Answer not found')
    }

    this.items.splice(itemIndex, 1)
  }

  async findById(id: string): Promise<AnswerComment | null> {
    const answer = this.items.find((item) => item.id.toString() === id)

    if (!answer) {
      return null
    }

    return answer
  }

  async findManyByAnswerId(answerId: string, { page }: PaginationParams) {
    const ITEMS_PER_PAGE = 20

    const answerComments = this.items
      .filter((item) => item.answerId.toString() === answerId)
      .slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE)

    return answerComments
  }
}
