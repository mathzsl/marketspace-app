import { useTheme } from 'styled-components/native'
import { Container, HStack, InfoBox, Label, MyAds, NumberOfAds } from './styles'

import { ArrowRight, Tag } from 'phosphor-react-native'

import { useNavigation } from '@react-navigation/native'
import { TabNavigatorRoutesProps } from '@routes/tab.routes'

type MyAdsCardButtonProps = {
  activeAds: number
}

export function MyAdsCardButton({ activeAds }: MyAdsCardButtonProps) {
  const { colors } = useTheme()

  const navigation = useNavigation<TabNavigatorRoutesProps>()

  function handleGoToMyProducts() {
    navigation.navigate('myAds')
  }

  return (
    <Container activeOpacity={0.7} onPress={handleGoToMyProducts}>
      <Tag size={22} color={colors.blue_700} />

      <InfoBox>
        <NumberOfAds>{activeAds}</NumberOfAds>
        <Label>anúncios ativos</Label>
      </InfoBox>

      <HStack>
        <MyAds>Meus anúncios</MyAds>
        <ArrowRight size={16} color={colors.blue_700} weight="bold" />
      </HStack>
    </Container>
  )
}
