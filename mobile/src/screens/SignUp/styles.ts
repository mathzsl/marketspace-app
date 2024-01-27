import { Text } from '@components/Typography'
import styled from 'styled-components/native'

export const Container = styled.View`
  flex: 1;

  background-color: ${({ theme }) => theme.colors.gray_200};
`

export const Content = styled.View`
  padding: 36px 48px 0;
`

export const Title = styled(Text).attrs(() => ({
  font: 'heading',
  size: 'lg',
}))`
  text-align: center;
  margin-top: 12px;
  margin-bottom: 8px;
`

export const FormBox = styled.View`
  margin: 32px 0;

  gap: 16px;
`
export const Footer = styled.View`
  width: 100%;
  padding: 48px 0;

  gap: 16px;
`

export const Label = styled(Text).attrs(() => ({
  font: 'body',
  size: 'sm',
  color: 'gray_600',
}))`
  text-align: center;
`
