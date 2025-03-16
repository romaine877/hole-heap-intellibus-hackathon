import * as ImagePicker from 'expo-image-picker';
import { urisToBase64 } from './uriToBlobs';
import { Alert } from 'react-native';

export interface IUploadedImage {
  uri: string;
  name: string;
  base64: string;
}

export async function pickImage(): Promise<IUploadedImage | null> {
  const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
  let imageUri: string = ''
  if (status !== 'granted') {
    Alert.alert(
        'Permission Required',
        'Sorry, we need camera roll permissions to upload photos!'
      );
    return null ;
  }

  const result = await ImagePicker.launchImageLibraryAsync({
    
    mediaTypes: ['images'],
    allowsMultipleSelection: false, 

    quality: 1,
  });

  if (!result.canceled) {
    imageUri = result.assets.map(asset => asset.uri)[0]; 
    const base64s = await urisToBase64([imageUri]);

    const extension = imageUri.split('.').pop();
    const timestamp = Date.now();
    const random = Math.floor(Math.random() * 10000);
    const fileName = `${timestamp}_${random}.${extension}`;

    return {
      uri: imageUri,
      name: fileName,
      base64: base64s[0]
    };
  }

  return null;
}