import { Text } from '@components/Typography'
import styled from 'styled-components/native'

export const Container = styled.View`
  width: 100%;
  gap: 2px;
`

export const SelectButton = styled.TouchableOpacity`
  width: 100px;
  height: 100px;
  border-radius: 6px;
  background-color: ${({ theme }) => theme.colors.gray_300};

  justify-content: center;
  align-items: center;
`

export const ImageContainer = styled.View`
  width: 100px;
  height: 100px;
  border-radius: 6px;
  overflow: hidden;
`

export const RemoveImage = styled.TouchableOpacity`
  width: 16px;
  height: 16px;
  border-radius: 999px;
  z-index: 1;
  top: 4px;
  right: 4px;
  position: absolute;
  background-color: ${({ theme }) => theme.colors.gray_600};

  justify-content: center;
  align-items: center;
`

export const ErrorMessage = styled(Text).attrs(() => ({
  size: 'xs',
  color: 'red_300',
}))``
