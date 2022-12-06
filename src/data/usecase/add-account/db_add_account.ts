import { AccountModel, AddAccount, AddAccountModel, AddAccountRepository, Hasher } from './db_add_account_protocols'

export class DbAddAccount implements AddAccount {
  constructor(private readonly hasher: Hasher,
    private readonly addAccountRepository: AddAccountRepository) { }

  async add (account: AddAccountModel): Promise<AccountModel> {
    const passwordHashed = await this.hasher.hash(account.password)
    const result = await this.addAccountRepository.add(Object.assign({}, account, { password: passwordHashed }))
    return result
  }
}
