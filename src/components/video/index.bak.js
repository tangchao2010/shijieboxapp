import React, {Component} from 'react';
import {StatusBar, StyleSheet, Text, ViewPropTypes, View, BackHandler, TouchableOpacity, Button} from 'react-native';
import PropTypes from 'prop-types'
import Video from 'react-native-video';
import Colors from '../../constants/Colors';
import Layout from '../../constants/Layout';

type Props = {
    title: string,
}
type State = {}

function formatTime(second) {
    let h = 0, i = 0, s = parseInt(second);
    if (s > 60) {
        i = parseInt(s / 60);
        s = parseInt(s % 60);
    }
    // 补零
    let zero = function (v) {
        return (v >> 0) < 10 ? "0" + v : v;
    };
    console.log([zero(h), zero(i), zero(s)].join(":"));
    return zero(s);
}

class index extends Component<Props, State> {
    static propTypes = {
        // PropTypes.oneOfType: 限制它为列举类型之一的对象
        // PropTypes.shape: 一个指定属性及其类型的对象
        source: PropTypes.oneOfType([PropTypes.number.isRequired, PropTypes.shape({uri: PropTypes.string})]),
        videoStyle: ViewPropTypes.style,
        style: PropTypes.object,
        defaultPaused: PropTypes.bool,
        totalDuration: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    };

