import jwt from 'jsonwebtoken'
import { JwtAdapter } from './jwt_adapter'

describe('Jwt Adapter', () => {
  it('should calls sign with correct values', async () => {
    const sut = new JwtAdapter('secret')
    const signSpy = jest.spyOn(jwt, 'sign')
    await sut.generate('any_id')
    expect(signSpy).toHaveBeenCalledWith({ id: 'any_id' }, 'secret')
  })
})
