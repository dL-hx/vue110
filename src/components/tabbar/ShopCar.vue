<template>
    <div class='shopcar-container'>
       <div class="goods-list">
           <!-- 商品列表项 区域-->
           <div class="mui-card">
				<div class="mui-card-content">
					<div class="mui-card-content-inner" v-for="(item, i) in goodslist" :key="item.id">
						<mt-switch v-model="$store.getters.getGoodsSelected[item.id]" @change="selectedChanged(item.id, $store.getters.getGoodsSelected[item.id])"></mt-switch>
                        <img :src="item.img_url" alt="">
                        <div class="info">
                            <h1>{{item.title}}</h1>
                            <p>
                                <span class="price">${{item.price}}</span>
                                <numbox :initcount='$store.getters.getGoodsCount[item.id]' :goodsid='item.id'></numbox>

                                <!-- 问题: 如何从购物车中获取商品的数量 -->
                                <!-- 1. 我们可以先创建一个空对象, 然后循环购物车中所有商品的数据, 把当前循环这条 商品的id  ,作为对象的属性名, count 值作为对象的属性值-->

                                <!-- 这样当把所有的商品循环一遍, 就会得到一个对象<{id:count}> {88:2, 99:1, 110:3} -->
                                <a href="#" @click.prevent="remove(item.id, i)">删除</a>
                            </p>
                        </div>
					</div>
				</div>
			</div>
       </div>


       <!-- 商品结算区域 -->
       <div class="mui-card">
				<div class="mui-card-content">
					<div class="mui-card-content-inner jiesuan">
						<div class="left">
                            <p>总计(不含运费)</p>
                            <p>已勾选商品 <span class="red">{{ this.$store.getters.getGoodsCountAntAmount.count }}</span> 件, 总价 $<span class="red">{{this.$store.getters.getGoodsCountAntAmount.amount}}</span> </p>

                        </div>

                        <mt-button type="danger">去结算</mt-button>
					</div>
				</div>
		</div>
    </div>
</template>

<script>
import numbox from '../subcomponents/shopcar_numbox.vue';
export default {
data(){
    return{
        // goodslist:[] // 购物车中所有商品的数据
        goodslist:this.$store.state.car // 购物车中所有商品的数据
    }
},
created () {
    console.log(this.goodslist)
    // this.getGoodsList()
},
methods: {
           getGoodsList() {
               // 获取购物车商品列表
               // 1. 获取到store 中所有的商品的Id, 然后拼接出一个用 逗号分隔的字符串
                var  idArr= []

                this.$store.state.car.forEach(item=>{
                    idArr.push(item.id)
                })  
                
                // 如果购物车中 没有商品, 则直接返回, 不需要请求接口数据, 否则会报错
                if(idArr.length<=0){
                    return;
                }

                this.$http.get("api/goods/getshopcarlist/" + idArr.join(',')).then(result => {
                    if (result.body.status === 0) {
                        this.goodslist = result.body.message;
                    }
                });
            },

            remove(id, index){
                // 点击删除, 把商品 从store 中传递的Id删除, 同时,把当前 组件中的goodslist 中, 对应要删除的那个商品, 使用index 来删除

                // 数组操作, 从索引为index 的位置开始, 删除一个元素
                this.goodslist.splice(index, 1);

               this.$store.commit('removeFromCar', id);

            },
            selectedChanged(id, val){
                // 每当点击开关, 把最新的 开关状态, 同步到store中
                // console.log(id , val)

               this.$store.commit('updateGoodsSelected', { id:id, selected: val});

            }
},
components: {
    numbox,
},

}
</script>

<style scoped lang="scss">
.shopcar-container{
    background-color: #eee;
    overflow: hidden;
    .goods-list{
        .mui-card-content-inner{
            display: flex;
            align-items: center;
        }
        img{
            width: 60px;
            height:60px
        }
        h1{
            font-size: 13px;
        }
        .info{
            display: flex;
            
            flex-direction: column;

            .price{
                color: red;
                font-weight: bold;
            }

            p{
                margin-bottom: 0;
            }

        }
    }

    .jiesuan{
        display: flex;
        justify-content: space-between;
        align-items: center;


        .red{
            color: red;
            font-weight: bold;
            font-size: 16px;
        }
    }
}
</style>