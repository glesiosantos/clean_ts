import { AccountModel, AddAccount, AddAccountModel, AddAccountRepository, Encrypter } from './db_add_account_protocols'

export class DbAddAccount implements AddAccount {
  constructor(private readonly encrypter: Encrypter,
    private readonly addAccountRepository: AddAccountRepository) { }

  async add(account: AddAccountModel): Promise<AccountModel> {
    const passwordHashed = await this.encrypter.encrypt(account.password)
    await this.addAccountRepository.add(Object.assign({}, account, { password: passwordHashed }))
    return null
  }
}
