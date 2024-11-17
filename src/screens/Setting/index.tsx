import {makeStyles} from '@rneui/themed';
import React, {FunctionComponent} from 'react';
import {View} from 'react-native';
import {SettingHeader} from '@components/Header';
import Settings from '@components/Settings';

interface SettingsScreenProps {}

const useStyles = makeStyles(() => ({
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
  },
}));

const SettingsScreen: FunctionComponent<SettingsScreenProps> = () => {
  const styles = useStyles();

  return (
    <View style={styles.container}>
      <SettingHeader />
      <Settings />
    </View>
  );
};

export default SettingsScreen;
