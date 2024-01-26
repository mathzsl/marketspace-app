import {
  Switch as NativeSwitch,
  SwitchProps as NativeSwitchProps,
} from 'react-native'

import { useTheme } from 'styled-components/native'

type SwitchProps = NativeSwitchProps

export function Switch({ value, ...rest }: SwitchProps) {
  const { colors } = useTheme()

  return (
    <NativeSwitch
      style={{
        alignSelf: 'flex-start',
        transform: [{ scaleX: 1.2 }, { scaleY: 1.2 }],
      }}
      trackColor={{ false: colors.gray_300, true: colors.blue_300 }}
      thumbColor={colors.gray_100}
      value={value}
      ios_backgroundColor={colors.gray_300}
      {...rest}
    />
  )
}
