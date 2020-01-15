/**
 * @author tangchao_2010zg@163.com
 * @date 2019/5/24
 * @Description: 扫码
 */

import React, { Component } from 'react'
import {Platform, StatusBar, StyleSheet, TouchableOpacity, Image, Alert, Text, View, Animated, Easing, PermissionsAndroid, ImageBackground} from 'react-native';
import { RNCamera } from 'react-native-camera'
import Colors from '../../constants/Colors';
import Layout from '../../constants/Layout';
import SplashScreen from "react-native-splash-screen";

type Props = {

}

type State = {

}

class ScanScreen extends Component <Props, State> {
    static navigationOptions = ({navigation}) => ({
        // navigation.state.params.title
        headerLeft:(
            <View style={{flex:1, justifyContent:'center', alignItems:'center', paddingLeft: 10}}>
                <TouchableOpacity onPress={()=>navigation.goBack()}>
                    <Image source={require('../../images/return.png')} style={{width: 20, height:20}}></Image>
                </TouchableOpacity>
            </View>
        ),
        headerTitle: (
            <View style={{flex:1, justifyContent:'center', alignItems: 'center'}}>
                <Text style={{fontSize: 20, color: '#333', fontWeight: 'bold'}}>扫描二维码</Text>
            </View>
        ),
        headerRight:(
            <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
            </View>
        ),
        headerStyle: { // 导航条的样式。背景色，宽高等
            backgroundColor: Colors.tabBar,
            elevation: 0,
            color: 'white',
            borderBottomWidth: Layout.onePixel,
            borderColor: Colors.border
        },
        headerTitleStyle:{ // 导航栏文字样式
           /* alignSelf: 'center',
            textAlign: 'center',
            flex:1,*/
        },
        headerTintColor: { // 设置导航栏颜色

        },
        // headerLayoutPreset: 'center', // 3.x
        // headerRight:React.createElement(View, null, null), // 占位
        // gestureResponseDistance: { horizontal: Layout.window.width / 2 },
        // gesturesEnabled: true
    })

    constructor(props) {
        super(props)
        this.state = {
            //中间横线动画初始值
            // moveAnim: new Animated.Value(-2)
            moveAnim: new Animated.Value(-2),
        }
    }

    componentDidMount() {
        this.timer = setTimeout(()=>{
            SplashScreen.hide() //隐藏启动屏
            // 跳转首页前
        }, 200)
        this.startAnimation(); // 初始化动画方法
    }

    /** 扫描框动画*/
    startAnimation = () => {
        this.state.moveAnim.setValue(0);
        Animated.sequence([
            /*Animated.timing(
                this.state.moveAnim,
                {
                    toValue: 200,
                    duration: 1500,
                    easing: Easing.linear
                }
            ),*/
            Animated.timing(
                this.state.moveAnim,
                {
                    toValue: -196,
                    duration: 1500,
                    easing: Easing.linear
                }
            )
        ]).start(() => this.startAnimation())
    };

    /** 识别二维码结果 */
    onBarCodeRead = (e) => {
        if (e) {
            // alert(e.data)
            this.props.navigation.navigate('TvScreen', {url: e.data})
        } else {
            Alert.alert(
                '提示',
                '扫描失败'
                    [{text: '确定'}]
            )
        }

    };

