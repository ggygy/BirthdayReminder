import { makeStyles } from '@rneui/themed';
import React, { FunctionComponent, useState } from 'react';
import { ScrollView, View } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';
import PressableWrapperText from '../../pressableText';

interface HomeHeaderProps {
  newGroup?: string[];
}

const useStyles = makeStyles((theme, props?: Partial<HomeHeaderProps>) => ({
  container: {
    flex: 1,
    flexDirection: 'row',
    maxHeight: 50,
    width: '100%',
    backgroundColor: theme.colors.background,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  group: {
    maxWidth: '70%',
    flex: 1,
    flexDirection: 'row',
    paddingHorizontal: 5,
  },
  label: {
    fontSize: 16,
    marginHorizontal: 8,
    color: theme.colors.black,
  },
  labelActive: {
    fontSize: 18,
    marginHorizontal: 8,
    color: theme.colors.black,
  },
  tools: {
    maxWidth: '30%',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingHorizontal: 5,
    alignItems: 'center',
  },
  icon: {
    color: theme.colors.black,
    marginHorizontal: 10,
  },
}));

export const HomeHeader: FunctionComponent<HomeHeaderProps> = ({ newGroup = ['分组一', '分组二'] }) => {
  const styles = useStyles();
  const group = ['我的好友', ...newGroup];
  const [active, setActive] = useState(0);

  const handlePress = (index: number) => {
    setActive(index);
  }

  return (
    <View style={styles.container}>
      <ScrollView
        horizontal={true} // 设置为横向滚动
        showsHorizontalScrollIndicator={false} // 隐藏水平滚动条
        showsVerticalScrollIndicator={false} // 隐藏垂直滚动条
        contentContainerStyle={{ alignItems: 'center' }}
        style={styles.group}>
        {
          group.map((item, index) => {
            return <PressableWrapperText key={index}
              style={active === index ? styles.labelActive : styles.label}
              text={item}
              onPress={() => handlePress(index)}
              underline={active === index}
              underlineColor='red'
              />
          })
        }
      </ScrollView>
      <View style={styles.tools}>
        <Ionicons name={'search'} size={24} style={styles.icon} />
        <Entypo name={'dots-three-vertical'} size={20} style={styles.icon} />
      </View>
    </View>
  );
};
