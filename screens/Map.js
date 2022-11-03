import React, { useState, useEffect } from "react";
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
  Image,
} from "react-native";
import { useSelector } from 'react-redux';
// import Geolocation from '@react-native-community/geolocation';
// import Geolocation from "react-native-geolocation-service";

const alertcar = require("../assets/icon/AlertCar.png");
const alertre = require("../assets/icon/ReportAlert.png");

export default function App() {
  const { park, parkInfo, parkLatitude, parkLongtitude, parkEmptyslot } = useSelector(state => state.dbReducer);
  const [position, setPosition] = useState({
    latitude: 14.069905376912853,
    longitude: 100.60598635193016,
    latitudeDelta: 0.001,
    longitudeDelta: 0.001,
  });

  const [time, setTime] = useState("5");
  const [dis, setDis] = useState("500");
  const [lot, setLot] = useState("20");
  const [car, setCar] = useState("3");

  // useEffect(() => {
  //   Geolocation.getCurrentPosition((pos) => {
  //     const crd = pos.coords;
  //     setPosition({
  //       latitude: crd.latitude,
  //       longitude: crd.longitude,
  //       latitudeDelta: 0.0421,
  //       longitudeDelta: 0.0421,
  //     });
  //   }).catch((err) => {
  //     console.log(err);
  //   });
  // }, []);

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        provider={PROVIDER_GOOGLE}
        region={{
          latitude: Number(parkLatitude),
          longitude: Number(parkLongtitude),
          latitudeDelta: position.latitudeDelta,
          longitudeDelta: position.longitudeDelta,
        }}
      >
        <MapView.Marker
          coordinate={{
            latitude: Number(parkLatitude),
            longitude: Number(parkLongtitude),
          }}
          title={park}
          description={parkInfo}
        />
      </MapView>
      <View style={styles.bottom}>
        <Text style={styles.texttime}>{time} นาที</Text>
        <Text style={styles.textdis}>({dis} ม.)</Text>
        <Text style={styles.emptylot}>ว่าง {parkEmptyslot} ที่</Text>
        <Text style={styles.textsame}>
          <Image source={alertcar} style = {styles.alertim}/>
          มีรถ {car} คันกำลังมายังลานจอดนี้
        </Text>
        <TouchableOpacity style={styles.btnview}>
          <Text style={styles.textbtn}>ออกจากการนำทาง</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.btnreport}>
        <Image source={alertre} style = {styles.alertre}/>
          <Text style={styles.reportbtn}>แจ้งปัญหา</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  map: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
  bottom: {
    position: "absolute",
    top: 510,
    width: 390,
    height: 295,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    backgroundColor: "#FFFFFF",
  },

  texttime: {
    position: "absolute",
    top: 25,
    left: 30,
    fontSize: 20,
    color: "#50C377",
  },
  textdis: {
    position: "absolute",
    top: 25,
    left: 90,
    fontSize: 20,
  },

  emptylot: {
    position: "absolute",
    top: 30,
    left: 170,
    fontSize: 17,
  },
  alertim: {
    top: 5,
    width: 20,
    height: 20
  },
  textsame: {
    paddingLeft: 5,
    top: 60,
    left: 30,
    fontSize: 15,
    color: "#818181",
  },

  btnview: {
    position: "absolute",
    top: 100,
    left: 35,
    width: 150,
    height: 85,
    borderRadius: 10,
    backgroundColor: "#045497",
  },
  textbtn: {
    top: 29,
    textAlign: "center",
    color: "#FFFFFF",
  },
  btnreport: {
    position: "absolute",
    top: 100,
    left: 205,
    width: 150,
    height: 85,
    borderRadius: 10,
    backgroundColor: "#F6F6F6",
  },
  reportbtn: {
    top: 20,
    textAlign: "center",
    color: "#045497",
  },
  alertre: {
    top: 15,
    left: 55,
    width: 40,
    height: 40,
  }
});