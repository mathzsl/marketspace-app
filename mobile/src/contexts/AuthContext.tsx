import {
  ReactNode,
  createContext,
  useCallback,
  useEffect,
  useState,
} from 'react'

import { UserDTO } from '@dtos/UserDTO'

import { api } from '@services/api'

import {
  getStoredUser,
  removeUserFromStorage,
  saveUserToStorage,
} from '@storage/userStorage'

import {
  getStoredAuthToken,
  removeTokenFromStorage,
  saveTokenToStorage,
} from '@storage/authTokenStorage'

type AuthContextType = {
  user: UserDTO
  isLoadingUserStorageData: boolean
  signIn: (email: string, password: string) => Promise<void>
  signOut: () => Promise<void>
}

export const AuthContext = createContext<AuthContextType>({} as AuthContextType)

type AuthContextProviderProps = {
  children: ReactNode
}

export function AuthContextProvider({ children }: AuthContextProviderProps) {
  const [user, setUser] = useState<UserDTO>({} as UserDTO)
  const [isLoadingUserStorageData, setIsLoadingUserStorageData] = useState(true)

  function userAndTokenUpdate(userData: UserDTO, token: string) {
    api.defaults.headers.common.Authorization = `Bearer ${token}`

    setUser(userData)
  }

  async function saveUserAndTokenToSorage(
    userData: UserDTO,
    token: string,
    refresh_token: string,
  ) {
    try {
      setIsLoadingUserStorageData(true)

      await saveUserToStorage(userData)
      await saveTokenToStorage({ token, refresh_token })
    } catch (error) {
      console.log(error)
      throw error
    } finally {
      setIsLoadingUserStorageData(false)
    }
  }

  async function signIn(email: string, password: string) {
    try {
      const { data } = await api.post('/sessions', {
        email,
        password,
      })

      if (data.user && data.token && data.refresh_token) {
        await saveUserAndTokenToSorage(
          data.user,
          data.token,
          data.refresh_token,
        )

        userAndTokenUpdate(data.user, data.token)
      }
    } catch (error) {
      console.log(error)
      throw error
    } finally {
      setIsLoadingUserStorageData(false)
    }
  }

  const signOut = useCallback(async () => {
    try {
      setIsLoadingUserStorageData(true)
      setUser({} as UserDTO)
      await removeUserFromStorage()
      await removeTokenFromStorage()
    } catch (error) {
      console.log(error)
      throw error
    } finally {
      setIsLoadingUserStorageData(false)
    }
  }, [])

  async function loadUserData() {
    try {
      setIsLoadingUserStorageData(true)

      const loggedInUser = await getStoredUser()
      const { token } = await getStoredAuthToken()

      if (token && loggedInUser) {
        userAndTokenUpdate(loggedInUser, token)
      }
    } catch (error) {
      console.log(error)
      throw error
    } finally {
      setIsLoadingUserStorageData(false)
    }
  }

  useEffect(() => {
    loadUserData()
  }, [])

  useEffect(() => {
    const subscribe = api.registerInterceptTokenManager(signOut)

    return () => {
      subscribe()
    }
  }, [signOut])

  return (
    <AuthContext.Provider
      value={{ user, isLoadingUserStorageData, signIn, signOut }}
    >
      {children}
    </AuthContext.Provider>
  )
}
