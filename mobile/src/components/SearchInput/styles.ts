import styled, { css } from 'styled-components/native'

export const Container = styled.View`
  width: 100%;
  max-height: 45px;
  min-height: 45px;
  padding: 12px 16px;
  border-radius: 6px;
  border-width: 1px;
  border-style: solid;
  border-color: transparent;
  background-color: ${({ theme }) => theme.colors.gray_100};

  flex-direction: row;
  align-items: center;
  gap: 12px;
`
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

export const ButtonBox = styled.View`
  flex-direction: row;
  align-items: center;
  gap: 12px;
`

export const Line = styled.View`
  width: 1px;
  height: 18px;
  border: 1px solid ${({ theme }) => theme.colors.gray_300};
  background-color: ${({ theme }) => theme.colors.gray_300};
`
