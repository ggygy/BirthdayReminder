import React, {FunctionComponent} from 'react';
import {View} from 'react-native';
import {HomeHeaderMemo} from '@components/Header';
import {HomePageProvider} from '@context/homePageContext';
import {makeStyles} from '@rneui/themed';
import BottomSheet from '@components/BottomSheet';
import BirthDayCardGroups from '@components/BirthDayCardGroups';

interface HomeScreenProps {}

const useStyles = makeStyles(theme => ({
  container: {
    flex: 1,
    alignItems: 'center',
    position: 'relative',
    backgroundColor: theme.colors.background,
  },
  bottomSheet: {
    position: 'absolute',
    bottom: 50,
    right: 24,
  },
}));

const HomeScreen: FunctionComponent<HomeScreenProps> = () => {
  const styles = useStyles();
  return (
    <HomePageProvider>
      <View style={styles.container}>
        <HomeHeaderMemo />
        <BirthDayCardGroups />
        <BottomSheet buttonStyle={styles.bottomSheet}/>
      </View>
    </HomePageProvider>
  );
};

export default HomeScreen;
