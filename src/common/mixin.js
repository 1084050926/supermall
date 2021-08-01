import { debounce } from 'common/utils'
import BackTop from 'components/content/backTop/BackTop'
// 创建mixin对象
export const itemListenerMixin = {
  data() {
    return { itemImgListener: null }
  },
  mounted() {
    // 1·图片加载完成的事件监听
    const refresh = debounce(this.$refs.scroll.refresh)
    this.itemImgListener = () => {
      // 调用Scroll组件里面的refresh()方法
      refresh()
    }
    // 监听item中图片加载完成
    this.$bus.$on('itemImgLoad', this.itemImgListener)
    console.log('我是混入的内容')
  },
}
// 创建mixin对象
export const BackTopMixin = {
  components: {
    // <!-- 回到顶部模块 -->
    // <!-- @click.native 可以监听到组件里面的原生事件 -->
    BackTop,
  },
  data() {
    return {
      isShowBackTop: false,
    }
  },
  methods: {
    // 监听滚动事件
    // 回到顶部小图标点击事件
    backClick() {
      // 点击访问Scroll的实例的scrollTo(x,y,时间)实现回到顶部功能
      // console.log(this.$refs.scroll.scroll);
      // console.log();
      // this.$refs.scroll.scroll.scrollTo(0, 0)
      this.$refs.scroll.scrollTo(0, 0)
    },
    // 1·backTop显示与隐藏
    // 当position.y值大于1000的时候就把回到顶部图标显示出来
    listenShowBackTop(position) {
      this.isShowBackTop = -position.y > 1000
    },
  },
}
