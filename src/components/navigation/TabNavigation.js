import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import Discovery from '../../screens/Discovery';
import Main from '../../screens/MainPrinter';
import OrderPrinter from '../../screens/OrderPrinter';

const Tab = createMaterialTopTabNavigator();

function TopTabNavigation() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Main Printer" component={Main} />
      <Tab.Screen name="Order printer" component={OrderPrinter} />
    </Tab.Navigator>
  );
}

export default TopTabNavigation;
