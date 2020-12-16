import React, {useRef, useState, useEffect} from 'react';
import { StatusBar, SafeAreaView, Text } from 'react-native';
import MapView from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
import Geocoder from 'react-native-geocoding';
import {MapsAPI} from '../../config';


import { 
    Container,
    IntineraryArea,
    IntineraryItem,
    IntineraryLabel,
    IntineraryPoint,
    IntineraryTitle,
    IntineraryValue,
    IntineraryPlaceholder

} from './styled';

const Page = ()=>{

    const map = useRef();

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

    useEffect(()=>{
        Geocoder.init(MapsAPI, {language:'pt-br'});
        getMyCurrentPosition();
    },[]);

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

    return(
        <Container>
            <StatusBar barStyle="dark-content"/>
            <MapView 
                ref={map}
                style={{flex:1}}
                provider="google"
                camera={mapLoc}
            >

            </MapView>
            <IntineraryArea>
                <IntineraryItem>
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
                <IntineraryItem>
                    <>
                        <IntineraryLabel>
                            <IntineraryPoint color="#00FF00"/>
                            <IntineraryTitle>Destino</IntineraryTitle>

                        </IntineraryLabel>
                        {fromLoc.name &&
                            <IntineraryValue>{fromLoc.name}</IntineraryValue>
                        }
                        
                        {!fromLoc.name &&
                            <IntineraryPlaceholder>Escolha um local de destino</IntineraryPlaceholder>
                        }
                        
                    </>
                </IntineraryItem>
            </IntineraryArea>
        </Container>
    );
}


export default Page;