
import React, { useState, useEffect } from 'react';

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
    const [trips, setTrips] = useState([]);

    useEffect(()=>{
        preencherTrips();
        console.log('tem em trips: ',trips)
    },[props.trips]);

    const preencherTrips=()=>{
        let novo = [...props.trips];

        setTrips(novo);
    }

    const handleMenu = ()=>{
        props.navigation.openDrawer();
    }

    return(
        <Container>        
            <Header>
                <HeaderText>Histórico</HeaderText>
            </Header>
            <MenuDrawer handleMenuAction={handleMenu}/>             
            {trips &&
                <HistoricoLista
                    data={trips}
                    renderItem={({item})=> <HistoricoItem
                        data={item}
                    />}
                />
            }
            
        </Container>
        
        
    );
}

const mapStateToProps = (state)=>{
    return{
        trips: state.tripReducer.trips
    };
}


export default connect(mapStateToProps)(Page);