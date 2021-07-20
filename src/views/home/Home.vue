<template>
  <div id="home">
    <!-- 导航栏 -->
    <nav-bar class="home-nav">
      <div slot="center">购物街</div>
    </nav-bar>
    <!-- 需要滚动的模块 -->
    <scroll
      class="content"
      ref="scroll"
      :probe-type="3"
      @scroll="contentScrollBackTop"
      :pull-up-load="true"
      @pullLoad="pullLoad"
    >
      <!-- 轮播图 -->
      <home-swiper :banners="banners"></home-swiper>
      <!-- 推荐模块 -->
      <recommend-view :recommends="recommends"></recommend-view>
      <!-- 本周流行模块 -->
      <feature-view></feature-view>
      <!-- 推荐导航栏模块 -->
      <tab-control class="tab-control" :titles="['流行','新款','精选']" @tabClick="tabClick"></tab-control>
      <!-- 商品列表 -->
      <goods-list :goods="showGoods"></goods-list>
    </scroll>
    <!-- 回到顶部模块 -->
    <!-- @click.native 可以监听到组件里面的原生事件 -->
    <back-top @click.native="backClick" v-show="isShow"></back-top>
  </div>
</template>

<script>
// Home页面的组件
import HomeSwiper from './childComps/HomeSwiper.vue'
import RecommendView from './childComps/RecommendView.vue'
import featureView from './childComps/featureView.vue'

import NavBar from 'components/common/navbar/NavBar'
import TabControl from 'components/content/tabControl/TabControl'
import GoodsList from 'components/content/goods/GoodsList'
import Scroll from 'components/common/scroll/Scroll'
import BackTop from 'components/content/backTop/BackTop'

// 网络请求
import { getHomeMultidata, getHomeGoods } from 'network/home'






export default {
  name: 'Home',
  components: {
    HomeSwiper,
    RecommendView,
    featureView,


    NavBar,
    TabControl,
    GoodsList,
    Scroll,
    BackTop,




  },

  data () {
    return {
      banners: [],
      recommends: [],
      // 将首页里面需要使用的数据以类似json的格式保存
      goods: {
        'pop': {
          page: 0,
          list: []
        },
        'new': {
          page: 0,
          list: []
        },
        'sell': {
          page: 0,
          list: []
        }
      },
      currentIype: 'pop',
      isShow: false
    }
  },
  computed: {
    // 列表展示
    showGoods () {
      return this.goods[this.currentIype].list
    }
  },
  // 在首页开始创建的时候请求数据
  created () {
    // 请求多个数据
    this.getHomeMultidata()
    // 请求首页商品数据
    this.getHomeGoods('pop')
    this.getHomeGoods('new')
    this.getHomeGoods('sell')
  },
  methods: {
    /* 
    事件监听相关的方法
    */
    // 推荐导航栏模块点击事件
    tabClick (index) {
      switch (index) {
        case 0:
          this.currentIype = 'pop'
          break;
        case 1:
          this.currentIype = 'new'
          break;
        case 2:
          this.currentIype = 'sell'
      }
    },
    // 回到顶部小图标点击事件
    backClick () {
      // 点击访问Scroll的实例的scrollTo(x,y,时间)实现回到顶部功能
      // console.log(this.$refs.scroll.scroll);
      // console.log();
      // this.$refs.scroll.scroll.scrollTo(0, 0)
      this.$refs.scroll.scrollTo(0, 0)
    },
    // 回到顶部小图标显示隐藏事件
    contentScrollBackTop (position) {
      // 当position.y值大于1000的时候就把回到顶部图标显示出来
      this.isShow = -position.y > 2000
    },
    // 上拉加载事件
    pullLoad () {
      this.getHomeGoods(this.currentIype)
    },



    /**
       * 网络请求相关的方法
       */
    // 请求首页数据
    getHomeMultidata () {
      getHomeMultidata().then(res => {

        this.banners = res.data.banner.list
        this.recommends = res.data.recommend.list
      })
    },
    // 请求首页的商品列表数据
    getHomeGoods (type) {
      const page = this.goods[type].page + 1
      getHomeGoods(type, page).then(res => {

        this.goods[type].list.push(...res.data.list)
        this.goods[type].page += 1
        // 当加载完成后调用finishPullUp()进行重新加载
        this.$refs.scroll.finishPullUp()
      })
    }
  },
}
</script>

<style scoped>
#home {
  height: 100vh;
  /* padding-top: 44px; */
  position: relative;
}
.home-nav {
  background-color: var(--color-tint);
  color: #fff;
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  z-index: 9;
}
.tab-control {
  /* 向上滚动是元素往上滚 */
  /* 当元素小于44px之前 position为相对定位，之后position为固定定位*/
  position: sticky;
  top: 44px;
}
/* 需要scroll的部分 */
.content {
  position: absolute;
  top: 44px;
  bottom: 49px;
  left: 0;
  right: 0;
  overflow: hidden;

  overflow: hidden;
}
</style>