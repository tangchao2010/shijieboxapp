import React, { Component } from 'react';
import {StyleSheet, View, BackHandler, TouchableOpacity, Image, Text, ScrollView} from 'react-native';
import Video  from 'react-native-video';
import Colors from '../../constants/Colors';
import Layout from '../../constants/Layout';
import MiddleLoading from '../MiddleLoading'

type Props = {
    title: string,
}
type State = {}

class indekBak1 extends Component<Props, State> {
    constructor(props) {
        super(props);
    }

    render() {
        const {source, videoStyle} = this.props
        // let { ready } = this.state
        const ready = true
        return (
            <View style={styles.container}>
                <View style={[videoStyle, styles.playerContainer]}>
                    {/*<Text style={{color: 'white', textAlign:'center', fontSize: 14, alignItems: 'center'}}>暂无视频</Text>*/}
                    {
                        ready ?
                            <Video
                                source={{ uri: source.uri}}
                                rate={1.0}
                                volume={1.0}
                                isMuted={false}
                                resizeMode="cover"
                                shouldPlay
                                isLooping
                                style={videoStyle}
                            />
                            :
                            <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
                                <MiddleLoading/>
                            </View>
                    }
                </View>
            </View>
        );
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.screenBackgroundColor
    },
    playerContainer: {
        backgroundColor: '#000'
    }
})

export default indekBak1
