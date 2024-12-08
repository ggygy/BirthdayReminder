import RNFS from 'react-native-fs';
import { Alert } from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';

export const uploadAvatar = async (onSuccessCallback?: (destPath?: string) => void) => {
    try {
        const image = await ImagePicker.openPicker({
          width: 80,
          height: 80,
          cropping: true,
          mediaType: 'photo',
        });

        const fileName = image.path.split('/').pop();
        const destPath = `${RNFS.DocumentDirectoryPath}/${fileName}`;

        await RNFS.copyFile(image.path, destPath);
        onSuccessCallback && onSuccessCallback(`file://${destPath}`);
        Alert.alert('成功', '头像保存成功!');
      } catch (error) {
        Alert.alert('失败', '无法在本地保存头像。');
      }
};

export const uploadImage = async (onSuccessCallback?: (destPath?: string) => void) => {
  try {
      const image = await ImagePicker.openPicker({
        cropping: true,
        freeStyleCropEnabled: true, // 允许用户自由裁剪
        mediaType: 'photo',
      });

      const fileName = image.path.split('/').pop();
      const destPath = `${RNFS.DocumentDirectoryPath}/${fileName}`;

      await RNFS.copyFile(image.path, destPath);
      onSuccessCallback && onSuccessCallback(`file://${destPath}`);
      Alert.alert('成功', '图片保存成功!');
    } catch (error) {
      Alert.alert('失败', '无法在本地保存图片。');
    }
};
