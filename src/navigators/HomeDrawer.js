import { createDrawerNavigator } from 'react-navigation-drawer';
import CustomDrawer from '../components/CustomDrawer';

import Home from '../screens/Home/index';

export default createDrawerNavigator({
    Home
},{
    contentComponent: CustomDrawer
});