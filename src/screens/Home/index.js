import React, {useRef, useState, useEffect} from 'react';
import { StatusBar, SafeAreaView, Text, ActivityIndicator } from 'react-native';
import MapView from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
import Geocoder from 'react-native-geocoding';
import MapViewDirections from 'react-native-maps-directions';
import {MapsAPI} from '../../config';
import { connect } from 'react-redux';

import * as TripActions from '../../actions/TripActions';

import useDevsUberApi from '../../useDevsUberApi';
import AddressModal from '../../components/AdressModal';
import DriverModal from '../../components/DriverModal';
import LocationButton from '../../components/LocationButton';

import { 
    Container,
    MenuArea,
    MenuImage,
    IntineraryArea,
    IntineraryItem,
    IntineraryLabel,
    IntineraryPoint,
    IntineraryTitle,
    IntineraryValue,
    IntineraryPlaceholder,
    RequestDetails,
    RequestDetail,
    RequestTitle,
    RequestValue,
    requestDistance,
    requestPrice,
    requestTime,
    RequestButtons,
    RequestButton,
    RequestButtonText,
    LoadingArea

} from './styled';

const Page = (props)=>{

    const map = useRef();
    const api = useDevsUberApi();

    const [mapLoc, setMapLoc] = useState({
        center: {
            latitude:-2.43944,
            longitude:-54.6987
        },
        zoom:14,
        pitch:0,
        altitude:0,
        heading:0
    });

    const [fromLoc, setFromLoc] = useState({});
    const [toLoc, setToLoc] = useState({});
    const [showDirections, setShowDirections] = useState(false);
    const [requestDistance, setRequestDistance] = useState(0);
    const [requestTime, setRequestTime] = useState(0);
    const [requestPrice, setRequestPrice] = useState(0);
    const [modalTitle, setModalTitle] = useState('');
    const [modalVisible, setModalVisible] = useState(false);
    const [modalField, setModalField] = useState('');
    const [loading, setLoading] = useState(false);
    const [driverInfo, setDriverInfo] = useState({});
    const [driverModalVisible, setDriverModalVisible] = useState(false);


    useEffect(()=>{
        Geocoder.init(MapsAPI, {language:'pt-br'});
        getMyCurrentPosition();
    },[]);

    useEffect(()=>{
        if(fromLoc.center && toLoc.center){
            setShowDirections(true);
        }
    },[toLoc]);

    useEffect (()=>{
        if(fromLoc.center){
            setMapLoc(fromLoc);
        }
    },[fromLoc]);

    const getMyCurrentPosition = ()=>{
        Geolocation.getCurrentPosition(async (info)=>{
         //   console.log("COORDENADAS: ", info.coords);

            const geo = await Geocoder.from(info.coords.latitude, info.coords.longitude);

            if(geo.results.length > 0){
                const loc = {
                    name:geo.results[0].formatted_address,
                    center:{
                        latitude: info.coords.latitude,
                        longitude: info.coords.longitude
                    },
                    zoom:16,
                    pitch:0,
                    altitude:0,
                    heading:0
                    };

                    setMapLoc(loc);
                    setFromLoc(loc);
                    
                }

        },(error)=>{

        });
    }

    const handleFromClick =()=>{
        setModalTitle('Escolha uma origem');
        setModalField('from');
        setModalVisible(true);
    }

    const handleToClick=async ()=>{
        setModalTitle('Escolha um destino');
        setModalField('to');
        setModalVisible(true);

        /*
        */

    }


    const handleDirectionsReady = async (r)=>{
        setRequestDistance(r.distance);
        setRequestTime(r.duration);

        const priceReq = await api.getRequestPrice(r.distance);
        if (!priceReq.error){
            setRequestPrice(priceReq.price);
        }
        

        map.current.fitToCoordinates(r.coordinates,{
            edgePadding:{
                left:50,
                right:50,
                bottom:20,
                top:1100
            }
        });
    }

    const handleRequestGo = async() =>{
        setLoading(true);
        const driver = await api.findDriver({
            fromLat: fromLoc.center.latitude,
            fromLng: fromLoc.center.longitude,
            toLat: toLoc.center.latitude,
            toLng: toLoc.center.longitude
        });
        setLoading(false);

        if(!driver.error){
            //achou motorista
            setDriverInfo(driver.driver);
            setDriverModalVisible(true);
            
            handleRequestCancel();

         //   alert(driver.dados.name);
        } else{
            alert(driver.error);

        }

        console.log('Resultado from: ',fromLoc);
        console.log('Resultado to: ', toLoc);

        addTrip(driver);
    }

    const addTrip = (driver)=>{
        let item = {
            fromLoc: fromLoc.name,
            toLoc: toLoc.name,
            price: requestPrice,
            driver:{
                name:driver.driver.name,
                avatar:driver.driver.avatar,
                number:'000001',
                stars:driver.driver.stars
            },
            distance: requestDistance,
            duration: requestTime,
            myReview: 0
        }

        console.log ('eis os benditos dados: ',item);
        console.log('o que tem em driver: ',driver.driver.name);

        props.addTrip(item);
        console.log('aqui tem trips: ', props.trips)
    }

    const handleRequestCancel =()=>{
        setToLoc({});
        setShowDirections(false);
        setRequestDistance(0);
        setRequestPrice(0);

        setMapLoc(fromLoc);
    }

    const handleMapChange = async ()=>{
        const cam = await map.current.getCamera();
        cam.altitude = 0;
        setMapLoc(cam);
    }

    const handleModalClick = (field, item)=>{
     //   console.log("field", field);
     //  console.log("address: ", item);

        const loc = {
            name:item.address,
            center:{
                latitude: item.latitude,
                longitude: item.longitude
            },
            zoom: 16,
            pitch:0,
            altitude:0,
            heading:0
            };

        switch(field){
            case 'from':
                setFromLoc(loc);
                break;
            case 'to':
                setToLoc(loc);
                break;
        }
    }

    const handleMenu = ()=>{
        props.navigation.openDrawer();
    }

    const handleLoc = ()=>{
        getMyCurrentPosition();
        setToLoc('');
    }

    return(
        <Container>
            <StatusBar barStyle="dark-content"/>
            <DriverModal
                driver={driverInfo}
                visible={driverModalVisible}
                visibleAction={setDriverModalVisible}
            />
            <AddressModal
                title={modalTitle}
                visible={modalVisible}
                visibleAction={setModalVisible}
                field={modalField}
                clickAction={handleModalClick}
            />

            <MapView 
                ref={map}
                style={{flex:1}}
                provider="google"
                camera={mapLoc}
                onRegionChangeComplete={handleMapChange}
            >

                {fromLoc.center &&
                    <MapView.Marker pincolor="black" coordinate={fromLoc.center}/>
                }

                {toLoc.center &&
                    <MapView.Marker pincolor="black" coordinate={toLoc.center}/>
                }

                {showDirections &&
                    <MapViewDirections
                        origin={fromLoc.center}
                        destination={toLoc.center}
                        strokeWidth={5}
                        strokeColor="#BBB"
                        apikey={MapsAPI}
                        onReady={handleDirectionsReady}
                    />
                }

            </MapView>
            <MenuArea onPress={handleMenu} underlayColor="transparent">
                <MenuImage source={require('../../assets/menu.png')}/>
            </MenuArea>
            <LocationButton
                handleLocAction={handleLoc}
            />
            <IntineraryArea >
                <IntineraryItem onPress={handleFromClick} underlayColor="#EEE">
                    <>
                        <IntineraryLabel>
                            <IntineraryPoint color="#0000FF"/>
                            <IntineraryTitle>Origem</IntineraryTitle>
                        </IntineraryLabel>
                        {fromLoc.name &&
                            <IntineraryValue>{fromLoc.name}</IntineraryValue>
                        }
                        {!fromLoc.name &&
                            <IntineraryPlaceholder>Escolha um local de Origem</IntineraryPlaceholder>
                        }
                        
                    </>
                </IntineraryItem>
                <IntineraryItem onPress={handleToClick} underlayColor="#EEE">
                    <>
                        <IntineraryLabel>
                            <IntineraryPoint color="#00FF00"/>
                            <IntineraryTitle>Destino</IntineraryTitle>
                            

                        </IntineraryLabel>
                        {toLoc.name &&
                            <IntineraryValue>{toLoc.name}</IntineraryValue>
                        }
                        
                        {!toLoc.name &&
                            <IntineraryPlaceholder>Escolha um local de destino</IntineraryPlaceholder>
                        }
                        
                    </>
                </IntineraryItem>
                {fromLoc.center && toLoc.center &&
                    <IntineraryItem>
                        <>
                            <RequestDetails>
                                <RequestDetail>
                                    <RequestTitle>Distância</RequestTitle>
                                    <RequestValue>{requestDistance > 0?`${requestDistance.toFixed(1)}km`:'--'}</RequestValue>
                                </RequestDetail>
                                <RequestDetail>
                                    <RequestTitle>Tempo</RequestTitle>
                                    <RequestValue>{requestTime > 0?`${requestTime.toFixed(0)}mins`:'--'}</RequestValue>
                                </RequestDetail>
                                <RequestDetail>
                                    <RequestTitle>Preço</RequestTitle>
                                    <RequestValue>{requestPrice > 0?`R$ ${requestPrice.toFixed(2)}`:'--'}</RequestValue>
                                </RequestDetail>
                            </RequestDetails>
                            <RequestButtons>
                                <RequestButton color='#00FF00' onPress={handleRequestGo}>
                                    <RequestButtonText>Solicitar Motorista</RequestButtonText>
                                </RequestButton>
                                <RequestButton color='#FF0000' onPress={handleRequestCancel}>
                                    <RequestButtonText>Cancelar</RequestButtonText>
                                </RequestButton>
                            </RequestButtons>
                        </>
                </IntineraryItem>
                }
                
            </IntineraryArea>
            {loading &&
                <LoadingArea>
                    <ActivityIndicator size="large" color="#FFF" />
                </LoadingArea>}
        </Container>
    );
}

const mapStateToProps=(state)=>{
    return{
        trips: state.tripReducer.trips
    };
}

const mapDispatchToProps=(dispatch)=>{
    return {
        addTrip:(trip)=>dispatch(TripActions.addTrip(trip))
    }
}


export default connect(mapStateToProps,mapDispatchToProps)(Page);