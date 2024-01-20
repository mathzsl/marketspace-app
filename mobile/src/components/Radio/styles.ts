import { Text } from '@components/Typography'
import styled from 'styled-components/native'

export const Container = styled.View`
  flex: 1;
  width: 100%;
  gap: 2px;
`

export const Content = styled.View`
  flex: 1;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
`

export const LabelContainer = styled.View`
  flex: 1;
  width: 100%;

  flex-direction: row;
  align-items: center;
  gap: 8px;
`
export const RadioButton = styled.TouchableOpacity`
  width: 20px;
  height: 20px;
  border-radius: 999px;
  border-width: 1.5px;
  border-style: solid;

  align-items: center;
  justify-content: center;
`

export const Inner = styled.View`
  width: 12px;
  height: 12px;
  border-radius: 999px;
  background-color: ${({ theme }) => theme.colors.blue_300};
`

export const ErrorMessage = styled(Text).attrs(() => ({
  size: 'xs',
  color: 'red_300',
}))``
