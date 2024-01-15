import { ReactNode } from 'react'
import { TouchableOpacity, View } from 'react-native'

import { Container, Title } from './styles'
import { useTheme } from 'styled-components/native'

import { useNavigation } from '@react-navigation/native'

import { ArrowLeft, IconContext } from 'phosphor-react-native'

type HeaderProps = {
  title?: string
  goBack?: boolean
  rightButton?: ReactNode
}

export function Header({ title, goBack = false, rightButton }: HeaderProps) {
  const navigation = useNavigation()

  const { colors } = useTheme()

  function handleGoBack() {
    navigation.goBack()
  }

  return (
    <Container>
      <IconContext.Provider
        value={{
          color: colors.gray_700,
          size: 24,
        }}
      >
        <View style={{ width: 24, height: 24, marginTop: 2 }}>
          {goBack && (
            <TouchableOpacity activeOpacity={0.7} onPress={handleGoBack}>
              <ArrowLeft />
            </TouchableOpacity>
          )}
        </View>

        <View style={{ flex: 1 }}>{title && <Title>{title}</Title>}</View>

        <View style={{ width: 24, height: 24, marginTop: 2 }}>
          {rightButton}
        </View>
      </IconContext.Provider>
    </Container>
  )
}
