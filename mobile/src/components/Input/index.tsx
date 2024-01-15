import { forwardRef, useState } from 'react'

import { TextInput, TextInputProps, TouchableOpacity } from 'react-native'
import { Container, Prefix, TextInput as StyledTextInput } from './styles'

import { useTheme } from 'styled-components/native'

import { Eye, EyeClosed } from 'phosphor-react-native'

type InputProps = TextInputProps & {
  prefix?: string
  isPassword?: boolean
  errorMessage?: string
}

const Input = forwardRef<TextInput, InputProps>(
  ({ prefix, isPassword = false, ...rest }, ref) => {
    const [showPassword, setShowPassword] = useState(false)
    const [isFocused, setIsFocused] = useState(false)

    const { colors } = useTheme()

    function onShowPassword() {
      setShowPassword((prevState) => !prevState)
    }

    return (
      <Container isFocused={isFocused}>
        {prefix && <Prefix>{prefix}</Prefix>}

        <StyledTextInput
          ref={ref}
          secureTextEntry={!showPassword}
          onBlur={() => setIsFocused(false)}
          onFocus={() => setIsFocused(true)}
          {...rest}
        />

        {isPassword && (
          <TouchableOpacity activeOpacity={0.7} onPress={onShowPassword}>
            {showPassword ? (
              <EyeClosed size={20} color={colors.gray_500} />
            ) : (
              <Eye size={20} color={colors.gray_500} />
            )}
          </TouchableOpacity>
        )}
      </Container>
    )
  },
)

Input.displayName = 'Input'

export { Input }
