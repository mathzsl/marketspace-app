import { ViewProps } from 'react-native'

import { useTheme } from 'styled-components/native'
import {
  AvatarImg,
  Container,
  IconBox,
  SizeProps,
  VariantProps,
} from './styles'

import { User } from 'phosphor-react-native'

type AvatarProps = ViewProps & {
  variant?: VariantProps
  size?: SizeProps
  source?: string
}

export function Avatar({
  size = 'lg',
  variant = 'default',
  source,
  ...rest
}: AvatarProps) {
  const { colors } = useTheme()

  return (
    <Container size={size} variant={variant} {...rest}>
      {!source ? (
        <IconBox>
          <User size={'60%'} weight="bold" color={colors.gray_400} />
        </IconBox>
      ) : (
        <AvatarImg source={{ uri: source }} alt="Imagem do usuário" />
      )}
    </Container>
  )
}
