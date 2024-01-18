import styled from 'styled-components/native'

export const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.gray_200};

  align-items: center;
  justify-content: center;
`
export const Spinner = styled.ActivityIndicator``
