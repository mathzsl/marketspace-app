import { useCallback, useState } from 'react'

import { Container, Content, Footer, Price, PriceBox } from './styles'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

import { useFocusEffect, useRoute } from '@react-navigation/native'

import Toast from 'react-native-toast-message'

import { Header } from '@components/Header'
import { Button } from '@components/Button'
import { Text } from '@components/Typography'
import { Loading } from '@components/Loading'
import { ProductInfo } from '@components/ProductInfo'
import { ImageSlider } from '@components/ImageSlider'

import { ScrollView } from 'react-native'

import { WhatsappLogo } from 'phosphor-react-native'

import { api } from '@services/api'

import { AppError } from '@utils/AppError'

import { ProductDTO } from '@dtos/ProductDTO'
import { priceFormatter } from '@utils/Formatter'

type AdDetailsRouteParams = {
  productId: string
}

export function AdDetails() {
  const [product, setProduct] = useState<ProductDTO>({} as ProductDTO)
  const [isLoading, setIsLoading] = useState(true)

  const insets = useSafeAreaInsets()
  const paddingTop = insets.top

  const route = useRoute()
  const { productId } = route.params as AdDetailsRouteParams

  const formattedPrice = priceFormatter(product.price).replace('R$', '')

  async function loadProductDetails() {
    try {
      setIsLoading(true)

      const { data } = await api.get(`/products/${productId}`)

      setProduct(data)
    } catch (error) {
      const isAppError = error instanceof AppError
      const title = isAppError
        ? error.message
        : 'Não foi possível carregar os detalhes do produto.'

      Toast.show({
        text1: title,
        position: 'top',
        type: 'error',
      })
    } finally {
      setIsLoading(false)
    }
  }

  useFocusEffect(
    useCallback(() => {
      loadProductDetails()
    }, []),
  )

  if (isLoading) {
    return <Loading />
  }

  return (
    <Container style={{ paddingTop }}>
      <ScrollView showsVerticalScrollIndicator={false} style={{ flex: 1 }}>
        <Header goBack />

        <ImageSlider images={product.product_images.map((item) => item.path)} />

        <Content>
          <ProductInfo data={product} />
        </Content>
      </ScrollView>

      <Footer>
        <PriceBox>
          <Price numberOfLines={2}>
            R$
            <Text size="xl" font="heading" color="blue_700">
              {formattedPrice}
            </Text>
          </Price>
        </PriceBox>

        <Button
          title="Entrar em contato"
          icon={WhatsappLogo}
          style={{ flex: 1 }}
        />
      </Footer>
    </Container>
  )
}
