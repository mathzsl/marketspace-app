import { useTheme } from 'styled-components/native'
import { Bank, Barcode, CreditCard, Money, QrCode } from 'phosphor-react-native'

type PaymentIconsProps = {
  method: 'boleto' | 'pix' | 'cash' | 'card' | 'deposit'
}

export function PaymentIcons({ method }: PaymentIconsProps) {
  const { colors } = useTheme()

  switch (method) {
    case 'deposit':
      return <Bank size={18} color={colors.gray_700} />
    case 'boleto':
      return <Barcode size={18} color={colors.gray_700} />
    case 'card':
      return <CreditCard size={18} color={colors.gray_700} />
    case 'cash':
      return <Money size={18} color={colors.gray_700} />
    case 'pix':
      return <QrCode size={18} color={colors.gray_700} />
    default:
      return <Money size={18} color={colors.gray_700} />
  }
}
