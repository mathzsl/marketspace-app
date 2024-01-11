import { TextProps as NativeTextProps } from 'react-native'
import theme from 'src/theme'
import styled, { css } from 'styled-components/native'

type TextProps = NativeTextProps & {
  font?: keyof typeof theme.fonts
  color?: keyof typeof theme.colors
  size?: keyof typeof theme.fontSizes
}

export const Text = styled.Text<TextProps>`
  ${({ theme, size, color, font }) => css`
    font-family: ${theme.fonts[font ?? 'body']};
    font-size: ${theme.fontSizes[size ?? 'md']}px;
    color: ${theme.colors[color ?? 'gray_700']};
  `}
`
