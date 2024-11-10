/* eslint-disable react/react-in-jsx-scope */
import { FunctionComponent, useMemo } from 'react';
import { FlatList, type ListRenderItemInfo } from 'react-native';
import { makeStyles } from '@rneui/themed';
import CustomListItem, { type CustomListItemProps } from '@components/CustomListItem';
import { exportData, importData } from '@utils/file';

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
        ];
    }, []);

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
                    onPress={item.onPress}
                    listContainerStyle={styles.listItemContainer}
                    listTitleStyle={styles.textStyle}
                    listContentStyle={styles.listContentStyle}
                />
            }
        />
    );
};

export default Settings;
