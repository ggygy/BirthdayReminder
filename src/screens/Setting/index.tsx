import {makeStyles} from '@rneui/themed';
import React, {FunctionComponent} from 'react';
import {Text, View} from 'react-native';
import {SettingHeader} from '@components/Header';

interface SettingsScreenProps {}

const useStyles = makeStyles((theme, props?: Partial<SettingsScreenProps>) => ({
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
      <Text>Settings!</Text>
    </View>
  );
};

export default SettingsScreen;