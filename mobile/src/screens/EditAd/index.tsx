import { ScrollView } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

import { Box, Container, Content, Footer, Label, Message } from './styles'

import { Input } from '@components/Input'
import { Button } from '@components/Button'
import { Header } from '@components/Header'
import { Switch } from '@components/Switch'
import { Checkbox } from '@components/Checkbox'
import { ImageSelect } from '@components/ImageSelect'
import { TextAreaInput } from '@components/TextAreaInput'

import { PAYMENT_METHODS } from '../../data/paymentMethods'

export function EditAd() {
  const insets = useSafeAreaInsets()
  const paddingTop = insets.top

  return (
    <Container style={{ paddingTop }}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 42 }}
      >
        <Header title="Editar anúncio" goBack />

        <Content>
          <Label style={{ marginBottom: 4 }}>Imagens</Label>

          <Message>
            Escolha até 3 imagens para mostrar o quando o seu produto é
            incrível!
          </Message>

          <ImageSelect value={['1q', '2', '4']} />

          <Box>
            <Label>Sobre o produto</Label>

            <Input placeholder="Titulo do anúncio" />

            <TextAreaInput placeholder="Descrição do produto" />
          </Box>

          <Box>
            <Label>Venda</Label>

            <Input placeholder="Valor do produto" prefix="R$" />

            <Label>Aceita troca?</Label>

            <Switch />

            <Label>Meios de pagamentos aceitos</Label>

            <Checkbox options={PAYMENT_METHODS} />
          </Box>
        </Content>
      </ScrollView>
      <Footer>
        <Button title="Cancelar" variant="primary" style={{ flex: 1 }} />

        <Button title="Avançar" variant="secondary" style={{ flex: 1 }} />
      </Footer>
    </Container>
  )
}
