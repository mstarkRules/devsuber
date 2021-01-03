import React, { useState } from 'react';
import { connect } from 'react-redux';

import MenuDrawer from '../../components/MenuDrawer';


import {
    ConfigText,
    Container,
    ConfigArea,
    InfoArea,
    Avatar,
    ItemArea,
    ItemTexSmall,
    ItemText,
    ItemTextStrong,
    ItemTextMid,
    ItemTextMidArea,
    TextArea,
    ContainerEdit
} from './styled';



const Page = (props) =>{

    const handleMenu = ()=>{
        props.navigation.openDrawer();
    }

    return(
        <Container>
            <MenuDrawer handleMenuAction={handleMenu}/>
            <InfoArea>
                <Avatar/>
                <ItemArea>
                    <ItemTextStrong>{props.name}</ItemTextStrong>
                </ItemArea>
                <ItemArea>
                    <ItemText>markstm10@gmail.com</ItemText>
                </ItemArea>
                
            </InfoArea>
            <ContainerEdit>
                <ItemTextMidArea>
                    <ItemTextMid>Informações Básicas</ItemTextMid>
                </ItemTextMidArea>
                <TextArea>
                    <ItemTexSmall>NOME</ItemTexSmall>
                    <ItemTextMid>{props.name}</ItemTextMid>
                </TextArea>
                <TextArea>
                    <ItemTexSmall>EMAIL</ItemTexSmall>
                    <ItemTextMid>markstm10@gmail.com</ItemTextMid>
                </TextArea>
                
            </ContainerEdit>
            
        </Container>
        
    );
}

const mapStateToProps = (state)=>{
    return{
        name: state.userReducer.name,
        email: state.userReducer.email
    };
}

const mapDispatchToProps = (dispatch)=>{
    return{
        setName:(name)=>dispatch({type:'SET_NAME', payload: {name}}),
        setEmail:(email)=>dispatch({type:'SET_EMAIL', payload:{email}})
    };
}


export default connect(mapStateToProps, mapDispatchToProps)(Page); 