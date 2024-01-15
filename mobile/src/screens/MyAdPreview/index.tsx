import { ScrollView } from 'react-native'

import { Container, Content, Footer } from './styles'

import { PreviewHeader } from '@components/PreviewHeader'
import { ImageSlider } from '@components/ImageSlider'
import { ProductInfo } from '@components/ProductInfo'
import { Button } from '@components/Button'
import { ArrowLeft, Tag } from 'phosphor-react-native'

export function MyAdPreview() {
  const IMAGES = [
    'https://www.mxbikes.com.br/blog/img/main/1200/e-bikes-no-mtb-vale-a-pena-ter-uma-bicicleta-mtb-eletrica.jpg',
    'https://elabora.pianetamountainbike.it/public/Fotografie_2020/Settembre_1/focus-sam2-primo-piano.jpg',
    'https://ebike-mtb.com/wp-content/uploads/sites/2/2020/09/FOCUS-SAM2-6-9-2021_E-MTB-Review-Test-001-1140x760.jpg',
  ]

  return (
    <Container>
      <PreviewHeader
        title="Pré visualização do anúncio"
        subtitle="É assim que seu produto vai aparecer!"
      />

      <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
        <ImageSlider images={IMAGES} />

        <Content>
          <ProductInfo />
        </Content>
      </ScrollView>

      <Footer>
        <Button
          title="Voltar e editar"
          variant="primary"
          icon={ArrowLeft}
          style={{ flex: 1 }}
        />

        <Button title="Publicar" icon={Tag} style={{ flex: 1 }} />
      </Footer>
    </Container>
  )
}
