import { StyleSheet, Text, View, SafeAreaView, VirtualizedList, ScrollView, TouchableOpacity, Image, Dimensions, ImageBackground, FlatList, AsyncStorage} from 'react-native';
import SelectDropdown from 'react-native-select-dropdown';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useSelector, useDispatch } from 'react-redux';
import { setPark, setParkInfo, setParkImage, setParkImage2, setParkImage3, setParkEmptyslot, setParkLatitude, setParkLongtitude, setFavoriteList } from '../redux/action';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import React, { useEffect, useState } from 'react';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useIsFocused } from '@react-navigation/native';
import Car from '../screens/Car'
// import AsyncStorage from '@react-native-community/async-storage';

const HeadImage = require('../assets/images/HeaderHome.png');
const imageMap = require('../assets/map/tsePark2.png');
const {height: SCREEN_HEIGHT} = Dimensions.get('window');
const {width: SCREEN_WIDTH} = Dimensions.get('window');

export default function Favorites() {
  // const route = useRoute();
  // const { favoriteList } = route.params;
  const { park, parkInfo, park2, parkInfo2, parkLatitude, parkLongtitude, parkImage, favoriteList } = useSelector(state => state.dbReducer);
  const dispatch = useDispatch();
  const totalStars = 5;
  const navigation = useNavigation();

  const onFavorite = book => {
    // setFavoriteList([...favoriteList, book]);
    // console.log(favoriteList)
    if (!favoriteList.includes(book)) dispatch(setFavoriteList(favoriteList.concat(book)));
    // console.log(favoriteList);
    // navigation.navigate("Book", {favoriteList})
  };

  // function to remove an item from favorite list
  const onRemoveFavorite = book => {
    const filteredList = favoriteList.filter(item => item.place_id !== book.place_id);
    dispatch(setFavoriteList(filteredList));
    // let index = favoriteList.indexOf(id);
    // console.log(index);
    // let temp = [...favoriteList.slice(0, index), ...favoriteList.slice(index + 1)];
    // setFavoriteList(temp);
  };

  const ifExists = book => {
    if (favoriteList.filter(item => item.place_id === book.place_id).length > 0) {
      return true;
    }
    return false;
  };
  return (
    <SafeAreaView style={{flex: 1}}>
      <FlatList 
        data={favoriteList}
        contentContainerStyle={{backgroundColor: '#fff' }}
        renderItem={({ item }) => {
          return (
            <View style={styles.btn}>
              <TouchableOpacity  style={{flexDirection: 'row'}} onPress = {() => navigation.navigate('TSE_1', 
              dispatch(setPark(item.name)), 
              dispatch(setParkInfo(item.description)), 
              dispatch(setParkEmptyslot(item.quantity)),
              dispatch(setParkLatitude(item.latitude)),
              dispatch(setParkLongtitude(item.longtitude)),
              dispatch(setParkImage(item.img)),
              )}>
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
                      <TouchableOpacity
                        style={styles.icon}
                        onPress={() => ifExists(item) ? onRemoveFavorite(item) : onFavorite(item)}
                      >
                        <MaterialIcons
                          name={ifExists(item) ? 'bookmark' : 'bookmark-outline'}
                          size={20}
                          color={'#035397'}
                        />
                      </TouchableOpacity>
                  </Text>
                </Text>
              </TouchableOpacity>
            </View>
          )
        }}
      />
    </SafeAreaView>
  );
};

// const Bookmark = () => {

//   const { park, parkInfo, park2, parkInfo2, parkLatitude, parkLongtitude, parkImage } = useSelector(state => state.dbReducer);
//   const [isLoading, setLoading] = useState(false);
//   const [data, setData] = useState([]);
//   const dispatch = useDispatch();
//   const isFocused = useIsFocused();
//   const route = useRoute();
//   const { favoriteList } = route.params;

//   const [book, setBook] = useState([]);
//   // const getBook = async () => {
//   //     await AsyncStorage.getItem('bookmark').then(async (token) => {
//   //       res = JSON.parse(token);
//   //       setLoading(true);
//   //       if (res) {
//   //           console.log('arr', res)
//   //           const result = res.map(post_id => {
//   //               return 'include[]=' + post_id;
//   //           });
//   //           let query_string = result.join('&');
//   //           const response = await fetch(`http:/192.168.1.132:3001/places/All${query_string}`);
//   //           const post = await response.json();
//   //           setbookmarkpost(post);
//   //           console.log(post)
//   //           setLoading(false);
//   //       } else {
//   //           setbookmarkpost([]);
//   //           setLoading(false);
//   //       }
//   //     const response = await fetch('http:/192.168.1.132:3001/places/All');
//   //     const json = await response.json();
//   //     setBook(json);
//   //   });
//   // }

//   const getBook = async () => {
//     try {
//      const response = await fetch('http:/192.168.1.132:3001/places/All');
//      const json = await response.json();
//      setBook(json);
//    } catch (error) {
//      console.error(error);
//    } finally {
//      setLoading(false);
//    }
//  }

//   useEffect(() => {
//     getBook();
//   }, [isFocused]);

//   // body
//   // const data = [
//   //   { id: 0, park: park, parkInfo: "Item 1"},
//   //   { id: 1, park: "Item 2", parkInfo: "Item 1"},
//   //   { id: 2, park: "Item 3", parkInfo: "Item 1"},
//   //   { id: 3, park: "Item 4", parkInfo: "Item 1"},
//   //   { id: 4, park: "Item 5", parkInfo: "Item 1"}
//   // ];
//   const totalStars = 5;

//   return (
//     <SafeAreaView style={{flex: 1}}>
//       {isLoading ? <Text>Loading...</Text> :
//       <FlatList 
//         data={favoriteList}
//         contentContainerStyle={{backgroundColor: '#fff' }}
//         renderItem={({ item }) => (
//           <View style={styles.btn}>
//             <TouchableOpacity  style={{flexDirection: 'row'}} onPress = {() => navigation.navigate('TSE_1', 
//             dispatch(setPark(item.name)), 
//             dispatch(setParkInfo(item.description)), 
//             dispatch(setParkEmptyslot(item.quantity)),
//             dispatch(setParkLatitude(item.latitude)),
//             dispatch(setParkLongtitude(item.longtitude)),
//             dispatch(setParkImage(item.img)),
//             )}>
//               <Image source={imageMap} />
//               <Text style={styles.btnMap}>
//                 {item.name + "\n"}
//                 <Text style={{fontSize: 14, color: '#818181'}}>
//                     {item.description + "\n"}
//                     {
//                       Array.from({length: item.review}, (x, i) => {
//                           return(
//                             <MaterialIcons key={i} name="star" size={20} color="#FFA000"/>
//                           )
//                       })
//                     }

//                     {

//                       Array.from({length: totalStars-item.review}, (x, i) => {
//                           return(
//                             <MaterialIcons key={i} name="star-border" size={20} color="#FFA000" />
//                           )
//                       })

//                     }
//                     {item.quantity == 0 ? <Text style={{color: '#B70000'}}>{"\n" + "เต็ม"}</Text>: <Text style={{color: '#035397'}}>{"\n" + "ว่าง " + item.quantity + " ที่"} </Text> }
//                 </Text>
//               </Text>
//             </TouchableOpacity>
//           </View>
//         )}
//       />
//       }
//     </SafeAreaView>
//   );
// }
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
    fontSize: 15,
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
    position: 'relative',
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
  }
});