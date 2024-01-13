import { ReactNode, RefObject, useMemo } from 'react'

import { useTheme } from 'styled-components/native'
import { Container, Header, Title } from './styles'

import { Portal } from '@gorhom/portal'

import { X } from 'phosphor-react-native'

import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetModalProvider,
} from '@gorhom/bottom-sheet'
import { TouchableOpacity } from 'react-native-gesture-handler'

type BottomSheetProps = {
  title: string
  children: ReactNode
  bottomSheetModalRef: RefObject<BottomSheetModal>
}

export function BottomSheet({
  bottomSheetModalRef,
  title,
  children,
}: BottomSheetProps) {
  const { colors } = useTheme()

  const snapPoints = useMemo(() => ['1%', '75%'], [])

  return (
    <Portal>
      <BottomSheetModalProvider>
        <BottomSheetModal
          ref={bottomSheetModalRef}
          index={1}
          snapPoints={snapPoints}
          enablePanDownToClose
          backgroundStyle={{
            backgroundColor: colors.gray_200,
          }}
          backdropComponent={BottomSheetBackdrop}
          handleIndicatorStyle={{ backgroundColor: colors.gray_400 }}
        >
          <Container>
            <Header>
              <Title>{title}</Title>
              <TouchableOpacity
                activeOpacity={0.7}
                onPress={() => bottomSheetModalRef.current?.close()}
              >
                <X size={24} color={colors.gray_400} weight="bold" />
              </TouchableOpacity>
            </Header>

            {children}
          </Container>
        </BottomSheetModal>
      </BottomSheetModalProvider>
    </Portal>
  )
}
