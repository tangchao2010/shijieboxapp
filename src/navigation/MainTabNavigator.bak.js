import React from 'react';
import {Image, View} from 'react-native';

import {createBottomTabNavigator, createStackNavigator,} from 'react-navigation';

import Colors from '../constants/Colors';


import HomeScreen from '../screens/mainTab/home/HomeScreen';
import HeadlinesScreen from '../screens/mainTab/headlines/HeadlinesScreen';
import DiscoveryScreen from '../screens/mainTab/discovery/DiscoveryScreen';
import MyScreen from '../screens/mainTab/my/MyScreen';
import CommunityScreen from '../screens/mainTab/community/CommunityScreen';
import NavigatorBack from '../components/NavigatorBack';

import AboutScreen from '../screens/mainTab/my/myList/AboutScreen';

const defaultNavigationOptions = {
    defaultNavigationOptions: {
        headerTintColor: 'white',
        headerStyle: {
            backgroundColor: '#242424',
        },
        headerBackImage: NavigatorBack,
    },
    headerLayoutPreset: 'center'
}

const HeadlinesStack = createStackNavigator({
    Headlines: {
        screen: HeadlinesScreen,
        navigationOptions: {title: "头条"}
    },
}, {
    navigationOptions: {
        tabBarLabel: '头条',
        tabBarIcon: ({focused}) => (
            <Image
                source={focused ? require('../../assets/images/mainTabIcon/headlines-focused.png') : require('../../assets/images/mainTabIcon/headlines.png')}/>
        ),
    },
    ...defaultNavigationOptions,
});


const CommunityStack = createStackNavigator(
    {
        Community: CommunityScreen,
    },
    {
        navigationOptions: {
            tabBarLabel: '社区',
            tabBarIcon: ({focused}) => (
                <Image
                    source={focused ? require('../../assets/images/mainTabIcon/community-focused.png') : require('../../assets/images/mainTabIcon/community.png')}/>
            ),
        },
        ...defaultNavigationOptions
    });

const HomeStack = createStackNavigator(
    {
        Home: HomeScreen,
        AboutScreen: {
            screen: AboutScreen,
            navigationOptions: {
                // header: null,
            }
        }
    },
    {
        initialRouteName: 'Home',
        navigationOptions: {
            tabBarLabel: '首页',
            tabBarIcon: ({focused}) => (
                <View style={{
                    borderRadius: 25,
                    marginBottom: 10,
                    backgroundColor: Colors.tabBar,
                    width: 50,
                    height: 50,
                    alignItems: 'center',
                    justifyContent: 'center'
                }}>
                    <Image
                        source={focused ? require('../../assets/images/mainTabIcon/home-focused.png') : require('../../assets/images/mainTabIcon/home.png')}/>
                </View>
            ),
        },
        ...defaultNavigationOptions,
    }
);


const DiscoveryStack = createStackNavigator({
    Discovery: DiscoveryScreen,
}, {

    navigationOptions: {
        tabBarLabel: '发现',
        tabBarIcon: ({focused}) => (
            <Image
                source={focused ? require('../../assets/images/mainTabIcon/discovery-focused.png') : require('../../assets/images/mainTabIcon/discovery.png')}/>
        ),
    },
    ...defaultNavigationOptions,
});


const MyStack = createStackNavigator(
    {
        My: {
            screen: MyScreen,
        },
        About: {
            screen: AboutScreen,
            navigationOptions: {
                // header: null,
            }
        }
    },
    {
    navigationOptions: {
        tabBarLabel: '我的',
        tabBarIcon: ({focused}) => (
            <Image
                source={focused ? require('../../assets/images/mainTabIcon/my-focused.png') : require('../../assets/images/mainTabIcon/my.png')}/>
        ),
    },
    ...defaultNavigationOptions,
});


const tabNavigator = createBottomTabNavigator({
    HeadlinesStack,
    CommunityStack,
    HomeStack,
    DiscoveryStack,
    MyStack,
}, {
    tabBarPosition: 'bottom',
    tabBarOptions: {
        activeTintColor: Colors.tabIconSelected,
        inactiveTintColor: Colors.tabIconDefault,
        style: {backgroundColor: Colors.tabBar, borderTopWidth: 0},
        labelStyle: {
            fontSize: 12,
        },
    },
});

export default tabNavigator;
