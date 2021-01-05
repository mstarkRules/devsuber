
import React, { useState, useEffect } from 'react';
import { FlatList } from 'react-native-gesture-handler';

import { connect } from 'react-redux';

import MenuDrawer from '../../components/MenuDrawer';
import HistoricoItem from '../../components/HistoricoItem';
import { 
    Container,
    ContainerScroll,
    Header,
    HeaderText,
    HistoricoLista
} from './styled';


const Page = (props)=>{
    const [trips, setTrips] = useState([
        {   
            id: '234',
            from: 'santarem',
            to: 'alter do chão',
            price: '50' 
        },
        {
            id:'123',
            from: 'Diamantino',
            to: 'Centro',
            price: '40'
        },
        {
            id:'34',
            from: 'Diamantino',
            to: 'Centro',
            price: '40'
        },
        {
            id:'56',
            from: 'Diamantino',
            to: 'Centro',
            price: '40'
        },
        {
            id:'24',
            from: 'Diamantino',
            to: 'Centro',
            price: '40'
        },
        {
            id:'32',
            from: 'Diamantino',
            to: 'Centro',
            price: '40'
        }
    ]);

    useEffect(()=>{
        console.log(trips[0].from)
    },[]);

    const handleMenu = ()=>{
        props.navigation.openDrawer();
    }

    return(
        <Container>        
            <Header>
                <HeaderText>Histórico</HeaderText>
            </Header>
            <MenuDrawer handleMenuAction={handleMenu}/>             
            <HistoricoLista
                data={trips}
                renderItem={({item})=> <HistoricoItem
                    data={item}
                />}
            />
        </Container>
        
        
    );
}


export default Page;