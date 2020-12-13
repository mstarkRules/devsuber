import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import Preload from '../screens/Preload';
import Login from '../screens/Login';
import HomeDrawer from '../navigators/HomeDrawer';

export default createAppContainer(createStackNavigator({

    Preload,
    Login,
    HomeDrawer
},{
    initialRouteName:'Preload',
    defaultNavigationOptions:{
        headerShown: false
    }
}));