import NetUtils from './NetUtils'
import ServicesApi from './ServicesApi'
import ToastModule from '../components/module/ToastModule'

export default class Connect{
    /** TV登录 */
    static authroizeLogin(params, success, spec) {
        NetUtils.post(ServicesApi.TV_LOGIN, params, response => {
            success && success(response)
            console.log(spec);
            spec && spec(spec)
            ToastModule.hideCustomLoading()
        }, error =>{
            ToastModule.hideCustomLoading()
            ToastModule.showCustomText(error)
        })
    }

    /** 获取新闻列表 */
    static getNewsData(params, success) {
        NetUtils.post(ServicesApi.GET_NEWS_DATA, params, response => {
            success && success(response)
            ToastModule.hideCustomLoading()
        }, error =>{
            ToastModule.hideCustomLoading()
            ToastModule.showCustomText(error)
        })
    }

    /** 获取新闻列表详情 */
    static getNewsDetailData(params, success) {
        NetUtils.post(ServicesApi.GET_NEWS_LIST_DATA, params, response => {
            success && success(response)
            ToastModule.hideCustomLoading()
        }, error =>{
            ToastModule.hideCustomLoading()
            ToastModule.showCustomText(error)
        })
    }

    /** 获取视频列表 */
    static getVideoData(params, success) {
        NetUtils.post(ServicesApi.GET_VIDEO_LIST_DATA, params, response => {
            success && success(response)
            ToastModule.hideCustomLoading()
        }, error =>{
            ToastModule.hideCustomLoading()
            ToastModule.showCustomText(error)
        })
    }
}
