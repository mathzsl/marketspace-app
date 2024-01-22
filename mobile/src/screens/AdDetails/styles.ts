import { Text } from '@components/Typography'
import styled from 'styled-components/native'

export const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.gray_200};
`

export const Content = styled.View`
  padding: 20px 24px 25px;
`

export const Footer = styled.View`
  padding: 20px 24px;
  background-color: ${({ theme }) => theme.colors.gray_100};

  flex-direction: row;
  align-items: center;
  gap: 8px;
`

export const PriceBox = styled.View`
  flex: 1;
`

export const Price = styled(Text).attrs(() => ({
  font: 'heading',
  size: 'sm',
  color: 'blue_700',
}))``
