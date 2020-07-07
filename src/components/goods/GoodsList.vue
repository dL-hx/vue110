<template>
  <div class="goods-list">
    <!--     <router-link class="good-item" v-for="item in goodslist" :key="item.id" :to="'/home/goodsinfo/'+item.id" tag="div">
      <img :src="item.img_url" />
      <h1 class="title">小米10 青春版 5G</h1>
      <div class="info">
        <p class="price">
          <span class="now">$ {{ item.sell_price }}</span>
          <span class="old">$ {{ item.market_price }}</span>
        </p>

        <p class="sell">
          <span>热卖中</span>
          <span>剩{{ item.stock_quantity }}件</span>
        </p>

      </div>
    </router-link>-->

    <!--在网页中, 有两种跳转方式:-->
    <!-- 方式1 : 使用a 标签的形式 叫做标签跳转  -->
    <!-- 方式2 : 使用window.location.href 的形式 , 叫做编程式导航 -->
    <div class="good-item" v-for="item in goodslist" :key="item.id" @click="goDetail(item.id)">
      <img :src="item.img_url" />
      <h1 class="title">小米10 青春版 5G</h1>
      <div class="info">
        <p class="price">
          <span class="now">$ {{ item.sell_price }}</span>
          <span class="old">$ {{ item.market_price }}</span>
        </p>

        <p class="sell">
          <span>热卖中</span>
          <span>剩{{ item.stock_quantity }}件</span>
        </p>
      </div>
    </div>

    <!-- <div class="good-item">
      <img
        src="https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/8729282b199b3ec51e31c1b6b15f3f93.jpg?thumb=1&w=250&h=250&f=webp&q=90"
      />
      <h1 class="title">小米10 青春版 5G</h1>
      <div class="info">
        <p class="price">
          <span class="now">$ 2195</span>
          <span class="old">$ 2399</span>
        </p>

        <p class="sell">
          <span>热卖中</span>
          <span>剩200件</span>
        </p>
      </div>
    </div>

    <div class="good-item">
      <img
        src="https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/8729282b199b3ec51e31c1b6b15f3f93.jpg?thumb=1&w=250&h=250&f=webp&q=90"
      />
      <h1 class="title">小米10 青春版 5G</h1>
      <div class="info">
        <p class="price">
          <span class="now">$ 2195</span>
          <span class="old">$ 2399</span>
        </p>

        <p class="sell">
          <span>热卖中</span>
          <span>剩200件</span>
        </p>
      </div>
    </div>

    <div class="good-item">
      <img
        src="https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/8729282b199b3ec51e31c1b6b15f3f93.jpg?thumb=1&w=250&h=250&f=webp&q=90"
      />
      <h1 class="title">Redmi 红米电视 70英寸Redmi 红米电视 70英寸Redmi 红米电视 70英寸</h1>
      <div class="info">
        <p class="price">
          <span class="now">$ 2195</span>
          <span class="old">$ 2399</span>
        </p>

        <p class="sell">
          <span>热卖中</span>
          <span>剩200件</span>
        </p>
      </div>
    </div>

    <div class="good-item">
      <img
        src="https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/8729282b199b3ec51e31c1b6b15f3f93.jpg?thumb=1&w=250&h=250&f=webp&q=90"
      />
      <h1 class="title">Redmi 红米电视 70英寸Redmi 红米电视 70英寸Redmi 红米电视 70英寸</h1>
      <div class="info">
        <p class="price">
          <span class="now">$ 2195</span>
          <span class="old">$ 2399</span>
        </p>

        <p class="sell">
          <span>热卖中</span>
          <span>剩200件</span>
        </p>
      </div>
    </div>-->

    <mt-button type="danger" size="large" @click="getMore">加载更多</mt-button>
  </div>
</template>

