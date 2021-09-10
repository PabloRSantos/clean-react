export class RequiredFieldError extends Error {
  constructor () {
    super('Campo obrgatório')
    this.name = 'RequiredFieldError'
  }
}
