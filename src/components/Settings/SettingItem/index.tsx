/* eslint-disable react/react-in-jsx-scope */
import { ListItem, makeStyles, Switch } from '@rneui/themed';
import { FunctionComponent, memo, useEffect, useState } from 'react';

export interface SettingItemProps {
    name: string
    handleOpen?: () => void
    handleUnOpen?: () => void
}

const useStyles = makeStyles(theme => ({
    bottomDividerStyle: {
        flex: 1,
        width: '100%',
        paddingHorizontal: 0,
        paddingVertical: 4,
        alignSelf: 'center', // 居中对齐
        borderBottomWidth: 0, // 自定义分割线宽度
        borderBottomColor: theme.colors.divider,
    },
    listItem: {
        marginLeft: 30,
        height: 50,
        alignItems: 'flex-start',
        justifyContent: 'center',
    },
    title: {
        fontSize: 18,
    },
}));

const SettingItem: FunctionComponent<SettingItemProps> = ({ name, handleOpen, handleUnOpen }) => {
    const styles = useStyles();
    const [open, setOpen] = useState(false);

    useEffect(() => {
        if (open && handleOpen) {
            handleOpen();
        }
        if (!open && handleUnOpen) {
            handleUnOpen();
        }
    }, [open, handleOpen, handleUnOpen]);

    return (
        <ListItem bottomDivider containerStyle={styles.bottomDividerStyle}>
            <ListItem.Content style={styles.listItem}>
                <ListItem.Title style={styles.title}>{name}</ListItem.Title>
            </ListItem.Content>
            <Switch value={open} onValueChange={(value) => setOpen(value)} />
        </ListItem>
    );
};

export default memo(SettingItem);
