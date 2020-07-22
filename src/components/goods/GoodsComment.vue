<template>
  <div>
      <cmtbox :id="$route.params.id"></cmtbox>
  </div>
</template>

<script>
import cmtbox from '../subcomponents//comment.vue'

export default {
  data(){
    return {

    }
  },
  components:{
    cmtbox
  }
}
</script>

<style scoped lang="scss">

</style>