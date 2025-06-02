import { CreateQuestionUseCase } from './create-question'
import { IQuestionsRepository } from '../repositories/questions-repository'
import { Question } from '../../enterprise/entities/question'

const fakeQuestionsRepository: IQuestionsRepository = {
  create: async (question: Question) => {},
}

describe('CreateQuestionUseCase', () => {
  it('create question', async () => {
    const sut = new CreateQuestionUseCase(fakeQuestionsRepository)

    const { question } = await sut.execute({
      title: 'new question',
      content: 'content of the question',
      authorId: '1',
    })

    expect(question.id).toBeTruthy()
    expect(question.title).toBe('new question')
    expect(question.content).toBe('content of the question')
  })
})
