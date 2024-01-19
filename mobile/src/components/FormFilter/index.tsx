import { Box, Container, Footer, Label, TagInputBox } from './styles'

import { Button } from '@components/Button'
import { Switch } from '@components/Switch'
import { Checkbox } from '@components/Checkbox'
import { TagInput } from '@components/TagInput'

import { PAYMENT_METHODS } from '../../data/paymentMethods'

export function FormFilter() {
  return (
    <Container>
      <Box>
        <Label>Condição</Label>
        <TagInputBox>
          <TagInput
            isActive
            label="NOVO"
            onChange={() => console.log('onChange')}
            onRemove={() => console.log('onRemove')}
          />

          <TagInput
            isActive={false}
            label="USADO"
            onChange={() => console.log('onChange')}
            onRemove={() => console.log('onRemove')}
          />
        </TagInputBox>
      </Box>

      <Box>
        <Label>Aceita troca?</Label>
        <Switch />
      </Box>

      <Box style={{ marginBottom: 'auto' }}>
        <Label>Meios de pagamentos aceitos</Label>
        <Checkbox options={PAYMENT_METHODS} />
      </Box>

      <Footer>
        <Button title="Resetar filtros" variant="primary" style={{ flex: 1 }} />

        <Button
          title="Aplicar filtros"
          variant="secondary"
          style={{ flex: 1 }}
        />
      </Footer>
    </Container>
  )
}
