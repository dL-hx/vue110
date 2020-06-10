import Vue from "vue";

// 1. 导入vue-router 包
import VueRouter from "vue-router";


// 2. 手动安装 VueRouter
Vue.use(VueRouter);

// 3. 创建路由对象
var router = new VueRouter({
 // mode: "history", // 去掉url中的#
  routes: [
  
  ],
});

// 把路由对象 router 暴露出去
export default router