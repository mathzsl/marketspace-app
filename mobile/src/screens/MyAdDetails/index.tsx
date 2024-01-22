import { useEffect, useState } from 'react'
import { ScrollView, TouchableOpacity } from 'react-native'

import { Container, Content, Footer } from './styles'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

import { api } from '@services/api'

import { PencilSimpleLine, Power, TrashSimple } from 'phosphor-react-native'

import Toast from 'react-native-toast-message'

import { Header } from '@components/Header'
import { Button } from '@components/Button'
import { AppError } from '@utils/AppError'
import { Loading } from '@components/Loading'
import { ProductDTO } from '@dtos/ProductDTO'
import { ImageSlider } from '@components/ImageSlider'
import { ProductInfo } from '@components/ProductInfo'

import { AppNavigatorRoutesProps } from '@routes/app.routes'
import { useNavigation, useRoute } from '@react-navigation/native'

type MyAdDetailsRouteParams = {
  productId: string
}

export function MyAdDetails() {
  const [myAdDetails, setMyAdDetails] = useState<ProductDTO>({} as ProductDTO)
  const [isLoadingAdDetails, setIsLoadingAdDetails] = useState(true)
  const [isUpdatingAd, setIsUpdatingAd] = useState(false)
  const [isDeletingAd, setIsDeletingAd] = useState(false)

  const insets = useSafeAreaInsets()
  const paddingTop = insets.top

  const navigation = useNavigation<AppNavigatorRoutesProps>()

  const route = useRoute()
  const { productId } = route.params as MyAdDetailsRouteParams

  async function fetchMyAdDetails() {
    try {
      setIsLoadingAdDetails(true)

      const { data } = await api.get(`/products/${productId}`)

      setMyAdDetails(data)
    } catch (error) {
      const isAppError = error instanceof AppError
      const title = isAppError
        ? error.message
        : 'Não foi possível carregar os detalhes do seu produto.'

      Toast.show({ text1: title, position: 'top', type: 'error' })
    } finally {
      setIsLoadingAdDetails(false)
    }
  }

  async function handleActivatingAnd() {
    try {
      setIsUpdatingAd(true)

      await api.patch(`/products/${productId}`, {
        is_active: !myAdDetails.is_active,
      })

      setMyAdDetails({ ...myAdDetails, is_active: !myAdDetails.is_active })
    } catch (error) {
      const isAppError = error instanceof AppError
      const title = isAppError
        ? error.message
        : 'Não foi possível atualizar o seu anúncio. Tente novamente mais tarde.'

      Toast.show({ text1: title, position: 'top', type: 'error' })
    } finally {
      setIsUpdatingAd(false)
    }
  }

  async function handleAdToggle() {
    try {
      setIsDeletingAd(true)

      await api.delete(`/products/${productId}`)

      navigation.goBack()
    } catch (error) {
      const isAppError = error instanceof AppError
      const title = isAppError
        ? error.message
        : 'Não foi possível excluir o seu anúncio. Tente novamente mais tarde.'

      Toast.show({ text1: title, position: 'top', type: 'error' })
    }
  }

  function handleAdEditing() {
    const product = {
      ...myAdDetails,
      images: myAdDetails.product_images,
    }

    navigation.navigate('editAd', { product })
  }

  useEffect(() => {
    fetchMyAdDetails()
  }, [])

  if (isLoadingAdDetails) {
    return <Loading />
  }

  return (
    <Container style={{ paddingTop }}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{ flex: 1 }}
        contentContainerStyle={{ paddingBottom: 24 }}
      >
        <Header
          goBack
          rightButton={
            <TouchableOpacity activeOpacity={0.7} onPress={handleAdEditing}>
              <PencilSimpleLine />
            </TouchableOpacity>
          }
        />

        <ImageSlider
          formatImage
          isDisabled={!myAdDetails.is_active}
          images={myAdDetails.product_images.map((image) => image.path)}
        />

        <Content>
          <ProductInfo data={myAdDetails} />

          <Footer>
            <Button
              title={
                myAdDetails.is_active ? 'Desativar anúncio' : 'Ativar anúncio'
              }
              icon={Power}
              variant={myAdDetails.is_active ? 'default' : 'secondary'}
              isLoading={isUpdatingAd}
              onPress={handleActivatingAnd}
            />

            <Button
              title="Excluir anúncio"
              icon={TrashSimple}
              isLoading={isDeletingAd}
              variant="primary"
              onPress={handleAdToggle}
            />
          </Footer>
        </Content>
      </ScrollView>
    </Container>
  )
}
