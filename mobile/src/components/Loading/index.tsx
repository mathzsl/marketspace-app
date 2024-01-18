import { useTheme } from 'styled-components/native'
import { Container, Spinner } from './styles'

export function Loading() {
  const { colors } = useTheme()

  return (
    <Container>
      <Spinner color={colors.blue_300} />
    </Container>
  )
}
