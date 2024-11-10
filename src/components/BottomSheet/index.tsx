/* eslint-disable react/react-in-jsx-scope */
import { FunctionComponent, memo, useState } from 'react';
import { BottomSheet as BottomSheetUI, Button, ListItem, makeStyles } from '@rneui/themed';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { StyleProp, TouchableOpacity, View } from 'react-native';
import BirthDayAdditional from '@components/birthDayAdditional';

interface BottomSheetProps {
    buttonStyle?: StyleProp<any> | (({ pressed }: { pressed: boolean }) => StyleProp<any>);
}

const useStyles = makeStyles(theme => ({
    buttonStyle: {
        width: 40,
        height: 40,
        borderRadius: 40,
        margin: 0,
        padding: 0,
        backgroundColor: '#ff5a5d',
    },
    bottomSheetContainer: {
        borderRadius: 10,
        overflow: 'hidden', // 确保子元素不会超出边界
    },
    itemContainerStyle: {
        backgroundColor: theme.colors.background,
        borderBottomWidth: 0.2,
        borderBottomColor: theme.colors.grey5, // 设置底部边框颜色
        alignItems: 'center',
        justifyContent: 'center',
    },
    itemTitleStyle: {
        color: theme.colors.black,
        alignSelf: 'center',
    },
    cancelContainerStyle: {
        marginTop: 10,
        marginBottom: 5,
        borderRadius: 10,
        backgroundColor: theme.colors.background,
    },
    cancelTitleStyle: {
        color: theme.colors.error,
        alignSelf: 'center',
    },
    buttonContainerStyle: {
        alignSelf: 'center',
    },
}));

const BottomSheet: FunctionComponent<BottomSheetProps> = ({ buttonStyle = {} }) => {
    const [isVisible, setIsVisible] = useState(false);
    const [isDialogVisible, setIsDialogVisible] = useState(false);
    const [isBatch, setIsBatch] = useState(false);
    const styles = useStyles();

    const list = [
        {
            title: '单个添加',
            containerStyle: styles.itemContainerStyle,
            titleStyle: styles.itemTitleStyle,
            onPress: () => {
                setIsVisible(false);
                setIsBatch(false);
                setIsDialogVisible(true);
            },
        },
        {
            title: '批量添加',
            containerStyle: styles.itemContainerStyle,
            titleStyle: styles.itemTitleStyle,
            onPress: () => {
                setIsVisible(false);
                setIsBatch(true);
                setIsDialogVisible(true);
            },
        },
        {
            title: '取消',
            containerStyle: styles.cancelContainerStyle,
            titleStyle: styles.cancelTitleStyle,
            onPress: () => setIsVisible(false),
        },
    ];

    return (
        <>
            <Button
                icon={<AntDesign name="plus" size={20} color="white" />}
                onPress={() => setIsVisible(true)}
                // eslint-disable-next-line react-native/no-inline-styles
                titleStyle={{ fontSize: 22, fontWeight: 100 }}
                buttonStyle={styles.buttonStyle}
                containerStyle={buttonStyle} />
            <BirthDayAdditional visible={isDialogVisible} isBatch={isBatch} setIsDialogVisible={setIsDialogVisible}/>
            <SafeAreaProvider>
                <BottomSheetUI modalProps={{ presentationStyle: 'fullScreen' }} isVisible={isVisible}>
                    <View style={styles.bottomSheetContainer}>
                        {list.slice(0, -1).map((l, i) => (
                            <ListItem
                                key={i}
                                containerStyle={l.containerStyle}
                                onPress={l.onPress}
                            >
                                <TouchableOpacity style={styles.buttonContainerStyle} onPress={l.onPress}>
                                    <ListItem.Title style={l.titleStyle}>{l.title}</ListItem.Title>
                                </TouchableOpacity>
                            </ListItem>
                        ))}
                    </View>
                    <ListItem
                        containerStyle={list[list.length - 1].containerStyle}
                        onPress={list[list.length - 1].onPress}
                    >
                        <ListItem.Content>
                            <TouchableOpacity style={styles.buttonContainerStyle} onPress={list[list.length - 1].onPress}>
                                <ListItem.Title style={list[list.length - 1].titleStyle}>{list[list.length - 1].title}</ListItem.Title>
                            </TouchableOpacity>
                        </ListItem.Content>
                    </ListItem>
                </BottomSheetUI>
            </SafeAreaProvider>
        </>
    );
};

export default memo(BottomSheet);
