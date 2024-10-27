import { FunctionComponent, useState } from "react";
import { BottomSheet as BottomSheetUI, Button, ListItem, makeStyles } from '@rneui/themed';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StyleProp, View } from "react-native";

interface BottomSheetProps {
    style?: StyleProp<any> | (({ pressed }: { pressed: boolean }) => StyleProp<any>);
}

const useStyles = makeStyles(theme => ({
    button: {
        height: 50,
        margin: 10,
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
    }
}));

const BottomSheet: FunctionComponent<BottomSheetProps> = ({ style = {} }) => {
    const [isVisible, setIsVisible] = useState(false);
    const styles = useStyles();
    const list = [
        {
            title: '单个添加',
            containerStyle: styles.itemContainerStyle,
            titleStyle: styles.itemTitleStyle,
        },
        {
            title: '批量添加',
            containerStyle: styles.itemContainerStyle,
            titleStyle: styles.itemTitleStyle,
        },
        {
            title: '取消',
            containerStyle: styles.cancelContainerStyle,
            titleStyle: styles.cancelTitleStyle,
            onPress: () => setIsVisible(false),
        },
    ];

    return (
        <SafeAreaProvider>
            <Button
                title="Open Bottom Sheet"
                onPress={() => setIsVisible(true)}
                buttonStyle={[styles.button, style]}
            />
            <BottomSheetUI modalProps={{}} isVisible={isVisible}>
                <View style={styles.bottomSheetContainer}>
                    {list.slice(0, -1).map((l, i) => (
                        <ListItem
                            key={i}
                            containerStyle={l.containerStyle}
                            onPress={l.onPress}
                        >
                            <ListItem.Content>
                                <ListItem.Title style={l.titleStyle}>{l.title}</ListItem.Title>
                            </ListItem.Content>
                        </ListItem>
                    ))}
                </View>
                <ListItem
                    containerStyle={list[list.length - 1].containerStyle}
                    onPress={list[list.length - 1].onPress}
                >
                    <ListItem.Content>
                        <ListItem.Title style={list[list.length - 1].titleStyle}>{list[list.length - 1].title}</ListItem.Title>
                    </ListItem.Content>
                </ListItem>
            </BottomSheetUI>
        </SafeAreaProvider>
    );
}

export default BottomSheet;