import React, {useState, useEffect} from 'react';
import { Modal } from 'react-native';
import styled from 'styled-components/native';


const ModalArea = styled.View`
    flex:1;
    background-color:#FFF;
    justify-content:center;
    align-items:center;
`;

const DriverHeadline = styled.Text`
    font-size: 24px;
    font-weight: bold;
    color: #000;
    margin-bottom: 20px;
`;

const DriverAvatar = styled.Image`
    width: 120px;
    height: 120px;
    border-radius: 60px;
`;

const DriverName = styled.Text`
    margin: 20px;
    font-size: 25px;
    font-weight: bold;
    color: #000;

`;

const DriverStars = styled.Text`
    color: #999;
    font-size: 17px;
`;

const DriverCarInfo = styled.View`
    width: 100%;
    margin: 20px;
    border-top-width: 1px;
    border-top-color: #999;
    border-bottom-width: 1px;
    border-bottom-color: #999;
    align-items: center;
    padding:20px;
`;

const DriverCar = styled.Text`
   font-size: 17px;
   color: #000; 

`;

const DriverColor = styled.Text`
    font-size: 15px;
    color:#999;

`;

const DriverPlate = styled.Text`
    font-size: 20px;
    color:#000;
`;

const TripButton = styled.TouchableHighlight`
    height: 50px;
    background-color: #3574cb;
    border-radius: 5px;
    justify-content: center;
    align-items:center;
    width:80%;
`;

const TripButtonText = styled.Text`
    font-size:17px;
    color: #FFF;
`;


export default (props)=>{

    return (
        <Modal
            animationType="slide"
            transparent={false}
            visible={props.visible}
        >
            <ModalArea>
                <DriverHeadline>Seu motorista é:</DriverHeadline>
                <DriverAvatar source={{uri:props.driver.avatar}}/>
                <DriverName>{props.driver.name}</DriverName>
                <DriverStars>{props.driver.stars} estrelas</DriverStars>
                <DriverCarInfo>
                    <DriverCar>{props.driver.carName}</DriverCar>          
                    <DriverColor>{props.driver.carColor}</DriverColor>
                    <DriverPlate>{props.driver.carPlate}</DriverPlate>
                </DriverCarInfo>
                <TripButton>
                    <TripButtonText>Encerrar viagem</TripButtonText>
                </TripButton>
                
    
            </ModalArea>

        </Modal>
    );
}