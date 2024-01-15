import { Text } from '@components/Typography'
import styled from 'styled-components/native'

export const Container = styled.View`
  flex: 1;
  padding: 0 24px;
  background-color: ${({ theme }) => theme.colors.gray_200};
`
export const Label = styled(Text).attrs(() => ({
  size: 'sm',
  color: 'gray_500',
}))`
  margin-bottom: 12px;
`
