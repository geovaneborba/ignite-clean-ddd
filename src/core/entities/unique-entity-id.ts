import { randomUUID } from 'node:crypto'

export class UniqueEntityID {
  private readonly value: string

  constructor(value?: string) {
    this.value = value ?? randomUUID()
  }

  public equals(id: UniqueEntityID): boolean {
    return id.toString() === this.value
  }

  toString(): string {
    return this.value
  }
}
