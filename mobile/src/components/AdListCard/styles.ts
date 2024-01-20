import { TouchableOpacity } from 'react-native'
import styled from 'styled-components/native'

import { Text } from '@components/Typography'

export const Container = styled(TouchableOpacity)`
  width: 100%;

  gap: 4px;
`

export const Header = styled.View`
  position: absolute;
  top: 4px;
  right: 4px;
  left: 4px;
  z-index: 1;

  flex-direction: row;
  align-items: flex-start;
  justify-content: space-between;
`

export const Tag = styled(Text).attrs(() => ({
  color: 'gray_100',
  font: 'heading',
}))`
  font-size: 10px;
  text-transform: uppercase;
  padding: 2px 6px;
  border-radius: 6px;
  margin-left: auto;
`

export const ProductImage = styled.Image`
  height: 100px;
  width: 100%;

  border-radius: 6px;
`

export const Inactive = styled(Text).attrs(() => ({
  font: 'heading',
  color: 'gray_100',
  numberOfLines: 1,
}))`
  position: absolute;
  top: 82px;
  left: 4px;
  text-transform: uppercase;
  font-size: 11px;
`

export const Title = styled(Text).attrs(() => ({
  size: 'sm',
}))``

export const Price = styled(Text).attrs(() => ({
  size: 'xs',
  font: 'heading',
}))``
