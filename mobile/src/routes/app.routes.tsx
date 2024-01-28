import {
  NativeStackNavigationProp,
  createNativeStackNavigator,
} from '@react-navigation/native-stack'

import { TabRoutes } from './tab.routes'

import { EditAd } from '@screens/EditAd'
import { CreateAd } from '@screens/CreateAd'
import { AdDetails } from '@screens/AdDetails'
import { EditNewAd } from '@screens/EditNewAd'
import { AdPreview } from '@screens/AdPreview'
import { MyAdDetails } from '@screens/MyAdDetails'
import { NewAdPreview } from '@screens/NewAdPreview'

import { ProductDTO } from '@dtos/ProductDTO'
import { ProductFormDTO } from '@dtos/ProductFormDTO'

type AppRoutesProps = {
  home: undefined
  adDetails: {
    productId: string
  }
  myAdDetails: {
    productId: string
  }
  newAdPreview: {
    product: ProductFormDTO
  }
  createAd: undefined
  editNewAd: {
    product: ProductFormDTO
  }
  editAd: {
    product: ProductDTO
  }
  adPreview: {
    productId: string
    product: ProductFormDTO
    allProductImages: string[]
    listOfRemovedProductImages: string[]
  }
}

export type AppNavigatorRoutesProps = NativeStackNavigationProp<AppRoutesProps>

const { Navigator, Screen } = createNativeStackNavigator<AppRoutesProps>()

export function AppRoutes() {
  return (
    <Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Screen name="home" component={TabRoutes} />
      <Screen name="adDetails" component={AdDetails} />
      <Screen name="myAdDetails" component={MyAdDetails} />
      <Screen name="newAdPreview" component={NewAdPreview} />
      <Screen name="createAd" component={CreateAd} />
      <Screen name="editNewAd" component={EditNewAd} />
      <Screen name="editAd" component={EditAd} />
      <Screen name="adPreview" component={AdPreview} />
    </Navigator>
  )
}
