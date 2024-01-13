import { Text } from '@components/Typography'
import { TouchableOpacity } from 'react-native'
import styled, { css } from 'styled-components/native'

type StyledProps = {
  isActive: boolean
}

export const Container = styled(TouchableOpacity)<StyledProps>`
  width: 74px;
  padding: 6px 16px;
  border-radius: 999px;

  background-color: ${({ theme }) => theme.colors.gray_300};

  ${({ isActive, theme }) =>
    isActive &&
    css`
      width: 76px;
      padding-right: 12px;
      background-color: ${theme.colors.blue_300};
    `}

  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 6px;
`

export const Label = styled(Text).attrs(() => ({
  font: 'heading',
  size: 'xs',
}))`
  text-transform: uppercase;
`

export const XButton = styled.TouchableOpacity`
  size: 13px;
  height: 13px;
  border-radius: 999px;
  background-color: ${({ theme }) => theme.colors.gray_200};

  align-items: center;
  justify-content: center;
`
