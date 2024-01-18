import { NavigationContainer } from '@react-navigation/native'

import Toast from 'react-native-toast-message'

import { AppRoutes } from './app.routes'
import { AuthRoutes } from './auth.routes'

export function Routes() {
  return (
    <NavigationContainer>
      <AuthRoutes />

      <Toast />
    </NavigationContainer>
  )
}
