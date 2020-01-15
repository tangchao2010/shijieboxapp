import React, { Component } from "react";
import {
    StyleSheet,
    View,
    Dimensions,
    Platform,
    BackHandler,
    PermissionsAndroid
} from 'react-native';
import {ETTLightStatus} from '../../components/ETTLightStatus'
import XPay from 'react-native-puti-pay'
import WebView from 'react-native-webview'
import SplashScreen from 'react-native-splash-screen'
import DeviceInfo from 'react-native-device-info'
import {geolocationInit, watchPosition, getCurrentPosition} from "../../components/position"

const D_HEIGHT = Dimensions.get('window').height
const D_WIDTH = Dimensions.get('window').width;
const X_WIDTH = 375;
const X_HEIGHT = 812;
const XSMAX_WIDTH = 414;
const XSMAX_HEIGHT = 896;

const isIPhoneX = (() => {
    return (
        Platform.OS === 'ios' &&
        ((D_HEIGHT === X_HEIGHT && D_WIDTH === X_WIDTH) ||
            (D_HEIGHT === X_WIDTH && D_WIDTH === X_HEIGHT)) ||
        ((D_HEIGHT === XSMAX_HEIGHT && D_WIDTH === XSMAX_WIDTH) ||
            (D_HEIGHT === XSMAX_WIDTH && D_WIDTH === XSMAX_HEIGHT))
    );
})();

class WebScene extends Component<Props,State>{
    webView = {
        canGoBack: false,
        ref: null,
    }

    static navigationOptions = ()=>({
        header: null,
        tabBarVisible: false,
    })

    constructor(props: Object){
        super(props)
        this.state = {
            longitude: '',
            latitude: '',
            location: {
                latitude: '',
                longitude: '',
                LocationCity: ''
            }
        }
    }

    onAndroidBackPress = () => {
        if (this.webView.canGoBack && this.webView.ref) {
            this.webView.ref.goBack();
            return true;
        }
        return false;
    }

    componentWillMount () {
        if (Platform.OS === 'android') {
            BackHandler.addEventListener('hardwareBackPress', this.onAndroidBackPress);
        }
        // this.getPositions();
    }

    componentDidMount() {
        this.timer = setTimeout(()=>{
            SplashScreen.hide() // 隐藏启动屏
            // 跳转首页前
        }, 200)

        geolocationInit(); // 初始化定位

        // 获取一次定位
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
    }

    // 需谷歌支持
    getPositions = () => {
        return new Promise(() => {
            /** 获取当前位置信息 */
            navigator.geolocation.getCurrentPosition(
                location => {
                    this.setState({
                        longitude: location.coords.longitude,//经度
                        latitude: location.coords.latitude,//纬度
                    });
                    console.log(location);

                    // 通过调用高德地图逆地理接口，传入经纬度获取位置信息
                    fetch(`http://restapi.amap.com/v3/geocode/regeo?key=e7be7476169b9f2da6034334d27cd0b4&location=${this.state.longitude},${this.state.latitude}&radius=1000&extensions=all&batch=false&roadlevel=0`, {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/x-www-form-urlencoded"
                        },
                        body: ``
                    }).then((response) => response.json()).then((jsonData) => {
                            // console.log(jsonData)
                            try {
                                console.log(jsonData);
                            } catch (e) {
                                console.log(e);
                            }
                        }).catch((error) => {
                            console.error(error);
                        });
                },
                error => {
                    console.error(error);
                }
            );

        })
    }


    componentWillUnmount() {
        if (Platform.OS === 'android') {
            BackHandler.removeEventListener('hardwareBackPress');
        }
    }
    onLoadEnd = async (e) => {
        let data = ''
        const uniqueId = DeviceInfo.getUniqueID()

        data = {
            uniqueId: uniqueId,
            latitude: this.state.location.latitude,
            longitude: this.state.location.longitude
        }
        this.webView.ref.injectJavaScript(`receiveLocation(${JSON.stringify(data)});true;`)

        /*navigator.geolocation.getCurrentPosition((res)=>{
            // 通过调用高德地图逆地理接口，传入经纬度获取位置信息
            data = {
                uniqueId: uniqueId,
                latitude: res.coords.latitude,
                longitude: res.coords.longitude
            }
            // this.webView.ref.postMessage(`${JSON.stringify(data)}`) // // 适用于内置webview
            this.webView.ref.injectJavaScript(`receiveMessage(${JSON.stringify(data)});true;`) // 适用于组件webview
        })*/
    }

    render(){
        let isIPhoneXStyle = {}
        isIPhoneXStyle = isIPhoneX ? {paddingTop:20, paddingBottom: 35} : {marginTop: 0}
        return(
            <View style={[styles.container,isIPhoneXStyle]}>
                <ETTLightStatus color={'white'}/>
                <WebView
                    ref={webView => { this.webView.ref = webView; }}
                    style={styles.webView}
                    onMessage={this.onPay}
                    onLoadEnd={()=>{this.onLoadEnd()}}
                    source={{uri: 'https://mobile.shijiebox.com/'}}
                    onNavigationStateChange={(navState) => { this.webView.canGoBack = navState.canGoBack; }}
                />
            </View>
        )
    }

    onPay=(e)=>{
        try {
            const data = JSON.parse(e.nativeEvent.data);
            var that = this
            if (data.type === 'pay') {
                XPay.setWxId(data.data.appId);
                XPay.wxPay(data.data,(res) => {
                    // this.webView.ref.postMessage(res) // 适用于内置webview
                    that.webView.ref.injectJavaScript(`receiveMessage("wx_callback");true;`) // 适用于组件webview
                })
            }
            if (data.type === 'scan') {
                console.log(that.state.location)
                that.props.navigation.navigate('ScanScreen', {
                    title: '扫码',
                    data: {
                        userId: data.data.userId,
                        location: that.state.location
                    },
                    callback: data => {
                        that.webView.ref.injectJavaScript(`receiveMessage("store=${data}");true;`)
                    }
                })
            }
        } catch (error) {
            console.log(error);
        }
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    webView: {
        flex: 1,
    }
})

