import React, {Component} from 'react';
import {Image, StatusBar, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import fetch from "../../config/Connect";
import ToastModule from '../../components/module/ToastModule'
import Colors from '../../constants/Colors';
import Layout from '../../constants/Layout';
import Button from '../../components/Button'


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
                <Text style={{fontSize: 20, color: '#333', fontWeight: 'bold'}}>扫码</Text>
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
    }

    componentDidMount() {

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

                <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                    <Button
                        title='打开相机扫码'
                        activeOpacity={0.8}
                        onPress={() => {
                            this.props.navigation.navigate('ScanScreen', {
                                title: '测试扫码',
                            })
                        }}
                        style={styles.sureLogin}
                        titleStyle={{color: 'white', fontSize: 16}}
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
