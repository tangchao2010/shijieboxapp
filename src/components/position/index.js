import { ToastAndroid } from 'react-native'

import { init, Geolocation, setAllowsBackgroundLocationUpdates} from "react-native-amap-geolocation";

//初始化sdk
export async function geolocationInit() {
    //设置高德key
    await init({
        ios: "",
        android: "80be4e673c7caba3f875068298f7db0a",
    });

    //开启后台定位,必须要Background Modes打开为ON，勾选Loaction updates，不然会报错！
    //必须在开始定位之前或者在定位stop的时候设置
    setAllowsBackgroundLocationUpdates(true);
}

//只获得一次当前地理位置
export function getCurrentPosition(){
    return new Promise((resolve, reject) => {
        Geolocation.getCurrentPosition(position => {
            let cur = position.location
            let location = {
                latitude: cur.latitude,
                longitude: cur.longitude,
                LocationCity: cur.city + cur.district + cur.street
            }
            resolve(location)
        }, error => {
            console.log(error)
            reject(error)
            if(error.code==2){
                ToastAndroid.show('定位失败，请查看手机是否开启GPS定位服务',ToastAndroid.SHORT);
            }else if(error.code==3){
                ToastAndroid.show("定位超时，请尝试重新获取定位",ToastAndroid.SHORT);
            }else{
                ToastAndroid.show("定位失败："+error.message,ToastAndroid.SHORT);
            }
        }, {
            enableHighAccuracy: false,
            timeout: 5000,
            maximumAge: 10000
        });
    })
}

//注册一个监听，它会每隔一段时间返回当前地理位置
export function watchPosition(){
    if (!this.watchId) {
        this.watchId = Geolocation.watchPosition(position => {
            console.log(position)
        })
    }
}

//     Geolocation.addLocationListener(location => {
//         console.log(location);
//     });


// 如果使用的是watchPosition方法，一定要记得在生命周期componentWillUnmount函数内clearWatch。

/*
getPositions=()=>{
    //获取位置再得到城市先后顺序，通过Promise完成
    return new Promise((resolve, reject) => {

        Geolocation.getCurrentPosition(
            location => {
                this.setState({
                    longitude: location.coords.longitude,//经度
                    latitude: location.coords.latitude,//纬度
                });
                fetch(`https://restapi.amap.com/v3/assistant/coordinate/convert?locations=${this.state.longitude},${this.state.latitude}&coordsys=gps&output=json&key=${config.GaoDeKey.key}`, { method: "GET" })
                    .then(response => response.json())
                    .then((jsonDa) => {
                        let newVar = jsonDa.locations.split(',')
                        this.setState({
                            longitude: newVar[0],//经度
                            latitude: newVar[1],//纬度
                        });
                        //访问网络开始
                        fetch('http://restapi.amap.com/v3/geocode/regeo?key='+config.GaoDeKey.key+'&location='+this.state.longitude+','+this.state.latitude+'&radius=1000&extensions=all&batch=false&roadlevel=0', {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/x-www-form-urlencoded"
                            },
                            body: ``
                        })
                            .then((response) => response.json())
                            .then((jsonData) => {
                                try {
                                    //Toast.show(jsonData.result.formatted_address+jsonData.result.sematic_description)
                                    this.setState({
                                        position:jsonData.regeocode.formatted_address,
                                    });
                                }catch (e) {

                                }
                            })
                            .catch((error) => {
                                console.error(error);
                            });
                        //访问网络结束
                    })
                    .catch(error => {
                        reject(error);
                    });


            },
            error => {
                reject(error);
                if(error.code==2){
                    ToastAndroid.show('定位失败，请查看手机是否开启GPS定位服务',ToastAndroid.SHORT);
                }else if(error.code==3){
                    ToastAndroid.show("定位超时，请尝试重新获取定位",ToastAndroid.SHORT);
                }else{
                    ToastAndroid.show("定位失败："+error.message,ToastAndroid.SHORT);
                }
            }, {
                enableHighAccuracy: false,
                timeout: 5000,
                maximumAge: 10000
            }
        );

    })

}*/
