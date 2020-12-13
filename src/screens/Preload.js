import {StackActions, NavigationActions} from 'react-navigation';
import {connect } from 'react-redux';

const Preload = (props) => {
   
    //se não tem token manda pra login
    if(!props.token){
        //login
        props.navigation.dispatch(StackActions.reset({
            index:0,
            actions:[
                NavigationActions.navigate({routeName: 'Login'})
            ]
        }));
    } else{
        //home
        props.navigation.dispatch(StackActions.reset({
            index:0,
            actions:[
                NavigationActions.navigate({routeName: 'Login'})
            ]
        }));
    }
    return null;
}


const mapStateToProps = (state) => {
    return{
        token:state.userReducer.token
    };
}

export default connect(mapStateToProps)(Preload);