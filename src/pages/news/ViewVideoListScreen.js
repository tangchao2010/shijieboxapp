import React, {Component} from 'react';
import {StatusBar, StyleSheet, Text, View} from 'react-native';
import Colors from '../../constants/Colors';
import Layout from '../../constants/Layout';
import fetch from "../../config/Connect";
import RefreshListView from "../../components/flatlist/Refresh/RefreshListView";
import RefreshState from "../../components/flatlist/Refresh/RefreshState";
import ViewListItemCell from "./components/ViewListItemCell.js";
import ToastModule from "../../components/module/ToastModule";

type Props = {
    title: string,
}
type State = {}

class VideoListScreen extends Component<Props, State> {
     static navigationOptions = ({navigation}) => ({
        headerTitle: '',
        headerStyle: {
            backgroundColor: Colors.topNavBackground,
            elevation: 0,
            color: 'white',
            borderBottomWidth: Layout.onePixel,
            borderColor: Colors.border
        },
        /*gestureResponseDistance:{horizontal:Layout.window.width/2},
        gesturesEnabled:true*/
    })

    constructor(props) {
        super(props)
        this.state = {
            type: 1,
            title: this.props.title,
            newsList: [],  // 新闻列表的数据源
            pageNum: 1,   // 从第几页开始加载
            pageSize: 10,   // 每页加载多少条数据
        }
    }

    componentDidMount() {
        this.listView.beginHeaderRefresh();
    }

    _renderItem = (item) => {
        return (
            <ViewListItemCell
                news={item}
                showViewId={4}
                onPress={() => {
                    this.props.navigation.navigate('ViewDetailScreen', {
                        id: item.item.id,
                        title: item.item.title
                    })
                }}/>
        )
    };

    /** 渲染一个空白页，当列表无数据的时候显示。这里简单写成一个View控件 */
    _renderEmptyView = () => {
        return <View></View>
    };

    /** 加载列表，取20条数据显示 */
    loadDisplayingNews() {
        const {type, newsList, pageNum, pageSize} = this.state
        const params = {
            pageNum: pageNum,
            pageSize: pageSize,
            type: type
        }
        fetch.getVideoData(params, res => {
            if(res.count > 0) {
                let totalCount = res.count;
                let currentCount = newsList.length; // 当前已经加载的条数

                // 根据已经加载的条数和总条数的比较，判断是否还有下一页
                let footerState = RefreshState.Idle;
                let startPage = pageNum
                if (currentCount + res.list.length < totalCount) {
                    footerState = RefreshState.CanLoadMore; // 还有数据可以加载
                    startPage += 1
                } else {
                    footerState = RefreshState.NoMoreData;
                }
                // 更新newsList的值
                let list = newsList.concat(res.list);
                this.setState({
                    newsList: list,
                    pageNum: startPage
                });
                this.listView.endRefreshing(footerState);
            } else {
                ToastModule.showCustomText('请稍等')
            }
        }, err => {
            console.log(err + "加载失败");
            this.listView.endRefreshing(RefreshState.Failure);
        })
    }

    keyExtractor = (item: Object, index: number) => {
        return index.toString()
    }
    render() {
        return (
            <View style={styles.container}>
                <StatusBar
                    animated={true}
                    hidden={false}
                    backgroundColor={'white'}
                    barStyle="light-content"
                />
                <RefreshListView
                    ref={(ref) => {this.listView = ref}}
                    data={this.state.newsList}
                    renderItem={this._renderItem}
                    keyExtractor={this.keyExtractor}
                    ListEmptyComponent={this._renderEmptyView}
                    onHeaderRefresh={() => { this.loadDisplayingNews() }}
                    onFooterRefresh={() => { this.loadDisplayingNews() }}
                />
            </View>
        )
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.screenBackgroundColor,
    }
})

export default VideoListScreen;
