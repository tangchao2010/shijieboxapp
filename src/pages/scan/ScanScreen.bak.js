/**
 * @author tangchao_2010zg@163.com
 * @date 2019/5/24
 * @Description: 扫码
 */

import React, { Component } from 'react'
import {StatusBar, StyleSheet, TouchableOpacity, Image, Text, View, Animated, Easing, PermissionsAndroid, ImageBackground} from 'react-native';
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
            moveAnim: new Animated.Value(-2)
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
        Animated.timing(
            this.state.moveAnim,
            {
                toValue: -200,
                duration: 1500,
                easing: Easing.linear
            }
        ).start(() => this.startAnimation());
    };

    /** 识别二维码结果 */
    onBarCodeRead = (e) => {
        console.log(e);
        //取出二维码的范围
        /*let x = Number(e.bounds.origin.x);
        let y = Number(e.bounds.origin.y);
        let width = Number(e.bounds.size.width);
        let height = Number(e.bounds.size.height);

        //限定区域的x
        let viewMinX = (Layout.window.width - 250)/2;
        //限定区域的y
        let viewMinY = 75;
        //限定区域的宽度
        let viewWidth = 250;
        //限定区域的高度
        let viewHeight = 250;

        //判断二维码的范围是否在限定区域内
        if (x > viewMinX && y > viewMinY && (x + width) < (viewMinX + viewWidth) && (y + height) < (viewMinY + viewHeight)) {
            if (this.qrCodeReaded === false) {
                //加入开关，识别到二维码后不进这里
                this.qrCodeReaded = true;
                this.camera.pausePreview();
                //处理e.data
            }
        }*/


        // const { navigate } = this.props.navigation;
        // const {data} = result;  //只要拿到data就可以了

        //扫码后的操作
        // alert(data)
        /*this.props.navigation.navigate('Sale', {
            url: data
        })*/
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
                    <View style={styles.rectangleContainer}>
                        <View style={styles.rectangle}/>
                        <Animated.View style={[
                            styles.border,
                            {transform: [{translateY: this.state.moveAnim}]}]}/>
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
        justifyContent: 'flex-end',
        alignItems: 'center'
    },
    rectangleContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'transparent'
    },
    rectangle: {
        height: 200,
        width: 200,
        borderWidth: 1,
        borderColor: '#00FF00',
        backgroundColor: 'transparent'
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
        backgroundColor: '#00FF00',
    }
})

export default ScanScreen;
