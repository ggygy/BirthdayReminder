import { makeStyles, Text } from '@rneui/themed';
import React, { FunctionComponent } from 'react';
import { type GestureResponderEvent, Pressable, StyleProp, View } from 'react-native';

interface PressableWrapperTextProps {
  onPress?: (event: GestureResponderEvent) => void;
  onLongPress?: (event: GestureResponderEvent) => void;
  onPressIn?: (event: GestureResponderEvent) => void;
  onPressOut?: (event: GestureResponderEvent) => void;
  delayLongPress?: number;
  disabled?: boolean;
  style?: StyleProp<any> | (({ pressed }: { pressed: boolean }) => StyleProp<any>);
  text?: string;
  underline?: boolean;
  underlineColor?: string;
  underlineColorWidth?: number;
}

const useStyles = makeStyles(theme => ({
  text: {
    color: theme.colors.black,
    fontFamily: 'monospace',
    fontWeight: '600',
  },
  underline: {
    height: 3,
    backgroundColor: theme.colors.black,
    marginTop: 2,
    alignSelf: 'center',
    borderRadius: 2,
  },
  container: {
    flexDirection: 'column', // 垂直方向排列
    justifyContent: 'center', // 垂直方向居中对齐
    alignItems: 'center', // 水平方向居中对齐
  },
}));

const PressableWrapperText: FunctionComponent<PressableWrapperTextProps> = ({
  onPress,
  delayLongPress,
  onLongPress,
  onPressIn,
  onPressOut,
  disabled,
  style,
  text = '',
  underline = false,
  underlineColor = 'black',
  underlineColorWidth = 15,
}) => {
  const styles = useStyles();
  return (
    <Pressable
      onPress={onPress}
      delayLongPress={delayLongPress}
      onPressIn={onPressIn}
      onPressOut={onPressOut}
      onLongPress={onLongPress}
      disabled={disabled}
      style={[]}>
      <View style={styles.container}>
        <Text style={[styles.text, style]}>{text}</Text>
        {underline && <View style={[styles.underline, {
          width: underlineColorWidth,
          backgroundColor: underlineColor
        }]} />}
      </View>
    </Pressable>
  );
};

export default PressableWrapperText;
