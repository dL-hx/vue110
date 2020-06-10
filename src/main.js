//入口文件
import Vue from "vue";
import router from './router'

// 2.1 导入 vue-resource
import VueResource from 'vue-resource'
// 2.2 安装 vue-resource
Vue.use(VueResource)


//导入 App 根组件
import App from "./App.vue";

// 按需导入Mint-UI 中的组件
import { Header , Swipe, SwipeItem} from "mint-ui";

// 导入MUI 的样式
import './lib/mui/css/mui.min.css'
// 导入扩展图标样式
import './lib/mui/css/icons-extra.css'

Vue.component(Header.name, Header);


Vue.component(Swipe.name, Swipe);
Vue.component(SwipeItem.name, SwipeItem);


var vm = new Vue({
  el: "#app",
  render: (c) => c(App),
  router // 1.4 挂载路由对象到 VM 实例上
});
