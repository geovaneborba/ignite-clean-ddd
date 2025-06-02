import { Question } from '../question'

export class Slug {
  public value: string

  constructor(value: string) {
    this.value = value
  }

  /**
   * Cria um slug a partir do título fornecido.
   *
   * @param title O título a ser convertido em slug.
   * @returns Um novo objeto Slug com o valor gerado a partir do título.
   */
  static createFromTitle(title: string): Slug {
    const slugValue = title
      .normalize('NFKD')
      .toLowerCase()
      .trim()
      .replace(/\s+/g, '-')
      .replace(/[^\w-]+/g, '')
      .replace(/_/g, '-')
      .replace(/--+/g, '-')
      .replace(/-$/g, '')

    return new Slug(slugValue)
  }
}
