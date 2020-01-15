/**
 * @author tangchao_2010zg@163.com
 * @date 2019/5/24
 * @Description: 首页
 */

import React, { Component } from 'react'
import {
    View, Text, WebView, TouchableOpacity, Image
} from 'react-native'
import Colors from "../../constants/Colors";
import Layout from "../../constants/Layout";
import {geolocationInit, watchPosition, getCurrentPosition} from "../../components/position"
import { Geolocation } from "react-native-amap-geolocation";
import SplashScreen from "react-native-splash-screen";


type Props = {

}

type State = {

}



class HomeScene extends Component<Props, State> {
    static navigationOptions = ({navigation}) => ({
        headerLeft:(
            <View style={{flex:1, justifyContent:'center', alignItems:'center', paddingLeft: 10}}>

            </View>
        ),
        headerTitle: (
            <View style={{flex:1, justifyContent:'center', alignItems: 'center'}}>
                <Text style={{fontSize: 20, color: '#333', fontWeight: 'bold'}}>测试高德定位</Text>
            </View>
        ),
        headerRight:(
            <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
            </View>
        ),
        headerStyle: {
            backgroundColor: Colors.tabBar,
            elevation: 0,
            color: 'white',
            borderBottomWidth: Layout.onePixel,
            borderColor: Colors.border
        },
        gestureResponseDistance: {horizontal: Layout.window.width / 2},
        gesturesEnabled: true
    })

    constructor(props) {
        super(props)
        this.state = {
            location: {
                latitude: '',
                longitude: '',
                LocationCity: ''
            }
        }
    }

    componentDidMount() {
        this.timer = setTimeout(()=>{
            SplashScreen.hide() //隐藏启动屏
            // 跳转首页前
        }, 200)

        //初始化定位组件
        geolocationInit();

        //启动监听
        // watchPosition();

        //获取一次定位,getCurrentPosition会暂停掉监听
        getCurrentPosition().then(res => {
            let data = {
                latitude: res.latitude,
                longitude: res.longitude,
                LocationCity: res.LocationCity
            }
            this.setState({
                location: data
            })
        }, err => {
            console.log(err);
        }).catch(err => {
            console.log(err);
        })

        //设置每隔15S获取一次定位
        // setInterval(() => {
        //
        // }, 15000);
    }


    render() {
        console.log(this.state);
        let { latitude, longitude, LocationCity } = this.state.location
        return (
            <View>
                <Text>经度：{latitude}</Text>
                <Text>纬度：{longitude}</Text>
                <Text>位置：{LocationCity}</Text>
            </View>
        );
    }
}

export default HomeScene
