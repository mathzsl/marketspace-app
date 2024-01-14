import { Text } from '@components/Typography'
import styled, { css } from 'styled-components/native'

type StyledProps = {
  isActive: boolean
}

export const Overlay = styled.View`
  background-color: 'rgba(0, 0, 0, 0.5)';
`

export const Message = styled(Text).attrs(() => ({
  font: 'heading',
  color: 'gray_100',
  size: 'sm',
}))`
  z-index: 1;
  text-transform: uppercase;
  position: absolute;
  top: 50%;
  align-self: center;
`

export const Steps = styled.View`
  width: 100%;
  position: absolute;
  padding: 2px;
  bottom: 0px;

  flex-direction: row;
  align-items: center;
  gap: 4px;
`

export const Step = styled.View<StyledProps>`
  flex: 1;
  min-height: 3px;
  max-height: 3px;
  background-color: ${({ theme }) => theme.colors.gray_100};

  ${({ isActive }) =>
    !isActive &&
    css`
      opacity: 0.5;
    `}
`
