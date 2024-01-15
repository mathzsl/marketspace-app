import styled from 'styled-components/native'

export const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.gray_200};
`

export const Content = styled.View`
  flex: 1;
  padding: 24px 24px 0;
`

export const InfoBox = styled.View`
  margin-bottom: 20px;

  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
`
