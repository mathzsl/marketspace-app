import { Text } from '@components/Typography'
import styled from 'styled-components/native'

export const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.gray_200};
`

export const Content = styled.View`
  flex: 1;
  padding: 0 24px;
  margin-top: 14px;
`

export const Message = styled(Text).attrs(() => ({
  size: 'sm',
  color: 'gray_500',
}))`
  margin-bottom: 16px;
`

export const Label = styled(Text).attrs(() => ({
  font: 'heading',
  color: 'gray_600',
}))``

export const Box = styled.View`
  margin-top: 32px;
  gap: 16px;
`

export const Footer = styled.View`
  padding: 20px 24px;
  background-color: ${({ theme }) => theme.colors.gray_100};

  flex-direction: row;
  align-items: center;
  gap: 8px;
`
