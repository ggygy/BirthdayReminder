/* eslint-disable react/no-unstable-nested-components */
import React, {useEffect} from 'react';
import {isMountedRef} from './src/utils/routingNavigation';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import SplashScreen from 'react-native-splash-screen';
import HomeScreen from '@screens/Home';
import SettingsScreen from '@screens/Setting';
import ReminderScreen from '@screens/Reminder';
import TabBar from '@components/TabBar';
import {theme} from '@utils/theme';
import {ThemeProvider} from '@rneui/themed';

const Tab = createBottomTabNavigator();

function App(): React.JSX.Element {
  // Hide the screen image
  useEffect(() => {
    SplashScreen.hide();
  }, []);

  // Set the mounted ref
  useEffect(() => {
    isMountedRef.current = true;

    return () => {
      isMountedRef.current = false;
    };
  }, []);
  return (
    <ThemeProvider theme={theme}>
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={{
            tabBarShowLabel: false,
            // tabBarVisible: false,
          }}
          tabBar={props => <TabBar {...props} />}>
          <Tab.Screen
            name="Home"
            options={{headerShown: false}}
            component={HomeScreen}
          />
          <Tab.Screen
            name="Reminder"
            options={{headerShown: false}}
            component={ReminderScreen}
          />
          <Tab.Screen
            name="Settings"
            options={{headerShown: false}}
            component={SettingsScreen}
          />
        </Tab.Navigator>
      </NavigationContainer>
    </ThemeProvider>
  );
}

export default App;
