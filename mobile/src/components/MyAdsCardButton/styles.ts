import { Text } from '@components/Typography'
import { TouchableOpacity } from 'react-native'
import styled from 'styled-components/native'

export const Container = styled(TouchableOpacity)`
  width: 100%;
  padding: 12px 16px;
  border-radius: 6px;
  background-color: rgba(100, 122, 199, 0.1);

  flex-direction: row;
  align-items: center;
  gap: 16px;
`

export const InfoBox = styled.View`
  flex: 1;
  gap: 2px;
`

export const NumberOfAds = styled(Text).attrs(() => ({
  size: 'lg',
  font: 'heading',
  color: 'gray_600',
  numberOfLines: 2,
}))``

export const Label = styled(Text).attrs(() => ({
  size: 'xs',
  color: 'gray_600',
  numberOfLines: 1,
}))``

export const HStack = styled.View`
  margin-right: 4px;

  flex-direction: row;
  align-items: center;
  gap: 4px;
`

export const MyAds = styled(Text).attrs(() => ({
  font: 'heading',
  color: 'blue_700',
  size: 'xs',
}))`
  align-items: baseline;
`
