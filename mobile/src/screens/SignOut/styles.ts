import styled from 'styled-components/native'

export const Container = styled.View`
  flex: 1;
  padding: 0 24px;
  background-color: ${({ theme }) => theme.colors.gray_200};

  justify-content: center;
  align-items: center;
  gap: 50px;
`
