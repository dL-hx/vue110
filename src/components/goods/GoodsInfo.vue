<template>
    <div class="goodsinfo-container">
        <transition @before-enter="beforeEnter" @enter="enter" @after-enter="afterEnter">
            <div class="ball" v-show="ballFlag" ref="ball"></div>
        </transition>

        <!-- 商品轮播图区域 -->
        <div class="mui-card">
            <div class="mui-card-content">
                <swiper :lunbotuList="lunbotu" :isfull="false"></swiper>
            </div>
        </div>

        <!-- 商品购买区域 -->
        <div class="mui-card">
            <div class="mui-card-header">{{ goodsinfo.title }}</div>
            <div class="mui-card-content">
                <div class="mui-card-content-inner">
                    <p class="price">
                        市场价:
                        <del>${{ goodsinfo.market_price }}</del> &nbsp;&nbsp; 销售价:
                        <span class="now_price">$ {{ goodsinfo.sell_price }}</span>
                    </p>
                    <p>
                        购买数量:
                        <numbox @getcount="getSelectedCount" :max="goodsinfo.stock_quantity"></numbox>
                    </p>

                    <p>
                        <mt-button type="primary" size="small">立即购买</mt-button>
                        <mt-button type="danger" size="small" @click="addToShopCart">加入购物车</mt-button>
                    </p>
<!--                分析:如何实现加入购物车的时候,拿到 选择的数量
                    1.经过分析发现:按钮属于goodsInfo页面, 数字属于numberbox 组件
                    2. 由于涉及到了父子组件的嵌套, 所以无法直接在goodsInfo页面中获取 选中的商品数量的值
                    3. 怎么解决这个问题:子组件向父组件传值, (事件调用机制)
                    4. 事件调用的本质:父向子传递方法, 子调用这个方法, 同时把数据当作参数传递给这个方法

-->


                </div>
            </div>
        </div>

        <!-- 商品参数区域 -->
        <div class="mui-card">
            <div class="mui-card-header">商品参数</div>
            <div class="mui-card-content">
                <div class="mui-card-content-inner">
                    <p>商品货号: {{ goodsinfo.goods_no }}</p>
                    <p>库存情况: {{ goodsinfo.stock_quantity }} 件</p>
                    <p>上架时间: {{ goodsinfo.add_time | dateFormat }}</p>
                </div>
            </div>
            <div class="mui-card-footer">
                <mt-button type="primary" size="large" plain @click="goDesc(id)">图文介绍</mt-button>
                <mt-button type="danger" size="large" plain @click="goComment(id)">商品评论</mt-button>
            </div>
        </div>
    </div>

    <!-- 分析: 为什么商品评论中的 轮播图 那么丑 -->
    <!-- 1. 首页中的图片, 他的宽和高都是使用 100% 的宽度 -->
    <!-- 2. 在商品详情页面中, 轮播图的 图片, 如果也使用了 宽高为 100% 的话, 页面不好看-->
    <!-- 3. 商品详情页面中的轮播图, 期望 高度为 100% , 但是宽度为 自适应 -->

    <!-- 4.结论, 经过分析, 得到问题的原因, 首页中的轮播图, 和详情中的轮播图,分歧点是
    宽度到底是100% , 还是自适应
    -->

    <!-- 5. 既然这两个 轮播图, 其他方面都是没有冲突的, 只是 宽度有分歧, 那么我们可以
     定义一个属性, 让轮播图的使用者, 手动指定是否为 100% 的宽度
    -->
</template>

