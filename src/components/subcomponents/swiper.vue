<template>
          <mt-swipe :auto="4000">
            <!-- 在组件中, 使用v-for 循环的话, 一定要使用 key, 只要绑定key 唯一即可  -->
            <!-- 将来, 谁使用此轮播图组件, 谁为我们传递 此 lunbotuList -->

            <!-- 此时, lunbotulist 应该是 父组件 向 子组件传值 来设置 -->
            <mt-swipe-item v-for="(item, key) in lunbotuList"  :key="key">
                <img :src="item.img" :alt="item.title" :class="{'full':isfull}">
            </mt-swipe-item>
        </mt-swipe>

</template>

<script>
export default {
    data(){
        return{

        }
    },
    // 接收 父组件传来的 lunbotuList
    props:['lunbotuList', 'isfull'],

}
</script>

<style lang="scss" scoped>
.mint-swipe {
    height: 200px;

    .mint-swipe-item {
        // 图片属于块级元素, 可以使用text-align :center 进行居中
        text-align: center;

        img {// 设置图片的样式
            // width: 100%; // 不写宽度表示宽度自适应
            height: 100%;
        }
    }
}


.full{
    width: 100%;
}
</style>