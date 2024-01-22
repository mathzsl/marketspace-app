import { ScrollView } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

import { Box, Container, Content, Footer, Label, Message } from './styles'

import { Input } from '@components/Input'
import { Radio } from '@components/Radio'
import { Button } from '@components/Button'
import { Header } from '@components/Header'
import { Switch } from '@components/Switch'
import { Checkbox } from '@components/Checkbox'
import { ImageSelect } from '@components/ImageSelect'
import { TextAreaInput } from '@components/TextAreaInput'

import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

import { PAYMENT_METHODS } from '../../data/paymentMethods'

import { useNavigation } from '@react-navigation/native'
import { AppNavigatorRoutesProps } from '@routes/app.routes'

import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'

const adCreationFormSchema = yup.object({
  images: yup
    .array(
      yup.object().shape({
        name: yup.string().required(),
        uri: yup.string().required(),
        type: yup.string().required(),
      }),
    )
    .required('Selecione uma imagem do seu produto.')
    .min(1, 'Você deve selecionar pelo menos uma imagem do seu produto.'),

  name: yup.string().required('Informe o nome do produto.'),

  description: yup
    .string()
    .required('Informe uma descrição para o seu produto.'),

  is_new: yup.boolean().required('Selecione o estado do produto.'),

  price: yup.number().required('Informe o preço do produto.'),

  accept_trade: yup.boolean().required(),

  payment_methods: yup
    .array()
    .min(1, 'Digite um pagamento')
    .required('Selecione pelo menos um meio de pagamento.'),
})

type AdCreationFormData = yup.InferType<typeof adCreationFormSchema>

export function CreateAd() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<AdCreationFormData>({
    resolver: yupResolver(adCreationFormSchema),
  })

  const insets = useSafeAreaInsets()
  const paddingTop = insets.top
  const navigation = useNavigation<AppNavigatorRoutesProps>()

  function handleGoToPreview(data: AdCreationFormData) {
    navigation.navigate('newAdPreview', { product: data })
  }

  function handleCancelNewAd() {
    navigation.goBack()
  }

  return (
    <Container style={{ paddingTop }}>
      <KeyboardAwareScrollView showsVerticalScrollIndicator={false}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 42 }}
        >
          <Header title="Criar anúncio" goBack />

          <Content>
            <Label style={{ marginBottom: 4 }}>Imagens</Label>

            <Message>
              Escolha até 3 imagens para mostrar o quando o seu produto é
              incrível!
            </Message>

            <Controller
              control={control}
              render={({ field: { onChange } }) => (
                <ImageSelect
                  errorMessage={errors.images?.message}
                  onChange={onChange}
                />
              )}
              name="images"
            />

            <Box>
              <Label>Sobre o produto</Label>

              <Controller
                control={control}
                render={({ field: { onChange } }) => (
                  <Input
                    placeholder="Titulo do anúncio"
                    onChangeText={onChange}
                    errorMessage={errors.name?.message}
                  />
                )}
                name="name"
              />

              <Controller
                control={control}
                render={({ field: { onChange } }) => (
                  <TextAreaInput
                    placeholder="Descrição do produto"
                    errorMessage={errors.description?.message}
                    onChangeText={onChange}
                  />
                )}
                name="description"
              />

              <Controller
                control={control}
                render={({ field: { onChange } }) => (
                  <Radio
                    options={[
                      { name: 'Produto novo', value: 'true' },
                      { name: 'Produto Usado', value: 'false' },
                    ]}
                    onChange={onChange}
                    errorMessage={errors.is_new?.message}
                  />
                )}
                name="is_new"
              />
            </Box>

            <Box>
              <Label>Venda</Label>

              <Controller
                control={control}
                render={({ field: { onChange } }) => (
                  <Input
                    placeholder="Valor do produto"
                    prefix="R$"
                    errorMessage={errors.price?.message}
                    onChangeText={onChange}
                    keyboardType="numeric"
                  />
                )}
                name="price"
              />

              <Label>Aceita troca?</Label>

              <Controller
                control={control}
                render={({ field: { onChange } }) => (
                  <Switch onValueChange={onChange} />
                )}
                name="accept_trade"
              />

              <Label>Meios de pagamentos aceitos</Label>

              <Controller
                control={control}
                render={({ field: { onChange } }) => (
                  <Checkbox
                    options={PAYMENT_METHODS}
                    onChange={onChange}
                    errorMessage={errors.payment_methods?.message}
                  />
                )}
                name="payment_methods"
              />
            </Box>
          </Content>
        </ScrollView>
      </KeyboardAwareScrollView>

      <Footer>
        <Button
          title="Cancelar"
          variant="primary"
          onPress={handleCancelNewAd}
          style={{ flex: 1 }}
        />

        <Button
          title="Avançar"
          variant="secondary"
          onPress={handleSubmit(handleGoToPreview)}
          style={{ flex: 1 }}
        />
      </Footer>
    </Container>
  )
}
