import { useState } from 'react'

import { useTheme } from 'styled-components/native'
import { CheckButton, CheckLabel, Container, Label } from './styles'

import { Check } from 'phosphor-react-native'

type ValueProps = {
  value: string
  name: string
}

type CheckBoxProps = {
  options: ValueProps[]
  value?: ValueProps[]
  onChange?: (value: ValueProps[]) => void
}

export function Checkbox({ options, value, onChange }: CheckBoxProps) {
  const [selected, setSelected] = useState<ValueProps[]>(value ?? [])
  const checked = selected.map((item) => item.value)

  function checkToggle(option: ValueProps) {
    if (selected.includes(option)) {
      const newValues = selected.filter((item) => {
        return !item.name.includes(option.name)
      })

      if (onChange) {
        onChange(newValues)
      }

      return setSelected(newValues)
    }

    const newValues = [...selected, option]

    if (onChange) {
      onChange(newValues)
    }

    setSelected(newValues)
  }

  const { colors } = useTheme()

  return (
    <Container>
      {options.map((option) => (
        <CheckLabel key={option.value}>
          <CheckButton
            activeOpacity={0.7}
            onPress={() => checkToggle(option)}
            style={{
              backgroundColor: checked.includes(option.value)
                ? colors.blue_300
                : 'transparent',
              borderColor: checked.includes(option.value)
                ? colors.blue_300
                : colors.gray_400,
            }}
          >
            {checked.includes(option.value) && (
              <Check size={16} color={colors.white} weight="bold" />
            )}
          </CheckButton>
          <Label>{option.name}</Label>
        </CheckLabel>
      ))}
    </Container>
  )
}
