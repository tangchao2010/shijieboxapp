import React from 'react';
import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import MainTabNavigator from './MainTabNavigator';
import AuthNavigator from "./AuthNavigator";
import { setStore , getStore, clearStore} from '../components/myStorage';
import '../config/Global'

import {ActivityIndicator, AsyncStorage, StatusBar, View} from "react-native";

class AuthLoadingScreen extends React.Component {
    constructor() {
        super();
        // this._bootstrapAsync();
        this.bootstrap()
    }

    bootstrap(){
        getStore('loginState').then((rowData)=>{
            if (rowData !== '') {
                this.props.navigation.navigate(data.rowData.userToken ? 'App' : 'Auth');
            } else {
                this.props.navigation.navigate('Auth');
            }
        }).catch((err) => {
            console.log(err);
        })
    }

    // Fetch the token from storage then navigate to our appropriate place
    _bootstrapAsync = async () => {
        const userToken = await AsyncStorage.getItem('tang');
        // This will switch to the App screen or Auth screen and this loading
        // screen will be unmounted and thrown away.
       //  this.props.navigation.navigate(userToken == 'abc1' ? 'App' : 'Auth');
    };

    // Render any loading content that you like here
    render() {
        return (
            <View style={{flex: 1}}>
                <ActivityIndicator/>
                <StatusBar barStyle="default"/>
            </View>
        );
    }
}

export default createAppContainer(
    createSwitchNavigator({
        // You could add another route here for authentication.
        // Read more at https://reactnavigation.org/docs/en/auth-flow.html
        AuthLoading: AuthLoadingScreen,
        Auth: AuthNavigator,
        App: MainTabNavigator,

    }, {
        initialRouteName: 'App'
    })
);
