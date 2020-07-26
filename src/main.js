//入口文件
import Vue from "vue";
// 导入router .js 路由对象
import router from "./router";

// 2.1 导入 vue-resource
import VueResource from "vue-resource";
// 导入格式化时间插件
import moment from "moment";

// 注册 vuex
import Vuex from "vuex";
Vue.use(Vuex);

// 每次刚进入 网站, 肯定会调用 main.js , 在刚调用的时候, 先从本地存储中, 把购物车的数据读出来,放到store 中
var car =  JSON.parse(localStorage.getItem('car')||'[]')

var store = new Vuex.Store({
  state: {// store 中的数据在内存中
    // this.$store.state.***
    car:car, // 将购物车中商品的数据, 用一个数组存储起来, 在car 数组中存储一些商品的对象
    // 咱们暂时可以将这个商品的对象设置成这个样子  {id:商品的id, count:要购买的数量, price: 商品的单价, selected: false, title:title,img_url:img_url }

  },
  mutations: {
    // this.$store.commit('方法名称', '按需传递唯一的参数')
    addToCar(state, goodsinfo) {
      // 点击加入购物车, 把商品信息, 保存到store 中的car 上
      // 分析:
      // 1. 如果购物车中, 之前就已经有这个对应的商品了, 那么只需要更新数量
      // 2. 如果没有, 则直接把商品数据push 到car 中即可

      // 假设 在购物车中,  没有找到对应的商品
      var flag = false


      state.car.some((item)=>{
        if (item.id == goodsinfo.id) {
          item.count += parseInt(goodsinfo.count)

          flag = true

          return true // 终止后续的some 循环
        }

      })

      // 如果最终循环完毕, 得到的flag 还是false , 则把商品数据直接push 到购物车中
      if (!flag) {
         state.car.push(goodsinfo)
      }

      // 当更新 Car 之后, 把car 数组, 存储到 本地的localStore 中
      localStorage.setItem('car', JSON.stringify(state.car))

    },

    updateGoodsInfo(state, goodsinfo){// 修改购物车中商品的数量值
      // 分析
      // 根据商品id , 修改商品的数量
      // 

      state.car.some(item=>{
        if (item.id == goodsinfo.id) {
          item.count = parseInt( goodsinfo.count)

          return true
        }
      })

      // 当修改完数量, 把最新的购物车数据, 保存到本地存储中
      localStorage.setItem('car', JSON.stringify(state.car))

    },

    removeFromCar(state, id){// 根据id ,从store 中的购物车中删除对应的商品数据

      state.car.some((item, i)=>{
        if (item.id == id) {


          // 从索引为 i 的位置开始删除, 删除一个元素
          state.car.splice(i, 1);
          
          return true
        }
      })
     
      // 当删除完数据, 把最新的购物车数据, 保存到本地存储中
      localStorage.setItem('car', JSON.stringify(state.car))

    },

    updateGoodsSelected(state, info){
      // 分析
      // 根据商品id , 同步商品的开关状态
      state.car.some(item=>{
        if (item.id == info.id) {
          // 将info 的状态 同步到 store 中去
          item.selected = info.selected

          return true
        }
      })

      // 当修改完开关状态, 把最新的购物车数据, 保存到本地存储中
      localStorage.setItem('car', JSON.stringify(state.car))

    },
  },
  getters: {
    // this.$store.getters.***
    // 相当于计算属性, 也相当于filters 
    getAllCount(state){ // 获取商品的数量

/*       var sum = state.car.reduce((prev, cur)=>  {
        return   prev + (cur.selected?cur .count:0)
      }, 0)
      return sum */

      var c = 0
      state.car.forEach(item=>{
        c += item.count
      })
      return c
    },

    getGoodsCount(state){
      /* 
        获取 id, 与count 的对应关系的对象
        这样当把所有的商品循环一遍, 就会得到一个对象
        {id:count, id:count, id:count}
        {88:2, 99:1, 110:3}

        取值通过 config['id'] => count
      */
      var o = {}
      state.car.forEach(item=>{
        o[item.id] = item.count
      })

      return o
    },
    getGoodsSelected(state){
      var o = {}
      state.car.forEach(item=>{
        o[item.id] = item.selected
      })

      return o
    },


    getGoodsCountAntAmount(state){
      var o = {
        count:0,// 勾选的数量
        amount:0 // 勾选的总价
      }
      state.car.forEach(item=>{
       if(item.selected){
        o.count += item.count
        o.amount += item.price*item.count
       }
      })

      return o
    }


  },
});

// 定义全局的过滤器(用来处理时间字符串)
Vue.filter("dateFormat", function(dataStr, pattern = "YYYY-MM-DD HH:mm:ss") {
  return moment(dataStr).format(pattern);
});

// 2.2 安装 vue-resource
Vue.use(VueResource);

// 安装 图片预览插件
import VuePreview from "vue-preview";
Vue.use(VuePreview);

// 设置请求的根路径
Vue.http.options.root = "https://api.jisuapi.com/";

// 全局设置 post 时候 表单数据组织形式  application/x-www-form-urlencoded
Vue.http.options.emulateJSON = true;

//导入 App 根组件
import App from "./App.vue";

// 按需导入Mint-UI 中的组件
// import { Header ,Button, Swipe, SwipeItem, Lazyload } from "mint-ui";

// 导入MUI 的样式
import "./lib/mui/css/mui.min.css";
// 导入扩展图标样式
import "./lib/mui/css/icons-extra.css";

/* Vue.component(Header.name, Header);

Vue.component(Button.name, Button);


Vue.component(Swipe.name, Swipe);
Vue.component(SwipeItem.name, SwipeItem);

Vue.component(Button.name, Button);

Vue.component(Lazyload);
 */

import MintUI from "mint-ui";
Vue.use(MintUI);
import "mint-ui/lib/style.css";

var vm = new Vue({
  el: "#app",
  render: (c) => c(App),
  router, // 1.4 挂载路由对象到 VM 实例上
  store, // 挂载 store 状态管理对象
});
