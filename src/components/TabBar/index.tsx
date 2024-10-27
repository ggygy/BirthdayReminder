/* eslint-disable react-native/no-inline-styles */
import React, {FunctionComponent} from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import TabBarIcon from './TabBarIcon';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSequence,
  withSpring,
} from 'react-native-reanimated';
import type {BottomTabBarProps} from '@react-navigation/bottom-tabs';
import {makeStyles} from '@rneui/themed';

interface TabBarProps extends BottomTabBarProps {}

const useStyles = makeStyles(theme => ({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: theme.colors.background,
    alignItems: 'center',
    height: 60,
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 8,
  },
  tabText: {
    fontSize: 14,
  },
  indicator: {
    height: 3,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
}));

const TabBar: FunctionComponent<TabBarProps> = ({
  state,
  descriptors,
  navigation,
}) => {
  const scale = useSharedValue(1);
  const styles = useStyles();

  const TabBarLabel: {[key: string]: string} = {
    Home: '生日',
    Reminder: '祝福',
    Settings: '设置',
  };

  const springConfig = {
    stiffness: 500, // 刚度，数值越大，动画越快完成
    damping: 200, // 阻尼，数值越大，动画停止得越快
    mass: 3, // 质量，数值越大，动画越慢
  };

  const animatedTabStyle = useAnimatedStyle(() => {
    return {
      transform: [{scale: scale.value}],
    };
  });

  return (
    <View style={styles.container}>
      {state.routes.map((route, index: number) => {
        const {options} = descriptors[route.key];
        const label = TabBarLabel[route.name];

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name, route.params);
          }
          scale.value = withSequence(
            withSpring(1.06, springConfig),
            withSpring(1, springConfig),
          );
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        return (
          <TouchableOpacity
            accessibilityRole="button"
            key={index}
            accessibilityState={isFocused ? {selected: true} : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            activeOpacity={1}
            style={styles.tab}>
            <Animated.View style={isFocused ? animatedTabStyle : {}}>
              <TabBarIcon
                route={route}
                focused={isFocused}
                size={24}
                color={isFocused ? '#63B7FB' : '#acb4bf'}
              />
              <Text
                style={[
                  styles.tabText,
                  {color: isFocused ? '#63B7FB' : '#acb4bf'},
                ]}>
                {label}
              </Text>
            </Animated.View>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

export default TabBar;
