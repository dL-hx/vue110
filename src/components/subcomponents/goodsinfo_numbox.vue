<template>
<!-- 问题: 我们不知道什么时候能拿到max值, 但是总归有一刻,会拿到一个真正的max值-->
<!--  我们可以使用watch属性监听, 来监听父组件传递过来的max值, 不管watch 会触发几次
但是, 最后一次, 肯定是一个合法的max数值
-->
  <div class="mui-numbox" data-numbox-min="1" :data-numbox-max="max">
    <button class="mui-btn mui-btn-numbox-minus" type="button">-</button>
    <input id="test" class="mui-input-numbox" ref="numbox" type="number" value="1" @change="countChanged"/>
    <button class="mui-btn mui-btn-numbox-plus" type="button">+</button>
  </div>
</template>

<script>
// 1.导入MUI 的JS 文件
import mui from "../../lib/mui/js/mui.min.js";

/*分析, 子组件什么时候把数据传递给父组件

* */
export default {
  data() {
    return {};
  },
  mounted(){
      // 在mounted 方法中 进行组件的初始化
      // 初始化数字选择框组件
      mui('.mui-numbox').numbox()

    console.log(this.max)
  },
  methods:{
    countChanged(){
      // 每当文本框的数据被修改的时候, 立即把最新的数据通过事件调用传递给父组件
      // console.log(this.$refs.numbox.value)
      this.$emit('getcount', parseInt(this.$refs.numbox.value))
    }
  },
  props:["max"],
  watch:{
    // 属性监听
    'max':function (newVal, oldVal) {
      // 使用JS API 设置numbox 的最大值
      mui('.mui-numbox').numbox().setOption('max', newVal )

    }
  }
};
</script>

<style lang="scss" scope>

</style>