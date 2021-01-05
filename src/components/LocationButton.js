import React from 'react';
import styled from 'styled-components/native';


const MenuArea = styled.TouchableOpacity`
    width: 60px;
    height: 60px;
    position:absolute;
    right: 0 ;
    top: 0;
    justify-content: center;
    align-items:center;
`;

const MenuImage = styled.Image`
    width: 40px;
    height: 40px;
`;


export default (props) =>{

    const handleLocClick = ()=>{
        props.handleLocAction();
    }

    return(
        <MenuArea onPress={handleLocClick} underlayColor="transparent">
            <MenuImage source={require('../assets/loc2.png')}/>
        </MenuArea> 
    );
}