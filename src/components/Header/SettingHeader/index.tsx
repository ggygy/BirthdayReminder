import {makeStyles, useThemeMode} from '@rneui/themed';
import React, {FunctionComponent} from 'react';
import {View} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';

interface SettingHeaderProps {}

const useStyles = makeStyles((theme, props?: Partial<SettingHeaderProps>) => ({
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
}));

export const SettingHeader: FunctionComponent<SettingHeaderProps> = () => {
  const styles = useStyles();
  const {mode, setMode} = useThemeMode();

  const onPress = () => {
    if (mode === 'light') {
      setMode('dark');
    } else {
      setMode('light');
    }
  };

  return (
    <View style={styles.container}>
      <MaterialIcons
        onPress={onPress}
        name={mode === 'light' ? 'light-mode' : 'dark-mode'}
        size={24}
        style={styles.icon}
      />
      <Ionicons name={'settings-outline'} size={24} style={styles.icon} />
    </View>
  );
};
