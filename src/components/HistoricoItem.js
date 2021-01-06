import React from 'react';

import styled from 'styled-components/native';

const Container = styled.TouchableOpacity`
    flex:1;
    margin:15px;
    padding:10px;
    justify-content: center;
    border-radius:5px;
    border-width:0.5px;
    border-color:#CCC;
`;

const ItemText = styled.View`
    flex:1;
    border-bottom-width:0.5px;
    border-bottom-color:#CCC;
    justify-content:center;
    padding-bottom:15px;
    padding-top:10px;
`;

const TitleText = styled.Text`
    font-size: 20px;
    color:#000;
`;

export default (props)=>{
    return(
        <Container>
            <ItemText>
                <TitleText>De: {props.data.fromLoc}</TitleText>
            </ItemText>
            <ItemText>
                <TitleText>Para: {props.data.toLoc}</TitleText>
            </ItemText>
            <TitleText>Preço: {props.data.price.toFixed(2)}</TitleText>

        </Container>
    );
}