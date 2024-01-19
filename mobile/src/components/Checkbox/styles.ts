import { Text } from '@components/Typography'
import styled from 'styled-components/native'

export const Container = styled.View`
  flex: 1;
  gap: 12px;
`

export const CheckLabel = styled.View`
  height: 24px;

  flex-direction: row;
  align-items: center;
  gap: 8px;
`

export const CheckButton = styled.TouchableOpacity`
  width: 24px;
  height: 24px;
  border-radius: 2px;
  border-width: 2px;
  border-style: solid;

  align-items: center;
  justify-content: center;
`

export const Label = styled(Text).attrs(() => ({
  color: 'gray_600',
}))``

export const ErrorMessage = styled(Text).attrs(() => ({
  size: 'xs',
  color: 'red_300',
}))``
