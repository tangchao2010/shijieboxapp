export default class NetUtils {
    /** GET 请求 */
    static get(url, params, success, fail, error){
        if (params) {
            let paramsArray = [];
            //拼接参数
            Object.keys(params).forEach(key => paramsArray.push(key + '=' + params[key]))
            if (url.search(/\?/) === -1) {
                url += '?' + paramsArray.join('&')
            } else {
                url += '&' + paramsArray.join('&')
            }
        }
        console.log(url, params)
        // fetch 请求
        fetch(url, {
            headers:{
                //看后台需求决定配置参数,例如我们后台要求将appId放在这里请求
                // appId: '1234345656'
            },
        })
            .then(response=>response.json())
            .then(responseJson=> {
                if (responseJson.code == 200){
                    success && success(responseJson.data)
                }else {
                    fail && fail(responseJson.msg)
                }
            })
            .catch(e=>{
                console.log(e)
                error && error(e)
            })
    }

    /**
     *  POST 请求，经测试用FormData传递数据也可以
     */
    static post(url, params, success, fail, error, spec){
        fetch(url, {
            method: 'POST',
            headers:{
                'Accept': 'application/json',
                //媒体格式类型key/value格式
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(params)
        }) .then(response => response.json())
            .then(responseJson=> {
                // 打印返回结果
                if (responseJson.error_code == '0000'){
                    success && success(responseJson.data)
                    spec && spec(responseJson.message)
                }else {
                    fail && fail(responseJson.message)
                }
            })
            .catch(e => {
                console.log(e)
                error && error(error)
            })
    }

    /**
     *  @images uri数组
     *  @param  FormData格式,没有参数的话传null
     */
    static uploadFile(url, images, params, success, fail, error){
        console.log(url,images)
        let formData = new FormData();
        if (params){
            formData = params;
        }
        for(var i = 0; i<images.length; i++){
            var uri = images[i]
            var date = new Date()
            var name = date.getTime() + '.png'//用时间戳保证名字的唯一性
            let file = {uri: uri, type: 'multipart/form-data', name: name}
            formData.append('file', file)
        }
        console.log(url,formData)
        fetch(url,{
            method: 'POST',
            headers:{
                'Accept': 'application/json',
                //媒体格式类型key/value格式
                'Content-Type':'multipart/form-data',
                customerId: '',
                appId: ''
            },
            body: formData
        }) .then(response=>response.json()) // 转为json
            .then(responseJson=> {
                if (responseJson.code == 200){
                    success && success(responseJson.data)
                }else {
                    fail && fail()// 处理错误信息
                }
            })
            .catch(e=>{
                console.log(e)
                error && error(error)
            })
    }

}
