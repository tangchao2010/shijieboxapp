import React, { Component } from "react";
import {
    createAppContainer,
    createStackNavigator,
    createBottomTabNavigator,
} from "react-navigation"

import StackViewStyleInterpolator from 'react-navigation-stack/src/views/StackView/StackViewStyleInterpolator';

import HomeScene from './pages/home/HomeScene'
import WebScene from './pages/web/WebScene'
import TvScreen from './pages/scan/TvLoginScreen'
import ScanScreen from './pages/scan/ScanScreen'
import GoScreen from './pages/scan/GoScreen'
import ViewScreen from './pages/news/ViewScreen'
import  ViewDetailScreen from './pages/news/ViewListDetailScreen'

class RootScene extends Component<{}> {
    render() {
        return (
            <WebScene/>
        )
    }
}

/*const Tab = createBottomTabNavigator(
    {
        home: {
            screen: ScanScreen,
        }
    }
)*/


/**
 * 自定义动画参数，通过在跳转页面中增加 transitionType: '类型' 来进行动画设置，默认 forHorizontal（从右往左）
 * @param sceneProps 路由参数获取源
 * @returns {*}
 * @constructor
 */
function TransitionConfiguration(sceneProps) {
    const {scene} = sceneProps;
    const {route} = scene;
    const params = route.params || {};
    const transitionType = params.transitionType;
    if (transitionType && transitionType !== '') {
        return StackViewStyleInterpolator[transitionType];
    } else {
        return StackViewStyleInterpolator.forHorizontal;
    }
}

const configAppNavigator = createStackNavigator(
    {
        WebScene: {
            screen: WebScene,
        },
        GoScreen: {
            screen: GoScreen
        },
        ScanScreen: {
            screen: ScanScreen
        },
        TvScreen: {
            screen: TvScreen
        },
        ViewScreen: {
            screen: ViewScreen
        },
        ViewDetailScreen: {
            screen: ViewDetailScreen
        },
        HomeScene: {
            screen: HomeScene
        }
       /* Tab: {
            screen: Tab
        },*/
    },{
        initialRouteName: 'WebScene',
        transitionConfig: (sceneProps) => ({
            /**
             * 1、从右向左：  forHorizontal；
             * 2、从下向上：  forVertical；
             * 3、安卓那种的从下向上： forFadeFromBottomAndroid；
             * 4、无动画：  forInitial。
             */
            screenInterpolator: TransitionConfiguration(sceneProps),
        })
    }
)

const AppContainer = createAppContainer(configAppNavigator)

export default AppContainer;

/*
*
* this.props.navigation.push('VersionInfo', {transitionType: 'forFadeToBottomAndroid'})
*
* */
