import React from 'react';
import { Modal } from 'react-native';
import styled from 'styled-components/native';

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

const ModalTitle = styled.Text`
    margin-left:20px;
    font-size:18px;
    color:#999;
    font-weight:bold;
`;

export default (props)=>{

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
                    <ModalTitle>{props.title}</ModalTitle>
                </ModalHeader>

            </ModalArea>

        </Modal>
    );
}