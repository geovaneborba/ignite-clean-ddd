import { Slug } from './slug'

describe('Slug Value Object', () => {
  it('should be able to create a slug from a title', () => {
    const slug = Slug.createFromTitle('Meu Título')

    expect(slug.value).toEqual('meu-titulo')
  })
})
