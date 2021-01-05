import { createDrawerNavigator } from 'react-navigation-drawer';
import CustomDrawer from '../components/CustomDrawer';

import Home from '../screens/Home/index';
import Config from '../screens/Config/index';
import History from '../screens/History/index'

export default createDrawerNavigator({
    Home,
    Config,
    History
},{
    contentComponent: CustomDrawer
});