import { Dimensions, FlatList, TouchableOpacity, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

import { Container, Content, InfoBox } from './styles'

import { Header } from '@components/Header'

import { Plus } from 'phosphor-react-native'
import { AdListCard } from '@components/AdListCard'
import { Text } from '@components/Typography'
import { Picker } from '@components/Picker'

const LIST_ITEM_SIZE = Math.floor(Dimensions.get('screen').width - 68) / 2

export function MyAds() {
  const insets = useSafeAreaInsets()
  const paddingTop = insets.top

  return (
    <Container style={{ paddingTop }}>
      <Header
        title="Meus anúncios"
        rightButton={
          <TouchableOpacity activeOpacity={0.7}>
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
            9 anúncios
          </Text>

          <View style={{ width: 112 }}>
            <Picker />
          </View>
        </InfoBox>

        <FlatList
          showsVerticalScrollIndicator={false}
          numColumns={2}
          columnWrapperStyle={{
            gap: 20,
          }}
          data={[1, 2, 4, 6, 7]}
          keyExtractor={(item) => String(item)}
          contentContainerStyle={{ paddingBottom: 50, gap: 32 }}
          renderItem={() => (
            <View style={{ width: LIST_ITEM_SIZE }}>
              <AdListCard onPress={() => console.log('fi')} />
            </View>
          )}
        />
      </Content>
    </Container>
  )
}
