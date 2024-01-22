import { ScrollView } from 'react-native'

import { api } from '@services/api'

import { Container, Content, Footer } from './styles'

import Toast from 'react-native-toast-message'

import { Button } from '@components/Button'
import { ImageSlider } from '@components/ImageSlider'
import { PreviewHeader } from '@components/PreviewHeader'

import { AppError } from '@utils/AppError'

import { ArrowLeft, Tag } from 'phosphor-react-native'

import { useNavigation, useRoute } from '@react-navigation/native'
import { AppNavigatorRoutesProps } from '@routes/app.routes'

import { ProductFormDTO } from '@dtos/ProductFormDTO'
import { MyProductInfo } from '@components/MyProductInfo'

type MyAdPreviewRouteParams = {
  product: ProductFormDTO
}

export function NewAdPreview() {
  const navigation = useNavigation<AppNavigatorRoutesProps>()
  const route = useRoute()
  const { product } = route.params as MyAdPreviewRouteParams

  function handleGoBackAndEditAd() {
    return navigation.navigate('editNewAd', { product })
  }

  async function handleCreateNewAd() {
    try {
      const productInfo = {
        name: product.name,
        description: product.description,
        is_new: product.is_new,
        price: product.price,
        accept_trade: product.accept_trade,
        payment_methods: product.payment_methods.map((method) => method.key),
      }

      const { data } = await api.post('/products', {
        ...productInfo,
      })

      if (data) {
        const formData = new FormData()
        formData.append('product_id', data.id)
        product.images.forEach((image) =>
          formData.append('images', image as any),
        )

        await api.post('/products/images', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        })
      }

      Toast.show({
        text1: 'Produto cadastrado com sucesso! =)',
        position: 'top',
        type: 'success',
      })

      navigation.navigate('home')
    } catch (error) {
      const isAppError = error instanceof AppError
      const title = isAppError
        ? error.message
        : 'Error ao tentar cadastrar produto.'

      Toast.show({
        text1: title,
        position: 'top',
        type: 'error',
      })
    }
  }

  return (
    <Container>
      <PreviewHeader
        title="Pré visualização do anúncio"
        subtitle="É assim que seu produto vai aparecer!"
      />

      <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
        {product.images && (
          <ImageSlider images={product.images.map((image) => image.uri)} />
        )}

        <Content>
          <MyProductInfo data={product} />
        </Content>
      </ScrollView>

      <Footer>
        <Button
          title="Voltar e editar"
          variant="primary"
          icon={ArrowLeft}
          style={{ flex: 1 }}
          onPress={handleGoBackAndEditAd}
        />

        <Button
          title="Publicar"
          icon={Tag}
          style={{ flex: 1 }}
          onPress={handleCreateNewAd}
        />
      </Footer>
    </Container>
  )
}