<script>
export default {
  data() {
    // data 是往自己组件内部, 挂在一些私有数据的
    return {
      pageindex: 1, // 分页的页数
      goodslist: [
        {
          id: "1",
          img_url:
            "https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/8729282b199b3ec51e31c1b6b15f3f93.jpg?thumb=1&w=250&h=250&f=webp&q=90",
          title: "小米10 青春版 5G",
          sell_price: 2195,
          market_price: 2399,
          stock_quantity: 200
        },
        {
          id: "2",

          img_url:
            "https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/8729282b199b3ec51e31c1b6b15f3f93.jpg?thumb=1&w=250&h=250&f=webp&q=90",
          title: "小米10 青春版 5G",
          sell_price: 2195,
          market_price: 2399,
          stock_quantity: 200
        },
        {
          id: "3",

          img_url:
            "https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/8729282b199b3ec51e31c1b6b15f3f93.jpg?thumb=1&w=250&h=250&f=webp&q=90",
          title: "小米10 青春版 5G",
          sell_price: 2195,
          market_price: 2399,
          stock_quantity: 200
        },
        {
          id: "4",

          img_url:
            "https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/8729282b199b3ec51e31c1b6b15f3f93.jpg?thumb=1&w=250&h=250&f=webp&q=90",
          title: "小米10 青春版 5G",
          sell_price: 2195,
          market_price: 2399,
          stock_quantity: 200
        },
        {
          id: "5",

          img_url:
            "https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/8729282b199b3ec51e31c1b6b15f3f93.jpg?thumb=1&w=250&h=250&f=webp&q=90",
          title: "小米10 青春版 5G",
          sell_price: 2195,
          market_price: 2399,
          stock_quantity: 200
        }
      ] // 存放商品列表的数组
    };
  },

  created() {
    // this.getGoodsList()
  },

  methods: {
    getGoodsList() {
      // 获取商品列表
      this.$http
        .get("api/getgoods?pageindex=" + this.pageindex)
        .then(result => {
          if (result.body.status === 0) {
            // this.goodslist = result.body.message;

            // 拼接下一页的数据
            this.goodslist = this.goodslist.concat(result.body.message);
          }
        });
    },
    getMore() {
      this.pageindex++;
      this.getGoodsList();
    },

    goDetail(id) {
      // 使用JS 的形式进行路由导航
      console.log(this);

      // 注意:一定要区分 this.$route 和 this.$router 这两个对象

      // 其中 this.$route 是路由[参数对象], 所有和路由中的参数,  params , query 都属于他

      // 其中,  this.$router 是一个路由[导航对象], 用它 可以方便的使用JS 代码,  实现 路由的前进
      // 后退,  跳转到新的 URL  地址

      // 1. 最简单的
      this.$router.push('/home/goodsinfo/'+id)

      // 2. 传递对象

      // this.$router.push({path: '/home/goodsinfo/'+id })

      // 3. 传递命名的路由
      // this.$router.push({name:'goodsinfo', params:{id: id} })


      // 4.带查询参数，变成 /register?plan=private
      // this.router.push({ path: 'register', query: { plan: 'private' }})
    }
  }
};
</script>

<style lang='scss' scope>
.goods-list {
  display: flex;
  flex-wrap: wrap;
  //   justify-content: space-around;
  justify-content: space-between;

  padding: 7px;
  .good-item {
    width: 49%;
    border: 1px solid #ccc;
    box-shadow: 0 0 8px #ccc;
    margin: 3px 0;
    padding: 2px;

    // 修改主轴方向, 使 图片对齐
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    min-height: 180px;

    img {
      width: 100%;
    }
    .title {
      font-size: 14px;
    }

    .info {
      background-color: #eee;
      p {
        margin-bottom: 0px;
        padding: 5px;
      }
      .price {
        .now {
          color: red;
          font-size: 16px;
          font-weight: bold;
        }

        .old {
          text-decoration: line-through;
          font-size: 12px;
          margin-left: 10px;
        }
      }

      .sell {
        display: flex;
        justify-content: space-between;
        font-size: 12px;
      }
    }
  }
}
</style>