import styled from 'styled-components/native';

export const Container = styled.ScrollView`
    flex:1;
`;

export const InfoArea = styled.View`
    flex:1;
    justify-content: center;
    align-items: center;
    margin-bottom:30px;
`;

export const Avatar = styled.Image`
    height: 100px;
    width:100px;
    border-radius: 50px;
    background-color:#CCC;
    margin:10px;
`;

export const ItemArea = styled.View`
    padding:2px;
`;
export const ItemTexSmall = styled.Text`
    font-size:12px;
    color:#000;
`;

export const ItemText = styled.Text`
    font-size:16px;
`;

export const ItemTextMid = styled.Text`
    font-size:18px;
    
`;

export const Input = styled.TextInput`
    padding:0;
    font-size:18px;
    
`;

export const ItemTextStrong = styled.Text`
    font-size:26px;
    font-weight:bold;
`;

 export const ItemTextMidArea = styled.View`
    height:70px;
    border-bottom-color:#AAA;
    border-bottom-width:0.5px;
 `;

 export const TextArea = styled.View`
    height: 70px;
    border-top-color:#AAA;
    border-top-width:0.5px;
    justify-content:center;
    padding-bottom:2px;
 `;

 export const TextAreaButton = styled.TouchableOpacity`
    height: 70px;
    border-top-color:#AAA;
    border-top-width:0.5px;
    justify-content:center;
    padding-bottom:2px;
 `;

export const ContainerEdit = styled.View`
    flex:1;
    justify-content:flex-start;
    margin:10px;
    padding:10px;
    border-radius:10px;
    border-color:#AAA;
    border-width:0.5px;

`;