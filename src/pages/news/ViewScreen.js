import React, {Component} from 'react';
import {View, Text, Image, StyleSheet, TouchableOpacity, StatusBar} from 'react-native'
import {NavigationState, SceneRendererProps, TabBar, TabView,} from 'react-native-tab-view';
import Layout from "../../constants/Layout";
import Colors from "../../constants/Colors";
import ViewListScreen from './ViewListScreen';
import VideoListScreen from './ViewVideoListScreen';
import SplashScreen from "react-native-splash-screen";

const columns = ['新闻资讯', '视频点播']
const routes = columns.map(item => {
    return {key: item, title: item}
});

class ViewScreen extends Component <Props, State> {
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
                <Text style={{fontSize: 20, color: '#333', fontWeight: 'bold'}}>视界</Text>
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
            index: 0,
            routes: routes
        }
    }
    componentDidMount() {
        this.timer = setTimeout(()=>{
            SplashScreen.hide() //隐藏启动屏
            // 跳转首页前
        }, 200)
    }

    renderScene = ({route, jumpTo}) => {
        console.log(jumpTo);
        switch (route.key) {
            case '新闻资讯':
                return <ViewListScreen title={route.title} navigation={this.props.navigation}/>;
            case '视频点播':
                return <VideoListScreen title={route.title} navigation={this.props.navigation}/>;
        }
    };
    renderTabBar = (
        props: SceneRendererProps & { navigationState: State }
    ) => (
        <View style={{ paddingLeft: 15, paddingRight: 15, borderBottomWidth: StyleSheet.hairlineWidth, borderBottomColor: '#f2f2f2'}}>
            <TabBar
                {...props}
                renderLabel={({route, focused}) => {
                    return <Text style={{
                        width: 150,
                        textAlign: 'center',
                        color: focused ? Colors.focusOrange : "#5E5E5E",
                        fontSize: 16,
                        fontWeight: focused? 'bold': 'normal'
                    }}>{route.title}</Text>
                }}
                indicatorStyle={{ backgroundColor: Colors.focusOrange }}
                style={{ backgroundColor: 'white',elevation: 0, shadowOffset: {width: 0, height: 0},   shadowRadius: 0, borderWidth: 0, shadowColor: 'black',}}
                pressColor={{ backgroundColor: '#999'}}
            />
        </View>
    );
    handleIndexChange = (index: number) =>
        this.setState({index});

    render() {
        return (
            <TabView
                navigationState={this.state}
                lazy={true}
                renderScene={this.renderScene}
                renderTabBar={this.renderTabBar}
                onIndexChange={this.handleIndexChange}
            />
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    tabBar: {
        backgroundColor: 'white',
        width: Layout.window.width - 35,
        elevation: 0,
        shadowOffset: {width: 0, height: 0},
        shadowRadius: 0,
        borderWidth: 0,
        shadowColor: 'black',
    },
    tab: {
        width: 70,
    },
    indicator: {
        backgroundColor: '#ffeb3b',
        height: 0,
    },
    label: {
        fontSize: 18,
        color: '#5E5E5E'
    },
    tabBarMoreIcon: {
        width: 35,
        alignItems: 'center', justifyContent: 'center'
    }
})

export default ViewScreen

{/*<View style={styles.container}>
                <StatusBar
                    animated={true}
                    hidden={false}
                    backgroundColor={'white'}
                    barStyle="dark-content"
                />
                <TabView
                    navigationState={this.state}
                    lazy={true}
                    renderScene={this.renderScene}
                    renderTabBar={this.renderTabBar}
                    onIndexChange={this.handleIndexChange}
                />
            </View>*/}

{/*<View style={{flexDirection: 'row', borderBottomWidth: StyleSheet.hairlineWidth, borderBottomColor: '#f2f2f2'}}>
            <TabBar
                {...props}
                renderLabel={({route, focused}) => {
                    return <Text style={{
                        width: 70,
                        textAlign: 'center',
                        color: focused ? Colors.focusOrange : "#5E5E5E",
                        fontSize: focused ? 18 : 16
                    }}>{route.title}</Text>
                }}
                scrollEnabled
                indicatorStyle={styles.indicator}
                style={styles.tabBar}
                tabStyle={styles.tab}
                labelStyle={styles.label}
            />
        </View>*/}