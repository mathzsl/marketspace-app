import { Text } from '@components/Typography'
import styled from 'styled-components/native'

export const Container = styled.View`
  flex: 1;
  padding-bottom: 32px;
`
export const UserInfo = styled.View`
  width: 100%;

  flex-direction: row;
  align-items: center;
  gap: 8px;
`

export const UserName = styled(Text).attrs(() => ({
  size: 'sm',
}))``

export const Tag = styled(Text).attrs(() => ({
  color: 'gray_600',
  font: 'heading',
}))`
  align-self: flex-start;
  font-size: 10px;
  padding: 2px 8px;
  border-radius: 8px;
  background-color: ${({ theme }) => theme.colors.gray_300};
`
export const ProductInfoContent = styled.View`
  flex: 1;
  margin-top: 24px;
`

export const ProductInfoHeader = styled.View`
  width: 100%;
  margin: 8px 0;

  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
`

export const ProductName = styled(Text).attrs(() => ({
  font: 'heading',
  size: 'lg',
}))``

export const ProductPrice = styled(Text).attrs(() => ({
  font: 'heading',
  size: 'sm',
  color: 'blue_300',
}))``

export const Description = styled(Text).attrs(() => ({
  size: 'sm',
  color: 'gray_600',
}))``

export const Label = styled(Text).attrs(() => ({
  font: 'heading',
  size: 'sm',
  color: 'gray_600',
}))`
  margin-top: 24px;
`

export const PaymentBox = styled.View`
  flex: 1;
  margin-top: 8px;

  gap: 4px;
`

export const PaymentBoxLabel = styled.View`
  width: 100%;

  flex-direction: row;
  align-items: center;
  gap: 8px;
`
