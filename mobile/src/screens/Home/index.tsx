import { useRef } from 'react'
import { FlatList, Dimensions, View } from 'react-native'

import { useSafeAreaInsets } from 'react-native-safe-area-context'

import { Container, Label } from './styles'

import { HomeHeader } from '@components/HomeHeader'
import { AdListCard } from '@components/AdListCard'
import { BottomSheet } from '@components/BottomSheet'
import { SearchInput } from '@components/SearchInput'
import { MyAdsCardButton } from '@components/MyAdsCardButton'

import { BottomSheetModal } from '@gorhom/bottom-sheet'
import { FormFilter } from '@components/FormFilter'

import { useNavigation } from '@react-navigation/native'
import { AppNavigatorRoutesProps } from '@routes/app.routes'

const LIST_ITEM_SIZE = Math.floor(Dimensions.get('screen').width - 68) / 2

export function Home() {
  const insets = useSafeAreaInsets()
  const paddingTop = insets.top

  const ref = useRef<BottomSheetModal>(null)
  const navigation = useNavigation<AppNavigatorRoutesProps>()

  return (
    <Container style={{ paddingTop }}>
      <FlatList
        showsVerticalScrollIndicator={false}
        numColumns={2}
        columnWrapperStyle={{
          marginTop: 24,
          gap: 20,
        }}
        data={[1, 2, 4, 6, 7, 8, 9, 10]}
        keyExtractor={(item) => String(item)}
        ListHeaderComponent={() => (
          <>
            <HomeHeader />

            <Label style={{ marginTop: 12 }}>
              Seus produtos anunciados para venda
            </Label>

            <MyAdsCardButton numberOfAds={5} />

            <Label style={{ marginTop: 32 }}>Compre produtos variados</Label>

            <SearchInput
              placeholder="Buscar anúncio"
              onPressSearch={() => console.log('onPressSearch pressionado')}
              onPressFilter={() => ref.current?.present()}
            />
          </>
        )}
        contentContainerStyle={{ paddingBottom: 50 }}
        renderItem={() => (
          <View style={{ width: LIST_ITEM_SIZE }}>
            <AdListCard onPress={() => navigation.navigate('adDetails')} />
          </View>
        )}
      />

      <BottomSheet bottomSheetModalRef={ref} title="Filtrar anúncios">
        <FormFilter />
      </BottomSheet>
    </Container>
  )
}
