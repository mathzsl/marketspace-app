import { useRef } from 'react'
import { Image, ScrollView, TextInput } from 'react-native'

import { Container, Content, Footer, FormBox, Label, Title } from './styles'

import { Input } from '@components/Input'
import { Button } from '@components/Button'
import { UserPhoto } from '@components/UserPhoto'

import logoPng from '@assets/logo.png'

export function SignUp() {
  const nameInputRef = useRef<TextInput>(null)
  const emailInputRef = useRef<TextInput>(null)
  const phoneNumberInputRef = useRef<TextInput>(null)
  const passwordInputRef = useRef<TextInput>(null)
  const confirmPasswordInputRef = useRef<TextInput>(null)

  return (
    <Container>
      <ScrollView>
        <Content>
          <Image
            source={logoPng}
            alt="Marketspace logo"
            style={{ alignSelf: 'center', width: 60, height: 40 }}
          />

          <Title>Boas vindas!</Title>
          <Label>
            Crie sua conta e use o espaço para comprar itens variados e vender
            seus produtos
          </Label>

          <FormBox>
            <UserPhoto style={{ alignSelf: 'center' }} />

            <Input
              ref={nameInputRef}
              placeholder="Nome"
              onSubmitEditing={() => emailInputRef.current?.focus()}
              returnKeyType="next"
            />

            <Input
              ref={emailInputRef}
              placeholder="E-mail"
              onSubmitEditing={() => phoneNumberInputRef.current?.focus()}
              returnKeyType="next"
            />

            <Input
              ref={phoneNumberInputRef}
              placeholder="Telefone"
              onSubmitEditing={() => passwordInputRef.current?.focus()}
              returnKeyType="next"
            />

            <Input
              ref={passwordInputRef}
              placeholder="Senha"
              isPassword
              onSubmitEditing={() => confirmPasswordInputRef.current?.focus()}
              returnKeyType="next"
            />

            <Input
              ref={confirmPasswordInputRef}
              placeholder="Confirmar senha"
              isPassword
            />
          </FormBox>

          <Button title="Criar" variant="secondary" />

          <Footer>
            <Label>Já tem uma conta?</Label>
            <Button title="Ir para o login" variant="primary" />
          </Footer>
        </Content>
      </ScrollView>
    </Container>
  )
}
