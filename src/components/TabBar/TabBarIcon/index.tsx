import {type ParamListBase, type RouteProp} from '@react-navigation/native';
import React, {FunctionComponent} from 'react';
import {ColorValue, StyleSheet} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

interface TabBarIconProps {
  route: RouteProp<ParamListBase, string>;
  focused: boolean;
  color: number | ColorValue | undefined;
  size: number | undefined;
}

const styles = StyleSheet.create({
  icon: {paddingTop: 7},
});

const TabBarIcon: FunctionComponent<TabBarIconProps> = ({
  route,
  focused,
  color,
  size,
}) => {
  let iconName: string = '';
  switch (route.name) {
    case 'Home':
      iconName = focused ? 'calendar-number' : 'calendar-number-outline';
      break;
    case 'Reminder':
      iconName = focused ? 'gift' : 'gift-outline';
      break;
    case 'Settings':
      iconName = focused ? 'settings' : 'settings-outline';
      break;
    default:
      break;
  }
  return (
    <Ionicons name={iconName} size={size} color={color} style={styles.icon} />
  );
};

export default TabBarIcon;
