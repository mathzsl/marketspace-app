import AsyncStorage from '@react-native-async-storage/async-storage'

import { AUTH_TOKEN_STORAGE } from '@storage/storageConfig'

export async function saveTokenToStorage(token: string) {
  await AsyncStorage.setItem(AUTH_TOKEN_STORAGE, token)
}

export async function getStoredAuthToken() {
  const storage = await AsyncStorage.getItem(AUTH_TOKEN_STORAGE)
  const token = storage || ''

  return token
}

export function removeTokenFromStorage() {
  return AsyncStorage.removeItem(AUTH_TOKEN_STORAGE)
}
