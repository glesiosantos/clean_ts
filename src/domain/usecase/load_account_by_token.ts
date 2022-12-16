import { AccountModel } from '../models/account_model'

export interface LoadAccountByToken {
  load: (accountToken: string, role?: string) => Promise<AccountModel | null>
}
