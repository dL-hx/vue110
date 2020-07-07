<template>
  <div class="photoinfo-container">
    <h3>{{photoinfo.title}}</h3>
    <p class="subtitle">
      <span>发表时间: {{photoinfo.add_time|dateFormat}}</span>
      <span>点击: {{photoinfo.click}}次</span>
    </p>

    <hr />

    <!-- 缩略图区域 -->
    <div class="thumbs">
      <img
        class="preview-img"
        v-for="(item, index) in list"
        :src="item.src"
        height="100"
        @click="$preview.open(index, list)"
        :key="item.src"
      />
    </div>

    <!-- 图片内容区域 -->

    <div class="content" v-html="photoinfo.content"></div>

    <!-- 放置一个现成的 评论子组件 -->
    <cmt-box :id="id"></cmt-box>
  </div>
</template>

<script>
// 1. 导入 评论子组件
import comment from "./../subcomponents/comment.vue";

export default {
  data() {
    return {
      id: this.$route.params.id, // 从路由中获取 到的 图片Id
      list: [// 缩略图的列表
        {
          src:
            "https://farm6.staticflickr.com/5591/15008867125_68a8ed88cc_b.jpg",
          msrc:
            "https://farm6.staticflickr.com/5591/15008867125_68a8ed88cc_m.jpg",
          alt: "picture1",
          title: "Image Caption 1",
          w: 600,
          h: 400
        },
        
        {
          src:
            "https://farm4.staticflickr.com/3902/14985871946_86abb8c56f_b.jpg",
          msrc:
            "https://farm4.staticflickr.com/3902/14985871946_86abb8c56f_m.jpg",
          alt: "picture2",
          title: "Image Caption 2",
          w: 1200,
          h: 900
        },
        {
          src:
            "https://farm4.staticflickr.com/3902/14985871946_86abb8c56f_b.jpg",
          msrc:
            "https://farm4.staticflickr.com/3902/14985871946_86abb8c56f_m.jpg",
          alt: "picture2",
          title: "Image Caption 2",
          w: 1200,
          h: 900
        },
        {
          src:
            "https://farm4.staticflickr.com/3902/14985871946_86abb8c56f_b.jpg",
          msrc:
            "https://farm4.staticflickr.com/3902/14985871946_86abb8c56f_m.jpg",
          alt: "picture2",
          title: "Image Caption 2",
          w: 1200,
          h: 900
        }
      ],

      photoinfo: {
        add_time: "2015-04-18T04:30:50.000Z",
        click: 0,
        content: `一如既往，内容过“硬”3年迭代4次一套紧跟市场用人标准紧跟主流技术发展趋势不断进化的Java体系课`,
        id: 37,
        title: "Java工程师2020"
      }
    };
  },

  created() {
    // getPhotoInfo()
    // this.getThumbs()
  },

  methods: {
    getPhotoInfo() {
      // 获取图片详情
      this.$http.get("api/getimageInfo/" + this.id).then(result => {
        if (result.data.status === 0) {
          this.list = result.data.result.list[0];
        }
      });
    },

    getThumbs() {
      // 获取缩略图
      this.$http.get("api/getthumimages/" + this.id).then(result => {
        if (result.data.status === 0) {
          // 循环每个图片数据，补全图片的宽和高
          result.body.message.forEach(item => {
            item.w = 600;
            item.h = 400;
          });
          // 把完整的数据保存到 list 中
          this.list = result.body.message;
        }
      });
    },

    handleClose() {
      console.log("close event");
    }
  },
  components: {
    "cmt-box": comment
  }
};
</script>

<style lang='scss' scope>
.photoinfo-container {
  padding: 3px;
  h3 {
    color: #26a2ff;
    font-size: 15px;
    text-align: center;
    margin: 15px 0;
  }
  .subtitle {
    display: flex;
    justify-content: space-between;
    font-size: 13px;
  }

  .content {
    font-size: 13px;
    line-height: 30px;
  }

  .thumbs {
    img {
      margin: 10px;
      box-shadow: 0 0 8px #999;
    }
  }
}
</style>