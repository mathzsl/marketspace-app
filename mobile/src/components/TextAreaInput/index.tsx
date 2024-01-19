import { forwardRef, useState } from 'react'

import { TextInput, TextInputProps } from 'react-native'
import { Container, Content, ErrorMessage, TextArea } from './styles'

type TextAreaInputProps = TextInputProps & {
  errorMessage?: string
}

const TextAreaInput = forwardRef<TextInput, TextAreaInputProps>(
  ({ errorMessage, ...rest }, ref) => {
    const [isFocused, setIsFocused] = useState(false)

    return (
      <Container>
        <Content isFocused={isFocused}>
          <TextArea
            ref={ref}
            multiline
            onBlur={() => setIsFocused(false)}
            onFocus={() => setIsFocused(true)}
            {...rest}
          />
        </Content>

        {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
      </Container>
    )
  },
)

TextAreaInput.displayName = 'TextAreaInput'

export { TextAreaInput }
