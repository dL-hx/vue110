//入口文件
import Vue from "vue";


//导入 App 根组件
import App from "./App.vue";

// 按需导入Mint-UI 中的组件
import { Header } from "mint-ui";

// 导入MUI 的样式
import './lib/mui/css/mui.min.css'

Vue.component(Header.name, Header);

var vm = new Vue({
  el: "#app",
  render: (c) => c(App),
});
