import { useEffect, useState } from 'react'
import { Image, ScrollView } from 'react-native'

import * as ImagePicker from 'expo-image-picker'
import * as FileSystem from 'expo-file-system'

import { useTheme } from 'styled-components/native'
import {
  Container,
  ErrorMessage,
  ImageContainer,
  RemoveImage,
  SelectButton,
} from './styles'

import { Plus, X } from 'phosphor-react-native'
import { ImageDTO } from '@dtos/ImageDTO'
import Toast from 'react-native-toast-message'

type ImageSelectProps = {
  value?: ImageDTO[]
  size?: number
  errorMessage?: string
  onChange?: (images: ImageDTO[]) => void
}

export function ImageSelect({
  value,
  size = 3,
  errorMessage,
  onChange,
}: ImageSelectProps) {
  const [selectedImages, setSelectedImages] = useState<ImageDTO[]>(value ?? [])

  const { colors } = useTheme()

  function handleRemoveImage(name: string) {
    setSelectedImages((prevState) =>
      prevState.filter((item) => item.name !== name),
    )
  }

  async function handleImageAdd() {
    const selectedImage = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 4],
      quality: 1,
    })

    if (!selectedImage.canceled) {
      if (selectedImage.assets[0].uri) {
        const photoInfo = await FileSystem.getInfoAsync(
          selectedImage.assets[0].uri,
        )

        if (photoInfo.exists && photoInfo.size / 1024 / 1024 > 5) {
          return Toast.show({
            text1: 'Selecione imagens de no máximo 5 MB.',

            type: 'error',
            position: 'top',
          })
        }

        const fileExtension = selectedImage.assets[0].uri.split('.').pop()

        const photoFile: ImageDTO = {
          name: `${Math.random()
            .toString()
            .replace('0.', '')}.${fileExtension}`,

          uri: selectedImage.assets[0].uri,

          type: `${selectedImage.assets[0].type}/${fileExtension}`,
        }

        setSelectedImages((prevState) => [...prevState, photoFile])
      }
    }
  }

  useEffect(() => {
    if (onChange) {
      onChange(selectedImages)
    }
  }, [selectedImages])

  return (
    <Container>
      <ScrollView
        horizontal
        contentContainerStyle={{ gap: 8 }}
        showsHorizontalScrollIndicator={false}
      >
        {selectedImages &&
          selectedImages.map((item) => (
            <ImageContainer key={item.name}>
              <Image
                source={{
                  uri: item.uri,
                }}
                style={{ width: '100%', height: '100%' }}
                resizeMode="cover"
                alt="Imagem do produto"
              />
              <RemoveImage
                activeOpacity={0.7}
                onPress={() => handleRemoveImage(item.name)}
              >
                <X size={12} color={colors.gray_100} />
              </RemoveImage>
            </ImageContainer>
          ))}

        {selectedImages.length < size && (
          <SelectButton activeOpacity={0.7} onPress={handleImageAdd}>
            <Plus size={24} color={colors.gray_400} />
          </SelectButton>
        )}
      </ScrollView>

      {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
    </Container>
  )
}
