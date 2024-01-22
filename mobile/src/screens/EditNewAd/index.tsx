import { ScrollView } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

import { Box, Container, Content, Footer, Label, Message } from './styles'

import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

import { Input } from '@components/Input'
import { Radio } from '@components/Radio'
import { Button } from '@components/Button'
import { Header } from '@components/Header'
import { Switch } from '@components/Switch'
import { Checkbox } from '@components/Checkbox'
import { ImageSelect } from '@components/ImageSelect'
import { TextAreaInput } from '@components/TextAreaInput'

import { useNavigation, useRoute } from '@react-navigation/native'

import { PAYMENT_METHODS } from '../../data/paymentMethods'
import { AppNavigatorRoutesProps } from '@routes/app.routes'

import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'

import { ProductFormDTO } from '@dtos/ProductFormDTO'

const adEditingFormSchema = yup.object({
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

type AdEditingFormData = yup.InferType<typeof adEditingFormSchema>

type EditAdRouteParams = {
  product: ProductFormDTO
}

export function EditNewAd() {
  const navigation = useNavigation<AppNavigatorRoutesProps>()
  const route = useRoute()
  const { product } = route.params as EditAdRouteParams

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<AdEditingFormData>({
    resolver: yupResolver(adEditingFormSchema),
    defaultValues: {
      images: product.images,
      price: product.price,
      name: product.name,
      description: product.description,
      is_new: product.is_new,
      accept_trade: product.accept_trade,
      payment_methods: product.payment_methods,
    },
  })

  const insets = useSafeAreaInsets()
  const paddingTop = insets.top

  function handleGoToPreview(data: AdEditingFormData) {
    navigation.navigate('newAdPreview', { product: data })
  }

  function handleAdCancel() {
    navigation.navigate('home')
  }

  return (
    <Container style={{ paddingTop }}>
      <KeyboardAwareScrollView showsVerticalScrollIndicator={false}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 42 }}
        >
          <Header title="Editar anúncio" goBack />

          <Content>
            <Label style={{ marginBottom: 4 }}>Imagens</Label>

            <Message>
              Escolha até 3 imagens para mostrar o quando o seu produto é
              incrível!
            </Message>

            <Controller
              control={control}
              render={({ field: { onChange, value } }) => (
                <ImageSelect
                  value={value}
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
                render={({ field: { onChange, value } }) => (
                  <Input
                    placeholder="Titulo do anúncio"
                    value={value}
                    onChangeText={onChange}
                    errorMessage={errors.name?.message}
                  />
                )}
                name="name"
              />

              <Controller
                control={control}
                render={({ field: { onChange, value } }) => (
                  <TextAreaInput
                    placeholder="Descrição do produto"
                    value={value}
                    errorMessage={errors.description?.message}
                    onChangeText={onChange}
                  />
                )}
                name="description"
              />

              <Controller
                control={control}
                render={({ field: { onChange, value } }) => (
                  <Radio
                    value={String(value)}
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
                render={({ field: { onChange, value } }) => (
                  <Input
                    placeholder="Valor do produto"
                    value={String(value)}
                    prefix="R$"
                    errorMessage={errors.price?.message}
                    onChangeText={onChange}
                  />
                )}
                name="price"
              />

              <Label>Aceita troca?</Label>

              <Controller
                control={control}
                render={({ field: { onChange, value } }) => (
                  <Switch onValueChange={onChange} value={value} />
                )}
                name="accept_trade"
              />

              <Label>Meios de pagamentos aceitos</Label>

              <Controller
                control={control}
                render={({ field: { onChange, value } }) => (
                  <Checkbox
                    options={PAYMENT_METHODS}
                    value={value}
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
          onPress={handleAdCancel}
          style={{ flex: 1 }}
        />

        <Button
          title="Avançar"
          variant="secondary"
          style={{ flex: 1 }}
          onPress={handleSubmit(handleGoToPreview)}
        />
      </Footer>
    </Container>
  )
}
