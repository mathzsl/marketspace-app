import { Text } from '@components/Typography'
import { TouchableOpacity } from 'react-native'
import styled, { css } from 'styled-components/native'

export type SizeProps = 'sm' | 'md' | 'lg'

type StyledProps = {
  size: SizeProps
}

export const Container = styled(TouchableOpacity)<StyledProps>`
  position: relative;

  ${({ size }) =>
    size === 'lg' &&
    css`
      width: 85px;
      height: 85px;
    `}
`

export const IconBoxWithOutImage = styled.View`
  width: 100%;
  height: 100%;
  border-radius: 9999px;
  border: 3px solid ${({ theme }) => theme.colors.blue_300};
  background-color: ${({ theme }) => theme.colors.gray_300};

  justify-content: center;
  align-items: center;
`

export const IconBox = styled.View`
  width: 40px;
  height: 40px;
  border-radius: 9999px;
  position: absolute;
  right: -5px;
  bottom: -5px;
  background-color: ${({ theme }) => theme.colors.blue_300};

  align-items: center;
  justify-content: center;
`
export const ErrorMessage = styled(Text).attrs(() => ({
  size: 'xs',
  color: 'red_300',
}))``
