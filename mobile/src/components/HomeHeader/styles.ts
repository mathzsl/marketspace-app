import { Text } from '@components/Typography'
import styled from 'styled-components/native'

export const Container = styled.View`
  width: 100%;
  padding: 20px 0;
  flex-direction: row;
  align-items: center;
  gap: 8px;
`

export const InfoBox = styled.View`
  flex: 1;
  margin-left: 2px;
  gap: 2px;
`

export const Message = styled(Text).attrs(() => ({
  numberOfLines: 1,
}))``

export const UserName = styled(Text).attrs(() => ({
  font: 'heading',
  numberOfLines: 1,
}))``
