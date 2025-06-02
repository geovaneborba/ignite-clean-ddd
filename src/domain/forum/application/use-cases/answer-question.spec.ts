import { IAnswersRepository } from '../repositories/answers-repository'
import { AnswerQuestionUseCase } from './answer-question'

import { Answer } from '@/domain/forum/enterprise/entities/answer'

describe('AnswerQuestionUseCase', () => {
  const fakeAnswerRepository: IAnswersRepository = {
    create: async (answer: Answer) => {
      return
    },
  }

  it('should be able to create an answer', async () => {
    const answerQuestion = new AnswerQuestionUseCase(fakeAnswerRepository)

    const answer = await answerQuestion.execute({
      questionId: '1',
      instructorId: '1',
      content: 'Conteúdo da respostas',
    })

    expect(answer.content).toEqual('Conteúdo da respostas')
  })
})
