import React, {
    Component
} from 'react';

import {StyleSheet, View, BackHandler, TouchableOpacity, Image, Text, ScrollView, ViewPropTypes} from 'react-native';
import PropTypes from 'prop-types'
import Video  from 'react-native-video';
import Colors from "../../constants/Colors";
import Layout from "../../constants/Layout";
import MiddleLoading from '../MiddleLoading'

export default class index extends Component {
    static navigationOptions = {
        header: null
    };

    static propTypes = {
        // PropTypes.oneOfType: 限制它为列举类型之一的对象
        // PropTypes.shape: 一个指定属性及其类型的对象
        source: PropTypes.oneOfType([PropTypes.number.isRequired, PropTypes.shape({uri: PropTypes.string})]),
        videoStyle: ViewPropTypes.style,
        style: PropTypes.object,
        defaultPaused: PropTypes.bool,
        totalDuration: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    };

    constructor(props) {
        super(props)
        this.state = {
            rate: 1, // 初始化速率
            volume: 1,
            muted: false,
            resizeMode: 'contain',
            duration: 0.0,
            currentTime: 0.0,
            paused: true,
        }
    }

    renderVideoPlayer = () => {
        const {source, videoStyle} = this.props
        return (
            <View style={styles.playerContainer}>
                <TouchableOpacity
                    style={styles.fullScreen}
                    onPress={() => this.setState({paused: !this.state.paused})}>
                    {
                        source.uri ?
                        <Video
                            source={{uri: source.uri}}
                            rate={1.0}
                            volume={1.0}
                            isMuted={false}
                            resizeMode="cover"
                            shouldPlay
                            isLooping
                            style={{width: Layout.window.width, height: Layout.window.width * 0.613,}}
                        />
                        :
                        <View style={{flex:1, justifyContent:'center'}}>
                            <MiddleLoading/>
                        </View>
                    }
                </TouchableOpacity>
            </View>
        )
    }

    render() {
        return (
            <View style={styles.container}>
                {this.renderVideoPlayer()}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.screenBackgroundColor,
    },
    playerContainer: {
        flex: 1,
        backgroundColor: '#000',
    },
    fullScreen: {
        backgroundColor: '#000',
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
    },
});
