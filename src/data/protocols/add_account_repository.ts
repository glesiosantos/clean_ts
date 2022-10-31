import { AccountModel, AddAccountModel } from '../usecase/add-account/db_add_account_protocols'

export interface AddAccountRepository {
  add(account: AddAccountModel): Promise<AccountModel>
}
