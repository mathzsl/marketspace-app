import { useState } from 'react'
import { TouchableOpacityProps, View } from 'react-native'

import { useTheme } from 'styled-components/native'
import { Container, IconBox, IconBoxWithOutImage } from './styles'

import Toast from 'react-native-toast-message'

import { PencilLine, User } from 'phosphor-react-native'

import { Avatar } from '@components/Avatar'

import * as FileSystem from 'expo-file-system'
import * as ImagePicker from 'expo-image-picker'

import { ImageDTO } from '@dtos/ImageDTO'

type UserPhotoProps = TouchableOpacityProps & {
  onChange: (image: ImageDTO) => void
}

export function UserPhotoSelect({ onChange, ...rest }: UserPhotoProps) {
  const { colors } = useTheme()

  const [selectedImage, setSelectedImage] = useState('')

  async function handleUserPhotoSelect() {
    try {
      const selectedPhoto = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 4],
        quality: 1,
      })

      if (!selectedPhoto.canceled) {
        if (selectedPhoto.assets[0].uri) {
          const photoInfo = await FileSystem.getInfoAsync(
            selectedPhoto.assets[0].uri,
          )

          if (photoInfo.exists && photoInfo.size / 1024 / 1024 > 5) {
            return Toast.show({
              text1: 'Selecione uma foto de no máximo 5 MB.',

              type: 'error',
              position: 'top',
            })
          }

          const fileExtension =
            selectedPhoto.assets[0].uri.split('.').pop() ?? ''

          const photoFile: ImageDTO = {
            name: `${Math.random()
              .toString()
              .replace('0.', '')}.${fileExtension}`,
            uri: selectedPhoto.assets[0].uri,
            type: `${selectedPhoto.assets[0].type}/${fileExtension}`,
          }

          setSelectedImage(selectedPhoto.assets[0].uri)
          onChange(photoFile)
        }
      }
    } catch (error) {
      Toast.show({
        text1: 'Houve um erro ao tentar carregar a foto.',
        type: 'error',
        position: 'top',
      })
    }
  }

  return (
    <View>
      <Container
        size="lg"
        activeOpacity={0.7}
        onPress={handleUserPhotoSelect}
        {...rest}
      >
        {!selectedImage ? (
          <IconBoxWithOutImage>
            <User size={'60%'} weight="bold" color={colors.gray_400} />
          </IconBoxWithOutImage>
        ) : (
          <Avatar source={{ uri: selectedImage }} />
        )}

        <IconBox>
          <PencilLine size={16} color={colors.gray_200} />
        </IconBox>
      </Container>
    </View>
  )
}
