import { ImageProps } from 'react-native'

import { useTheme } from 'styled-components/native'

import {
  AvatarImg,
  Container,
  IconBox,
  SizeProps,
  VariantProps,
} from './styles'

type AvatarProps = ImageProps & {
  variant?: VariantProps
  size?: SizeProps
}

export function Avatar({
  size = 'lg',
  variant = 'default',
  ...rest
}: AvatarProps) {
  const { colors } = useTheme()

  return (
    <Container size={size} variant={variant}>
      <AvatarImg {...rest} />
    </Container>
  )
}
