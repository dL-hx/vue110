<template>
  <div class="cmt-container">
    <h3>发表评论</h3>
    <hr />


    <textarea v-model="msg" placeholder="请输入要评论的内容(最多吐槽120字)" maxlength="120"></textarea>


    <mt-button type="primary" size="large" @click="postComment">发表评论</mt-button>

    <div class="cmt-list">
      <div class="cmt-item" v-for="(item, key) in comments" :key="key">
        <div
          class="cmt-title"
        >第 {{key+1 }} 楼 &nbsp; 用户:{{ item.username }}&nbsp;&nbsp;发表时间: {{ item.time|dateFormat }}</div>
        <div class="cmt-body">{{ item.content==='undefined'?'此用户很懒, 嘛都没说': item.content}}</div>
      </div>
    </div>

    <mt-button type="danger" plain size="large" @click="getMore">加载更多</mt-button>
  </div>
</template>

<script>
import { Toast } from "mint-ui";

export default {
  data() {
    return {
      pageIndex: 1, // 默认展示第一页数据
      comments: [], // 所有的评论数据
      msg:''        // 评论的内容
    };
  },
  created() {
    // this.getComments()
  },
  props: ["id"],
  methods: {
    getComments() {
      // 获取评论列表
      // 使用jsonp 解决异步请求 get 跨域问题
      this.$http
        .get("api/getcomments/" + this.id + "?pageindex=" + this.pageIndex)
        .then(res => {
          if (res.data.status === 0) {
            // 如果没有失败, 应该把数据保存到 data上
            // this.comments = res.data.result.list

            // 每当 获取 新评论 数据的时候, 不要把老数据清空 覆盖, 而是, 应该以老数据, 拼接上新数据
            this.comments = this.comments.concat(res.data.result.list);
          } else {
            Toast("获取评论列表失败...");
          }
        });
    },

    getMore() {
      // 加载更多
      this.pageIndex++;
      this.getComments();
    },
    postComment(){
      // 校验内容是否为空
      if (this.msg.trim().length === 0) {
        return Toast('评论内容不能为空')
      }

      // 发表评论
      // 参数1 : 请求url 地址
      // 参数2 : 提交给服务器的数据对象 {content: this.msg}`
      // 参数3 : 定义提交时候, 表单中数据的格式  { emulateJSON: true }

      
         this.$http
              .post("api/postcomment/" + this.$route.params.id, {
                content: this.msg.trim()
              })
              .then(res => {
                if (res.data.status === 0) {
                  // 1. 拼接出一个评论对象
                  var cmt = {user_name: '匿名用户', time:Date.now() , content: this.msg.trim()}

                  this.comments.unshift(cmt);

                  // 2. 提交成功, 清除 评论框内容
                  this.msg = ''
                } else {
                  Toast("获取评论列表失败...");
                }
              }); 
    }
  }
};
</script>

<style lang='scss' scope>
.cmt-container {
  h3 {
    font-size: 16px;
  }

  textarea {
    font-size: 14px;
    height: 85px;
    margin: 0;
  }

  .cmt-list {
    margin: 5px 0;
    .cmt-item {
      font-size: 13px;
      .cmt-title {
        line-height: 30px;
        background-color: #ccc;
      }

      .cmt-body {
        line-height: 35px;
        //   文字缩进
        text-indent: 2em;
      }
    }
  }
}
</style>