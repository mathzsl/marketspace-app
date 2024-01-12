import styled, { css } from 'styled-components/native'

export type SizeProps = 'sm' | 'md' | 'lg'
export type VariantProps = 'default' | 'primary'

type StyledProps = {
  size: SizeProps
  variant: VariantProps
}

export const Container = styled.View<StyledProps>`
  ${({ size }) =>
    size === 'sm' &&
    css`
      width: 24px;
      height: 24px;
      border-radius: 9999px;
      border-width: 1px;
    `}

  ${({ size }) =>
    size === 'md' &&
    css`
      width: 45px;
      height: 45px;
      border-radius: 9999px;
      border-width: 2px;
    `}

  ${({ size }) =>
    size === 'lg' &&
    css`
      width: 85px;
      height: 85px;
      border-radius: 9999px;
      border-width: 3px;
    `}

    border-color: ${({ theme }) => theme.colors.blue_300};

  ${({ variant }) =>
    variant === 'primary' &&
    css`
      border-color: ${({ theme }) => theme.colors.gray_100};
    `}
`

export const AvatarImg = styled.Image`
  width: 100%;
  height: 100%;
  border-radius: 9999px;
`

export const IconBox = styled.View`
  width: 100%;
  height: 100%;
  border-radius: 9999px;
  background-color: ${({ theme }) => theme.colors.gray_300};

  justify-content: center;
  align-items: center;
`
