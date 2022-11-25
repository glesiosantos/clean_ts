import { AccountModel } from '../../usecase/add-account/db_add_account_protocols'

export interface LoadAccountByEmailRepository {
  load(email: string): Promise<AccountModel>
}
