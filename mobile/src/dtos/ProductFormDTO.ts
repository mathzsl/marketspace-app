import { ImageDTO } from './ImageDTO'

export type ProductFormDTO = {
  name: string
  description: string
  is_new: boolean
  price: number
  accept_trade: boolean
  payment_methods: { key: string; name: string }[]
  images: ImageDTO[]
}