    static defaultProps = {
        defaultPaused: false,
        totalDuration: 0
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

    componentDidMount() {

        // BackHandler.addEventListener('hardwareBackPress', this.onBackAndroid);
    }

    componentWillUnmount() {
        // BackHandler.removeEventListener('hardwareBackPress', this.onBackAndroid);
    }

    onBackAndroid = () => {
        this.props.navigation.goBack();
        return true;
    };
    onLoad = (data) => {
        this.setState({duration: data.duration});
        alert(data.duration + "xxx");
    };
    onProgress = (data) => {
        this.setState({currentTime: data.currentTime});
        console.log(data.currentTime + "hhh");
    };
    onEnd = () => {
        this.setState({paused: true})
        this.video.seek(0)
    };
    onAudioBecomingNoisy = () => {
        this.setState({paused: true})
    };
    onAudioFocusChanged = (event: { hasAudioFocus: boolean }) => {
        this.setState({paused: !event.hasAudioFocus})
    };

    getCurrentTimePercentage() {
        if (this.state.currentTime > 0) {
            return parseFloat(this.state.currentTime) / parseFloat(this.state.duration);
        }
        return 0;
    };

    renderRateControl(rate) {
        const isSelected = (this.state.rate === rate);
        return (
            <TouchableOpacity onPress={() => {
                this.setState({rate})
            }}>
                <Text style={[styles.controlOption, {fontWeight: isSelected ? 'bold' : 'normal'}]}>
                    {rate}x
                </Text>
            </TouchableOpacity>
        );
    }

    renderResizeModeControl(resizeMode) {
        const isSelected = (this.state.resizeMode === resizeMode);
        return (
            <TouchableOpacity onPress={() => {
                this.setState({resizeMode})
            }}>
                <Text style={[styles.controlOption, {fontWeight: isSelected ? 'bold' : 'normal'}]}>
                    {resizeMode}
                </Text>
            </TouchableOpacity>
        )
    }

    renderVolumeControl(volume) {
        const isSelected = (this.state.volume === volume);
        return (
            <TouchableOpacity onPress={() => {
                this.setState({volume})
            }}>
                <Text style={[styles.controlOption, {fontWeight: isSelected ? 'bold' : 'normal'}]}>
                    {volume * 100}%
                </Text>
            </TouchableOpacity>
        )
    }

    renderVideoPlayer = () => {
        const {source, videoStyle} = this.props
        alert(JSON.stringify(source))
        const flexCompleted = this.getCurrentTimePercentage() * 100;
        const flexRemaining = (1 - this.getCurrentTimePercentage()) * 100;
        return (
            <View style={styles.playerContainer}>
                <TouchableOpacity
                    style={videoStyle}
                    onPress={() => this.setState({paused: !this.state.paused})}>
                    <Video
                        source={require('../../../assets/video.mov')}
                        style={styles.fullScreen}
                    />
                    <View style={styles.progress}>
                        <View style={[styles.innerProgressCompleted, {flex: flexCompleted}]}/>
                        <View style={[styles.innerProgressRemaining, {flex: flexRemaining}]}/>
                    </View>
                </TouchableOpacity>
                <View style={styles.textStyle}>
                    <Text style={styles.volumeControl}>
                        {formatTime(this.state.duration - this.state.currentTime)}
                    </Text>
                    <Button style={styles.btnStyle} title={'关闭广告'} color={'#73808080'}
                            onPress={() => {
                                this.props.navigation.goBack()
                            }}/>
                </View>
                <View style={styles.controls}>
                    <View style={styles.generalControls}>

                    </View>
                    <View style={styles.trackingControls}>
                        <View style={styles.progress}>
                            <View style={[styles.innerProgressCompleted, {flex: flexCompleted}]}/>
                            <View style={[styles.innerProgressRemaining, {flex: flexRemaining}]}/>
                        </View>
                    </View>
                </View>
            </View>
        )
    }

    render() {
        return (
            <View style={styles.container}>
                {this.renderVideoPlayer()}
            </View>
        )
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    playerContainer: {
        backgroundColor: '#000',
    },
    textStyle: {
        paddingLeft: 10,
        paddingTop: 25,
        justifyContent: 'flex-start',
        flexDirection: 'row',
    },
    btnStyle: {
        paddingRight: 10,
        paddingTop: 25,
        justifyContent: 'flex-end',
        flexDirection: 'row',
    },
    fullScreen: {
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
    },
    controls: {
        backgroundColor: 'transparent',
        borderRadius: 5,
        position: 'absolute',
        bottom: 20,
        left: 20,
        right: 20,
    },
    progress: {
        flex: 1,
        flexDirection: 'row',
        borderRadius: 3,
        overflow: 'hidden',
    },
    innerProgressCompleted: {
        height: 20,
        backgroundColor: '#cccccc',
    },
    innerProgressRemaining: {
        height: 20,
        backgroundColor: '#2C2C2C',
    },
    generalControls: {
        flex: 1,
        flexDirection: 'row',
        borderRadius: 4,
        overflow: 'hidden',
        paddingTop: 10,
    },
    rateControl: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
    },
    volumeControl: {
        fontSize: 25,
        color: '#fff',
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
    },
    resizeModeControl: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    controlOption: {
        alignSelf: 'center',
        fontSize: 11,
        color: 'white',
        paddingLeft: 2,
        paddingRight: 2,
        lineHeight: 12,
    },
    trackingControls: {

    }
})

export default index;


/*

<Video
    ref={(ref: Video) => { // 方法对引用Video元素的ref引用进行操作
        this.video = ref
    }}
    source={{uri: source.uri}}
    // source={require('../../background.mp4')} //设置视频源
    // style={styles.fullScreen}//组件样式
    rate={this.state.rate}//播放速率
    paused={this.state.paused}//暂停
    volume={this.state.volume}//调节音量
    muted={this.state.muted}//控制音频是否静音
    resizeMode={this.state.resizeMode}//缩放模式
    onLoad={this.onLoad}//加载媒体并准备播放时调用的回调函数。
    onProgress={this.onProgress}//视频播放过程中每个间隔进度单位调用的回调函数
    onEnd={this.onEnd}//视频播放结束时的回调函数
    onAudioBecomingNoisy={this.onAudioBecomingNoisy}//音频变得嘈杂时的回调 - 应暂停视频
    onAudioFocusChanged={this.onAudioFocusChanged}//音频焦点丢失时的回调 - 如果焦点丢失则暂停
    repeat={false}//确定在到达结尾时是否重复播放视频。
/>

*/
