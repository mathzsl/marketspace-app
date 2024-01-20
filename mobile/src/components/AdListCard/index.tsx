import { TouchableOpacityProps } from 'react-native'
import {
  Container,
  Header,
  Inactive,
  Price,
  ProductImage,
  Tag,
  Title,
} from './styles'

import { api } from '@services/api'

import { Avatar } from '@components/Avatar'
import { Text } from '@components/Typography'
import { ProductDTO } from '@dtos/ProductDTO'

import { priceFormatter } from '@utils/Formatter'
import { useTheme } from 'styled-components/native'

type AdListCardProps = TouchableOpacityProps & {
  data: ProductDTO
  withAvatar?: boolean
  isActive?: boolean
}

export function AdListCard({
  data,
  isActive = true,
  withAvatar = true,
  ...rest
}: AdListCardProps) {
  const formattedPrice = priceFormatter(data.price).replace('R$', '')

  const { colors } = useTheme()

  return (
    <Container activeOpacity={0.7} {...rest}>
      <Header>
        {withAvatar && (
          <Avatar
            source={{
              uri: `${api.defaults.baseURL}/images/${data.user.avatar}`,
            }}
            size="sm"
            variant="primary"
          />
        )}

        <Tag
          style={{
            opacity: isActive ? 1 : 0.7,
            backgroundColor: data.is_new ? colors.blue_700 : colors.gray_700,
          }}
        >
          {data.is_new ? 'NOVO' : 'USADO'}
        </Tag>
      </Header>

      <ProductImage
        resizeMode="contain"
        source={{
          uri: `${api.defaults.baseURL}/images/${data.product_images[0].path}`,
        }}
      />

      {!isActive && <Inactive>Anúncio desativado</Inactive>}

      <Title color={isActive ? 'gray_600' : 'gray_400'} numberOfLines={1}>
        {data.name}
      </Title>

      <Price color={isActive ? 'gray_600' : 'gray_400'}>
        R$
        <Text color={isActive ? 'gray_600' : 'gray_400'} font="heading">
          {formattedPrice}
        </Text>
      </Price>
    </Container>
  )
}
