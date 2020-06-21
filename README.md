## UI
+ Mint-ui
    + http://mint-ui.github.io/#!/zh-cn
+ Mui
    + https://dev.dcloud.net.cn/mui/ui/

## v-bind 
+  加: 表示绑定的是表达式的值 , 获取的是一个变化的值
+ 不加: 是普通字符串的值

## 用(传统方式)命令把修改过的代码上传到码云?
1. git add .
2. git commit -m "提交信息"
3. git push

## 制作首页App组件
1. 完成Header 区域, 使用的是Mint-UI 中Header 组件
2. 制作底部Tabbar 区域, 使用的是MUI的Tabbar.html
    + 在制作购物车 小图标的时候, 操作会多一些;
    + 先把 扩展图标的 css 样式, 拷贝到项目中
    + 拷贝 扩展字体库 ttf 文件, 到项目中
    + 为购物车小图标, 添加 如下样式 `mui-icon mui-icon-extra mui-icon-extra-cart`
    
3. 要在中间区域放置一个router-view 来展示路由匹配到的组件

## 改造tabbar 为 router-link

## 设置路由高亮

## 点击tabbar 中的路由链接, 展示对应的路由组件

## 制作首页轮播图布局

## 加载首页轮播图数据

1.获取数据, 如何获取数据, 使用vue-resourse
> npm i vue-resourse -S

2.使用vue-resourse 的 this.$http.get 获取数据

3.获取到的数据, 要保存到data身上

4.使用v-for 循环渲染每个item 项

5.设置轮播图中图片的样式

## 改造 新闻资讯路由链接
1. 绘制界面, 使用MUI 中的media-list.html 
2. 使用vue-resource 获取数据
3. 渲染真实数据


## 定义过滤器
1. 考虑是 全局过滤器 / 私有过滤器

2. 使用地方多,   (全局的过滤器)

3. 使用地方少,   (私有过滤器)


## 定义组件
1. 考虑是 全局组件/ 私有组件

2. 使用地方多,   (全局的组件)

3. 使用地方少,   (私有组件)

4. 抽离 Comment 评论组件



## 实现 新闻资讯列表, 点击跳转到新闻详情
1. 把列表中的每一项改造为 router-link, 同时, 在跳转的时候, 应该提供唯一的Id标识符
2. 创建新闻详情的组件页面 NewsInfo.vue
3. 在路由模块中, 在新闻详情的 路由地址 和组件页面 对应起来

## 路由参数获取
1. / 传递的参数 用 $route.params 接收
2. ? 传递的参数 用 $route.query 接收

## 实现 新闻详情 的 页面布局 和 数据渲染

## 抽离 Comment 评论组件(共有)

## 单独封装一个comment.vue 评论子组件
1. 先创建一个 单独的 comment.vue 组件模板

2. 在需要使用 comment 组件的页面中 , 先手动导入 comment 组件

    + `import comment from './comment.vue'`

3. 在父组件中 , 使用`components` 属性, 将刚才导入的comment组件, 注册为自己的子组件

4. 将注册子组件时候的, 注册名称, 以标签形式, 在页面中 引用即可


## 获取所有的评论数据, 显示到页面中

1. 子组件要使用父组件传递的数据, 要在子组件 使用 `props: ['id']` 属性显式调用


## 实现点击加载更多评论的功能

1. 为加载更多按钮, 绑定点击事件, 在事件中 , 去请求 下一页数据

2. 点击加载更多, 让pageIndex ++ , 然后重新调用 this.getComments() 方法, 重新获取 最新的一页的数据

3. 为了防止 新数据 覆盖老数据的情况,  我们 在 点击更多的时候, 每当获取到新数据, 应该让 老数据 调用 数组的 concat 方法, 拼接上新数组