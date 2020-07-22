import Vue from "vue";

// 1. 导入vue-router 包
import VueRouter from "vue-router";

// 导入对应的路由组件
import Home from "./components/tabbar/Home.vue";
import Member from "./components/tabbar/Member.vue";
import Search from "./components/tabbar/Search.vue";
import ShopCar from "./components/tabbar/ShopCar.vue";

import NewsList from "./components/news/NewsList.vue";
import NewsInfo from "./components/news/NewsInfo.vue";


import PhotoList from "./components/photos/PhotoList.vue";
import PhotoInfo from "./components/photos/PhotoInfo.vue";


import GoodsList from "./components/goods/GoodsList.vue";
import GoodsInfo from "./components/goods/GoodsInfo.vue";
import GoodsDesc from "./components/goods/GoodsDesc.vue";
import GoodsComment from "./components/goods/GoodsComment.vue";


// 2. 手动安装 VueRouter
Vue.use(VueRouter);

// 3. 创建路由对象
var router = new VueRouter({
  // mode: "history", // 去掉url中的#
  routes: [
    // 配置路由规则
    {
      path: "/",
      redirect: "/home",
    },
    {
      path: "/home",
      component: Home,
    },

    { path: "/home/newslist", component: NewsList },
    { path: "/home/newsInfo/:id",name:'newsInfo',   component: NewsInfo },


    {
      path:'/home/photolist',
      component:PhotoList
    },

    {
      path:'/home/photoinfo/:id',
      component:PhotoInfo
    },

    {
      path:'/home/goodslist',
      component:GoodsList

    },

    {
      path:'/home/goodsinfo/:id',
      name:'goodsinfo',
      component:GoodsInfo
    },

    {
      path:'/home/goodsdesc/:id',
      name:'goodsdesc',
      component:GoodsDesc
    },

    {
      path:'/home/goodscomment/:id',
      name:'goodscomment',
      component:GoodsComment
    },



    { path: "/member", component: Member },
    { path: "/shopcar", component: ShopCar },
    { path: "/search", component: Search },
    


   ],
  linkActiveClass: "mui-active", // 覆盖默认的路由高亮的类, 默认的类叫做 router-link-active
});

// 把路由对象 router 暴露出去
export default router;
