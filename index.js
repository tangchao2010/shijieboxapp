/**
 * @author tangchao_2010zg@163.com
 * @date 2019/5/24
 * @Description: 入口
 */

import {AppRegistry} from 'react-native';
import RootScene from './src/RootScene';

import {name as appName} from './app.json';

AppRegistry.registerComponent(appName, () => RootScene);
