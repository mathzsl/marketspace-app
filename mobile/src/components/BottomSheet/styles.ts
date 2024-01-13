import { Text } from '@components/Typography'
import styled from 'styled-components/native'

export const Container = styled.View`
  flex: 1;
  padding: 24px;
`

export const Header = styled.View`
  width: 100%;

  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  gap: 24px;
`

export const Title = styled(Text).attrs(() => ({
  font: 'heading',
  size: 'lg',
}))``
