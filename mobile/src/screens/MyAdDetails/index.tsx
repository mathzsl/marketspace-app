import { Container, Content, Footer } from './styles'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

import { ScrollView } from 'react-native'

import { Power, TrashSimple } from 'phosphor-react-native'

import { Header } from '@components/Header'
import { Button } from '@components/Button'
import { ProductInfo } from '@components/ProductInfo'
import { ImageSlider } from '@components/ImageSlider'

export function MyAdDetails() {
  const insets = useSafeAreaInsets()
  const paddingTop = insets.top

  const IMAGES = [
    'https://www.mxbikes.com.br/blog/img/main/1200/e-bikes-no-mtb-vale-a-pena-ter-uma-bicicleta-mtb-eletrica.jpg',
    'https://elabora.pianetamountainbike.it/public/Fotografie_2020/Settembre_1/focus-sam2-primo-piano.jpg',
    'https://ebike-mtb.com/wp-content/uploads/sites/2/2020/09/FOCUS-SAM2-6-9-2021_E-MTB-Review-Test-001-1140x760.jpg',
  ]

  return (
    <Container style={{ paddingTop }}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{ flex: 1 }}
        contentContainerStyle={{ paddingBottom: 24 }}
      >
        <Header />

        <ImageSlider images={IMAGES} />

        <Content>
          <ProductInfo />

          <Footer>
            <Button
              title="Desativar anúncio"
              icon={Power}
              variant="secondary"
            />

            <Button
              title="Excluir anúncio"
              icon={TrashSimple}
              variant="primary"
            />
          </Footer>
        </Content>
      </ScrollView>
    </Container>
  )
}
