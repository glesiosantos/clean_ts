import bcrypt from 'bcrypt'
import { BcryptAdapter } from './bcrypt_adapter'

describe('Bcrypt Adapter', () => {
  it('should calls bcrypt with correct values', async () => {
    const sut = new BcryptAdapter()
    const hashSpy = jest.spyOn(bcrypt, 'hash')
    await sut.encrypt('valid_password')
    expect(hashSpy)
  })
})
