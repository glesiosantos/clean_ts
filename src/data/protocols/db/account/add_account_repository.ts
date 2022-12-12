import { AccountModel, AddAccountModel } from '../../../usecase/add-account/db_add_account_protocols'

export interface AddAccountRepository {
  add (accountData: AddAccountModel): Promise<AccountModel>
}
