import bcrypt from 'bcrypt'
import { BcryptAdapter } from './bcrypt_adapter'

jest.mock('bcrypt', () => ({
  hash: (): string => {
    return 'hashed_password'
  }
}))

describe('Bcrypt Adapter', () => {
  it('should calls bcrypt with correct values', async () => {
    const sut = new BcryptAdapter()
    const hashSpy = jest.spyOn(bcrypt, 'hash')
    await sut.encrypt('valid_password')
    expect(hashSpy)
  })

  it('should return a hash on success', async () => {
    const sut = new BcryptAdapter()
    const hashed = await sut.encrypt('valid_password')
    expect(hashed).toBe('hashed_password')
  })
})
