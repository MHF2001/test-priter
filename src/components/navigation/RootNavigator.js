import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Discovery from '../../screens/Discovery';
import PrinterInformation from '../../screens/PrinterInformation';
import MyWebView from '../MyWebView';
import TopTabNavigation from './TabNavigation';
import Main from '../../screens/MainPrinter';

const Stack = createNativeStackNavigator();

export const RootNavigator = () => {
  return (
    <NavigationContainer>
      {/* <TopTabNavigation /> */}
      <Stack.Navigator>
        {/* <Stack.Screen
          name="webView"
          component={MyWebView}
          options={{headerShown: false}}
        /> */}
        <Stack.Screen
          name="TopNavigation"
          options={{headerShown: false}}
          component={TopTabNavigation}
        />

        <Stack.Screen name="Discovery" component={Discovery} />
        <Stack.Screen
          name="PrinterInformation"
          component={PrinterInformation}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
