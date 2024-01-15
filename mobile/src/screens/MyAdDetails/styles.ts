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
  gap: 8px;
`
