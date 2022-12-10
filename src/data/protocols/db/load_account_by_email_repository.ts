import { AccountModel } from '../../usecase/add-account/db_add_account_protocols'

export interface LoadAccountByEmailRepository {
  loadByEmail (email: string): Promise<AccountModel | null>
}
