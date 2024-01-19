import { StatusBar } from 'expo-status-bar'

import { ThemeProvider } from 'styled-components/native'
import theme from './src/theme'

import { AuthContextProvider } from '@contexts/AuthContext'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { GestureHandlerRootView } from 'react-native-gesture-handler'

import { PortalProvider } from '@gorhom/portal'

import { Routes } from './src/routes'

import {
  useFonts,
  Karla_300Light,
  Karla_400Regular,
  Karla_700Bold,
} from '@expo-google-fonts/karla'

import { Loading } from '@components/Loading'

export default function App() {
  const [fontsLoaded] = useFonts({
    Karla_300Light,
    Karla_400Regular,
    Karla_700Bold,
  })

  return (
    <ThemeProvider theme={theme}>
      <StatusBar style="dark" translucent backgroundColor="transparent" />
      <SafeAreaProvider
        style={{ flex: 1, backgroundColor: theme.colors.gray_100 }}
      >
        <GestureHandlerRootView style={{ flex: 1 }}>
          <PortalProvider>
            <AuthContextProvider>
              {fontsLoaded ? <Routes /> : <Loading />}
            </AuthContextProvider>
          </PortalProvider>
        </GestureHandlerRootView>
      </SafeAreaProvider>
    </ThemeProvider>
  )
}
