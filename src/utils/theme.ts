import {type Colors, createTheme} from '@rneui/themed';
import type {RecursivePartial} from '@rneui/themed/dist/config/theme';

const lightColors: RecursivePartial<Colors> = {
  background: '#ffffff',
};

const darkColors: RecursivePartial<Colors> = {
  background: '#121212',
};

export const theme = createTheme({
  lightColors: lightColors,
  darkColors: darkColors,
  mode: 'light', // 'light' | 'dark'
});
