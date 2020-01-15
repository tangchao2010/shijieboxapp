import React, {Component} from 'react';
import {StatusBar, StyleSheet, Text, View, ScrollView} from 'react-native';
import HTMLView from 'react-native-htmlview';
import WebView from 'react-native-webview'
import Colors from '../../constants/Colors';
import Layout from '../../constants/Layout';
import fetch from "../../config/Connect";
import ToastModule from "../../components/module/ToastModule";

type Props = {
    title: string,
}
type State = {}

class ViewListDetailScreen extends Component<Props, State> {
    static navigationOptions = ({navigation}) => ({
        /*headerLeft:(
            <View style={{flex:1, justifyContent:'center', alignItems:'center', paddingLeft: 10}}>
                <TouchableOpacity onPress={()=>navigation.goBack()}>
                    <Image source={require('../../images/return.png')} style={{width: 20, height:20}}></Image>
                </TouchableOpacity>
            </View>
        ),*/
        headerTitle: (
            <View style={{flex:1, justifyContent:'center', alignItems: 'center'}}>
                <Text style={{fontSize: 20, color: '#333', fontWeight: 'bold'}}>资讯详情</Text>
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
            newsDetail: {},
            height: Layout.window.height
        }
    }

    componentDidMount() {
        this.getNewsDetailData(this.props.navigation.state.params.id) // this.props.navigation.state.params.id 576708
    }

    getNewsDetailData(id) {
        ToastModule.showCustomLoading()
        fetch.getNewsDetailData({id: id}, res => {
            if(res !='' || res != null) {
                this.setState({
                    newsDetail: res
                })
            } else {
                ToastModule.showCustomText('请')
            }
        }, err => {
            console.log(err + "加载失败");
        })
    }

    render() {
        const {newsDetail} = this.state
        const injectedJs = 'setTimeout(() => {window.ReactNativeWebView.postMessage(document.getElementById("content").clientHeight)}, 500)'
        return (
            <View style={styles.container}>
                <StatusBar
                    animated={true}
                    hidden={false}
                    backgroundColor={'white'}
                    barStyle="light-content"
                />
                <ScrollView style={styles.detailContent}>
                    {
                        newsDetail == {} ? <View style={{flex: 1, backgroundColor: 'red'}}><Text style={{
                                fontSize: 15,
                                color: Colors.classTwoTitle,
                                textAlign: 'center'
                            }}>正在加载中...</Text></View>
                            :
                            <View style={{flex: 1, paddingHorizontal: 16}}>
                                <View style={styles.titleContainer}>
                                    <Text style={styles.title}>{newsDetail.title}</Text>
                                    <View style={styles.titleBottom}>
                                        <Text style={{color: '#474747', fontSize: 13}}>{newsDetail.source}</Text>
                                        <Text style={{color: '#adadad', fontSize: 12}}>{newsDetail.actionTime}</Text>
                                    </View>
                                </View>
                                <View style={styles.contentContainer}>
                                    {/*<HTMLView
                                        value={newsDetail.content}
                                        stylesheet={styles}
                                    />*/}
                                    <WebView
                                        style={{
                                            width: Layout.window.width,
                                            height: this.state.height
                                        }}
                                        injectedJavaScript={injectedJs}
                                        source={{html: `<!DOCTYPE html><html><style>#content{/*position: absolute; left: 0; right: 0; top: 0; bottom: 20px; overflow: scroll*/} #content img {width: 100%;} #content p {font-size: 28px; line-height: 52px; color: #4d4d4d}</style><<body><div id='content'>${newsDetail.content}</div></body></html>`}}
                                        scalesPageToFit={true} // On iOS, when useWebKit=true, this prop will not work.
                                        javaScriptEnabled={true} // 仅限Android平台。iOS平台JavaScript是默认开启的。
                                        domStorageEnabled={true} // 适用于安卓a
                                        scrollEnabled={false}
                                        onMessage={e => {
                                            this.setState({height: (+e.nativeEvent.data)/2})
                                        }}
                                    />
                                </View>
                            </View>
                    }
                </ScrollView>

            </View>
        )
    }
}


const styles = StyleSheet.create({
    p: {
        fontSize: 17,
        lineHeight: 30,
        color: Colors.classTwoTitle
    },
    img: {
        width: 50
    },

    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    detailContent: {
        flex: 1
    },
    titleContainer: {
        paddingVertical: 18
    },
    title: {
        fontSize: 22,
        lineHeight: 35,
        fontWeight: 'bold',
        color: '#323232',
        alignItems: 'center'
    },
    titleBottom: {
        paddingTop: 29,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    contentContainer: {
        flex: 1,
    }
})

export default ViewListDetailScreen;
