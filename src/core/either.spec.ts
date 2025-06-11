import { left, right } from './either'

function doSomething(shouldSuccess: boolean) {
  if (shouldSuccess) {
    return right('success')
  } else {
    return left('error')
  }
}

describe('Either', () => {
  it('should be able to return a success result', () => {
    const result = doSomething(true)

    expect(result.isRight()).toBe(true)
    expect(result.isLeft()).toBe(false)
  })

  it('should be able to return a error result', () => {
    const result = doSomething(false)

    expect(result.isLeft()).toBe(true)
    expect(result.isRight()).toBe(false)
  })
})
