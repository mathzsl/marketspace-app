import { Button } from '@components/Button'
import { useAuth } from '@hooks/useAuth'
import { View } from 'react-native'
import { Container } from './styles'
import { Avatar } from '@components/Avatar'
import { api } from '@services/api'

export function SignOut() {
  const { user, signOut } = useAuth()

  return (
    <Container>
      <Avatar
        source={{ uri: `${api.defaults.baseURL}/images/${user.avatar}` }}
      />

      <Button variant="secondary" title="Sair" onPress={signOut} />
    </Container>
  )
}
