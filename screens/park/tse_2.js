import * as React from 'react';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import { StyleSheet, Text, View, Dimensions, TouchableOpacity, Image } from 'react-native';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { ScrollView } from 'react-native-gesture-handler';
import ImagesSwiper from "react-native-image-swiper";
import { useFonts } from 'expo-font';

const buttonImageReport = require('../../assets/button/btnProblem.png');
const buttonImageNavi = require('../../assets/button/btnRoute.png');
const imageMap = require('../../assets/map/fullTsePark2.png');

const {height: SCREEN_HEIGHT} = Dimensions.get('window');
const {width: SCREEN_WIDTH} = Dimensions.get('window');

export default function App() {
    // const park =  this.props.navigation.state.params.p1

    const navigation = useNavigation();
    const { park, parkInfo, parkImage } = useSelector(state => state.dbReducer);
    return (
        <View style={styles.container}>
            <ImagesSwiper 
                images={parkImage}
                autoplay={true}
                autoplayTimeout={1.5} 
                showsPagination={false}
            />
            <Text style={{fontSize: 20, color: '#343434', fontFamily: 'Prompt-Regular'}}>
                {park}
            </Text>
            <Text style={{fontSize: 14, color: '#818181', marginBottom: 40, fontFamily: 'Prompt-Regular'}}>
                {parkInfo}
            </Text>
            <View style={styles.btn}>
                <TouchableOpacity onPress = {() => navigation.navigate('Map', {}) }>
                    <Image source={buttonImageNavi} style={{width: 150, height: 93, marginRight: 10}}/>
                </TouchableOpacity>
                <TouchableOpacity onPress = {() => navigation.navigate('Report', {}) }>
                    <Image source={buttonImageReport} style={{width: 150, height: 93}}/>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 3,
        backgroundColor: '#fff',
        alignItems: 'center',
    },
    btn: {
        alignSelf: 'center',
        flexDirection: 'row'
    }
});