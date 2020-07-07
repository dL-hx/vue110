<template>
  <div class="goodsinfo-container">
    <!-- 商品轮播图区域 -->
    <div class="mui-card">
      <div class="mui-card-content">
        <swiper :lunbotuList="lunbotu" :isfull="false"></swiper>
      </div>
    </div>

    <!-- 商品购买区域 -->
    <div class="mui-card">
      <div class="mui-card-header">页眉</div>
      <div class="mui-card-content">
        <div class="mui-card-content-inner">包含页眉页脚的卡片，页眉常用来显示面板标题，页脚用来显示额外信息或支持的操作（比如点赞、评论等）</div>
      </div>
    </div>

    <!-- 商品参数区域 -->
    <div class="mui-card">
      <div class="mui-card-header">页眉</div>
      <div class="mui-card-content">
        <div class="mui-card-content-inner">包含页眉页脚的卡片，页眉常用来显示面板标题，页脚用来显示额外信息或支持的操作（比如点赞、评论等）</div>
      </div>
      <div class="mui-card-footer">页脚</div>
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

export default {
  data() {
    return {
      id: this.$route.params.id, // 为方便调用, 将路由参数对象中的 id 绑定到data 身上
      lunbotu: [
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
      ] // 轮播图的数据
    };
  },

  created() {
    // this.getLunbotu()
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
    }
  },
  components: {
    // 调用自定义的轮播图组件
    swiper
  }
};
</script>

<style lang='scss' scope>
.goodsinfo-container {
  background-color: #eee;

  overflow: hidden; /*解决外边距塌陷*/
}
</style>