import React, {useState, useEffect} from 'react';
import { Modal } from 'react-native';
import styled from 'styled-components/native';

import Geocoder from 'react-native-geocoding';
import {MapsAPI} from '../config';


const ModalArea = styled.View`
    flex:1;
    background-color:#FFF;
`;

const ModalHeader = styled.View`
    flex-direction:row;
    align-items:center;
    padding:20px;

`;

const ModalClose = styled.TouchableHighlight`
    width:40px;
    height:40px;
    justify-content:center;
    align-items:center;
    background-color:#EEE;
    border-radius:20px;
`;

const ModalCloseText = styled.Text`

`;

const ModalInput = styled.TextInput`
    margin-left:20px;
    font-size:18px;
    color:#000;

`;

const ModalResults = styled.View`

`;

const ModalResult = styled.TouchableHighlight`
    padding:15px;

`;

const ModalResultText = styled.Text`
    color:#000;
    font-size:16px;
`;



export default (props)=>{

    const [results, setResults] = useState([]);
    const [searchText, setSearchText] = useState('');

    useEffect(()=>{
        Geocoder.init(MapsAPI, {language:'pt-br'});
    },[]);

    useEffect(()=>{
        if(searchText){
            //fazer a pesquisa
        }
    }, [searchText]);

    const handleCloseAction = ()=>{
        props.visibleAction(false);
    }
    return (
        <Modal
            animationType="slide"
            transparent={false}
            visible={props.visible}
        >
            <ModalArea>
                <ModalHeader>
                    <ModalClose onPress={handleCloseAction} underlayColor="#CCC">
                        <ModalCloseText>X</ModalCloseText>
                    </ModalClose>
                    <ModalInput value={searchText} onChangeText={t=>setSearchText(t)} placeholder={props.title} placeholderTextColor="#999" autoFocus={true}/>
                </ModalHeader>
                <ModalResults>

                    {results.map((i, k)=>{
                        <ModalResult key={k}>
                        <ModalResultText>i.adress</ModalResultText>
                    </ModalResult>
                    })}
                </ModalResults>
            </ModalArea>

        </Modal>
    );
}