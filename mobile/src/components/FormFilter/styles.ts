import { Text } from '@components/Typography'
import styled from 'styled-components/native'

export const Container = styled.View`
  flex: 1;
`

export const Label = styled(Text).attrs(() => ({
  font: 'heading',
  size: 'sm',
  color: 'gray_600',
}))``

export const Box = styled.View`
  margin-top: 24px;

  gap: 12px;
`

export const TagInputBox = styled.View`
  flex-direction: row;
  align-items: center;
  gap: 8px;
`

export const Footer = styled.View`
  margin-top: 24px;

  flex-direction: row;
  align-items: center;
  gap: 12px;
`
