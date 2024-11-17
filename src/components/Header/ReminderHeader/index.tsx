import { Dialog, makeStyles } from '@rneui/themed';
import { keyExists, storeData } from '@utils/storage';
import React, { FunctionComponent, useEffect, useState } from 'react';
import { Text, TextInput, View } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import PressableWrapperText from '@components/pressableText';
import { uploadImage } from '@utils/avatar';

interface ReminderHeaderProps {
    forceUpdate: (value: object) => void;
}

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
        color: theme.colors.grey3,
        marginHorizontal: 15,
    },
    editContainer: {
        width: '100%',
        marginVertical: 2,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    confirmText: {
        color: theme.colors.primary,
        fontSize: 16,
    },
    uploadText: {
        width: '100%',
        color: theme.colors.success,
        fontSize: 20,
    },
    editText: {
        maxWidth: '90%',
        fontSize: 16,
        color: theme.colors.grey4,
        marginVertical: 2,
    },
    inputTitle: {
        fontSize: 16,
        maxWidth: '70%',
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

export const ReminderHeader: FunctionComponent<ReminderHeaderProps> = ({ forceUpdate }) => {
    const styles = useStyles();
    const [visible, setVisible] = useState(false);
    const [imageSrc, setImageSrc] = useState('');
    const [imageSrcEdit, setImageSrcEdit] = useState(false);
    const [title, setTitle] = useState('');
    const [titleEdit, setTitleEdit] = useState(false);
    const [caption, setCaption] = useState('');
    const [captionEdit, setCaptionEdit] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            const data = await keyExists('tileData');
            if (data) {
                const tileData = JSON.parse(data);
                setImageSrc(tileData.imageSrc);
                setTitle(tileData.title);
                setCaption(tileData.caption);
            }
        };
        fetchData();
    }, []);

    const onPress = () => {
        setVisible(true);
    };

    const toggleDialog = async () => {
        setVisible(!visible);
        if (imageSrc || title || caption) {
            await storeData('tileData', {
                imageSrc,
                title,
                caption,
            });
            forceUpdate({imageSrc,title,caption});
        }
    };

    const handleUploadImage = () => {
        uploadImage((destPath) => {
            setImageSrc(destPath ?? '');
        });
    };

    return (
        <View style={styles.container}>
            <Ionicons name={'link'} size={24} style={styles.icon} onPress={onPress} />
            <Dialog isVisible={visible} onBackdropPress={toggleDialog} animationType="fade">
                <Dialog.Title title="重新设置背景图或文案" />
                <View style={styles.editContainer}>
                    <Text style={styles.inputTitle}>请填写图片链接</Text>
                    { imageSrcEdit && <PressableWrapperText style={styles.confirmText} text={'确定'} onPress={() => setImageSrcEdit(false)} /> }
                </View>
                {
                    imageSrcEdit ? <PressableWrapperText style={styles.uploadText} text={'上传图片'} onPress={() => handleUploadImage()} />
                     : <View style={styles.editContainer}>
                        <Text style={styles.editText} numberOfLines={1} ellipsizeMode="tail">
                            {imageSrc ? imageSrc : '默认图片链接'}
                        </Text>
                        <Ionicons name={'create'} size={24} style={styles.icon} onPress={() => setImageSrcEdit(true)} />
                    </View>
                }
                <View style={styles.editContainer}>
                    <Text style={styles.inputTitle}>请填写文案</Text>
                    { titleEdit && <PressableWrapperText style={styles.confirmText} text={'确定'} onPress={() => setTitleEdit(false)} /> }
                </View>
                {
                    titleEdit ? <TextInput
                        style={styles.imagInput}
                        onChangeText={setTitle}
                        value={title}
                        placeholder="请填写文案" />
                     : <View style={styles.editContainer}>
                        <Text style={styles.editText} numberOfLines={1} ellipsizeMode="tail">
                            {title ? title : '默认文案'}
                        </Text>
                        <Ionicons name={'create'} size={24} style={styles.icon} onPress={() => setTitleEdit(true)} />
                    </View>
                }
                <View style={styles.editContainer}>
                    <Text style={styles.inputTitle}>请填写文案</Text>
                    { captionEdit && <PressableWrapperText style={styles.confirmText} text={'确定'} onPress={() => setCaptionEdit(false)} /> }
                </View>
                {
                    captionEdit ? <TextInput
                        style={styles.imagInput}
                        onChangeText={setCaption}
                        value={caption}
                        placeholder="请填写标题" />
                     : <View style={styles.editContainer}>
                        <Text style={styles.editText} numberOfLines={1} ellipsizeMode="tail">
                            {caption ? caption : '默认标题'}
                        </Text>
                        <Ionicons name={'create'} size={24} style={styles.icon} onPress={() => setCaptionEdit(true)} />
                    </View>
                }
            </Dialog>
        </View>
    );
};
