import React from 'react';
import {ActivityIndicator, View, Text, StyleSheet} from 'react-native';
import Colors from '../constants/Colors';
import Layout from '../constants/Layout'

class MiddleLoading extends React.Component {
    render() {
        return (
            <View style={loadStyles.wrapper}>
                <View style={loadStyles.box}>
                    <ActivityIndicator
                        animating={true}
                        color={Colors.focusOrange}
                        size='large'
                    />
                    <Text style={loadStyles.txt}>数据加载中...</Text>
                </View>
            </View>
        )
    }
}

const loadStyles = StyleSheet.create({
    wrapper: {
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        height: Layout.window.height,
        width: Layout.window.width,
        zIndex: 999,
    },
    box: {
        paddingVertical: 12,
        paddingHorizontal: 20,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.6)',
        borderRadius: 6
    },
    txt: {
        marginLeft: 20,
        fontSize: 14,
        color: '#fff'
    }
})

export default MiddleLoading
