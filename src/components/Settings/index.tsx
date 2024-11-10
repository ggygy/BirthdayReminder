/* eslint-disable react/react-in-jsx-scope */
import { FunctionComponent, useEffect, useMemo, useState } from 'react';
import { FlatList, type ListRenderItemInfo } from 'react-native';
import { makeStyles } from '@rneui/themed';
import CustomListItem, { type CustomListItemProps } from '@components/CustomListItem';
import { exportData, importData } from '@utils/file';
import { keyExists, storeData } from '@utils/storage';
import { cancelNotification, requestExactAlarmPermission } from '@utils/notification';

interface SettingsProps {

}

const useStyles = makeStyles(theme => ({
    listContentStyle: {
        width: 420,
        marginTop: 3,
        marginBottom: 5,
    },
    textStyle: {
        fontSize: 22,
        alignSelf: 'flex-start',
        color: theme.colors.grey1,
    },
    listContainer: {
        display: 'flex',
        width: '100%',
        backgroundColor: theme.colors.white,
        paddingLeft: 10,
    },
    listItemContainer: {
        height: 55,
        paddingVertical: 5,
    },
}));

const Settings: FunctionComponent<SettingsProps> = () => {
    const styles = useStyles();
    const [Notification, setNotification] = useState(false);

    useEffect(() => {
        const getNotification = async () => {
            const notification = await keyExists('Notification');
            if (notification) {
                setNotification(JSON.parse(notification));
            }
        };
        getNotification();
    }, []);

    const settingList: CustomListItemProps[] = useMemo(() => {
        return [
            {
                title: '导出数据',
                iconName: 'file-export',
                iconType: 'material-community',
                onPress: exportData,
            },
            {
                title: '导入数据',
                iconName: 'file-import',
                iconType: 'material-community',
                onPress: importData,
            },
            {
                title: '消息通知',
                iconName: 'notifications',
                iconType: 'ionicons',
                onPress: () => {},
                hasSwitch: true,
                open: Notification,
                setOpen: async (open: boolean) => {
                    setNotification(open);
                    cancelNotification();
                    await storeData('Notification', open);
                    if (open) {
                        await requestExactAlarmPermission();
                    }
                },
            },
        ];
    }, [Notification]);

    return (
        <FlatList
            keyExtractor={item => item.title}
            style={styles.listContainer}
            data={settingList}
            renderItem={({ item }: ListRenderItemInfo<CustomListItemProps>) =>
                <CustomListItem
                    key={item.title}
                    title={item.title}
                    iconName={item.iconName}
                    iconType={item.iconType}
                    iconSize={24}
                    hasSwitch={item?.hasSwitch}
                    onPress={item?.onPress}
                    open={item?.open}
                    setOpen={item?.setOpen}
                    listContainerStyle={styles.listItemContainer}
                    listTitleStyle={styles.textStyle}
                    listContentStyle={styles.listContentStyle}
                />
            }
        />
    );
};

export default Settings;
