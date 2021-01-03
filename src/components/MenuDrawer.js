import React from 'react';
import styled from 'styled-components/native';


const MenuArea = styled.TouchableHighlight`
    width: 60px;
    height: 60px;
    position:absolute;
    left: 0 ;
    top: 0;
    justify-content: center;
    align-items:center;
`;

const MenuImage = styled.Image`
    width: 24px;
    height: 24px;
`;


export default (props) =>{

    const handleMenuClick = ()=>{
        props.handleMenuAction();
    }

    return(
        <MenuArea onPress={handleMenuClick} underlayColor="transparent">
            <MenuImage source={require('../assets/menu.png')}/>
        </MenuArea> 
    );
}



