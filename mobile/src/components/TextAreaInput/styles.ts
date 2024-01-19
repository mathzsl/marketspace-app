import { Text } from '@components/Typography'
import styled, { css } from 'styled-components/native'

type StyledProps = {
  isFocused: boolean
}

export const Container = styled.View`
  gap: 2px;
`

export const Content = styled.View<StyledProps>`
  width: 100%;
  max-height: 160px;
  min-height: 160px;
  padding: 12px 16px;
  border-radius: 6px;
  border-width: 1px;
  border-style: solid;
  border-color: transparent;
  background-color: ${({ theme }) => theme.colors.gray_100};

  ${({ theme, isFocused }) =>
    isFocused &&
    css`
      border-color: ${theme.colors.gray_500};
    `}
`
export const TextArea = styled.TextInput.attrs(({ theme }) => ({
  placeholderTextColor: theme.colors.gray_400,
}))`
  vertical-align: top;

  ${({ theme }) => css`
    font-family: ${theme.fonts.body};
    font-size: ${theme.fontSizes.md}px;
    color: ${theme.colors.gray_600};
  `}
`
export const ErrorMessage = styled(Text).attrs(() => ({
  size: 'xs',
  color: 'red_300',
}))``
