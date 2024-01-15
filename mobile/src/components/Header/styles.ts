import { Text } from '@components/Typography'
import styled from 'styled-components/native'

export const Container = styled.View`
  width: 100%;
  padding: 20px 24px 12px;

  flex-direction: row;
  align-items: center;
  gap: 12px;
`

export const Title = styled(Text).attrs(() => ({
  font: 'heading',
  size: 'lg',
}))`
  flex: 1;
  text-align: center;
`
