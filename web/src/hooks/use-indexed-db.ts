import { openDB } from 'idb'

export default function useIndexedDb<T>(DB_NAME: string, STORE_NAME: string) {
  const dbPromise = openDB(DB_NAME, 1, {
    upgrade(db) {
      db.createObjectStore(STORE_NAME)
    }
  })

  const put = async (key: string | number, value: T) => {
    const db = await dbPromise

    db.put(STORE_NAME, value, key)
  }

  const get = async (key: string | number): Promise<T> => {
    const db = await dbPromise

    return db.get(STORE_NAME, key)
  }

  const getAll = async (): Promise<T[]> => {
    const db = await dbPromise

    return db.getAll(STORE_NAME)
  }

  return { put, get, getAll }
}
