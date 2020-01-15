import React from 'react';
import {Image, View} from 'react-native';

import {createBottomTabNavigator, createStackNavigator,} from 'react-navigation';

import Colors from '../constants/Colors';

import HomeScreen from '../screens/mainTab/home/HomeScreen';
import HeadlinesScreen from '../screens/mainTab/headlines/HeadlinesScreen';
import ArticleScreen from '../screens/mainTab/headlines/ArticleScreen';
import DiscoveryScreen from '../screens/mainTab/discovery/DiscoveryScreen';
import MyScreen from '../screens/mainTab/my/MyScreen';
import VideoScreen from '../screens/mainTab/video/VideoScreen';
import CommunityScreen from '../screens/mainTab/community/CommunityScreen';
import NavigatorBack from '../components/NavigatorBack';

import AboutScreen from '../screens/mainTab/my/module/AboutScreen';
import PropagateScreen from '../screens/mainTab/home/module/PropagateScreen';
import CopyrightScreen from '../screens/mainTab/home/module/CopyrightScreen';
import PropagateDetailScreen from '../screens/mainTab/home/module/PropagateDetailScreen';
import CopyrightDetailScreen from '../screens/mainTab/home/module/CopyrightDetailScreen';
import ActorsScreen from '../screens/mainTab/home/module/ActorsScreen';
import TidbitsScreen from '../screens/mainTab/home/module/TidbitsScreen';
import SomeActorScreen from '../screens/mainTab/home/module/SomeActorScreen';
import TidbitsDetailScreen from '../screens/mainTab/home/module/TidbitsDetailScreen';
import ActivityScreen from '../screens/mainTab/discovery/module/ActivityScreen';
import TaskScreen from '../screens/mainTab/discovery/module/TaskScreen';
import VideoDetailScreen from '../screens/mainTab/video/module/VideoDetailScreen';
import HeadlinesDetailScreen from '../screens/mainTab/headlines/HeadlinesDetailScreen';


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
    Article: {
        screen: ArticleScreen
    }
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

const VideoStack = createStackNavigator(
    {
        VideoScreen: VideoScreen,
    },
    {
        navigationOptions: {
            tabBarLabel: '视频',
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
    },
    {
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


const DiscoveryStack = createStackNavigator(
    {
        Discovery: DiscoveryScreen,
    },
    {
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
    // CommunityStack,
    VideoStack,
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

const AppNavigator = createStackNavigator({
    HomeStack:{
        screen: tabNavigator,
        navigationOptions: {
            header: null,
        }
    },
    VideoDetail: {
        screen: VideoDetailScreen,
        navigationOptions: {
            // header: null,
        }
    },
    About: {
        screen: AboutScreen,
        navigationOptions: {
            // header: null,
        }
    },
    Propagate: {
        screen: PropagateScreen,
        navigationOptions: {
            // header: null,
        }
    },
    PropagateDetailScreen: {
        screen: PropagateDetailScreen,
        navigationOptions: {
            // header: null,
        }
    },
    CopyrightDetailScreen: {
        screen: CopyrightDetailScreen,
        navigationOptions: {
            // header: null,
        }
    },
    Copyright: {
        screen: CopyrightScreen,
        navigationOptions: {
            // header: null,
        }
    },
    ActorsScreen: {
        screen: ActorsScreen,
        navigationOptions: {
            // header: null,
        }
    },
    TidbitsScreen: {
        screen: TidbitsScreen,
        navigationOptions: {
            // header: null,
        }
    },
    TidbitsDetailScreen: {
        screen: TidbitsDetailScreen,
        navigationOptions: {
            // header: null,
        }
    },
    SomeActorScreen: {
        screen: SomeActorScreen,
        navigationOptions: {
            // header: null,
        }
    },
    TaskScreen: {
        screen: TaskScreen,
        navigationOptions: {
            // header: null,
        }
    },
    ActivityScreen: {
        screen: ActivityScreen,
        navigationOptions: {
            // header: null,
        }
    },
    HeadlinesDetailScreen: {
        screen: HeadlinesDetailScreen,
        navigationOptions: {
            // header: null,
        }
    },

},
    {
        // initialRouteName: 'Home',
        ...defaultNavigationOptions,
    }
);

export default AppNavigator;
