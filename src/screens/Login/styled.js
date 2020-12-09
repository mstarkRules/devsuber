import styled from 'styled-components/native';

export const Container = styled.SafeAreaView`
    flex:1;
`;

export const Header = styled.View`
    height:150px;
    background-color: #3574CB;
    justify-content:center;
    padding-left: 20px;
`;

export const HeaderTitle = styled.Text`
    color: #FFF;    
    font-size: 27px;
`;


export const Menu = styled.View`
    background-color:#3574CB;
    flex-direction: row;
`;

export const MenuItem = styled.TouchableHighlight`
    margin: 20px;
`;

export const MenuItemText = styled.Text``;