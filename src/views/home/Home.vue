<template>
  <div id="home">
    <!-- 导航栏 -->
    <nav-bar class="home-nav">
      <div slot="center">购物街</div>
    </nav-bar>
    <!-- 轮播图 -->
    <home-swiper :banners="banners"></home-swiper>
    <!-- 推荐模块 -->
    <recommend-view :recommends="recommends"></recommend-view>
  </div>
</template>

<script>
// Home页面的组件
import NavBar from 'components/common/navbar/NavBar'
import HomeSwiper from './childComps/HomeSwiper.vue'
import RecommendView from './childComps/RecommendView.vue'

// 网络请求
import { getHomeMultidata } from 'network/home'


export default {
  name: 'Home',
  components: {
    NavBar,
    HomeSwiper,
    RecommendView,


  },
  data () {
    return {
      banners: [],
      recommends: [],
      arr: [1, 2]
    }
  },
  // 在首页开始创建的时候请求数据
  created () {
    // 请求多个数据
    getHomeMultidata().then(res => {
      // console.log(res);
      this.banners = res.data.banner.list
      console.log(this.banners[2].image);
      this.recommends = res.data.recommend.list


      // console.log(this.recommends);
    })
  },
}
</script>

<style>
.home-nav {
  background-color: var(--color-tint);
  color: #fff;
}
</style>