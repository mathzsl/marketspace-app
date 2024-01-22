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

type AdPreviewRouteParams = {
  productId: string
  product: ProductFormDTO
  allProductImages: string[]
  listOfRemovedProductImages: string[]
}

export function AdPreview() {
  const navigation = useNavigation<AppNavigatorRoutesProps>()
  const route = useRoute()
  const { productId, product, allProductImages, listOfRemovedProductImages } =
    route.params as AdPreviewRouteParams

  function handleGoBackAndEditAd() {
    navigation.goBack()
  }

  async function handleUpdateAd() {
    try {
      const updatedAd = {
        name: product.name,
        description: product.description,
        is_new: product.is_new,
        price: product.price,
        accept_trade: product.accept_trade,
        payment_methods: product.payment_methods.map((method) => method.key),
      }

      await api.put(`/products/${productId}`, {
        ...updatedAd,
      })

      if (listOfRemovedProductImages.length) {
        await api.delete('products/images', {
          data: {
            productImagesIds: listOfRemovedProductImages,
          },
        })
      }

      if (product.images.length) {
        const formData = new FormData()
        formData.append('product_id', productId)
        product.images.forEach((image) =>
          formData.append('images', image as any),
        )

        await api.post('products/images', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        })
      }

      navigation.navigate('home')
    } catch (error) {
      const isAppError = error instanceof AppError
      const title = isAppError
        ? error.message
        : 'Erro ao tentar atualizar anúncio.'

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
        {product.images && <ImageSlider images={allProductImages} />}

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
          onPress={handleUpdateAd}
        />
      </Footer>
    </Container>
  )
}
