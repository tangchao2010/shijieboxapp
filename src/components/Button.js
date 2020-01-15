/**
 * @author tangchao_2010zg@163.com
 * @date 2019/7/15
 * @Description: 按钮
 */

import React, {Component} from 'react'
import {StyleSheet, View, Image, Text, ViewPropTypes, TouchableOpacity} from 'react-native'

type Props = {
    onPress: Function,
    disabled: boolean,
    style: ViewPropTypes.style,

    title: string,
    titleStyle: ViewPropTypes.style,
    activeOpacity: number,
}

class Button extends Component<Props>{

    static defaultProps = {
        disabled: false,
        activeOpacity: 0.8,
    }

    render() {
        let {onPress, disabled, style, title, titleStyle, activeOpacity} = this.props
        return (
            <TouchableOpacity
                style={[styles.container, style]}
                onPress={onPress}
                disabled={disabled}
                activeOpacity={activeOpacity}
            >
                <Text style={titleStyle}>
                    {title}
                </Text>
            </TouchableOpacity>
        )
    }

}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
    }
})

export default Button
