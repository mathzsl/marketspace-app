import { TouchableOpacity } from 'react-native'
import styled, { css } from 'styled-components/native'
import { Text } from '@components/Typography'

export type VariantProps = 'default' | 'primary' | 'secondary'

type StyledProps = {
  variant: VariantProps
}

export const Container = styled(TouchableOpacity)<StyledProps>`
  width: 100%;
  min-height: 42px;
  max-height: 42px;
  padding: 6px;
  border-radius: 6px;
  padding: 12px;

  ${({ theme, variant }) =>
    variant === 'default' &&
    css`
      background-color: ${theme.colors.blue_300};
    `}

  ${({ theme, variant }) =>
    variant === 'primary' &&
    css`
      background-color: ${theme.colors.gray_300};
    `}

    ${({ theme, variant }) =>
    variant === 'secondary' &&
    css`
      background-color: ${theme.colors.gray_700};
    `}

  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 8px;
`
export const Title = styled(Text).attrs<StyledProps>(({ variant }) => ({
  font: 'heading',
  size: 'sm',
  color: variant !== 'primary' ? 'gray_100' : 'gray_600',
}))``

export const Spinner = styled.ActivityIndicator.attrs<StyledProps>(
  ({ theme, variant }) => ({
    color:
      variant !== 'primary' ? theme.colors.gray_100 : theme.colors.gray_600,
  }),
)``
