import { useState } from 'react'

import { useTheme } from 'styled-components/native'
import {
  Container,
  Content,
  ErrorMessage,
  Inner,
  LabelContainer,
  RadioButton,
} from './styles'

import { Text } from '@components/Typography'

type ValueProps = {
  value: string
  name: string
}

type RadioInputProps = {
  options: ValueProps[]
  value?: string
  errorMessage?: string
  onChange: (value: string) => void
}

export function Radio({
  options,
  value,
  errorMessage,
  onChange,
}: RadioInputProps) {
  const [selected, setSelected] = useState(value ?? '')

  const { colors } = useTheme()

  function onValueChange(value: ValueProps) {
    setSelected(value.value)
    onChange(value.value)
  }

  return (
    <Container>
      <Content>
        {options.map((option) => (
          <LabelContainer key={option.value}>
            <RadioButton
              activeOpacity={0.7}
              style={{
                borderColor:
                  option.value === selected ? colors.blue_300 : colors.gray_400,
              }}
              onPress={() => onValueChange(option)}
            >
              {selected === option.value && <Inner />}
            </RadioButton>
            <Text>{option.name}</Text>
          </LabelContainer>
        ))}
      </Content>
      {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
    </Container>
  )
}
