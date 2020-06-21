<template>
    <div class="newsinfo-container">
      <!-- 大标题 -->
      <h3 class="title">新闻标题</h3>
      <!-- 子标题 -->
      <p class="subtitle">
        <span>发表时间: 2020-02-10:08:00:09</span>
        <span>点击: 0 次</span>
      </p>

      <hr>

      <!-- 内容区域 -->
      <div class="content" v-html="newsinfo.html"></div>

      <!-- 评论区域 -->
      <comment-box :id="this.id"></comment-box>
    </div>
</template>
<script>
// 1. 导入 评论子组件
import comment from './../subcomponents/comment.vue'
export default {
    data(){
        return{
          id:this.$route.params.id ,// 将URL 地址中 传递过来的Id 值 挂载到 data 身上, 方便以后调用
          newsinfo:{} // 新闻对象
        }
    }, 
    created(){
      // console.log(this.$route.query);
      this.getNewsInfo()
    },
    methods:{
      getNewsInfo(){
         this.$http.get('api/getnew/' + this.id).then(res=>{
              if (res.data.status===0) {
                // 如果没有失败, 应该把数据保存到 data上
                this.newsinfo = res.data.result.body[0]
                  
              }else{
                  Toast('获取新闻详情失败...')
              }
            })
        }
      },
      components:{// 2. 用来注册子组件的节点
        'comment-box':comment
      }
}
</script>
<style lang="scss">
.newsinfo-container {
  padding: 0 4px;
  .title {
    font-size: 16px;
    text-align: center;
    margin: 15px 0;
    color: red;
  }
  .subtitle {
    font-size: 13px;
    color: #226aff;
    display: flex;
    justify-content: space-between;
  }
  .content {
    img {
         width: 100%;
    }
  }
}
</style>