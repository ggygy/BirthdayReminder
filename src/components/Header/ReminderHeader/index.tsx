import {makeStyles, useThemeMode} from '@rneui/themed';
import React, {FunctionComponent} from 'react';
import {View} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';

interface ReminderHeaderProps {}

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
}));

export const ReminderHeader: FunctionComponent<ReminderHeaderProps> = () => {
  const styles = useStyles();

  const onPress = () => {
    
  };

  return (
    <View style={styles.container}>
      <Ionicons name={'settings-outline'} size={24} style={styles.icon} onPress={onPress}/>
    </View>
  );
};
