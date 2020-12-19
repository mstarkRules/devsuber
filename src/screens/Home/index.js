import React, {useRef, useState, useEffect} from 'react';
import { StatusBar, SafeAreaView, Text } from 'react-native';
import MapView from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
import Geocoder from 'react-native-geocoding';
import MapViewDirections from 'react-native-maps-directions';
import {MapsAPI} from '../../config';


import useDevsUberApi from '../../useDevsUberApi';

import { 
    Container,
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
    RequestButtonText

} from './styled';

const Page = ()=>{

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

    useEffect(()=>{
        Geocoder.init(MapsAPI, {language:'pt-br'});
        getMyCurrentPosition();
    },[]);

    useEffect(()=>{
        if(fromLoc.center && toLoc.center){
            setShowDirections(true);
        }
    },[toLoc]);

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
                    zoom: 16,
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

    }

    const handleToClick=async ()=>{
        const geo = await Geocoder.from('alter do chao, Santarém, PA');
        if(geo.results.length >0){
            const loc = {
                name:geo.results[0].formatted_address,
                center:{
                    latitude: geo.results[0].geometry.location.lat,
                    longitude: geo.results[0].geometry.location.lng
                },
                zoom: 16,
                pitch:0,
                altitude:0,
                heading:0
                };

                setToLoc(loc);
        }

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
                bottom:50,
                top:750
            }
        });
    }

    const handleRequestGo = () =>{

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

    return(
        <Container>
            <StatusBar barStyle="dark-content"/>
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
        </Container>
    );
}


export default Page;