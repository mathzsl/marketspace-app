import { useCallback, useRef, useState } from 'react'
import { FlatList, Dimensions, View } from 'react-native'

import { useSafeAreaInsets } from 'react-native-safe-area-context'

import { Container, Label } from './styles'

import { Text } from '@components/Typography'
import { Loading } from '@components/Loading'
import { HomeHeader } from '@components/HomeHeader'
import { AdListCard } from '@components/AdListCard'
import { BottomSheet } from '@components/BottomSheet'
import { SearchInput } from '@components/SearchInput'
import { MyAdsCardButton } from '@components/MyAdsCardButton'

import { BottomSheetModal } from '@gorhom/bottom-sheet'
import { FormFilter } from '@components/FormFilter'

import { useFocusEffect, useNavigation } from '@react-navigation/native'
import { AppNavigatorRoutesProps } from '@routes/app.routes'

import { api } from '@services/api'

import { ProductDTO } from '@dtos/ProductDTO'
import { AppError } from '@utils/AppError'

import Toast from 'react-native-toast-message'
import { FiltersDTO } from '@dtos/FiltersDTO'

const LIST_ITEM_SIZE = Math.floor(Dimensions.get('screen').width - 68) / 2

export function Home() {
  const [isLoading, setIsLoading] = useState(true)
  const [productList, setProductList] = useState<ProductDTO[]>([])
  const [filters, setFilters] = useState<FiltersDTO>({} as FiltersDTO)
  const [myActiveProducts, setMyActiveProducts] = useState(0)

  const insets = useSafeAreaInsets()
  const paddingTop = insets.top

  const ref = useRef<BottomSheetModal>(null)
  const navigation = useNavigation<AppNavigatorRoutesProps>()

  async function fetchMyActiveProducts() {
    try {
      const { data } = await api.get('users/products')

      setMyActiveProducts(data.length)
    } catch (error) {
      const isAppError = error instanceof AppError
      const title = isAppError
        ? error.message
        : 'Não foi possível carregar a quantidade de produtos ativos. Tente novamente mais tarde!'

      Toast.show({
        text1: title,
        position: 'top',
        type: 'error',
      })
    }
  }

  async function fetchProducts() {
    try {
      setIsLoading(true)

      if (filters) {
        setFilters({} as FiltersDTO)
      }

      const { data } = await api.get('/products')

      setProductList(data)
    } catch (error) {
      const isAppError = error instanceof AppError
      const title = isAppError
        ? error.message
        : 'Não foi possível carregar a lista de produtos. Tente novamente mais tarde!'

      Toast.show({
        text1: title,
        position: 'top',
        type: 'error',
      })
    } finally {
      setIsLoading(false)
    }
  }

  async function handleAplyFilter(filter: FiltersDTO) {
    try {
      setIsLoading(true)

      const filtersApplied = {
        ...filter,
        payment_methods: filter.payment_methods?.map((method) => method.key),
        query: filters.query,
      }

      setFilters(filter)

      ref.current?.close()

      const { data } = await api.get('/products', {
        params: {
          ...filtersApplied,
        },
      })

      setProductList(data)
    } catch (error) {
      const isAppError = error instanceof AppError
      const title = isAppError
        ? error.message
        : 'Não foi possível carregar a lista de produtos. Tente novamente mais tarde!'

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
      fetchMyActiveProducts()
      fetchProducts()
    }, []),
  )

  if (isLoading) {
    return <Loading />
  }

  return (
    <Container style={{ paddingTop }}>
      <FlatList
        showsVerticalScrollIndicator={false}
        numColumns={2}
        columnWrapperStyle={{
          marginTop: 24,
          gap: 20,
        }}
        data={productList}
        keyExtractor={(item) => item.id}
        ListHeaderComponent={
          <>
            <HomeHeader />

            <Label style={{ marginTop: 12 }}>
              Seus produtos anunciados para venda
            </Label>

            <MyAdsCardButton activeAds={myActiveProducts} />

            <Label style={{ marginTop: 32 }}>Compre produtos variados</Label>

            <SearchInput
              value={filters.query}
              onChangeText={(text) => setFilters({ ...filters, query: text })}
              placeholder="Buscar anúncio"
              onPressSearch={() => handleAplyFilter(filters)}
              onPressFilter={() => ref.current?.present()}
            />
          </>
        }
        contentContainerStyle={[
          !productList.length && { flex: 1 },
          { paddingBottom: 50 },
        ]}
        renderItem={({ item }) => (
          <View style={{ width: LIST_ITEM_SIZE }}>
            <AdListCard
              data={item}
              onPress={() =>
                navigation.navigate('adDetails', { productId: item.id })
              }
            />
          </View>
        )}
        ListEmptyComponent={
          <View
            style={{
              flex: 1,
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Text color="gray_400" style={{ textAlign: 'center' }}>
              A lista encontra-se vazia; =(
            </Text>
          </View>
        }
      />

      <BottomSheet bottomSheetModalRef={ref} title="Filtrar anúncios">
        <FormFilter
          value={filters}
          onAddingFilter={handleAplyFilter}
          onChange={fetchProducts}
        />
      </BottomSheet>
    </Container>
  )
}
