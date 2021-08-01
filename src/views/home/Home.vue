<template>
  <div id="home">
    <!-- 导航栏 -->
    <nav-bar class="home-nav">
      <div slot="center">购物街</div>
    </nav-bar>
    <tab-control
      class="tab-control"
      :titles="['流行','新款','精选']"
      @tabClick="tabClick"
      ref="tabControl1"
      v-show="isFixed"
    ></tab-control>
    <!-- 需要滚动的模块 -->
    <scroll
      class="content"
      ref="scroll"
      :probe-type="3"
      @scroll="contentScroll"
      :pull-up-load="true"
      @pullingUp="loadMore"
    >
      <!-- 轮播图 -->
      <home-swiper :banners="banners" @swiperImageLoad="swiperImageLoad"></home-swiper>
      <!-- 推荐模块 -->
      <recommend-view :recommends="recommends"></recommend-view>
      <!-- 本周流行模块 -->
      <feature-view></feature-view>
      <!-- 推荐导航栏模块 -->
      <tab-control
        class="tab-control"
        :titles="['流行','新款','精选']"
        @tabClick="tabClick"
        ref="tabControl2"
      ></tab-control>
      <!-- 商品列表 -->
      <goods-list :goods="showGoods"></goods-list>
    </scroll>
    <!-- 回到顶部 -->
    <back-top @click.native="backClick" v-show="isShowBackTop" />
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



// 网络请求
import { getHomeMultidata, getHomeGoods } from 'network/home'


import { itemListenerMixin, BackTopMixin } from 'common/mixin'






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

  },
  mixins: [itemListenerMixin, BackTopMixin],
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

      tabOffsetTop: 0,
      isFixed: false,
      saveY: 0
    }
  },
  destroyed () {
    this.$bus.$off('itemImgLoad', itemListenerMixin)
    console.log('itemListenerMixin');
  },
  // activated()和deactivated()只有在<keep-alive></keep-alive>包裹的时候才有效；
  // 进入组件时执行
  activated () {
    // 在进入home时滚动到最新的saveY值
    this.$refs.scroll.refresh()
    this.$refs.scroll.scrollTo(0, this.saveY, 0)
    // console.log(this.saveY);

  },
  // 离开组件时执行
  deactivated () {
    // 当离开home时将离开前所在的位置赋值给this.saveY
    this.saveY = this.$refs.scroll.getScrollY()
    // console.log(this.saveY)
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
  mounted () {
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
          break
      }
      this.$refs.tabControl1.currentIndex = index
      this.$refs.tabControl2.currentIndex = index
    },

    // 监听滚动事件
    contentScroll (position) {
      // 1·backTop显示与隐藏
      // 当position.y值大于1000的时候就把回到顶部图标显示出来
      // this.isShowBackTop = -position.y > 2000

      this.isFixed = -position.y > this.tabOffsetTop
      this.listenShowBackTop(position)



    },
    // 上拉到底部的时候再次请求数据
    loadMore () {
      this.getHomeGoods(this.currentIype)
    },
    // 监听轮播图片加载完成后获取tab-control的offsetTop值
    swiperImageLoad () {
      //所有组件都有一个属性$el: 用于获取组件中的元素
      this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop
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

        // 完成上拉加载更多
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
  /* position: fixed;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  z-index: 9; */
}

/* 需要scroll的部分 */
.content {
  position: absolute;
  top: 44px;
  bottom: 49px;
  left: 0;
  right: 0;
  overflow: hidden;
}
.tab-control {
  position: relative;
  z-index: 9;
}
</style>