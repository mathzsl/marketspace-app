import { ArrowRight, Tag } from 'phosphor-react-native'
import { Container, HStack, InfoBox, Label, MyAds, NumberOfAds } from './styles'
import { useTheme } from 'styled-components/native'
import { TouchableOpacityProps } from 'react-native'

type MyAdsCardButtonProps = TouchableOpacityProps & {
  numberOfAds: number
}

export function MyAdsCardButton({
  numberOfAds,
  ...rest
}: MyAdsCardButtonProps) {
  const { colors } = useTheme()

  return (
    <Container activeOpacity={0.7} {...rest}>
      <Tag size={22} color={colors.blue_700} />

      <InfoBox>
        <NumberOfAds>{numberOfAds}</NumberOfAds>
        <Label>anúncios ativos</Label>
      </InfoBox>

      <HStack>
        <MyAds>Meus anúncios</MyAds>
        <ArrowRight size={16} color={colors.blue_700} weight="bold" />
      </HStack>
    </Container>
  )
}
