import React, {Component} from 'react';
import {View, Text, ActivityIndicator, StyleSheet, TouchableOpacity} from 'react-native';
import RefreshState from './RefreshState';
import PropTypes from 'prop-types';

export default class RefreshFooter extends Component {
  /**
   * propTypes是我们给RefreshFooter组件定义的给外部调用的方法，方法类型需要使用PropTypes来指定；
   * 需要安装facebook的prop-types依赖库，最好使用yarn add prop-types安装，不容易出错，这里用作运行时的类型检查。
   * */

  static propTypes = {
    onLoadMore: PropTypes.func,     // 加载更多数据的方法
    onRetryLoading: PropTypes.func, // 重新加载的方法
  };

  /**
   * defaultProps：中我们定义了几种不同状态下默认的文本内容，可以在外部传值进行修改
   * */
    static defaultProps = {
    footerRefreshingText: "努力加载中",
    footerLoadMoreText: "上拉加载更多",
    footerFailureText: "点击重新加载",
    footerNoMoreDataText: "已全部加载完毕"
  };
  
  render() {
    let {state} = this.props;
    let footer = null;
    switch (state) {
      case RefreshState.Idle:
        // Idle情况下为null，不显示尾部组件
        break;
      case RefreshState.Refreshing:
        footer =
          <View style={styles.loadingView}>
            <ActivityIndicator size="small"/>
            <Text style={styles.refreshingText}>{this.props.footerRefreshingText}</Text>
          </View>;
        break;
      case RefreshState.CanLoadMore:
        footer =
          <View style={styles.loadingView}>
            <Text style={styles.footerText}>{this.props.footerLoadMoreText}</Text>
          </View>;
        break;
      case RefreshState.NoMoreData:
        footer =
          <View style={styles.loadingView}>
            <Text style={styles.footerText}>{this.props.footerNoMoreDataText}</Text>
          </View>;
        break;
      case RefreshState.Failure:
        footer =
          <TouchableOpacity style={styles.loadingView} onPress={()=>{
            this.props.onRetryLoading && this.props.onRetryLoading();
          }}>
            <Text style={styles.footerText}>{this.props.footerFailureText}</Text>
          </TouchableOpacity>;
        break;
    }
    return footer;
  }
}

const styles = StyleSheet.create({
  loadingView: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 15,
  },
  refreshingText: {
    fontSize: 12,
    color: "#666666",
    paddingLeft: 10,
  },
  footerText: {
    fontSize: 12,
    color: "#666666"
  }
});