export default WebScene;


/*
    WebView组件的属性：
    automaticallyAdjustContentInsets：控制插入到导航栏，标签栏或者工具条之后的 web 内容是否自适应。默认为true。
    mediaPlaybackRequiresUserAction：控制 HTML5 音频和视频播放前是否需要用户点击。默认为true。
    contentInset：设置内容所占的尺寸大小。格式：{top:number,left:number,bottom:number,right:number}
    injectJavaScript：当网页加载之前注入一段 js 代码。其值是字符串形式。
    startInLoadingState：布尔值，控制WebView第一次加载时是否显示加载视图（如指示器）。当设置了renderLoading时必须将这个属性设置为true 才能正常显示。
    onNavigationStateChange：当导航状态发生变化的时候调用。
    onLoadStart：当网页开始加载的时候调用。
    onError：当网页加载失败的时候调用。
    onLoad：当网页加载结束的时候调用。
    onLoadEnd：当网页加载结束调用，不管是成功还是失败。
    renderLoading：设置一个函数，返回一个加载指示器。。为了使用这个属性必须将 startInLoadingState 属性设置为 true。
    renderError：设置一个函数，返回一个视图用于显示错误。
    onShouldStartLoadWithRequest（仅iOS）：该方法允许拦截 WebView 加载的 URL 地址，进行自定义处理。该方法通过返回 true 或者 falase 来决定是否继续加载该拦截到请求。
    bounces（仅iOS）：回弹特性。默认为 true。如果设置为 false，则内容拉到底部或者头部都不回弹。
    scalesPageToFit（仅iOS）：布尔值，控制网页内容是否自动适配视图的大小，同时启用用户缩放功能。默认为true。
    scrollEnabled（仅iOS）：控制是否在 WebView中启用滑动。默认为 true。
    domStorageEnabled（仅Android）：用于控制是否开启 DOM Storage（存储）。
    javaScriptEnabled：控制是否启用 JavaScript。仅在安卓下使用，因为 IOS 默认为启用 JavaScript。默认值为true。（android）
    allowFileAccess：布尔值，设置是否WebView有权访问文件系统。默认值为false（Android）；
    geolocationEnabled：是否允许获取地里位置（android）；
    onNavgationStateChange：导航状态改变时被调用
    onMessage：在 webview 内部的网页中调用 window.postMessage 方法时可以触发此属性对应的函数，从而实现网页和 RN 之间的数据交换。设置此属性的同时会在 webview 中注入一个 postMessage
        的全局函数并覆盖可能已经存在的同名属性。网页端的 window.postMessage 只发送一个参数 data，此参数封装在 RN 端的 event 对象中，即 event.nativeEvent.data。data 只能是一个字符串。
    mixedContentMode：指定混合内容模式。即 WebView 是否应该允许安全链接（https）页面中加载非安全链接（http）的内容
    allowsInlineMediaPlayback：控制 HTML5 视频是在内部播放(非全屏)还是使用原生的全屏控制器。默认为 false。注意：为了确保内联播放，除了这个属性需要被设置成true,
        在 html 代码中视频元素也需要包含 webkit-playsinline属性

    WebView组件的方法：
    1：goForward()
    2：goBack()
    3：reload()
    4：stopLoading()

    https://blog.csdn.net/xuehu837769474/article/details/80009099
    https://qiuxiang.github.io/react-native-amap-geolocation/#/
    https://gitee.com/putixie/react-native-smart-amap-location
    https://www.jianshu.com/p/18b7b5339c28?from=timeline
    https://www.jianshu.com/p/25f03c8783e2

    https://blog.csdn.net/boysky0015/article/details/85052985
    https://blog.csdn.net/sinat_33134895/article/details/81703239

    https://blog.csdn.net/weixin_44187730/article/details/88027825

    <!--
<?xml version="1.0" encoding="utf-8"?>
<RelativeLayout xmlns:android="http://schemas.android.com/apk/res/android"
    android:orientation="vertical"
    android:layout_width="match_parent"
    android:layout_height="match_parent">
    <ImageView
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    android:src="@drawable/launch_screen"
    android:scaleType="centerCrop" />
</RelativeLayout> -->
*/
