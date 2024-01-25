import { TextInputProps, TouchableOpacity } from 'react-native'

import { useTheme } from 'styled-components/native'
import { ButtonBox, Container, Line, TextInput } from './styles'

import { MagnifyingGlass, Sliders } from 'phosphor-react-native'

type SearchInputProps = TextInputProps & {
  onPressSearch: () => void
  onPressFilter: () => void
}

export function SearchInput({
  onPressSearch,
  onPressFilter,
  ...rest
}: SearchInputProps) {
  const { colors } = useTheme()

  return (
    <Container>
      <TextInput
        onSubmitEditing={onPressSearch}
        returnKeyType="search"
        {...rest}
      />

      <ButtonBox>
        <TouchableOpacity activeOpacity={0.7} onPress={onPressSearch}>
          <MagnifyingGlass size={20} color={colors.gray_600} weight="bold" />
        </TouchableOpacity>

        <Line />

        <TouchableOpacity activeOpacity={0.7} onPress={onPressFilter}>
          <Sliders size={20} color={colors.gray_600} weight="bold" />
        </TouchableOpacity>
      </ButtonBox>
    </Container>
  )
}
