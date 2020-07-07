<template>
  <div>
    <!-- 顶部滑动条区域 -->
    <div id="slider" class="mui-slider">
      <div
        id="sliderSegmentedControl"
        class="mui-scroll-wrapper mui-slider-indicator mui-segmented-control mui-segmented-control-inverted"
      >
        <div class="mui-scroll">
          <a
            :class="['mui-control-item',  item.id ==0? 'mui-active':'']"
            v-for="(item, key) in cates"
            :key="key"
            @tap="getPhotoListByCateId(item.id)"
          >{{item.title}}</a>
        </div>
      </div>

      <!-- 图片列表区域 -->

      <ul class="photo-list">
        <router-link v-for="item in list" :key="item.id" :to="'/home/photoinfo/'+item.id" tag="li">
          <img v-lazy="item.img_url" />
          <div class="info">
            <h1 class="info-title">{{ item.title }}</h1>
            <h1 class="info-body">{{ item.zhaiyao }}</h1>
          </div>
        </router-link>
      </ul>
    </div>
  </div>
</template>

<script>
// 1.导入MUI 的JS 文件
import mui from "../../lib/mui/js/mui.min.js";

export default {
  data() {
    return {
      cates: [
        {
          title: "全部",
          id: 0
        },

        {
          title: "推荐",
          id: 1
        },
        {
          title: "热点",
          id: 2
        },
        {
          title: "北京",
          id: 3
        },
        {
          title: "社会",
          id: 4
        },
        {
          title: "娱乐",
          id: 5
        },
        {
          title: "科技",
          id: 6
        }
      ], // 所有的分类列表
      list: [
        {
          id: 0,
          img_url: "https://img.mukewang.com/5e74787600018d4218720764.jpg",
          title: "Java工程师2020",
          zhaiyao: "综合就业排名第一"
        },
        {
          id: 1,
          img_url: "https://img.mukewang.com/5e74787600018d4218720764.jpg",
          title: "Java工程师2020",
          zhaiyao: "综合就业排名第一"
        },
        {
          id: 2,
          img_url: "https://img.mukewang.com/5e74787600018d4218720764.jpg",
          title: "Java工程师2020",
          zhaiyao: "综合就业排名第一"
        },
        {
          id: 3,
          img_url: "https://img.mukewang.com/5e74787600018d4218720764.jpg",
          title: "Java工程师2020",
          zhaiyao: "综合就业排名第一"
        }
      ]
    };
  },

  mounted() {
    // 当 组件中的DOM 结构被渲染好 并放到页面中后, 会执行这个钩子函数
    // 如果要操作元素了, 最好在 mouted 里面, 因为这时候的DOM 元素是 最新的
    // 2.初始化scroll控件：
    mui(".mui-scroll-wrapper").scroll({
      deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
    });
  },

  created() {
    // this.getAllCategory()
    // 默认进入页面 , 就主动请求, 所有图片列表的数据
    // this.getPhotoListByCateId(0)
  },

  methods: {
    getAllCategory() {
      // 获取所有的图片分类
      this.$http.get("api/getimgcategory").then(result => {
        if (result.data.status === 0) {
          // 手动拼接出一个最完整的分类列表
          result.data.result.list.unshift({ title: "全部", id: 0 });

          this.cates = result.data.result.list;
        }
      });
    },
    getPhotoListByCateId(cateId) {
      // 根据分类Id 获取图片列表
      this.$http.get("api/getimages/" + cateId).then(result => {
        if (result.data.status === 0) {
          this.list = result.data.result.list;
        }
      });
    }
  }
};
</script>

<style lang='scss' scope>
* {
  touch-action: pan-y;
}

.photo-list {
  list-style: none;
  margin: 0;
  padding: 10px;
  padding-bottom: 0;
  li {
    background-color: #ccc;
    text-align: center;
    margin-bottom: 10px;
    box-shadow: 0 0 9px #999;
    position: relative;
    img {
      width: 100%;
      vertical-align: middle;
    }
    img[lazy="loading"] {
      width: 40px;
      height: 300px;
      margin: auto;
    }

    .info {
      width: 100%;
      color: white;
      text-align: left;
      position: absolute;
      bottom: 0;
      background-color: rgba(0, 0, 0, 0.4);
      max-height: 84px;
      .info-title {
        font-size: 14px;
      }
      .info-body {
        font-size: 13px;
      }
    }
  }
}
</style>