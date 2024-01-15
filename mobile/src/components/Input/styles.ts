import { Text } from '@components/Typography'
import styled, { css } from 'styled-components/native'

type StyledProps = {
  isFocused: boolean
}

export const Container = styled.View<StyledProps>`
  width: 100%;
  max-height: 45px;
  min-height: 45px;
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

  flex-direction: row;
  align-items: center;
  gap: 8px;
`

export const Prefix = styled(Text)``

export const TextInput = styled.TextInput.attrs(({ theme }) => ({
  placeholderTextColor: theme.colors.gray_400,
}))`
  flex: 1;

  ${({ theme }) => css`
    font-family: ${theme.fonts.body};
    font-size: ${theme.fontSizes.md}px;
    color: ${theme.colors.gray_600};
  `}
`
