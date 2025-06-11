import { PaginationParams } from '@/core/repositories/pagination-params'
import { QuestionCommentsRepository } from '@/domain/forum/application/repositories/question-comments-repository'
import { QuestionComment } from '@/domain/forum/enterprise/entities/question-comment'

export class InMemoryQuestionCommentsRepository
  implements QuestionCommentsRepository
{
  public items: QuestionComment[]

  constructor() {
    this.items = []
  }

  async create(question: QuestionComment): Promise<void> {
    this.items.push(question)
  }

  async delete(question: QuestionComment): Promise<void> {
    const itemIndex = this.items.findIndex((item) => item.id === question.id)

    if (itemIndex === -1) {
      throw new Error('Question not found')
    }

    this.items.splice(itemIndex, 1)
  }

  async findById(id: string): Promise<QuestionComment | null> {
    const question = this.items.find((item) => item.id.toString() === id)

    if (!question) {
      return null
    }

    return question
  }

  async findManyByQuestionId(
    questionId: string,
    { page }: PaginationParams
  ): Promise<QuestionComment[]> {
    const ITEMS_PER_PAGE = 20

    const questionComments = this.items
      .filter((item) => item.questionId.toString() === questionId)
      .slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE)

    return questionComments
  }
}
