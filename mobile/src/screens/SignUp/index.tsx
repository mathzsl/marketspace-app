import { useRef } from 'react'
import { Image, ScrollView, TextInput } from 'react-native'

import { Container, Content, Footer, FormBox, Label, Title } from './styles'

import logoPng from '@assets/logo.png'

import { Input } from '@components/Input'
import { Button } from '@components/Button'
import { UserPhoto } from '@components/UserPhoto'

import { useNavigation } from '@react-navigation/native'

import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'

const signUpFormSchema = yup.object({
  name: yup.string(),
  email: yup.string().email(),
  phoneNumber: yup.string(),
  password: yup.string(),
  confirmPassword: yup.string(),
})

type SignUpFormData = yup.InferType<typeof signUpFormSchema>

export function SignUp() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpFormData>({
    resolver: yupResolver(signUpFormSchema),
  })

  const navigation = useNavigation()

  const nameInputRef = useRef<TextInput>(null)
  const emailInputRef = useRef<TextInput>(null)
  const phoneNumberInputRef = useRef<TextInput>(null)
  const passwordInputRef = useRef<TextInput>(null)
  const confirmPasswordInputRef = useRef<TextInput>(null)

  function handleNavigationToSignIn() {
    navigation.goBack()
  }

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

            <Controller
              control={control}
              render={({ field: { onChange } }) => (
                <Input
                  ref={nameInputRef}
                  placeholder="Nome"
                  onChangeText={onChange}
                  onSubmitEditing={() => emailInputRef.current?.focus()}
                  returnKeyType="next"
                />
              )}
              name="name"
            />

            <Controller
              control={control}
              render={({ field: { onChange } }) => (
                <Input
                  ref={phoneNumberInputRef}
                  placeholder="Telefone"
                  onChangeText={onChange}
                  onSubmitEditing={() => passwordInputRef.current?.focus()}
                  returnKeyType="next"
                />
              )}
              name="email"
            />

            <Controller
              control={control}
              render={({ field: { onChange } }) => (
                <Input
                  ref={phoneNumberInputRef}
                  placeholder="Telefone"
                  onChangeText={onChange}
                  onSubmitEditing={() => passwordInputRef.current?.focus()}
                  returnKeyType="next"
                />
              )}
              name="phoneNumber"
            />

            <Controller
              control={control}
              render={({ field: { onChange } }) => (
                <Input
                  ref={passwordInputRef}
                  placeholder="Senha"
                  isPassword
                  onChangeText={onChange}
                  onSubmitEditing={() =>
                    confirmPasswordInputRef.current?.focus()
                  }
                  returnKeyType="next"
                />
              )}
              name="password"
            />

            <Controller
              control={control}
              render={({ field: { onChange } }) => (
                <Input
                  ref={confirmPasswordInputRef}
                  placeholder="Confirmar senha"
                  isPassword
                  onChangeText={onChange}
                />
              )}
              name="confirmPassword"
            />
          </FormBox>

          <Button title="Criar" variant="secondary" />

          <Footer>
            <Label>Já tem uma conta?</Label>
            <Button
              title="Ir para o login"
              variant="primary"
              onPress={handleNavigationToSignIn}
            />
          </Footer>
        </Content>
      </ScrollView>
    </Container>
  )
}
