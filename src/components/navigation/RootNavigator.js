import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Discovery from '../../screens/Discovery';
import PrinterInformation from '../../screens/PrinterInformation';
import {useSelector} from 'react-redux';
import MyWebView from '../MyWebView';

const Stack = createNativeStackNavigator();

export const RootNavigator = () => {
  const state = useSelector(state => state.printerReducers);

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {state?.length > 0 ? (
          <>
            <Stack.Screen
              name="webView"
              component={MyWebView}
              options={{headerShown: false}}
            />
            <Stack.Screen name="Discovery" component={Discovery} />
            <Stack.Screen
              name="PrinterInformation"
              component={PrinterInformation}
            />
          </>
        ) : (
          <>
            <Stack.Screen name="Discovery" component={Discovery} />
            <Stack.Screen
              name="PrinterInformation"
              component={PrinterInformation}
            />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};
