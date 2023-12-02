import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Discovery from '../../screens/Discovery';
import PrinterInformation from '../../screens/PrinterInformation';

const Stack = createNativeStackNavigator();

export const RootNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Discovery" component={Discovery} />
        <Stack.Screen
          name="PrinterInformation"
          component={PrinterInformation}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
