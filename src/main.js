//入口文件
import Vue from "vue";
// 导入router .js 路由对象
import router from './router'

// 2.1 导入 vue-resource
import VueResource from 'vue-resource'
// 导入格式化时间插件
import moment from 'moment'

// 定义全局的过滤器(用来处理时间字符串)
Vue.filter('dateFormat', function (dataStr, pattern="YYYY-MM-DD HH:mm:ss") {
  return moment(dataStr).format(pattern)
})

// 2.2 安装 vue-resource
Vue.use(VueResource)

// 安装 图片预览插件
import VuePreview from 'vue-preview'
Vue.use(VuePreview)


// 设置请求的根路径
Vue.http.options.root = 'https://api.jisuapi.com/';

// 全局设置 post 时候 表单数据组织形式  application/x-www-form-urlencoded
Vue.http.options.emulateJSON = true ; 

//导入 App 根组件
import App from "./App.vue";

// 按需导入Mint-UI 中的组件
// import { Header ,Button, Swipe, SwipeItem, Lazyload } from "mint-ui";

// 导入MUI 的样式
import './lib/mui/css/mui.min.css'
// 导入扩展图标样式
import './lib/mui/css/icons-extra.css'


/* Vue.component(Header.name, Header);

Vue.component(Button.name, Button);


Vue.component(Swipe.name, Swipe);
Vue.component(SwipeItem.name, SwipeItem);

Vue.component(Button.name, Button);

Vue.component(Lazyload);
 */

import MintUI from "mint-ui";
Vue.use(MintUI);
import 'mint-ui/lib/style.css'



var vm = new Vue({
  el: "#app",
  render: (c) => c(App),
  router // 1.4 挂载路由对象到 VM 实例上
});
