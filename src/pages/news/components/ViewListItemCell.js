import React, {Component} from 'react';
import {StatusBar, Dimensions, Image, TouchableHighlight, ImageBackground,  TouchableOpacity, StyleSheet, Text, View} from 'react-native';
import Colors from '../../../constants/Colors';
import Layout from '../../../constants/Layout';
import Constants from "./Constants";
import PropTypes from 'prop-types';
import VideoPlayer from '../../../components/video/index'


type Props = {
    title: string,
}
type State = {

}

const NewsLayoutType = {
    QCNewsLayoutType_LeftPic: 1, //左边图片类型
    QCNewsLayoutType_BigVideo: 4, //大视频类型
}

class NewsListItemCell extends Component<Props, State> {
    static propTypes = {
        onPressItem: PropTypes.func
    };

    constructor(props) {
        super(props)
        this.state = {}
        this._handleOnLayout = this._handleOnLayout.bind(this);
    }

    _handleOnLayout(event) {
        let height = event.nativeEvent.layout.height;
        /*if (height && height != this.props.item.height) {
            this.props.item.height = height;
        }*/
    }

    componentDidMount() {
        const {news} = this.props;
    }

    render() {
        const {news, showViewId} = this.props;
        let item = news.item
        const title = (<Text style={styles.title} numberOfLines={0}>{item.title}</Text>);
        /** 底部 作者 阅读 时间 */
        const bottomContainer = (
            <View style={styles.bottomContainer}>
                <View style={styles.bottomLeftContainer}>
                    <Text style={[styles.bottomText, {marginRight: kMargin}]}>{item.source}</Text>
                    <Text style={styles.bottomText}>{item.commentNum}</Text>
                </View>
                <Text style={[styles.bottomText]}>{item.createTime}</Text>
            </View>
        );

        switch (showViewId) {
            case  NewsLayoutType.QCNewsLayoutType_BigVideo: {
                return (
                    <TouchableHighlight
                        onPress={this._onPress}
                        underlayColor='#dddddd' onLayout={this._handleOnLayout}>
                        <View style={styles.cellContainer}>
                            <View style={styles.columnContainer}>
                                {title}
                                <ImageBackground style={styles.bigVideo} source={{ uri: item.image}}>
                                    <Text style={styles.bigVideoDurationText}>{item.actionTime}</Text>
                                    <TouchableOpacity style={[StyleSheet.absoluteFill,{justifyContent:'center',alignItems:'center'}]} >
                                    <Image source={require('../../../images/tv_icon.png')}  style={{backgroundColor:'transparent'}}/>
                                    </TouchableOpacity>
                                </ImageBackground>
                                <VideoPlayer
                                    videoStyle={{ width: Layout.window.width, height: Layout.window.width * 0.613 }}
                                    totalDuration={50000}
                                    resizeMode={'stretch'}
                                    source={{ uri: item.videoPath }}
                                />
                                {bottomContainer}
                            </View>
                            <View style={styles.separator}/>
                        </View>
                    </TouchableHighlight>
                );
            }
            case  NewsLayoutType.QCNewsLayoutType_LeftPic:
            default: {
                return (
                    <TouchableHighlight
                        onPress={this.props.onPress}
                        underlayColor='#dddddd' onLayout={this._handleOnLayout}>
                        <View style={styles.cellContainer}>
                            <View style={styles.columnContainer}>
                                {title}
                                <View style={styles.theSameSizeImageContainer}>
                                    <Image style={styles.theSameSizeImage} source={{uri: item.imageList[0].image}}/>
                                    <Image style={styles.theSameSizeImage} source={{uri: item.imageList[1].image}}/>
                                    <Image style={styles.theSameSizeImage} source={{uri: item.imageList[2].image}}/>
                                </View>
                                {bottomContainer}
                            </View>
                            <View style={styles.separator}/>
                        </View>
                    </TouchableHighlight>
                );
            }
        }
    }
}

