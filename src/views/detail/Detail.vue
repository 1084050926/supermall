<template>
  <div id="detail">
    <!-- 导航栏 -->
    <detail-nav-bar class="detail-nav" @detailNavClick="detailNavClick" ref="detailNav" />
    <scroll class="content" ref="scroll" @scroll="scroll" :probeType="3">
      <!-- 轮播图 -->
      <detail-swiper :topImages="topImages" />
      <!-- 商品信息 -->
      <detail-base-info :goods="goods" />
      <!-- 商家信息 -->
      <detail-shop-info :shop="shop" />
      <!-- 商品详情信息 -->
      <detail-goods-info :detail-info="detailInfo" @imageLoad="imageLoad" />
      <!-- 商品参数信息 -->
      <detail-param-info :paramInfo="paramsInfo" ref="params" />
      <!-- 商品评论信息 -->
      <detail-comment-info :commentInfo="commentInfo" ref="comment" />
      <!-- 商品推荐信息 -->
      <goods-list :goods="recommend" ref="recommend" />
    </scroll>
    <!-- 底部导航 -->
    <detail-bottom-bar @addCart="addToCart" />
    <!-- 回到顶部 -->
    <back-top @click.native="backClick" v-show="isShowBackTop" />
  </div>
</template>

<script>
import DetailNavBar from './childComps/DetailNavBar'
import DetailSwiper from './childComps/DetailSwiper.vue'
import DetailBaseInfo from './childComps/DetailBaseInfo.vue'
import DetailShopInfo from './childComps/DetailShopInfo.vue'
import DetailGoodsInfo from './childComps/DetailGoodsInfo.vue'
import DetailParamInfo from './childComps/DetailParamInfo.vue'
import DetailCommentInfo from './childComps/DetailCommentInfo.vue'
import DetailBottomBar from './childComps/DetailBottomBar.vue'



import Scroll from 'components/common/scroll/Scroll'
import GoodsList from 'components/content/goods/GoodsList'
import { getDetail, getRecommend, Goods, Shop, GoodsParam, } from 'network/detail'
import { itemListenerMixin, BackTopMixin } from 'common/mixin'
import { mapActions } from "vuex";

export default {
  name: 'Detail',
  data () {
    return {
      iid: null,
      topImages: [],
      goods: {},
      shop: {},
      detailInfo: {},
      paramsInfo: {},
      commentInfo: {},
      recommend: [],
      getThemeTopY: [],
      navBarHeight: 0,
      currentIndex: 0,

    }
  },
  mixins: [itemListenerMixin, BackTopMixin],
  components: {
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    DetailGoodsInfo,
    DetailParamInfo,
    DetailCommentInfo,
    DetailBottomBar,

    GoodsList,
    Scroll,



  },
  created () {
    //1·通过当前活跃的路由保存传入的iid
    this.iid = this.$route.params.iid
    // console.log(this.iid);
    // 2·根据iid请求详情数据
    getDetail(this.iid).then(res => {
      // console.log(res);
      // 1·获取顶部图片轮播数据
      const data = res.result
      this.topImages = res.result.itemInfo.topImages

      // 2·获取商品信息
      this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo.services)

      // 3·创建店铺信息
      this.shop = new Shop(data.shopInfo)

      // 4·保存商品详情数据
      this.detailInfo = data.detailInfo

      // 5·获取参数的信息
      this.paramsInfo = new GoodsParam(data.itemParams.info, data.itemParams.rule)

      // 6·获取评论的数据
      if (data.rate.cRate !== 0) {
        this.commentInfo = data.rate.list[0]
      }
    }),
      // 3·请求推荐数据
      getRecommend().then(res => {
        this.recommend = res.data.list
        // console.log(this.recommend);
      })
  },
  methods: {
    ...mapActions(['addCart']),
    // 监听图片加载完成重新计算高度
    imageLoad () {
      this.$refs.scroll.refresh()
      // this.getThemeTopY.push(0)
      // 获取导航栏的高度
      this.navBarHeight = -this.$refs.detailNav.$el.offsetHeight
      this.getThemeTopY.push(0)
      this.getThemeTopY.push(this.$refs.params.$el.offsetTop + this.navBarHeight)
      this.getThemeTopY.push(this.$refs.comment.$el.offsetTop + this.navBarHeight)
      this.getThemeTopY.push(this.$refs.recommend.$el.offsetTop + this.navBarHeight)
      this.getThemeTopY.push(Number.MAX_VALUE)
      console.log(this.getThemeTopY);
    },
    // 详情页导航点击锚点事件
    detailNavClick (index) {
      // 当发生点击的时候滚动到所需要的位置
      this.$refs.scroll.scrollTo(0, -this.getThemeTopY[index])
      console.log(this.navBarHeight);
    },
    // 监听详情页滚动事件
    scroll (position) {
      // 1·获取positionY值
      const positionY = -position.y
      // 2·将positionY和主题中的值进行对比
      // 0: 44
      // 1: 7390
      // 2: 8277
      // 3: 8514
      // 4: 1.7976931348623157e+308
      let length = this.getThemeTopY.length
      // console.log(positionY);
      for (let i = 0; i < length - 1; i++) {
        // console.log(positionY);
        if (this.currentIndex !== i && (positionY >= this.getThemeTopY[i] && positionY < this.getThemeTopY[i + 1])) {
          this.currentIndex = i
          this.$refs.detailNav.currentIndex = this.currentIndex
        }
        // if (this.currentIndex !== i && (i < length - 1 && positionY >= this.getThemeTopY[i] && positionY < this.getThemeTopY[i + 1]) || (i === length - 1 && positionY >= this.getThemeTopY[i])) {
        //   // 减少重复输出
        //   // this.currentIndex = i
        //   // this.$refs.detailNav.currentIndex = this.currentIndex
        //   console.log('````');
        // }
      }
      this.listenShowBackTop(position)
    },
    // 点击加入购物车事件
    addToCart () {
      // 1·获取购物车所需要的信息 
      const product = {}
      product.image = this.topImages[0]
      product.title = this.goods.title
      product.desc = this.goods.desc
      product.price = this.goods.realPrice
      product.iid = this.iid
      // console.log(product);
      // 2·将数据添加到购物车里
      this.addCart(product).then(res => {
        // 3·添加购物车完成
        this.$toast.show(res, 1500)
        console.log(this.$toast);
      })




    }

  },
  destroyed () {
    // 解除监听图片加载事件
    this.$bus.$off('itemImgLoad', this.itemImgLoad)
  },

}

</script>

<style scoped>
#detail {
  position: relative;
  z-index: 9;
  background-color: #fff;
  height: 100vh;
}

.detail-nav {
  position: relative;
  z-index: 9;
  background-color: #fff;
}

.content {
  height: calc(100% - 44px - 49px);
}
</style>