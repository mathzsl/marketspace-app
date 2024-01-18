import AsyncStorage from '@react-native-async-storage/async-storage'

import { UserDTO } from '@dtos/UserDTO'

import { USER_STORAGE } from './storageConfig'

export async function saveUserToStorage(user: UserDTO) {
  await AsyncStorage.setItem(USER_STORAGE, JSON.stringify(user))
}

export async function getStoredUser() {
  const storage = await AsyncStorage.getItem(USER_STORAGE)
  const user: UserDTO = storage ? JSON.parse(storage) : {}

  return user
}

export async function removeUserFromStorage() {
  await AsyncStorage.removeItem(USER_STORAGE)
}
