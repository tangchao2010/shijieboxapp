'use strict'
// 存放api
// let HOST = 'http://192.168.10.129:8099'; // 生产
let HOST = 'https://testmobile.shijiebox.com/mallapi'; // 预生产
let HOST2 = 'https://testmobile.shijiebox.com/api'; // 预生产
const API = HOST;

export default {
    /** TV 登录 */
    TV_LOGIN: `${API}/tv/authroizeLogin`,

    /** 获取新闻列表 */
    GET_NEWS_DATA: `${HOST2}/article/findAllArticle`,

    /** 获取新闻列表详情 */
    GET_NEWS_LIST_DATA: `${HOST2}/article/findArticleById`,

    /** 获取视频列表详情 */
    GET_VIDEO_LIST_DATA: `${HOST2}/article/findAllVideo`,
}
