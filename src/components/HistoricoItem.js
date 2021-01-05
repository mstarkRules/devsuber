import React from 'react';

import styled from 'styled-components/native';

const Container = styled.TouchableOpacity`
    height:100px;
    margin:15px;
    padding:10px;
    justify-content: center;
    border-radius:5px;
    border-width:0.5px;
`;

const TitleText = styled.Text`
    font-size: 20px;
    color:#000;
`;

export default (props)=>{
    return(
        <Container>
            <TitleText>{props.data.from}</TitleText>
            <TitleText>{props.data.to}</TitleText>
            <TitleText>{props.data.price}</TitleText>
        </Container>
    );
}