import { useCallback, useState } from 'react'
import { Dimensions, FlatList, TouchableOpacity, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

import { Container, Content, InfoBox } from './styles'

import { Plus } from 'phosphor-react-native'

import { Header } from '@components/Header'
import { Picker } from '@components/Picker'
import { Text } from '@components/Typography'
import { AdListCard } from '@components/AdListCard'

import { useFocusEffect, useNavigation } from '@react-navigation/native'

import { AppNavigatorRoutesProps } from '@routes/app.routes'

import { api } from '@services/api'

import { ProductDTO } from '@dtos/ProductDTO'
import { Loading } from '@components/Loading'
import { AppError } from '@utils/AppError'
import Toast from 'react-native-toast-message'

const LIST_ITEM_SIZE = Math.floor(Dimensions.get('screen').width - 68) / 2

export function MyAds() {
  const [myProducts, setMyProducts] = useState<ProductDTO[]>([])
  const [filteredProducts, setFilteredProducts] = useState<ProductDTO[]>([])
  const [productIsLoading, setProductIsLoading] = useState(true)

  const navigation = useNavigation<AppNavigatorRoutesProps>()

  const insets = useSafeAreaInsets()
  const paddingTop = insets.top

  function handleCreateNewAd() {
    navigation.navigate('createAd')
  }

  function showAdsByFilter(filter: string) {
    if (filter === 'active') {
      return setFilteredProducts(myProducts.filter((ad) => ad.is_active))
    }

    if (filter === 'inactive') {
      return setFilteredProducts(myProducts.filter((ad) => !ad.is_active))
    }

    if (filter === 'all') {
      return setFilteredProducts(myProducts)
    }
  }

  async function fetchMyProducts() {
    try {
      setProductIsLoading(true)

      const { data } = await api.get('users/products')

      setMyProducts(data)
    } catch (error) {
      const isAppError = error instanceof AppError
      const title = isAppError
        ? error.message
        : 'Não foi possível carrgar a sua lista de produtos.'

      Toast.show({ text1: title, position: 'top', type: 'error' })
    } finally {
      setProductIsLoading(false)
    }
  }

  useFocusEffect(
    useCallback(() => {
      fetchMyProducts()
    }, []),
  )

  if (productIsLoading) {
    return <Loading />
  }

  return (
    <Container style={{ paddingTop }}>
      <Header
        title="Meus anúncios"
        rightButton={
          <TouchableOpacity activeOpacity={0.7} onPress={handleCreateNewAd}>
            <Plus />
          </TouchableOpacity>
        }
      />

      <Content>
        <InfoBox>
          <Text
            size="sm"
            color="gray_600"
            numberOfLines={2}
            style={{ flex: 1 }}
          >
            {myProducts.length}{' '}
            {`${myProducts.length !== 1 ? 'anúncios' : 'anúncio'}`}
          </Text>

          <View style={{ width: 112 }}>
            <Picker
              options={[
                { label: 'Todos', value: 'all' },
                { label: 'Ativos', value: 'active' },
                { label: 'Inativos', value: 'inactive' },
              ]}
              onValueChange={showAdsByFilter}
            />
          </View>
        </InfoBox>

        <FlatList
          showsVerticalScrollIndicator={false}
          numColumns={2}
          columnWrapperStyle={{
            gap: 20,
          }}
          data={filteredProducts}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ paddingBottom: 50, gap: 32 }}
          renderItem={({ item }) => (
            <View style={{ width: LIST_ITEM_SIZE }}>
              <AdListCard
                withAvatar={false}
                isActive={item.is_active}
                data={item}
                onPress={() =>
                  navigation.navigate('myAdDetails', { productId: item.id })
                }
              />
            </View>
          )}
        />
      </Content>
    </Container>
  )
}
