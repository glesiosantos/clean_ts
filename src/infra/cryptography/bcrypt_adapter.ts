import { Hasher } from '../../data/protocols/cryptograph/hasher'
import bcrypt from 'bcrypt'
import { HashedComparer } from '../../data/protocols/cryptograph/hashed_comparer'

export class BcryptAdapter implements Hasher, HashedComparer {
  constructor(private readonly salt: number) { }
  async hash(value: string): Promise<string> {
    const hash = await bcrypt.hash(value, this.salt)
    return hash
  }

  async compare(value: string, hashed: string): Promise<boolean> {
    const isValid = await bcrypt.compare(value, hashed)
    return isValid
  }
}
