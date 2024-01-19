export type ProductDTO = {
  id: string
  name: string
  description: string
  is_new: boolean
  price: number
  accept_trade: boolean
  payment_methods: string[]
  user_id: string
  is_active: boolean
}
