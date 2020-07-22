<template>
  <div class="goods-container">
    <h3>{{ info.title }}</h3>

    <hr />

    <div class="content" v-html="info.html"></div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      id: this.$route.params.id, // 为方便调用, 将路由参数对象中的 id 绑定到data 身上
      // 图文数据
      info: {
          title:'小米10 青春版 5G',
          html: `<div>
          <div class="section__content"><div class="title font_MILanPro_MEDIUM transi-up delay-1">敢想，敢创作。</div><div class="desc-text font_MILanPro_MEDIUM transi-up delay-3">一举将众多旗舰机的本领，齐集到你手中。神奇的<span class="font-text_bold">50 倍潜望式变焦</span>，与小米10<br>一样的<span class="font-text_bold">专业模式</span>，<span class="font-text_bold">AMOLED 原色屏</span>引人入胜，<span class="font-text_bold">骁龙765G</span>更是能效过人。它是<br><span class="font-text_bold">轻、薄、长续航</span>的<span class="font-text_bold">5G 手机</span>，更是让 @设计师 @摄影师 @vlogger @所有年轻人，<br><span class="font-text_bold">迸发创造力的创作利器。</span></div></div>
          <img src="//cdn.cnbj1.fds.api.mi-img.com/mi-mall/cf88411839de34e8491df5af2d3a14ee.jpg"/>
          </div>`

      }
    };
  },

  created() {
   //  this.getGoodsDesc();
  },

  methods: {
    getGoodsDesc() {
      // 获取图文详情的信息
      this.$http.get("api/goods/getdesc/" + this.id).then(result => {
        if (result.body.status === 0) {
          this.info = result.body.message[0];
        }
      });
    }
  }
};
</script>

<style lang="scss">
.goods-container{
    padding: 4px;
    h3{
        font-size: 16px;
        color: #226aff;
        text-align: center;
        margin: 15px 0;
    }

    .content{
        img {
            max-width: 100%;
            height: auto;
        }
    }
}

</style>