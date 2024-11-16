import {makeStyles} from '@rneui/themed';
import React, {FunctionComponent, useEffect, useState} from 'react';
import {View} from 'react-native';
import { ReminderHeader } from '@components/Header/ReminderHeader';
import BlessTile from '@components/BlessTile';
import { keyExists } from '@utils/storage';

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
  const [tileData, setTileData] = useState({
    imageSrc: undefined,
    title: undefined,
    caption: undefined,
  });

  useEffect(() => {
    const fetchTileData = async () => {
      const tileDataStore = await keyExists('tileData');
      if (tileDataStore) {
        const tileDataTemp = JSON.parse(tileDataStore);
        if (tileDataTemp.imageSrc && tileDataTemp.title && tileDataTemp.caption) {
          setTileData(tileDataTemp);
        }
      }
    };
    fetchTileData();
  },[]);

  return (
    <View style={styles.container}>
      <ReminderHeader />
      <BlessTile imageSrc={tileData.imageSrc} title={tileData.title} caption={tileData.caption}/>
    </View>
  );
};

export default ReminderScreen;
