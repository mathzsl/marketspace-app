import { useRef, useState } from 'react'
import { Image, ScrollView, TextInput } from 'react-native'

import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

import { Container, Content, Footer, FormBox, Label, Title } from './styles'

import logoPng from '@assets/logo.png'

import Toast from 'react-native-toast-message'

import { Input } from '@components/Input'
import { Button } from '@components/Button'
import { UserPhotoSelect } from '@components/UserPhotoSelect'

import { useAuth } from '@hooks/useAuth'
import { useNavigation } from '@react-navigation/native'

import { api } from '@services/api'

import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'

import { AppError } from '@utils/AppError'

const phoneRegex = /^\(?\d{2}\)?\s?\d{4,5}-?\d{4}$/

const signUpFormSchema = yup.object({
  avatar: yup
    .object()
    .shape({
      name: yup.string().required(),
      uri: yup.string().required(),
      type: yup.string().required(),
    })
    .default(undefined)
    .required('asak'),

  name: yup.string().required('Informe o nome.'),

  email: yup.string().required('Informe o e-mail.').email('E-mail inválido.'),

  tel: yup
    .string()
    .matches(phoneRegex, 'Formato de inválido.')
    .required('Informe o telefone.'),

  password: yup
    .string()
    .required('Informe a senha.')
    .min(6, 'A senha deve ter no mínimo 6 dígitos.'),

  confirmPassword: yup
    .string()
    .required('Confirme a senha.')
    .oneOf([yup.ref('password')], 'As senhas não coincidem.'),
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

  const [isLoading, setIsLoading] = useState(false)

  const insets = useSafeAreaInsets()
  const paddingTop = insets.top

  const navigation = useNavigation()

  const { signIn } = useAuth()

  const nameInputRef = useRef<TextInput>(null)
  const emailInputRef = useRef<TextInput>(null)
  const telInputRef = useRef<TextInput>(null)
  const passwordInputRef = useRef<TextInput>(null)
  const confirmPasswordInputRef = useRef<TextInput>(null)

  function handleNavigationToSignIn() {
    navigation.goBack()
  }

  async function handleSignUp({
    avatar,
    name,
    email,
    tel,
    password,
  }: SignUpFormData) {
    try {
      setIsLoading(true)

      const formData = new FormData()
      formData.append('avatar', avatar as any)
      formData.append('name', name)
      formData.append('email', email)
      formData.append('tel', tel)
      formData.append('password', password)

      await api.post('/users', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })

      await signIn(email, password)
    } catch (error) {
      setIsLoading(false)
      const isAppError = error instanceof AppError
      const title = isAppError
        ? error.message
        : 'Não foi possível criar a conta. Tente novamente mais tarde.'

      Toast.show({ type: 'error', text1: title, position: 'top' })
    }
  }

  return (
    <Container style={{ paddingTop }}>
      <KeyboardAwareScrollView
        extraHeight={100}
        showsVerticalScrollIndicator={false}
      >
        <ScrollView showsVerticalScrollIndicator={false}>
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
              <Controller
                control={control}
                render={({ field: { onChange } }) => (
                  <UserPhotoSelect
                    onChange={onChange}
                    style={{ alignSelf: 'center' }}
                  />
                )}
                name="avatar"
              />

              <Controller
                control={control}
                render={({ field: { onChange } }) => (
                  <Input
                    ref={nameInputRef}
                    placeholder="Nome"
                    onChangeText={onChange}
                    errorMessage={errors.name?.message}
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
                    ref={emailInputRef}
                    placeholder="Email"
                    onChangeText={onChange}
                    errorMessage={errors.email?.message}
                    onSubmitEditing={() => telInputRef.current?.focus()}
                    returnKeyType="next"
                  />
                )}
                name="email"
              />

              <Controller
                control={control}
                render={({ field: { onChange } }) => (
                  <Input
                    ref={telInputRef}
                    placeholder="Telefone"
                    onChangeText={onChange}
                    errorMessage={errors.tel?.message}
                    keyboardType="number-pad"
                    onSubmitEditing={() => passwordInputRef.current?.focus()}
                    returnKeyType="next"
                  />
                )}
                name="tel"
              />

              <Controller
                control={control}
                render={({ field: { onChange } }) => (
                  <Input
                    ref={passwordInputRef}
                    placeholder="Senha"
                    secureTextEntry
                    onChangeText={onChange}
                    errorMessage={errors.password?.message}
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
                    secureTextEntry
                    placeholder="Confirmar senha"
                    onChangeText={onChange}
                    errorMessage={errors.confirmPassword?.message}
                    onSubmitEditing={handleSubmit(handleSignUp)}
                    returnKeyType="send"
                  />
                )}
                name="confirmPassword"
              />
            </FormBox>

            <Button
              title="Criar"
              variant="secondary"
              isLoading={isLoading}
              onPress={handleSubmit(handleSignUp)}
            />

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
      </KeyboardAwareScrollView>
    </Container>
  )
}
