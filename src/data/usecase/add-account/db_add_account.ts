import { AccountModel, AddAccount, AddAccountModel, AddAccountRepository, Hasher, LoadAccountByEmailRepository } from './db_add_account_protocols'

export class DbAddAccount implements AddAccount {
  constructor(private readonly hasher: Hasher,
    private readonly addAccountRepository: AddAccountRepository,
    private readonly loadAccountByEmailRepository: LoadAccountByEmailRepository) { }

  async add (account: AddAccountModel): Promise<AccountModel | null> {
    const passwordHashed = await this.hasher.hash(account.password)
    const loadAccount = await this.loadAccountByEmailRepository.loadByEmail(account.email)
    if (!loadAccount) {
      const result = await this.addAccountRepository.add(Object.assign({}, account, { password: passwordHashed }))
      return result
    }
    return null
  }
}
