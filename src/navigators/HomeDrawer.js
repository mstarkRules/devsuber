import { createDrawerNavigator } from 'react-navigation-drawer';
import CustomDrawer from '../components/CustomDrawer';

import Home from '../screens/Home/index';
import Config from '../screens/Config/index';


export default createDrawerNavigator({
    Home,
    Config
},{
    contentComponent: CustomDrawer
});