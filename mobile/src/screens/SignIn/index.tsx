import { useRef, useState } from 'react'

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

import Toast from 'react-native-toast-message'

import { useNavigation } from '@react-navigation/native'
import { AuthNavigatorRoutesProps } from '@routes/auth.routes'

import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'

import { useAuth } from '@hooks/useAuth'

import { AppError } from '@utils/AppError'

const signInFormSchema = yup.object({
  email: yup.string().required('Informe o e-mail.').email('E=mail inválido.'),

  password: yup
    .string()
    .required('Informe a senha.')
    .min(6, 'A senha deve ter no mínimo 6 dígitos.'),
})

type SignInFormData = yup.InferType<typeof signInFormSchema>

export function SignIn() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInFormData>({
    resolver: yupResolver(signInFormSchema),
  })

  const [isLoading, setIsLoading] = useState(false)

  const { signIn } = useAuth()

  const insets = useSafeAreaInsets()
  const paddingTop = insets.top + 30

  const passwordInputRef = useRef<TextInput>(null)

  const navigation = useNavigation<AuthNavigatorRoutesProps>()

  function handleNavigateToSignUp() {
    navigation.navigate('signUp')
  }

  async function handleSignIn({ email, password }: SignInFormData) {
    try {
      setIsLoading(true)

      await signIn(email, password)
    } catch (error) {
      const isAppError = error instanceof AppError
      const title = isAppError
        ? error.message
        : 'Não foi possível efetuar login. Tente novamente mais tarde'

      Toast.show({
        text1: title,
        type: 'error',
        position: 'top',
      })

      setIsLoading(false)
    }
  }

  return (
    <Container>
      <KeyboardAwareScrollView>
        <ScrollView showsVerticalScrollIndicator={false}>
          <Content style={{ paddingTop }}>
            <Image
              source={logoPng}
              alt="Marketspace logo"
              style={{ alignSelf: 'center' }}
            />

            <Title>marketspace</Title>
            <Subtitle>Seu espaço de compra e venda</Subtitle>

            <FormBox>
              <Label>Acesse sua conta</Label>

              <Controller
                control={control}
                render={({ field: { onChange } }) => (
                  <Input
                    placeholder="E-mail"
                    keyboardType="email-address"
                    onChangeText={onChange}
                    errorMessage={errors.email?.message}
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
                    ref={passwordInputRef}
                    onChangeText={onChange}
                    placeholder="Senha"
                    errorMessage={errors.password?.message}
                    secureTextEntry
                    onSubmitEditing={handleSubmit(handleSignIn)}
                    returnKeyType="send"
                  />
                )}
                name="password"
              />
            </FormBox>

            <Button
              title="Entrar"
              isLoading={isLoading}
              onPress={handleSubmit(handleSignIn)}
            />
          </Content>

          <Footer>
            <Label>Ainda não tem acesso?</Label>
            <Button
              title="Criar uma conta"
              variant="primary"
              onPress={handleNavigateToSignUp}
            />
          </Footer>
        </ScrollView>
      </KeyboardAwareScrollView>
    </Container>
  )
}
