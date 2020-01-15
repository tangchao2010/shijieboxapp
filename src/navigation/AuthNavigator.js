/**
 *  Created by wudi on 2019-07-14
 */

import React from 'react';
import {createStackNavigator} from "react-navigation";
import SignInScreen from "../screens/auth/SignInScreen";
import RegisterScreen from "../screens/auth/RegisterScreen";
import ForgetPasswordScreen from "../screens/auth/ForgetPasswordScreen";
import NavigatorBack from "../components/NavigatorBack";


const AuthNavigator = createStackNavigator({
        SignIn: {
            screen: SignInScreen,
            navigationOptions: {title: '登录'}
        },
        Register: {
            screen: RegisterScreen,
            navigationOptions: {title: '注册'}
        },
        ForgetPassword: {
            screen: ForgetPasswordScreen,
            navigationOptions: {title: '忘记密码'}
        },
    }, {
        defaultNavigationOptions: {
            headerTintColor: 'white',
            headerStyle: {
                backgroundColor: 'rgba(255, 147, 90, 1)',
                elevation: 0,
                borderBottomWidth: 0,
            },
            headerBackImage: NavigatorBack,
            // headerLeft:(backButtonProps: HeaderBackButtonProps) => {
            //     //backButtonProps.onPress = ()=> ('返回')
            //     return NavigatorBack(backButtonProps.onPress)
            // }
        },
        headerLayoutPreset: 'center',
        headerBackTitleVisible: false,
    }
);

export default AuthNavigator;
