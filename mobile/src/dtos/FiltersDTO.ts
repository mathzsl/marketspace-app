export type FiltersDTO = {
  is_new: string | undefined
  accept_trade: string | undefined
  payment_methods: { key: string; name: string }[] | undefined
  query?: string | undefined
}
