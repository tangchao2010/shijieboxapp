import {Dimensions, PixelRatio} from 'react-native';

const Constants = {
    screenWidth: Dimensions.get('window').width,
    screenHeight: Dimensions.get('window').height,

    Notifications: {
        UserDidLogin: 'UserDidLogin', //用户登录
        UserDidLogout: 'UserDidLogout', //用户登出
        UserTokenInvalid: 'UserTokenInvalid',//用户token失效
    },

    ImageUrlSuffix: {
        Image: `?width=${Dimensions.get('window').width / 3 * PixelRatio.get()}&height=${Dimensions.get('window').width / 3 * 9 / 16 * PixelRatio.get()}`,
        Video: `?width=${Dimensions.get('window').width * PixelRatio.get()}&height=${Dimensions.get('window').width * 9 / 16 * PixelRatio.get()}`,
        Icon: `?width=${40 * PixelRatio.get()}&height=${40 * 9 / 16 * PixelRatio.get()}`,
        getString: (width) => `?width=${width * PixelRatio.get()}&height=${width * 9 / 16 * PixelRatio.get()}`
    }
};

export default Constants;
