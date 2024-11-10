/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable react-native/no-inline-styles */
import { Icon, ListItem, makeStyles } from '@rneui/themed';
import { FunctionComponent, memo, useState } from 'react';
import { Switch, type StyleProp } from 'react-native';

export interface CustomListItemProps {
    iconName: string;
    iconType: string;
    title: string;
    open?: boolean;
    hasSwitch?: boolean;
    setOpen?: (value: boolean) => void;
    onPress?: () => void;
    listContainerStyle?: StyleProp<any>;
    listTitleStyle?: StyleProp<any>;
    listContentStyle?: StyleProp<any>;
    iconSize?: number;
}

const useStyles = makeStyles((theme) => ({
    listContainer: {
      width: '100%',
      backgroundColor: theme.colors.background,
      flexDirection: 'row',
      height: 45,
      justifyContent: 'center',
      alignItems: 'center',
      margin: 0,
      paddingVertical: 0,
      paddingLeft: 10,
      paddingRight: 20,
    },
    input: {
        width: '30%',
        height: 45,
        padding: 0,
        margin: 0,
    },
    listContent: {
        width: '100%',
        margin: 0,
        padding: 0,
        justifyContent: 'center',
        alignItems: 'center',
    },
    listTitle: {
      fontSize: 16,
      paddingBottom: 2,
      color: theme.colors.black,
    },
  }));

const CustomListItem: FunctionComponent<CustomListItemProps> = ({
    iconName,
    iconType = '',
    title, onPress,
    hasSwitch,
    open,
    setOpen,
    listContainerStyle,
    listContentStyle,
    listTitleStyle,
    iconSize = 20,
}) => {
    const styles = useStyles();
    const [isPressed, setIsPressed] = useState(false);

    return (
        <ListItem
            onPressIn={() => setIsPressed(true)}
            onPressOut={() => setIsPressed(false)}
            onPress={onPress}
            containerStyle={[
                styles.listContainer,
                { backgroundColor: isPressed ? '#d3d3d3' : styles.listContainer.backgroundColor },
                listContainerStyle,
            ]}
        >
            <Icon name={iconName} type={iconType} size={iconSize}/>
            <ListItem.Content style={[styles.listContent, listContentStyle]}>
                <ListItem.Title style={[styles.listTitle, listTitleStyle]}>{title}</ListItem.Title>
            </ListItem.Content>
            { hasSwitch && <Switch value={open} onValueChange={(value) => setOpen && setOpen(value)} /> }
        </ListItem>
    );
};

export default memo(CustomListItem);
