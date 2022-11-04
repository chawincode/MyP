import { StyleSheet, Text, View, SafeAreaView, VirtualizedList, ScrollView, TouchableOpacity, Image, Dimensions, ImageBackground,FlatList } from 'react-native';
import SelectDropdown from 'react-native-select-dropdown';
import { useNavigation } from '@react-navigation/native';
import { useSelector, useDispatch } from 'react-redux';
import { setPark, setParkInfo, setParkImage, setParkImage2, setParkImage3, setParkEmptyslot, setParkLatitude, setParkLongtitude } from '../redux/action';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import React, { useEffect, useState } from 'react';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const HeadImage = require('../assets/images/HeaderHome.png');
const imageMap = require('../assets/map/tsePark2.png');
const {height: SCREEN_HEIGHT} = Dimensions.get('window');
const {width: SCREEN_WIDTH} = Dimensions.get('window');

export default function App() {
  const navigation = useNavigation();
  const { park, parkInfo, park2, parkInfo2 } = useSelector(state => state.dbReducer);
  const dispatch = useDispatch();

  const [isLoading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const getMotorcycle = async () => {
    try {
     const response = await fetch('http:/192.168.1.132:3001/places/motorcycle');
     const json = await response.json();
     setData(json);
   } catch (error) {
     console.error(error);
   } finally {
     setLoading(false);
   }
 }

 useEffect(() => {
  getMotorcycle();
 }, []);
  //body
  // const data = [
  //   { id: 0, park: park, parkInfo: "Item 1"},
  //   { id: 1, park: "Item 2", parkInfo: "Item 1"},
  //   { id: 2, park: "Item 3", parkInfo: "Item 1"},
  //   { id: 3, park: "Item 4", parkInfo: "Item 1"},
  //   { id: 4, park: "Item 5", parkInfo: "Item 1"}
  // ];
  const totalStars = 5;

  return (
    <SafeAreaView style={{flex: 1}}>
      <FlatList 
        data={data}
        contentContainerStyle={{backgroundColor: '#fff' }}
        renderItem={({ item }) => (
          <View style={styles.btn}>
            <TouchableOpacity onPress = {() => navigation.navigate('TSE_1', dispatch(setPark(item.name)), 
            dispatch(setParkInfo(item.description)), 
            dispatch(setParkEmptyslot(item.quantity)),
            dispatch(setParkLatitude(item.latitude)),
            dispatch(setParkLongtitude(item.longtitude)),
            dispatch(setParkImage(item.img)),) } style={{flexDirection: 'row'}}>
              <Image source={imageMap} />
              <Text style={styles.btnMap}>
                {item.name + "\n"}
                <Text style={{fontSize: 14, color: '#818181'}}>
                    {item.description + "\n"}
                    {
                      Array.from({length: item.review}, (x, i) => {
                          return(
                            <MaterialIcons key={i} name="star" size={20} color="#FFA000"/>
                          )
                      })
                    }

                    {

                      Array.from({length: totalStars-item.review}, (x, i) => {
                          return(
                            <MaterialIcons key={i} name="star-border" size={20} color="#FFA000" />
                          )
                      })

                    }
                    {item.quantity == 0 ? <Text style={{color: '#B70000'}}>{"\n" + "เต็ม"}</Text>: <Text style={{color: '#035397'}}>{"\n" + "ว่าง " + item.quantity + " ที่"} </Text> }
                </Text>
              </Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    // alignItems: 'center',
    // justifyContent: 'center',
  },
  item: {
    height: 100,
    alignSelf: 'stretch',
    padding: 16,
    margin: 16,
    backgroundColor: "#aa0022",
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center'
  },
  title: {
    fontSize: 20
  },
  list: {
    alignSelf: "stretch"
  },
  divider: {
    height: 2,
    backgroundColor: "#EBEBEB"
  },
  btnMap: {
    marginLeft: 10,
    alignSelf: 'stretch',
    color: '#343434',
    fontSize: 20,
    fontFamily: 'Prompt-Regular'
  },
  btn: {
    flexDirection: 'row',
    borderWidth: 2,
    borderColor: '#FFF',
    height: 114.5,
    borderBottomColor: '#EBEBEB',
    marginTop: 10,
    width: '95%',
    alignSelf: 'center'
  },
  image: {
    flex: 1,
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT / 3,
    // justifyContent: 'center',
  },
  viewHead: {
      alignItems: 'flex-start',
      marginLeft: SCREEN_WIDTH / 10,
      marginTop: SCREEN_HEIGHT / 15 
  },
  textHead1: {
      color: '#035397',
      fontSize: 24,
      fontWeight: 'bold',
  },
  textInput: {
      alignSelf: 'stretch',
      fontSize: 16,
      color: '#035397',
      fontWeight: 'bold',
      width: '90%',
      left: -2
  },
  icon: {
    left: 4,
    alignSelf: 'center'
  },
  search: {
    alignSelf: 'center',
    flexDirection: 'row',
    fontSize: 15,
    height: 50,
    marginLeft: 50,
    marginRight: 50,
    borderRadius: 10,
    marginTop: 10
  },
  dropdown1BtnStyle: {
    width: SCREEN_WIDTH / 1.1,
    height: 50,
    backgroundColor: '#FAFAFA',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#035397',
  },
  dropdown1BtnTxtStyle: {color: '#343434', textAlign: 'left'},
  dropdown1DropdownStyle: {backgroundColor: '#EFEFEF', borderRadius: 10},
  dropdown1RowStyle: {backgroundColor: '#EFEFEF', borderBottomColor: '#B3B3B3'},
  dropdown1RowTxtStyle: {color: '#444', textAlign: 'left'},
  dropdown1SelectedRowStyle: {backgroundColor: '#B3B3B3'},
  dropdown1searchInputStyleStyle: {
    backgroundColor: '#EFEFEF',
    borderRadius: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#444',
},
});

// import React from "react";
// import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from "react-native";
// import { SafeAreaView } from 'react-native-safe-area-context';
// import { useNavigation } from '@react-navigation/native';

// const imageMap = require('../assets/map/tsePark2.png');

// export default function Car() {
//     const navigation = useNavigation();
//     return (
//         <ScrollView style={styles.contain}>
//             <View style={styles.btn}>
//                 <TouchableOpacity onPress = {() => navigation.navigate('TSE_1', {}) } style={{flexDirection: 'row'}}>
//                     <Image source={imageMap} />
//                     <Text style={styles.btnMap}>
//                         ลานจอดรถคณะวิศวะ 2{"\n"}
//                         <Text style={{fontSize: 14, color: '#818181'}}>
//                             พื้นที่จอดรถสาธารณะ
//                         </Text>
//                     </Text>
//                 </TouchableOpacity>
//             </View>
//         </ScrollView>
//     )
// }

// const styles = StyleSheet.create({
//     contain: {
//         flex: 1,
//         backgroundColor: '#FFF'
//     },
//     text: {
//         color: 'black',
//         alignSelf: 'center',
//         top: 53,
//         fontSize: 18,
//         fontWeight: 'bold',
//     },
//     btnMap: {
//         marginLeft: 10,
//         alignSelf: 'stretch',
//         color: '#343434',
//         fontSize: 20
//     },
//     btn: {
//         flexDirection: 'row',
//         borderWidth: 1,
//         borderColor: '#FFF',
//         height: 114.5,
//         borderBottomColor: '#818181'
//     }
// })