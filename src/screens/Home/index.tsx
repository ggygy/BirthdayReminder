import React, {FunctionComponent} from 'react';
import {View} from 'react-native';
import {HomeHeader} from '@components/Header';
import {HomePageProvider} from '@context/homePageContext';
import {makeStyles} from '@rneui/themed';
import BottomSheet from '@components/BottomSheet';

interface HomeScreenProps {}

const useStyles = makeStyles(theme => ({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: theme.colors.background,
  },
  bottomSheet: {
    position: 'absolute',
    bottom: 320,
    top: 100,
  },
}));

const HomeScreen: FunctionComponent<HomeScreenProps> = () => {
  const styles = useStyles();
  return (
    <HomePageProvider>
      <View style={styles.container}>
        <HomeHeader />
        <BottomSheet style={styles.bottomSheet}/>
      </View>
    </HomePageProvider>
  );
};

export default HomeScreen;
