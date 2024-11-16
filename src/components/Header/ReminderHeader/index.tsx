import { Dialog, makeStyles } from '@rneui/themed';
import { storeData } from '@utils/storage';
import React, { FunctionComponent, useState } from 'react';
import { Text, TextInput, View } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

interface ReminderHeaderProps { }

const useStyles = makeStyles((theme) => ({
  container: {
    flex: 1,
    flexDirection: 'row',
    maxHeight: 50,
    width: '100%',
    backgroundColor: theme.colors.background,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  icon: {
    color: theme.colors.grey2,
    marginHorizontal: 15,
  },
  inputTitle: {
    fontSize: 16,
    color: theme.colors.black,
    marginVertical: 5,
  },
  imagInput: {
    height: 80,
    width: '100%',
    borderWidth: 1,
    borderColor: theme.colors.primary,
    borderRadius: 5,
    justifyContent: 'flex-start',
    textAlignVertical: 'top',
  },
}));

export const ReminderHeader: FunctionComponent<ReminderHeaderProps> = () => {
  const styles = useStyles();
  const [visible, setVisible] = useState(false);
  const [imageSrc, setImageSrc] = useState('');
  const [title, setTitle] = useState('');
  const [caption, setCaption] = useState('');

  const onPress = () => {
    setVisible(true);
  };

  const toggleDialog = async () => {
    setVisible(!visible);
    if (imageSrc && title && caption) {
      await storeData('tileData', {
        imageSrc,
        title,
        caption,
      });
    }
  };

  return (
    <View style={styles.container}>
      <Ionicons name={'link'} size={24} style={styles.icon} onPress={onPress} />
      <Dialog isVisible={visible} onBackdropPress={toggleDialog} animationType="slide">
        <Dialog.Title title="重新设置背景图或文案" />
        <Text style={styles.inputTitle}>请填写图片链接</Text>
        <TextInput
          style={styles.imagInput}
          onChangeText={setImageSrc}
          value={imageSrc}
          placeholder="请输入图片链接"
        />
        <Text style={styles.inputTitle}>请填写文案</Text>
        <TextInput
          style={styles.imagInput}
          onChangeText={setTitle}
          value={title}
          placeholder="请填写文案"
        />
        <Text style={styles.inputTitle}>请填写文案</Text>
        <TextInput
          style={styles.imagInput}
          onChangeText={setCaption}
          value={caption}
          placeholder="请填写标题"
        />
      </Dialog>
    </View>
  );
};
