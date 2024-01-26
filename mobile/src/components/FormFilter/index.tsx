import { useState } from 'react'
import { Box, Container, Footer, Label, TagInputBox } from './styles'

import { Button } from '@components/Button'
import { Switch } from '@components/Switch'
import { Checkbox } from '@components/Checkbox'
import { TagInput } from '@components/TagInput'

import { PAYMENT_METHODS } from '../../data/paymentMethods'
import { FiltersDTO } from '@dtos/FiltersDTO'

type ValueProps = {
  key: string
  name: string
}

type FormFilterProps = {
  value?: FiltersDTO
  onChange: () => Promise<void>
  onAddingFilter: (filters: FiltersDTO) => void
}

export function FormFilter({
  value,
  onChange,
  onAddingFilter,
}: FormFilterProps) {
  const [is_new, setIs_new] = useState<string | undefined>(
    value?.is_new ?? undefined,
  )
  const [accept_trade, setAccept_trade] = useState<string | undefined>(
    value?.accept_trade ?? undefined,
  )
  const [payment_methods, setPayment_methods] = useState<
    ValueProps[] | undefined
  >(value?.payment_methods ?? undefined)

  function handleResetFilters() {
    setIs_new(undefined)
    setAccept_trade(undefined)
    setPayment_methods(undefined)

    onChange()
  }

  async function handleAplyFilters() {
    const formattedFilters: FiltersDTO = {
      is_new,
      accept_trade,
      payment_methods,
    }

    onAddingFilter(formattedFilters)
  }

  return (
    <Container>
      <Box>
        <Label>Condição</Label>
        <TagInputBox>
          <TagInput
            isActive={is_new === 'true'}
            label="NOVO"
            onChange={() => setIs_new('true')}
            onRemove={() => setIs_new(undefined)}
          />

          <TagInput
            isActive={is_new === 'false'}
            label="USADO"
            onChange={() => setIs_new('false')}
            onRemove={() => setIs_new(undefined)}
          />
        </TagInputBox>
      </Box>

      <Box>
        <Label>Aceita troca?</Label>
        <Switch
          value={accept_trade === 'true'}
          onChange={() =>
            setAccept_trade(accept_trade === 'true' ? 'false' : 'true')
          }
        />
      </Box>

      <Box style={{ marginBottom: 'auto' }}>
        <Label>Meios de pagamentos aceitos</Label>
        <Checkbox
          value={payment_methods}
          onChange={(value) => setPayment_methods(value)}
          options={PAYMENT_METHODS}
        />
      </Box>

      <Footer>
        <Button
          title="Resetar filtros"
          variant="primary"
          style={{ flex: 1 }}
          onPress={handleResetFilters}
        />

        <Button
          title="Aplicar filtros"
          variant="secondary"
          style={{ flex: 1 }}
          onPress={handleAplyFilters}
        />
      </Footer>
    </Container>
  )
}
