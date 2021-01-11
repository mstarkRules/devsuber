import React from 'react';

import styled from 'styled-components/native';

const Container = styled.TouchableOpacity`
    margin:15px;
    padding:10px;
    justify-content: center;
    border-radius:5px;
    border-width:0.5px;
    border-color:#CCC;
`;

const IntineraryItem = styled.View`
    flex:1;
    border-bottom-width:0.5px;
    border-bottom-color:#CCC;
    justify-content:center;
    padding-bottom:15px;
    padding-top:10px;
`;

const IntineraryLabel = styled.View`
    flex:1;
    flex-direction: row;
    align-items:center;
    margin-bottom:5px;
`;

const IntineraryPoint = styled.View`
    height: 10px;
    width: 10px;
    border-radius:5px;
    background-color:${props=>props.color};
    margin-right: 10px;
`;

const IntineraryLabelText = styled.Text`
    color:#AAA;
`;

const TitleText = styled.Text`
    font-size: 20px;
    color:#000;
`;



export default (props)=>{
    return(
        <Container>
            <IntineraryItem>
                <IntineraryLabel>
                    <IntineraryPoint color="#00FF00"/>
                    <IntineraryLabelText>De</IntineraryLabelText>
                </IntineraryLabel>
                <TitleText>{props.data.fromLoc}</TitleText>
            </IntineraryItem>
            <IntineraryItem>
                <IntineraryLabel>
                    <IntineraryPoint color="#0000FF"/>
                    <IntineraryLabelText>Para</IntineraryLabelText>
                </IntineraryLabel>
                <TitleText>{props.data.toLoc}</TitleText>
            </IntineraryItem>
            <TitleText>Preço: {props.data.price.toFixed(2)}</TitleText>
            {props.data.myReview != 0 &&
                <TitleText>Minha avaliação: {props.data.myReview}</TitleText>
            }

        </Container>
    );
}