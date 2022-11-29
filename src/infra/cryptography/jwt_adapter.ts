import { Encrypter } from '../../data/protocols/cryptograph/encrypter'
import jwt from 'jsonwebtoken'

export class JwtAdapter implements Encrypter {
  constructor(private readonly secret: string) { }
  async generate(id: string): Promise<string> {
    await jwt.sign({ id }, this.secret)
    return new Promise(resolve => resolve(null))
  }
}
