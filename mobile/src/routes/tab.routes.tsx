import { Platform } from 'react-native'

import { useTheme } from 'styled-components/native'

import {
  BottomTabNavigationProp,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs'

import { House, SignOut as SignOutPhosphor, Tag } from 'phosphor-react-native'

import { Home } from '@screens/Home'
import { MyAds } from '@screens/MyAds'
import { SignOut } from '@screens/SignOut'

type TabRoutesProps = {
  tabHome: undefined
  myAds: undefined
  signOut: undefined
}

export type TabNavigatorRoutesProps = BottomTabNavigationProp<TabRoutesProps>

const { Navigator, Screen } = createBottomTabNavigator<TabRoutesProps>()

export function TabRoutes() {
  const { colors } = useTheme()

  const size = 24

  return (
    <Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarActiveTintColor: colors.gray_600,
        tabBarInactiveTintColor: colors.gray_400,
        tabBarStyle: {
          backgroundColor: colors.gray_100,
          borderTopWidth: 0,
          height: Platform.OS === 'android' ? 'auto' : 96,
          paddingTop: 32,
          paddingBottom: Platform.OS === 'android' ? 26 : 40,
        },
      }}
    >
      <Screen
        name="tabHome"
        component={Home}
        options={{
          tabBarIcon: ({ color, focused }) => (
            <House
              size={size}
              color={color}
              weight={focused ? 'bold' : 'regular'}
            />
          ),
        }}
      />

      <Screen
        name="myAds"
        component={MyAds}
        options={{
          tabBarIcon: ({ color, focused }) => (
            <Tag
              size={size}
              color={color}
              weight={focused ? 'bold' : 'regular'}
            />
          ),
        }}
      />

      <Screen
        name="signOut"
        component={SignOut}
        options={{
          tabBarIcon: ({ color, focused }) => (
            <SignOutPhosphor
              size={size}
              color="#E07878"
              weight={focused ? 'bold' : 'regular'}
            />
          ),
        }}
      />
    </Navigator>
  )
}
