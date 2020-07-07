## UI
+ Mint-ui
    + http://mint-ui.github.io/#!/zh-cn
+ Mui
    + https://dev.dcloud.net.cn/mui/ui/

+vue-router
    +https://router.vuejs.org/zh/guide/essentials/navigation.html

## 实例对象 可以访问实例上的原型方法

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
> 今后, 需要使用评论组件的时候, 只需要 将评论组件 拿来 注册即可  

## 单独封装一个comment.vue 评论子组件
1. 先创建一个 单独的 comment.vue 组件模板

2. 在需要使用 comment 组件的页面中 , 先手动导入 comment 组件

    + `import comment from './comment.vue'`

3. 在父组件中 , 使用`components` 属性, 将刚才导入的comment组件, 注册为自己的子组件

4. 将注册子组件时候的, 注册名称, 以标签形式, 在页面中 引用即可


## 获取所有的评论数据, 显示到页面中

1. 子组件要使用父组件传递的数据, 要在子组件 使用 `props: ['id']` 属性显式调用
2. getComments

## 实现点击加载更多评论的功能

1. 为加载更多按钮, 绑定点击事件, 在事件中 , 去请求 下一页数据

2. 点击加载更多, 让pageIndex ++ , 然后重新调用 this.getComments() 方法, 重新获取 最新的一页的数据

3. 为了防止 新数据 覆盖老数据的情况,  我们 在 点击更多的时候, 每当获取到新数据, 应该让 老数据 调用 数组的 concat 方法, 拼接上新数组


## 发表评论
1. 把文本框做双向数据绑定
2. 为发表按钮绑定一个事件
3. 校验评论内容是否为空, 如果为空, 则Toast 提示用户, 评论内容不能为空
4. 通过vue-resouce 发表一个请求, 把评论内容提交给 服务器
5. 当发表评论Ok 后, 重新 刷新列表, 以[查看最新的评论]
 + 如果调用getComments 方法重新刷新 评论列表的话, 可能只能得到  最后一页的评论, 前几页的评论获取不到

 + 换一种思路, 当评论成功后, 在客户端, 手动拼接出一个 最新的评论对象, 然后调用 数组的unshift 方法, 把最新的评论
 , 追加 到 data 中 comments 的开头, 这样 就能完美实现 发表评论的功能


6. 评论成功后, 清空 评论框的内容
    > this.msg = ''


## 改造图片分享 按钮为 路由的链接 并显示对应的组件页面

## 绘制 图片列表 组件页面结构并美化样式
1. 制作 顶部的滑动条
2. 制作 底部的图片列表


## 制作顶部滑动条的坑们
1. 需要借助于 MUI 中的 tab-top-webview-main.html
2. 需要把 slider 区域的 mui-fullscreen 类去掉
3. 滑动条无法正常触发滑动, 通过检查官方文档, 发现这是JS 组件, 需要被初始化一下
    + 导入 mui.js
    + 调用官方提供的 方式 去初始化
```
mui('.mui-scroll-wrapper').scroll({
	deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
});
```

4. 我们在初始化 滑动条的时候, 导入mui.js , 但是控制台报错:`
Uncaught TypeError: 'caller', 'callee', and 'arguments' properties may not be accessed on strict mode functions or the arguments objects for calls to them

`
 + 经过我们合理的推测, 觉得 可能是mui.js 中用到了 'caller', 'callee', and 'arguments'
 的东西, 但是 , webpack 打包好的 bundle.js 中 , 默认是启用严格模式的, 所以, 这两者冲突了;

 + 解决方案:
    1. 把 mui.js 中的 非严格模式的代码改掉; 但是不现实
    2. 把 webpack 打包时候的, 严格模式禁用掉

    ## 最终 , 我们选择了plan B , 移除严格模式: 使用 这个插件
    babel-plugin-transform-remove-strict-mode

    第一步：安装插件

    cnpm install babel-plugin-transform-remove-strict-mode

    第二步：在.babelrc配置文件plugins中加入"transform-remove-strict-mode"

    {
    "plugins": ["transform-remove-strict-mode"]
    }


5. 刚进入 图片分享页面的时候, 滑动条无法正常工作, 经过分析, 发现
, 如果要初始化滑动条,  必须要等 DOM 元素加载完毕, 所以, 我们把初始化 滑动条的代码, 搬到了
mounted 生命周期函数中;


6. 当 滑动条 调试的OK 后发现, tabbar 无法正常工作了, 这时候, 我们需要把 每个tabbar 按钮的 样式中的
`mui-tab-item` 重新改一下名字; 

7. 获取所有分类, 并渲染 分类列表


### 制作图片列表区域

1. 图片列表 需要使用懒加载技术, 我们可以使用 Mint-UI 提供的现成的 组件`lazy-load`

2. 根据`lazy-load` 的使用文档, 尝试使用

3. 渲染图片列表数据

### 实现了 图片列表的 懒加载改造 和 样式美化

### 实现了 点击图片 跳转到图片详情页面
1. 在改造 li 成 router-link 的时候, 需要 使用tag 属性 指定 要渲染为那种元素

## 实现 详情页面的布局 和 美化, 同时  获取数据 渲染页面

## 实现 图片详情中 缩略图的功能
1. 使用插件 vue-preview 这个缩略图插件
2. 获取到所有的图片列表, 然后使用v-for 指令 渲染数据
3. 注意: img 标签 上的class 不能去掉
4. 注意: 每个图片数据对象中, 必须佑 w 和 h 属性



### 绘制 商品列表 页面基本结构 并美化

## 尝试在手机上 去进行项目的预览和测试

1. 要保证自己的手机可以正常运行
2. 要保证 手机 和开发项目的电脑 , 处于 同一个WIFI 中 , 也就是说, 手机
可以访问到电脑的IP

3. 打开自己的项目中package.json 文件, 在dev脚本中, 添加一个--host 指令, 把当前 电脑
的WIFI IP 地址 , 设置为--host 的指令值
+ 如何查看自己的电脑所处的IP呢, 在cmd 终端中 运行 `ipconfig`. 查看无线网的ip 地址


+ 172.16.8.19


## 抽离轮播图组件
分析: 
商品详情的轮播图, 可以和首页公用一个轮播图, 将首页中的轮播图抽离为一个组件

[找到分歧点,  想办法看分歧点好不好解决,  分歧点就是宽度100% , 还是宽度自适应的问题]

谁用我们的组件, 谁为我们传递100%, 谁不是100%, 谁不设置100%

动态样式