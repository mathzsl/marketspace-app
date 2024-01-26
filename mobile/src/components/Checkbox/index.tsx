import { useEffect, useState } from 'react'

import { useTheme } from 'styled-components/native'
import {
  CheckButton,
  CheckLabel,
  Container,
  ErrorMessage,
  Label,
} from './styles'

import { Check } from 'phosphor-react-native'

type ValueProps = {
  key: string
  name: string
}

type CheckBoxProps = {
  options: ValueProps[]
  value?: ValueProps[]
  errorMessage?: string
  onChange?: (value: ValueProps[]) => void
}

export function Checkbox({
  options,
  value,
  errorMessage,
  onChange,
}: CheckBoxProps) {
  const { colors } = useTheme()

  const [selected, setSelected] = useState<ValueProps[]>(value ?? [])
  const checked = selected.map((item) => item.key)

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

  useEffect(() => {
    if (!value) {
      setSelected([])
    }
  }, [value])

  return (
    <Container>
      {options.map((option) => (
        <CheckLabel key={option.key}>
          <CheckButton
            activeOpacity={0.7}
            onPress={() => checkToggle(option)}
            style={{
              backgroundColor: checked.includes(option.key)
                ? colors.blue_300
                : 'transparent',
              borderColor: checked.includes(option.key)
                ? colors.blue_300
                : colors.gray_400,
            }}
          >
            {checked.includes(option.key) && (
              <Check size={16} color={colors.white} weight="bold" />
            )}
          </CheckButton>
          <Label>{option.name}</Label>
        </CheckLabel>
      ))}

      {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
    </Container>
  )
}
