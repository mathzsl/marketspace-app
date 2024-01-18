import { NavigationContainer } from '@react-navigation/native'

import Toast from 'react-native-toast-message'

import { AppRoutes } from './app.routes'
import { AuthRoutes } from './auth.routes'
import { useAuth } from '@hooks/useAuth'

import { Loading } from '@components/Loading'

export function Routes() {
  const { user, isLoadingUserStorageData } = useAuth()

  if (isLoadingUserStorageData) {
    return <Loading />
  }

  return (
    <NavigationContainer>
      {user.id ? <AppRoutes /> : <AuthRoutes />}
      <Toast />
    </NavigationContainer>
  )
}
