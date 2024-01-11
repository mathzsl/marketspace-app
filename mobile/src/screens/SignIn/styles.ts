import { Text } from '@components/Typography'
import styled from 'styled-components/native'

export const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.gray_100};
`

export const Content = styled.View`
  flex: 1;
  padding: 65px 48px 68px;
  border-bottom-left-radius: 24px;
  border-bottom-right-radius: 24px;
  background-color: ${({ theme }) => theme.colors.gray_200};
`

export const Title = styled(Text).attrs(() => ({
  font: 'heading',
  size: 'xxxl',
}))`
  text-align: center;
  margin-top: 18px;
`

export const Subtitle = styled(Text).attrs(() => ({
  font: 'light',
  size: 'sm',
  color: 'gray_500',
}))`
  text-align: center;
`

export const FormBox = styled.View`
  width: 100%;
  margin-top: 76px;
  margin-bottom: 32px;

  gap: 16px;
`

export const Footer = styled.View`
  width: 100%;
  padding: 56px 48px;

  gap: 16px;
`

export const Label = styled(Text).attrs(() => ({
  font: 'body',
  size: 'sm',
  color: 'gray_600',
}))`
  text-align: center;
`