    render() {
        return (
            <View style={styles.container}>
                <StatusBar
                    animated={true}
                    hidden={false}
                    backgroundColor={'white'}
                    barStyle="dark-content"
                    translucent={false}
                />

                {/*绘制扫码界面*/}
                <RNCamera
                    ref={ref => {
                        this.camera = ref;
                    }}
                    autoFocus={RNCamera.Constants.AutoFocus.on} /*自动对焦*/
                    style={styles.preview}
                    type={RNCamera.Constants.Type.back}
                    flashMode={RNCamera.Constants.FlashMode.on} /*相机闪光模式*/
                    onBarCodeRead={this.onBarCodeRead}
                >
                    <View style={{
                        width: Layout.window.width,
                        height: 220,
                        backgroundColor: 'rgba(0,0,0,0.5)',
                    }} />
                    {/*<View style={styles.rectangleContainer}>
                        <View style={styles.rectangle}/>
                        <Animated.View style={[
                            styles.border,
                            {transform: [{translateY: this.state.moveAnim}]}]}/>
                        <Text style={styles.rectangleText}>将二维码放入框内，即可自动扫描</Text>
                    </View>*/}
                    <View style={{flexDirection:'row'}}>
                        <View style={{backgroundColor: 'rgba(0,0,0,0.5)', height: 200, width: 200}}/>
                        <ImageBackground source={require('../../images/scan_k.png')} style={{justifyContent: 'flex-end', alignItems: 'center', width:200, height:200}}>
                            <Animated.View style={[
                                styles.border,
                                {transform: [{translateY: this.state.moveAnim}]}]}/>
                        </ImageBackground>
                        <View style={{backgroundColor: 'rgba(0,0,0,0.5)',height:200,width:200}}/>
                    </View>
                    <View style={{ flex: 1, backgroundColor: 'rgba(0, 0, 0, 0.5)', width: Layout.window.width, alignItems: 'center'}}>
                        <Text style={styles.rectangleText}>将二维码放入框内，即可自动扫描</Text>
                    </View>
                </RNCamera>

                {/* <View style={{flex:1,alignItems:'flex-end',justifyContent:'center', flexDirection:'row'}}>
                    <Text style={{fontSize:12, color: '#808080', height:40}}>
                        版本号： V1.0.0
                    </Text>
                </View>*/}
            </View>
        )
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row'
    },
    preview: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    rectangleText: {
        flex: 0,
        color: '#fff',
        marginTop: 10
    },
    border: {
        flex: 0,
        width: 200,
        height: 2,
        backgroundColor: '#27d1de',
    }
})

export default ScanScreen;

    /*render() {
        return (
            <View style={styles.container}>
                <StatusBar
                    animated={true}
                    hidden={false}
                    backgroundColor={'white'}
                    barStyle="dark-content"
                    translucent={false}
                />

                {/!*绘制扫码界面*!/}
                <RNCamera
                    ref={ref => {
                        this.camera = ref;
                    }}
                    autoFocus={RNCamera.Constants.AutoFocus.on} /!*自动对焦*!/
                    style={styles.preview}
                    type={RNCamera.Constants.Type.back}
                    flashMode={RNCamera.Constants.FlashMode.on} /!*相机闪光模式*!/
                    onBarCodeRead={this.onBarCodeRead}
                >
                    {/!*<View style={styles.rectangleContainer}>
                        <View style={styles.rectangle}/>
                        <Animated.View style={[
                            styles.border,
                            {transform: [{translateY: this.state.moveAnim}]}]}/>
                        <Text style={styles.rectangleText}>将二维码放入框内，即可自动扫描</Text>
                    </View>*!/}
                    {/!*<View
                        style={{height: Platform.OS == 'ios' ? (Layout.window.height-264) / 3:(Layout.window.height - 244) / 3, width:Layout.window.width,backgroundColor:'rgba(0,0,0,0.5)',}}>
                    </View>*!/}
                    {/!*<View style={{
                        width: 500,
                        height: 220,
                        backgroundColor: 'red',
                    }} />
                    <View style={{flexDirection:'row'}}>
                        <View style={styles.itemStyle}/>
                        <ImageBackground style={styles.rectangle}
                                         source={require('../../images/scan_k.png')}>
                            <Animated.View style={[
                                styles.animatiedStyle,
                                {transform: [{translateY: this.state.moveAnim}]}]}/>
                        </ImageBackground>
                        <View style={styles.itemStyle}/>
                    </View>*!/}
                    <View style={{flex: 1, backgroundColor: 'rgba(0, 0, 0, 0.5)', width: Layout.window.width, alignItems: 'center'}}>
                        <Text style={styles.rectangleText}>将二维码放入框内，即可自动扫描</Text>
                    </View>
                </RNCamera>

               {/!* <View style={{flex:1,alignItems:'flex-end',justifyContent:'center', flexDirection:'row'}}>
                    <Text style={{fontSize:12, color: '#808080', height:40}}>
                        版本号： V1.0.0
                    </Text>
                </View>*!/}
            </View>
        )
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: '#efefef'
    },
    itemStyle: {
        backgroundColor: 'rgba(0,0,0,0.5)',
        width: (Layout.window.width - 200) / 2,
        height: 200
    },
    textStyle: {
        color: '#666',
        marginTop: 20,
        fontSize: 16
    },
    animatiedStyle: {
        flex: 0,
        width: 196,
        height: 2,
        backgroundColor: '#fcb602',
        borderRadius: 50
    },

    preview: {
        flex: 1,
    },
    rectangle: {
        height: 200,
        width: 200,
    },
    rectangleContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'transparent'
    },
})

export default ScanScreen;*/
