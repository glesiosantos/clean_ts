import jwt from 'jsonwebtoken'
import { JwtAdapter } from './jwt_adapter'

jest.mock('jsonwebtoken', () => ({
  async sign(): Promise<string> { return new Promise(resolve => resolve('any_token')) }
}))

describe('Jwt Adapter', () => {
  it('should calls sign with correct values', async () => {
    const sut = new JwtAdapter('secret')
    const signSpy = jest.spyOn(jwt, 'sign')
    await sut.generate('any_id')
    expect(signSpy).toHaveBeenCalledWith({ id: 'any_id' }, 'secret')
  })

  it('should return a token on sign success', async () => {
    const sut = new JwtAdapter('secret')
    const accessToken = await sut.generate('any_id')
    expect(accessToken).toBe('any_token')
  })

  it('should throws when sign throws', async () => {
    const sut = new JwtAdapter('secret')
    jest.spyOn(jwt, 'sign').mockImplementationOnce(() => { throw new Error() })
    const promise = sut.generate('any_id')
    await expect(promise).rejects.toThrow()
  })
})
