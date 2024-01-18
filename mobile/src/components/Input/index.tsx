import { forwardRef, useState } from 'react'

import { TextInput, TextInputProps, TouchableOpacity, View } from 'react-native'
import {
  Container,
  ErrorMessage,
  Prefix,
  TextInput as StyledTextInput,
} from './styles'

import { useTheme } from 'styled-components/native'

import { Eye, EyeClosed } from 'phosphor-react-native'

type InputProps = TextInputProps & {
  prefix?: string
  errorMessage?: string | null
}

const Input = forwardRef<TextInput, InputProps>(
  ({ prefix, errorMessage, secureTextEntry, ...rest }, ref) => {
    const [passwordIsVisible, setPasswordIsVisible] = useState(false)
    const [isFocused, setIsFocused] = useState(false)

    const { colors } = useTheme()

    function handleToggleVisiblePassword() {
      setPasswordIsVisible((prevState) => !prevState)
    }

    return (
      <View style={{ gap: 2 }}>
        <Container isFocused={isFocused}>
          {prefix && <Prefix>{prefix}</Prefix>}

          <StyledTextInput
            ref={ref}
            secureTextEntry={
              secureTextEntry ? !passwordIsVisible : passwordIsVisible
            }
            onBlur={() => setIsFocused(false)}
            onFocus={() => setIsFocused(true)}
            {...rest}
          />

          {secureTextEntry && (
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={handleToggleVisiblePassword}
            >
              {!passwordIsVisible ? (
                <Eye size={20} color={colors.gray_500} />
              ) : (
                <EyeClosed size={20} color={colors.gray_500} />
              )}
            </TouchableOpacity>
          )}
        </Container>

        {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
      </View>
    )
  },
)

Input.displayName = 'Input'

export { Input }
