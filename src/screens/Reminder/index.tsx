import {makeStyles} from '@rneui/themed';
import React, {FunctionComponent} from 'react';
import {Text, View} from 'react-native';
import { ReminderHeader } from '@components/Header/ReminderHeader';

interface ReminderScreenProps {}

const useStyles = makeStyles((theme) => ({
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
      <ReminderHeader />
      <Text>Settings!</Text>
    </View>
  );
};

export default ReminderScreen;
