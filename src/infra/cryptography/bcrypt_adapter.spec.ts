import bcrypt from 'bcrypt'
import { BcryptAdapter } from './bcrypt_adapter'

jest.mock('bcrypt', () => ({
  hash: async (): Promise<string> => {
    return new Promise(resolve => resolve('hashed_password'))
  },

  compare: async (): Promise<boolean> => {
    return new Promise(resolve => resolve(true))
  }
}))

const salt = 12

const makeSut = (): BcryptAdapter => new BcryptAdapter(salt)

describe('Bcrypt Adapter', () => {
  it('should calls hash methods with correct values', async () => {
    const sut = makeSut()
    const hashSpy = jest.spyOn(bcrypt, 'hash')
    await sut.hash('valid_password')
    expect(hashSpy).toBeCalledWith('valid_password', salt)
  })

  it('should return a valied hash on success', async () => {
    const sut = makeSut()
    const hashed = await sut.hash('valid_password')
    expect(hashed).toBe('hashed_password')
  })

  it('should throw when hash method throws', async () => {
    const sut = makeSut()
    jest.spyOn(bcrypt, 'hash').mockImplementationOnce(() => { throw new Error() })
    const promise = sut.hash('valid_password')
    await expect(promise).rejects.toThrow()
  })

  it('should calls compared with correct values', async () => {
    const sut = makeSut()
    const hashSpy = jest.spyOn(bcrypt, 'compare')
    await sut.compare('valid_password', 'any_hashed')
    expect(hashSpy).toBeCalledWith('valid_password', 'any_hashed')
  })

  it('should return true when compare succeeds', async () => {
    const sut = makeSut()
    const isValid = await sut.compare('valid_password', 'any_hashed')
    expect(isValid).toBe(true)
  })
})
