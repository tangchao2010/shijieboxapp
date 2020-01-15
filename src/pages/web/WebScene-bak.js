import React, { Component } from "react";
import {StyleSheet, View, Image, Text, WebView, SafeAreaView,StatusBar, InteractionManager} from 'react-native';
import {ETTLightStatus} from '../../components/ETTLightStatus'

import SplashScreen from 'react-native-splash-screen'

type Props = {

}

type State = {

}

class WebScene extends Component<Props,State>{
    static navigationOptions = ()=>({
        header: null,
        tabBarVisible: false,
    })

    constructor(props: Object){
        super(props)
    }

    componentDidMount() {
        this.timer = setTimeout(()=>{
            SplashScreen.hide() //隐藏启动屏
            // 跳转首页前
        }, 200)

        InteractionManager.runAfterInteractions(() => {
            // ('加载中')
        })
    }
    // onLoadEnd={this.onLoadEnd}  http://mobile.shijiebox.com
    onLoadEnd = (e) => {
        let title = e.nativeEvent.title
            // (title)
        if (title.length > 0) {

        }
    }

    render(){
        return(
            /*http://mobile.shijiebox.com*/
            <View style={styles.container}>
                <ETTLightStatus color={'white'}/>
                <WebView
                    style={styles.webView}
                    source={{uri: 'http://mobile.shijiebox.com'}}
                />
            </View>
        )
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
