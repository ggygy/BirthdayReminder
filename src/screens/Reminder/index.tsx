import {makeStyles} from '@rneui/themed';
import React, {FunctionComponent} from 'react';
import {Text, View} from 'react-native';
import {SettingHeader} from '@components/Header';

interface ReminderScreenProps {}

const useStyles = makeStyles((theme, props?: Partial<ReminderScreenProps>) => ({
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
  },
}));

const ReminderScreen: FunctionComponent<ReminderScreenProps> = () => {
  const styles = useStyles();

  return (
    <View style={styles.container}>
      <SettingHeader />
      <Text>Settings!</Text>
    </View>
  );
};

export default ReminderScreen;