<script>
    // 导入轮播图组件
    import swiper from "./../subcomponents/swiper.vue";

    // 导入数字选择框组件
    import numbox from "./../subcomponents/goodsinfo_numbox.vue";

    export default {
        data() {
            return {
                id: this.$route.params.id, // 为方便调用, 将路由参数对象中的 id 绑定到data 身上
                lunbotu: [
                    // 轮播图的数据
                    {
                        img:
                            "https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/8729282b199b3ec51e31c1b6b15f3f93.jpg?thumb=1&w=250&h=250&f=webp&q=90"
                    },
                    {
                        img:
                            "https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/0099822e42b4428cb25c4cdebc6ca53d.jpg?thumb=1&w=250&h=250&f=webp&q=90"
                    },
                    {
                        img:
                            "https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/7cfdbce40301133a287e9e57faa37bdf.jpg?thumb=1&w=250&h=250&f=webp&q=90"
                    }
                ],
                // 获取到的商品的信息
                goodsinfo: {
                    title:'小米(Mi) Note 16g 双网通版',
                    goods_no: 100000,
                    stock_quantity: 60,
                    add_time: '2020-07-22',
                    sell_price:2199,
                    market_price:2699,
                    img_url:"https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/8729282b199b3ec51e31c1b6b15f3f93.jpg?thumb=1&w=250&h=250&f=webp&q=90"

                },

                ballFlag: false ,// 控制小球隐藏和显示的标识符
                selectedCount:1   // 保存用户选中的商品数量, 默认, 认为用户买一个
            };
        },

        created() {
            // this.getLunbotu()
            //  this.getGoodsInfo()

        },
        methods: {
            getLunbotu() {
                this.$http.get("api/getthumimage/" + this.id).then(result => {
                    if (result.body.status === 0) {
                        // 先循环轮播图数组的每一项, 为item 添加img 属性, 因为 轮播图 组件中, 只认识
                        // item.img,  不认识 item.src

                        result.body.message.forEach(item => {
                            // 为item 追加 一个img 属性, 其值 === item.src
                            item.img = item.src;
                        });

                        this.lunbotu = result.body.message;
                    }
                });
            },
            getGoodsInfo() {
                // 获取商品的信息
                this.$http.get("api/goods/getinfo" + this.id).then(result => {
                    if (result.body.status === 0) {
                        this.goodsinfo = result.body.message[0];
                    }
                });
            },
            goDesc(id) {
                // 点击使用编程式导航, 跳转到图文介绍页面
                this.$router.push({name: "goodsdesc", params: {id}});
            },
            goComment(id) {
                // 点击使用编程式导航, 跳转到评论页面
                this.$router.push({name: "goodscomment", params: {id}});
            },

            addToShopCart() {
                // 添加到购物车
                this.ballFlag = !this.ballFlag;

                //  {id:商品的id, count:要购买的数量, price: 商品的单价, selected: false, title:title,img_url:img_url }
                // 拼接出一个, 要保存到store 中的car数组中的 商品的对象
                var goodsinfo= {id: this.id, img_url:this.goodsinfo.img_url ,title:this.goodsinfo.title, count:this.selectedCount, price: this.goodsinfo.sell_price,selected: true } 

                // 调用store 中的mutations 来将商品加入购物车
                this.$store.commit('addToCar', goodsinfo)
            },
            beforeEnter(el) {
                el.style.transform = "translate(0,0)"
            },
            enter(el, done) {
                el.offsetWidth;

                // 小球动画优化思路:
                // 1. 先分析导致, 动画 不准确的, 本质原因:我们把小球 的 位移的位置, 已经局限在了某
                // 一分辨率下的 滚动条未滚动的情况下;

                // 2. 只要分辨率和 测试的时候不一样, 或者滚动条 有一定的滚动距离之后, 问题就出现了;

                // 3. 因此, 我们经过分析, 得到结论: 不能 把 位置的横纵坐标, 直接写死了, 而是应该 根据不同
                // 情况, 动态计算这个坐标值;

                // 4. 经过分析, 得出解决思路: 先得到徽标的横纵坐标, 再得到 小球的横纵坐标, 然后让y 值 求差, x 值也求差, 得到的结果
                // 就是 横纵坐标要位移的距离

                // 5. 如何获取 徽标和小球的位置?
                // domObject.getBoundingClientRect()


                // 获取小球在页面中的位置
                const ballPosition = this.$refs.ball.getBoundingClientRect()

                // vue 不推荐使用dom , (简单的需求), 在组件内部可以 获取组件的所有元素

                // 获取徽标在页面中的位置
                const badgePosition = document.getElementById('badge').getBoundingClientRect()

                const xDist = badgePosition.left - ballPosition.left
                const yDist = badgePosition.top - ballPosition.top


                // el.style.transform = "translate(92px, 262px)";
                el.style.transform = `translate(${xDist}px, ${yDist}px)`;

                el.style.transition = "all 1s cubic-bezier(.4,-0.3,1,.68)" // 过渡

                done()

            },
            afterEnter(el) {
                this.ballFlag = !this.ballFlag;
            },

            getSelectedCount(count){
                // 当子组件把选中的数量 传递给父组件的时候,把选中的值保存到data上
                this.selectedCount = count
                console.log('父组件拿到的数量值为'+count)
            }

        },
        components: {
            // 调用自定义的轮播图组件
            swiper,
            numbox
        }
    };
</script>

<style lang='scss' scope>
    .goodsinfo-container {
        background-color: #eee;

        overflow: hidden; /*解决外边距塌陷*/

        .mui-numbox {
            height: 25px;
        }

        .now_price {
            color: red;
            font-size: 16px;
            font-weight: bold;
        }

        .mui-card-footer {
            display: block;

            button {
                margin: 15px 0;
            }
        }

        .ball {
            width: 15px;
            height: 15px;
            border-radius: 50%;
            background-color: red;

            position: absolute;
            z-index: 99;

            top: 358px;
            left: 146px;

        }
    }
</style>