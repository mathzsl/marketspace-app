import AsyncStorage from '@react-native-async-storage/async-storage'

import { AUTH_TOKEN_STORAGE } from '@storage/storageConfig'

type AuthTokenStorageProps = {
  token: string
  refresh_token: string
}

export async function saveTokenToStorage({
  token,
  refresh_token,
}: AuthTokenStorageProps) {
  await AsyncStorage.setItem(
    AUTH_TOKEN_STORAGE,
    JSON.stringify({ token, refresh_token }),
  )
}

export async function getStoredAuthToken() {
  const storage = await AsyncStorage.getItem(AUTH_TOKEN_STORAGE)
  const { token, refresh_token }: AuthTokenStorageProps = storage
    ? JSON.parse(storage)
    : {}

  return { token, refresh_token }
}

export function removeTokenFromStorage() {
  return AsyncStorage.removeItem(AUTH_TOKEN_STORAGE)
}
