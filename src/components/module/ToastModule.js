'use strict';

import React, { Component } from 'react'
import {ActivityIndicator} from 'react-native'
import { Toast } from 'teaset';
import Colors from '../../constants/Colors';

export default class ToastModule {

    static show = (text) => {
        if (typeof text === 'string') {
            text = text === 'error' ? '服务器请求失败，请稍后重试' : text;
            Toast.show({
                text: text,
                option: 'center'
            });
        }
    };

    static success = (text) => {
        Toast.success(text);
    };

    static fail = (text) => {
        Toast.fail(text);
    };

    static hide = () => {
        Toast.hide();
    };

    static customLoading = null
    static showCustomLoading() {
        if (ToastModule.customLoading) return;
        ToastModule.customLoading = Toast.show( {
            text: '加载中...',
            icon: <ActivityIndicator size='large' animating={true} color={Colors.focusOrange} />,
            position: 'center',
            duration: 1000000,
        });
    }

    static hideCustomLoading() {
        if (!ToastModule.customLoading) return;
        Toast.hide(ToastModule.customLoading);
        ToastModule.customLoading = null;
    }

    static showCustomText(Text) {
        Toast.show({
            text: Text,
            position: 'bottom',
            duration: 1000,
        });
    }
}
