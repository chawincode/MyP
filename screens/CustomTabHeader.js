import { StyleSheet, Text, View, SafeAreaView, VirtualizedList, ScrollView, TouchableOpacity, Image, Dimensions, ImageBackground } from 'react-native';
import SelectDropdown from 'react-native-select-dropdown';
import { useNavigation } from '@react-navigation/native';
import { useSelector, useDispatch } from 'react-redux';
import { setPark, setPark2, setPark3, setPark4, setPark5, setPark6, setPark7, setPark8, setPark9, setPark10, setPark11, setPark12, setPark13, setPark14, setPark15, setPark16} from '../redux/action';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const HeadImage = require('../assets/images/HeaderHome.png');
const imageMap = require('../assets/map/tsePark2.png');
const {height: SCREEN_HEIGHT} = Dimensions.get('window');
const {width: SCREEN_WIDTH} = Dimensions.get('window');

export default function App() {
  const navigation = useNavigation();
  const { park, parkInfo, park2 } = useSelector(state => state.dbReducer);
  const dispatch = useDispatch();

  const search = [
    "ลานจอดรถคณะวิศวะ 1", 
    "ลานจอดรถคณะวิศวะ 2", 
    "ลานจอดรถคณะวิศวะ 3", 
    "ลานจอดรถคณะ SIIT",
    "ลานจอดรถยิม 4",
    "ลานจอดรถหลังสระว่ายน้ำ",
    "ลานจอดรถหลังClass",
    "ลานจอดรถหน้ายิม 7",
    "ลานจอดรถหลังยิม 7",
    "ลานจอดรถหลังโรงอาหาร sc",
    "ลานจอดรถใต้สวนป๋วย",
    "ลานจอดรถหลังสวนป๋วย",
    "ลานจอดรถข้างบร.5",
    "ลานจอดรถตรงข้ามบร.4",
    "ลานจอดรถหลังโรงอาหารgreen",
    "ลานจอดรถข้างตึกหอใน M"
  ]

  return (
    <SafeAreaView style={{flex: 0.5}}>
      <ImageBackground source={HeadImage} style={styles.image}>
        <View style={styles.viewHead}>
          <Text style={styles.textHead1}>
            หาสถานที่จอดรถของ
          </Text>
          <Text style={styles.textHead1}>
            คุณได้เลย!
          </Text>
        </View>
        <View style={styles.search} >
            <SelectDropdown
            data={search}
            onSelect={(selectedItem, index) => {
              console.log(selectedItem, index);
              if (index == 0) {
                dispatch(setPark(selectedItem));
              }
              if (index == 1) {
                dispatch(setPark2(selectedItem));
              }
              if (index == 2) {
                dispatch(setPark3(selectedItem));
              }
              if (index == 3) {
                dispatch(setPark4(selectedItem));
              }
              if (index == 4) {
                dispatch(setPark5(selectedItem));
              }
              if (index == 5) {
                dispatch(setPark6(selectedItem));
              }
              if (index == 6) {
                dispatch(setPark7(selectedItem));
              }
              if (index == 7) {
                dispatch(setPark8(selectedItem));
              }
              if (index == 8) {
                dispatch(setPark(selectedItem));
              }
              if (index == 9) {
                dispatch(setPark(selectedItem));
              }
              if (index == 10) {
                dispatch(setPark(selectedItem));
              }
              if (index == 11) {
                dispatch(setPark(selectedItem));
              }
              if (index == 12) {
                dispatch(setPark(selectedItem));
              }
              if (index == 13) {
                dispatch(setPark(selectedItem));
              }
              if (index == 14) {
                dispatch(setPark(selectedItem));
              }
              if (index == 15) {
                dispatch(setPark(selectedItem));
              }
            }}
            defaultButtonText={'จอดไหนดี?'}
            
            buttonTextAfterSelection={(selectedItem, index) => {
              return selectedItem;
            }}
            rowTextForSelection={(item, index) => {
              return item;
            }}
            buttonStyle={styles.dropdown1BtnStyle}
            buttonTextStyle={styles.dropdown1BtnTxtStyle}
            renderDropdownIcon={isOpened => {
              return <FontAwesome name={isOpened ? 'chevron-up' : 'chevron-down'} color={'#035397'} size={15} />;
            }}
            dropdownIconPosition={'right'}
            dropdownStyle={styles.dropdown1DropdownStyle}
            rowStyle={styles.dropdown1RowStyle}
            rowTextStyle={styles.dropdown1RowTxtStyle}
            selectedRowStyle={styles.dropdown1SelectedRowStyle}
            search
            searchInputStyle={styles.dropdown1searchInputStyleStyle}
            searchPlaceHolder={'Search here'}
            searchPlaceHolderColor={'darkgrey'}
            renderSearchInputLeftIcon={() => {
              return <FontAwesome name={'search'} color={'#343434'} size={18} />;
            }}
          />
        </View>
        </ImageBackground>
        <View style={{backgroundColor: '#fff', borderTopLeftRadius: 50, borderTopRightRadius: 50, height: 5, width: '100%'}} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
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
    curve: {
        borderRadius: 20,
        backgroundColor: '#fff',
        width: '100%',
    }
});