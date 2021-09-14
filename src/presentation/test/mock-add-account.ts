import { AccountModel } from '@/domain/models'
import { mockAccountModel } from '@/domain/test'
import { AddAccount, AddAccountParams, AuthenticationParams } from '@/domain/usecases'

export class AddAccountSpy implements AddAccount {
  account = mockAccountModel();
  params: AuthenticationParams;

  async add (params: AddAccountParams): Promise<AccountModel> {
    this.params = params

    return Promise.resolve(this.account)
  }
}