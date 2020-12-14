import React, {useRef} from 'react';
import { StatusBar, SafeAreaView, Text } from 'react-native';
import MapView from 'react-native-maps';

import { 
    Container
} from './styled';

const Page = ()=>{

    const map = useRef();
    return(
        <Container>
            <StatusBar barStyle="dark-content"/>
            <MapView 
                ref={map}
                style={{flex:1}}
                provider="google"
            >

            </MapView>
        </Container>
    );
}


export default Page;