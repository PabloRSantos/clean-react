import { GetStorage, SetStorage } from '@/data/protocols/cache'

export class LocalStorageAdapter implements SetStorage, GetStorage {
  get (key: string): any {
    const data = localStorage.getItem(key)

    return JSON.parse(data)
  }

  set (key: string, value: any): void {
    if (value) {
      localStorage.setItem(key, JSON.stringify(value))
    } else {
      localStorage.removeItem(key)
    }
  }
}
