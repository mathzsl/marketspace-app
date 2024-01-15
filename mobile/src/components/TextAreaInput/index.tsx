import { forwardRef, useState } from 'react'

import { TextInput, TextInputProps } from 'react-native'
import { Container, TextArea } from './styles'

type TextAreaInputProps = TextInputProps

const TextAreaInput = forwardRef<TextInput, TextAreaInputProps>(
  ({ ...rest }, ref) => {
    const [isFocused, setIsFocused] = useState(false)

    return (
      <Container isFocused={isFocused}>
        <TextArea
          ref={ref}
          multiline
          onBlur={() => setIsFocused(false)}
          onFocus={() => setIsFocused(true)}
          {...rest}
        />
      </Container>
    )
  },
)

TextAreaInput.displayName = 'TextAreaInput'

export { TextAreaInput }
