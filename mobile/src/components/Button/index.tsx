import { TouchableOpacityProps } from 'react-native'
import { Container, Spinner, Title, VariantProps } from './styles'

import { IconProps } from 'phosphor-react-native'
import { useTheme } from 'styled-components/native'

type IconButtonProps = (props: IconProps) => JSX.Element

type ButtonProps = TouchableOpacityProps & {
  title: string
  icon?: IconButtonProps
  variant?: VariantProps
  isLoading?: boolean
}

export function Button({
  title,
  icon: Icon,
  variant = 'default',
  isLoading = false,
  ...rest
}: ButtonProps) {
  const { colors } = useTheme()

  return (
    <Container
      variant={variant}
      activeOpacity={0.7}
      disabled={isLoading}
      style={{ opacity: isLoading ? 0.7 : 1 }}
      {...rest}
    >
      {isLoading ? (
        <Spinner variant={variant} size={18} />
      ) : (
        <>
          {Icon && (
            <Icon
              size={16}
              color={variant !== 'primary' ? colors.gray_100 : colors.gray_600}
            />
          )}

          <Title variant={variant}>{title}</Title>
        </>
      )}
    </Container>
  )
}
