import { useRef } from 'react'

import { Image, ScrollView, TextInput } from 'react-native'

import logoPng from '@assets/logo.png'

import {
  Container,
  Content,
  Footer,
  FormBox,
  Label,
  Subtitle,
  Title,
} from './styles'

import { Input } from '@components/Input'
import { Button } from '@components/Button'

export function SignIn() {
  const passwordInputRef = useRef<TextInput>(null)

  return (
    <Container>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Content>
          <Image
            source={logoPng}
            alt="Marketspace logo"
            style={{ alignSelf: 'center' }}
          />

          <Title>marketspace</Title>
          <Subtitle>Seu espaço de compra e venda</Subtitle>

          <FormBox>
            <Label>Acesse sua conta</Label>

            <Input
              placeholder="E-mail"
              keyboardType="email-address"
              onSubmitEditing={() => passwordInputRef.current?.focus()}
              returnKeyType="next"
            />

            <Input ref={passwordInputRef} placeholder="Senha" isPassword />
          </FormBox>

          <Button title="Entrar" />
        </Content>

        <Footer>
          <Label>Ainda não tem acesso?</Label>
          <Button title="Criar uma conta" variant="primary" />
        </Footer>
      </ScrollView>
    </Container>
  )
}
