import { useEffect, useState } from 'react'
import {
  Switch as NativeSwitch,
  SwitchProps as NativeSwitchProps,
} from 'react-native'

import { useTheme } from 'styled-components/native'

type SwitchProps = NativeSwitchProps & {
  value?: boolean
  onValueChange: (value: boolean) => void
}

export function Switch({ value, onValueChange, ...rest }: SwitchProps) {
  const [switchValue, setSwitchValue] = useState(value ?? false)

  const { colors } = useTheme()

  function switchToggle() {
    setSwitchValue((prevState) => !prevState)
  }

  useEffect(() => {
    onValueChange(switchValue)
  }, [switchValue])

  return (
    <NativeSwitch
      style={{
        alignSelf: 'flex-start',
        transform: [{ scaleX: 1.2 }, { scaleY: 1.2 }],
      }}
      trackColor={{ false: colors.gray_300, true: colors.blue_300 }}
      thumbColor={colors.gray_100}
      onChange={switchToggle}
      value={switchValue}
      ios_backgroundColor={colors.gray_300}
      {...rest}
    />
  )
}
