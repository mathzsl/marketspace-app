import { useState } from 'react'
import { Dimensions, Image, View } from 'react-native'

import { Message, Overlay, Step, Steps } from './styles'

import Carousel from 'react-native-reanimated-carousel'
import { api } from '@services/api'

type ImageSliderProps = {
  isDisabled?: boolean
  formatImage?: boolean
  images: string[]
}

export function ImageSlider({
  images,
  formatImage = false,
  isDisabled = false,
}: ImageSliderProps) {
  const [currentIndex, setCurrentIndex] = useState(0)

  const width = Dimensions.get('window').width
  const height = Dimensions.get('window').height

  return (
    <Overlay>
      {isDisabled && <Message>Anúncio desativado</Message>}

      <View style={{ flex: 1, opacity: isDisabled ? 0.6 : 1 }}>
        <Carousel
          loop={false}
          width={width}
          height={height / 2.5}
          data={images}
          scrollAnimationDuration={1000}
          onProgressChange={(_, absoluteProgress) =>
            setCurrentIndex(Math.round(absoluteProgress + 1))
          }
          renderItem={({ item }) => (
            <View
              style={{
                flex: 1,
              }}
            >
              <Image
                source={{
                  uri: !formatImage
                    ? item
                    : `${api.defaults.baseURL}/images/${item}`,
                }}
                style={{
                  width: '100%',
                  height: '100%',
                  backgroundColor: '#000',
                }}
                resizeMode="cover"
                alt="Imagem do produto"
              />
            </View>
          )}
        />
        <Steps>
          {Array.from({ length: images.length }, (_, i) => i + 1).map(
            (step) => (
              <Step key={step} isActive={step === currentIndex} />
            ),
          )}
        </Steps>
      </View>
    </Overlay>
  )
}
