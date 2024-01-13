import { Label, Container, XButton } from './styles'
import { useTheme } from 'styled-components/native'

import { X } from 'phosphor-react-native'

type TagInputProps = {
  label: string
  isActive: boolean
  onChange: () => void
  onRemove: () => void
}

export function TagInput({
  label,
  isActive = false,
  onChange,
  onRemove,
  ...rest
}: TagInputProps) {
  const { colors } = useTheme()

  return (
    <Container
      activeOpacity={0.7}
      isActive={isActive}
      onPress={onChange}
      {...rest}
    >
      <Label color={isActive ? 'white' : 'gray_500'}>{label}</Label>

      {isActive && (
        <XButton activeOpacity={0.7} onPress={onRemove}>
          <X size={12} color={colors.blue_300} weight="bold" />
        </XButton>
      )}
    </Container>
  )
}
