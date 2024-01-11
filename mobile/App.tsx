import { StatusBar } from 'expo-status-bar'
import { ActivityIndicator, StyleSheet, View } from 'react-native'

import { ThemeProvider } from 'styled-components/native'
import theme from './src/theme'

import { Text } from '@components/Typography'

import {
  useFonts,
  Karla_300Light,
  Karla_400Regular,
  Karla_700Bold,
} from '@expo-google-fonts/karla'

export default function App() {
  const [fontsLoaded] = useFonts({
    Karla_300Light,
    Karla_400Regular,
    Karla_700Bold,
  })

  return (
    <View style={styles.container}>
      <ThemeProvider theme={theme}>
        <StatusBar style="auto" />
        {fontsLoaded ? <Text>Funcionou</Text> : <ActivityIndicator />}
      </ThemeProvider>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
})
