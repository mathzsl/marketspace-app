import { useEffect, useState } from 'react'

import { Container } from './styles'
import { useTheme } from 'styled-components/native'

import DropDownPicker from 'react-native-dropdown-picker'

type PickerProps = {
  options: { label: string; value: string }[]
  onValueChange?: (value: string) => void
}

export function Picker({ options, onValueChange }: PickerProps) {
  const [open, setOpen] = useState(false)
  const [value, setValue] = useState('all')

  const { colors, fonts } = useTheme()

  useEffect(() => {
    if (onValueChange) {
      onValueChange(value)
    }
  }, [value])

  return (
    <Container>
      <DropDownPicker
        style={{
          borderWidth: 1,
          borderColor: open ? colors.gray_500 : colors.gray_300,
          backgroundColor: 'transparent',
        }}
        open={open}
        value={value}
        items={options}
        setOpen={setOpen}
        setValue={setValue}
        showTickIcon={false}
        listItemLabelStyle={{
          color: colors.gray_600,
          fontFamily: fonts.body,
        }}
        selectedItemLabelStyle={{ fontFamily: fonts.heading }}
        dropDownContainerStyle={{
          borderWidth: 0,
          marginTop: 4,
          borderRadius: 6,
        }}
        placeholder="Todos"
      />
    </Container>
  )
}
