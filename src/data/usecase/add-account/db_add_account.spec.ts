import { Encrypter } from '../../protocols/encrypter'
import { DbAddAccount } from './db_add_account'

describe('DBAddAccount UseCase', () => {
  it('should calls Encrypt with correct value', async () => {
    class EncryptStub implements Encrypter {
      async encrypt(value: string): Promise<string> {
        return new Promise(resolve => resolve('hashed_password'))
      }
    }

    const encryptStub = new EncryptStub()
    const sut = new DbAddAccount(encryptStub)
    const encryptSpy = jest.spyOn(encryptStub, 'encrypt')
    const accountData = {
      name: 'valid_name',
      email: 'valid_email@mail.com',
      password: 'valid_password'
    }
    await sut.add(accountData)
    expect(encryptSpy).toHaveBeenCalledWith(accountData.password)
  })
})
