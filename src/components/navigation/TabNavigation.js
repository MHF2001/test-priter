import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import Discovery from '../../screens/Discovery';

const Tab = createMaterialTopTabNavigator();

function TopTabNavigation() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Discovery" component={Discovery} />
      {/* <Tab.Screen name="Settings" component={} /> */}
    </Tab.Navigator>
  );
}

export default TopTabNavigation;