const kScreenWidth = Dimensions.get('window').width;
const kMargin = 16;
const kUIView_Margin = 8;
const leftPicWidth = (kScreenWidth - 2 * kMargin - kUIView_Margin) / 3;
const bigVideoWidth = (kScreenWidth - 2 * kMargin);
const smallVideoWidth = (kScreenWidth - 2 * kMargin - kUIView_Margin) / 3;
const subjectImageWidth = (kScreenWidth - 2 * kMargin);
const kImageRatio = 9.0 / 16.0;
const kBigAdImageRatio = 160 / 728;
const theSameSizeImageWidth = (kScreenWidth - 2 * kMargin - 2 * kUIView_Margin) / 3;
const threePicLargeImageHeight = (kScreenWidth - 2 * kMargin - kUIView_Margin + kUIView_Margin / 2) * kImageRatio * 2 / 3;
const threePicSmallImageHeight = (threePicLargeImageHeight - kUIView_Margin) / 2;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        //paddingTop: 22
        //alignItems: 'stretch',
    },
    cellContainer: {
        backgroundColor: 'white',
        width: kScreenWidth,
    },
    rowContainer: {
        flexDirection: 'row',
        backgroundColor: 'white',
        padding: kMargin,
    },
    columnContainer: {
        flexDirection: 'column',
        backgroundColor: 'white',
        padding: kMargin,
    },
    leftPic: {
        width: leftPicWidth,
        height: kImageRatio * leftPicWidth,
        marginRight: kUIView_Margin,
    },
    textContainer: {
        flex: 1,
        //backgroundColor:'red',
        justifyContent: 'space-between'
    },
    title: {
        fontSize: 16,
        color: '#3D3D3D'
    },
    bottomContainer: {
        flexDirection: 'row',
        paddingTop: kUIView_Margin,
        justifyContent: 'space-between',
        //alignItems:'center',
        //backgroundColor:'yellow',
    },
    bottomLeftContainer: {
        flexDirection: 'row',
        alignItems: 'center'
        //backgroundColor:'red',
    },
    bottomText: {
        fontSize: 12,
        color: '#9B9B9B',
    },
    separator: {
        height: 0.5,
        marginHorizontal: kMargin,
        backgroundColor: '#d8d8d8',
    },
    //大视频
    bigVideo: {
        width: bigVideoWidth,
        height: bigVideoWidth * kImageRatio,
        marginTop: kUIView_Margin,
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
    },
    bigVideoDurationText: {
        fontSize: 15,
        color: 'white',
        marginBottom: kUIView_Margin,
        marginRight: kUIView_Margin,
    },
    //小视频
    smallVideo: {
        width: smallVideoWidth,
        height: smallVideoWidth * kImageRatio,
        marginRight: kUIView_Margin,
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
    },
    smallVideoDurationText: {
        fontSize: 9,
        color: 'white',
        marginBottom: kUIView_Margin / 2,
        marginRight: kUIView_Margin / 2,
    },
    //专题
    subjectImage: {
        width: subjectImageWidth,
        height: subjectImageWidth * kImageRatio,
        marginBottom: kUIView_Margin,
    },
    subjectTitleContainer: {
        width: 45,
        height: 27,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'black',
    },
    subjectTitle: {
        fontSize: 12,
        color: 'white',
        // width:45,
        // height:27,
    },
    //大小图类型
    leftLargeRightTwoSmallImageContainer: {
        flexDirection: 'row',
        marginTop: kUIView_Margin,
    },
    largeImage: {
        width: threePicLargeImageHeight / kImageRatio,
        height: threePicLargeImageHeight,
    },
    smallImageContainer: {
        flexDirection: 'column',
        justifyContent: 'space-between',
        marginLeft: kUIView_Margin,
    },
    smallImage: {
        width: threePicSmallImageHeight / kImageRatio,
        height: threePicSmallImageHeight,
    },
    //相同图片类型
    theSameSizeImageContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: kUIView_Margin,
    },
    theSameSizeImage: {
        width: theSameSizeImageWidth,
        height: (theSameSizeImageWidth) * kImageRatio,
        //backgroundColor:'red',
    },
    //大广告
    bigAdPic: {
        width: kScreenWidth,
        height: kBigAdImageRatio * kScreenWidth,
    },
});


export default NewsListItemCell;

{/*
<TouchableOpacity
    onPress={this.props.onPress}
    underlayColor='#dddddd'>
    <View style={styles.cellContainer}>
        <View style={styles.rowContainer}>
            <Image style={styles.leftPic} source={{uri: item.imageUrl[0] + Constants.ImageUrlSuffix.Image}}/>
            <Image style={styles.leftPic}
                   source={{uri: item.image}}/>
            <View style={styles.textContainer}>
                {title}
                {bottomContainer}
            </View>
        </View>
        <View style={styles.separator}/>
    </View>
</TouchableOpacity>*/}
