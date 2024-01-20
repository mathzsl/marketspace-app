import { Container, InfoBox, Message, UserName } from './styles'

import { Plus } from 'phosphor-react-native'

import { Avatar } from '@components/Avatar'
import { Button } from '@components/Button'

import { useNavigation } from '@react-navigation/native'
import { AppNavigatorRoutesProps } from '@routes/app.routes'

import { useAuth } from '@hooks/useAuth'
import { api } from '@services/api'

export function HomeHeader() {
  const navigation = useNavigation<AppNavigatorRoutesProps>()

  const { user } = useAuth()

  function handleGoToCreateAd() {
    navigation.navigate('createAd')
  }

  return (
    <Container>
      <Avatar
        size="md"
        source={{ uri: `${api.defaults.baseURL}/images/${user.avatar}` }}
      />

      <InfoBox>
        <Message>Boas vindas,</Message>
        <UserName>{user.name}!</UserName>
      </InfoBox>

      <Button
        variant="secondary"
        title="Criar anúncio"
        icon={Plus}
        onPress={handleGoToCreateAd}
        style={{ width: 140 }}
      />
    </Container>
  )
}
