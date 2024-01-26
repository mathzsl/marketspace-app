import {
  Container,
  Description,
  Label,
  PaymentBox,
  PaymentBoxLabel,
  ProductInfoContent,
  ProductInfoHeader,
  ProductName,
  ProductPrice,
  Tag,
  UserInfo,
  UserName,
} from './styles'

import { api } from '@services/api'

import { useAuth } from '@hooks/useAuth'

import { Avatar } from '@components/Avatar'
import { Text } from '@components/Typography'
import { PaymentIcons } from '@components/PaymentIcons'

import { ProductFormDTO } from '@dtos/ProductFormDTO'

type ProductInfoProps = {
  data: ProductFormDTO
}

export function MyProductInfo({ data }: ProductInfoProps) {
  const { user } = useAuth()

  return (
    <Container>
      <UserInfo>
        <Avatar
          source={{ uri: `${api.defaults.baseURL}/images/${user.avatar}` }}
          size="sm"
        />
        <UserName>{user.name}</UserName>
      </UserInfo>

      <ProductInfoContent>
        <Tag>{data.is_new ? 'NOVO' : 'USADO'}</Tag>

        <ProductInfoHeader>
          <ProductName>{data.name}</ProductName>

          <ProductPrice>
            R$
            <Text font="heading" color="blue_300" size="lg">
              {data.price}
            </Text>
          </ProductPrice>
        </ProductInfoHeader>

        <Description>{data.description}</Description>

        <Label>
          Aceita troca?{'  '}
          <Text size="sm" color="gray_600">
            {data.accept_trade ? 'sim' : 'não'}
          </Text>
        </Label>

        <Label>Meios de pagamento:</Label>

        {data.payment_methods && (
          <PaymentBox>
            {data.payment_methods.map((item) => (
              <PaymentBoxLabel key={item.key}>
                <PaymentIcons method={item.key} />
                <Text>{item.name}</Text>
              </PaymentBoxLabel>
            ))}
          </PaymentBox>
        )}
      </ProductInfoContent>
    </Container>
  )
}
