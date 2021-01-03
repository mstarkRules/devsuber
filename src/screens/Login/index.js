import React, {useState} from 'react';
import { StatusBar, Platform, Text, ActivityIndicator } from 'react-native';

import {StackActions, NavigationActions} from 'react-navigation';
import {connect } from 'react-redux';

import useDevsUberApi from '../../useDevsUberApi';


import {
   Container, 
   Header, 
   HeaderTitle,
   Menu,
   MenuItem,
   MenuItemText,
   Input,
   ActionButton,
   ActionButtonText,
   LoadingArea
  } from './styled';

const Page = (props)=> {

    const api = useDevsUberApi();

    const [activeMenu, setActiveMenu] = useState('signin');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    //const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSignin = async ()=>{
      if(email && password){
        setLoading(true);
        const res = await api.signin(email, password);
        setLoading(false);

        if(res.error){
          alert(res.error);
        } else{
          // guardar o token no reducer
          props.setToken(res.token);
          props.setName(res.name);

          //redirecionar para o home
          props.navigation.dispatch(StackActions.reset({
              index:0,
              actions:[
                  NavigationActions.navigate({routeName: 'HomeDrawer'})
              ]
          }));

        }
      }
    }

    const handleSignup = async ()=>{
      if(name && email && password){
        setLoading(true);
        const res = await api.signup(name, email, password);
        setLoading(false);
      //  console.log(res);

        if(res.error){
          alert(res.error);
        } else{
          // guardar o token no reducer
          props.setToken(res.token);
          props.setName(res.name);
          //mandar para home
          props.navigation.dispatch(StackActions.reset({
              index:0,
              actions:[
                  NavigationActions.navigate({routeName: 'HomeDrawer'})
              ]
          }));

        }
      }
    }

    return (
      <Container behavior={Platform.OS === 'ios'?'padding':null}>

        <StatusBar barStyle="light-content"/>
        <Header>
          <HeaderTitle>DevsUber</HeaderTitle>
        </Header>
        <Menu>
          <MenuItem active={activeMenu =='signin'} onPress={()=>setActiveMenu('signin')} underlayColor='transparent'>
            <MenuItemText>Login</MenuItemText>
          </MenuItem>
          <MenuItem active={activeMenu == 'signup'} onPress={()=>setActiveMenu('signup')} underlayColor='transparent'>
            <MenuItemText>Cadastrar</MenuItemText>
          </MenuItem>
        </Menu>
        {activeMenu == 'signup' &&
          <Input editable={!loading} value={name} onChangeText={t=>setName(t)} placeholder='Nome' placeholderTextColor='#999'/>
        }

        <Input editable={!loading} value={email} onChangeText={t=>setEmail(t)} keyboardType="email-address" placeholder='Email' autoCapitalize='none' placeholderTextColor='#999'/>

        <Input editable={!loading} value={password} onChangeText={t=>setPassword(t)} placeholder='Senha' placeholderTextColor='#999'secureTextEntry={true}/>
        {activeMenu == 'signin' &&
          <ActionButton disabled={loading} onPress={handleSignin}>
            <ActionButtonText>Login</ActionButtonText>
          </ActionButton>
        }
        {activeMenu == 'signup' &&
          <ActionButton disabled={loading} onPress={handleSignup}>
            <ActionButtonText>Cadastrar</ActionButtonText>
          </ActionButton>
        }
  
        {loading &&
          <LoadingArea>
            <ActivityIndicator size="large" color="#FFF"/>
        </LoadingArea>
        }

      </Container>
    );
  }

const mapStateToProps = (state) => {
  return{
      token:state.userReducer.token
  };
}
const mapDispatchToProps = (dispatch) =>{
  return{
    setToken:(token)=>dispatch({type:'SET_TOKEN', payload:{token}}),
    //setName:(name)=>dispatch({type:'SET_NAME', payload:{name}})
    setName:(name)=>dispatch({type:'SET_NAME', payload:{name}})
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Page);