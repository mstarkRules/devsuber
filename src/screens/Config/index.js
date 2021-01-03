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
    Input,
    ItemTextStrong,
    ItemTextMid,
    ItemTextMidArea,
    TextArea,
    TextAreaButton,
    ContainerEdit
} from './styled';



const Page = (props) =>{

    const [visibleInput, setVisibleInput] = useState(false);
    const [inputText, setInputText] = useState('');
    const [name, setName] = useState(props.name);
    const [email, setEmail] = useState(props.email);

    const handleMenu = ()=>{
        props.navigation.openDrawer();
    }

    const handleEdit = ()=>{
        if(name){
            props.setName(name);
        } else{
            alert('Digite um nome, brodi');
        }
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
                    <ItemText>{props.email}</ItemText>
                </ItemArea>
                
            </InfoArea>
            <ContainerEdit>
                <ItemTextMidArea>
                    <ItemTextMid>Informações Básicas</ItemTextMid>
                </ItemTextMidArea>
                <TextArea>
                    <>
                        <ItemTexSmall>NOME</ItemTexSmall>
                        <Input value={name} placeholder='name' onChangeText={t=>setName(t)} onEndEditing={handleEdit}/>
                    </>
                    
                </TextArea>
                <TextAreaButton>
                    <>
                        <ItemTexSmall>EMAIL</ItemTexSmall>
                        <ItemTextMid>{email}</ItemTextMid>
                    </>
                    
                </TextAreaButton>
                
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