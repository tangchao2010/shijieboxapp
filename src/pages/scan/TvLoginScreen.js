import React, {Component} from 'react';
import {Image, StatusBar, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import fetch from "../../config/Connect";
import ToastModule from '../../components/module/ToastModule'
import Colors from '../../constants/Colors';
import Layout from '../../constants/Layout';
import Button from '../../components/Button'
import SplashScreen from "react-native-splash-screen";


type Props = {

}

type State = {

}

class TvLoginScreen extends Component <Props, State> {
    static navigationOptions = ({navigation}) => ({
        headerLeft:(
            <View style={{flex:1, justifyContent:'center', alignItems:'center', paddingLeft: 10}}>
                <TouchableOpacity onPress={()=>navigation.goBack()}>
                    <Image source={require('../../images/return.png')} style={{width: 20, height:20}}></Image>
                </TouchableOpacity>
            </View>
        ),
        headerTitle: (
            <View style={{flex:1, justifyContent:'center', alignItems: 'center'}}>
                <Text style={{fontSize: 20, color: '#333', fontWeight: 'bold'}}>确定登录</Text>
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
            authroizeCode: '',
            userId: '',
            location: ''
        }
    }

    componentDidMount() {
        this.timer = setTimeout(()=>{
            SplashScreen.hide() // 隐藏启动屏
            // 跳转首页前
        }, 200)

        const {url, data} = this.props.navigation.state.params
        this.setState({
            authroizeCode: url,
            userId: data.userId,
            location: data.location
        })
    }

    tvAuthLogin() {
        ToastModule.showCustomLoading()
        const {authroizeCode, userId, location} = this.state
        if (authroizeCode.indexOf('sureqrlogin') != -1) {
            var authCode = (authroizeCode.split('#')[1].substring(1)).split('=')[1]
        } else {
            ToastModule.showCustomText('请重新扫二维码')
        }
        let params = {
            'authroize_code': authCode, // this.state.authroizeCode,
            'latitude': location.latitude, //this.state.location.latitude,
            'longitude': location.longitude, // this.state.location.longitude,
            'store_address': location.LocationCity,
            'user_id': userId //this.state.userId
        }

        fetch.authroizeLogin(params, res => {
            if(res !='' || res != null) {

            } else {
                ToastModule.showCustomText('请重登录')
            }
        }, spec => {
            console.log(spec);
        })
    }

    render() {
        // const { url } = this.props.navigation.state.params
        return(
            <View style={styles.container}>
                <StatusBar
                    animated={true}
                    hidden={false}
                    backgroundColor={'white'}
                    barStyle="dark-content"
                />
                <View style={styles.loginTop}>
                    <Image source={require('../../images/tv_icon.png')} style={{width: 130, height: 110}}></Image>
                    <Text style={{textAlign: 'center', fontSize: 16, color: '#2a2a2a', paddingTop: 30, paddingBottom: 5}}>视小宝TV登录确认</Text>
                    <Text style={{textAlign: 'center', fontSize: 14, color: '#666'}}>请不要扫描来源不明的二维码</Text>
                </View>
                <View style={{flex: 1, alignItems: 'center', justifyContent: 'flex-end', paddingBottom: 50}}>
                    <Button
                        title='确定登录'
                        activeOpacity={0.8}
                        onPress={() => {
                            // this.signOutBtn()
                            this.tvAuthLogin()
                        }}
                        style={styles.sureLogin}
                        titleStyle={{color: 'white', fontSize: 16}}
                    />
                    <Button
                        title='取消登录'
                        activeOpacity={1}
                        onPress={() => {
                            this.props.navigation.goBack()
                        }}
                        titleStyle={{color: Colors.tabIconSelected, fontSize: 16, marginTop: 30}}
                    />
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    loginTop: {
        flex: 1,
        paddingTop: 100,
        alignItems: 'center'
    },
    sureLogin: {
        width: Layout.window.width - 32,
        height: 44,
        borderRadius: 22,
        backgroundColor: Colors.tabIconSelected
    }
})

export default TvLoginScreen
