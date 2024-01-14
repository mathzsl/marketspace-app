import { Container } from './styles'

import { Text } from '@components/Typography'

import { useSafeAreaInsets } from 'react-native-safe-area-context'

type PreviewHeaderProps = {
  title: string
  subtitle: string
}

export function PreviewHeader({ title, subtitle }: PreviewHeaderProps) {
  const insets = useSafeAreaInsets()
  const paddingTop = insets.top + 20

  return (
    <Container style={{ paddingTop }}>
      <Text font="heading" color="gray_100">
        {title}
      </Text>
      <Text color="gray_100" size="sm">
        {subtitle}
      </Text>
    </Container>
  )
}
