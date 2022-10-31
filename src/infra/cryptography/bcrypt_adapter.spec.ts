import bcrypt from 'bcrypt'
import { BcryptAdapter } from './bcrypt_adapter'

jest.mock('bcrypt', () => ({
  hash: async (): Promise<string> => {
    return new Promise(resolve => resolve('hashed_password'))
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

  it('should throw when bcrypt throws', async () => {
    const sut = new BcryptAdapter()
    jest.spyOn(bcrypt, 'hash').mockImplementationOnce(() => { throw new Error() })
    const promise = sut.encrypt('valid_password')
    await expect(promise).rejects.toThrow()
  })
})
