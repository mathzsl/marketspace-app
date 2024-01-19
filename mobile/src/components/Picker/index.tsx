import { useState } from 'react'

import { Container } from './styles'
import { useTheme } from 'styled-components/native'

import DropDownPicker from 'react-native-dropdown-picker'

export function Picker() {
  const [open, setOpen] = useState(false)
  const [value, setValue] = useState(null)
  const [items, setItems] = useState([
    { label: 'Todos', value: 'apple' },
    { label: 'Ativos', value: 'banana' },
    { label: 'Inativos', value: 'pear' },
  ])

  const { colors, fonts } = useTheme()

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
        items={items}
        setOpen={setOpen}
        setValue={setValue}
        setItems={setItems}
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
