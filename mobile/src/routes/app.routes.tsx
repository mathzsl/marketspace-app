import {
  NativeStackNavigationProp,
  createNativeStackNavigator,
} from '@react-navigation/native-stack'

import { TabRoutes } from './tab.routes'
import { CreateAd } from '@screens/CreateAd'
import { AdDetails } from '@screens/AdDetails'
import { MyAdDetails } from '@screens/MyAdDetails'
import { MyAdPreview } from '@screens/MyAdPreview'

type AppRoutesProps = {
  home: undefined
  adDetails: undefined
  myAdDetails: undefined
  myAdPreview: undefined
  createAd: undefined
}

export type AppNavigatorRoutesProps = NativeStackNavigationProp<AppRoutesProps>

const { Navigator, Screen } = createNativeStackNavigator<AppRoutesProps>()

export function AppRoutes() {
  return (
    <Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName="createAd"
    >
      <Screen name="home" component={TabRoutes} />
      <Screen name="adDetails" component={AdDetails} />
      <Screen name="myAdDetails" component={MyAdDetails} />
      <Screen name="myAdPreview" component={MyAdPreview} />
      <Screen name="createAd" component={CreateAd} />
    </Navigator>
  )
}
