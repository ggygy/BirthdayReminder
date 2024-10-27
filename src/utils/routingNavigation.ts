import {createRef} from 'react';

/*
 * Created the global navigation
 */

export const isMountedRef: any = createRef();
export const navigationRef: any = createRef();

export const navigation = {
  navigate(name: string, params?: any) {
    if (isMountedRef.current && navigationRef.current) {
      navigationRef.current.navigate(name, params);
    }
  },
  goBack() {
    if (isMountedRef.current && navigationRef.current) {
      navigationRef.current.goBack();
    }
  },
  setParams(obj: Object) {
    navigationRef.current.setParams(obj);
  },
};

export const goBack = () => {
  navigation.goBack();
};

export const goToHome = () => {
  navigation.navigate('Home');
};

export const goToReminder = () => {
  navigation.navigate('Reminder');
};

export const goToSetting = () => {
  navigation.navigate('Setting');
};
