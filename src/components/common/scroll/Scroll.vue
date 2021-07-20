<template>
  <div class="wapper" ref="wapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>

import Bscroll from 'better-scroll'

export default {
  name: 'Scroll',
  props: {
    // 探测位置
    probeType: {
      type: Number,
      default: 0
    },
    // 上拉加载
    pullUpLoad: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      // 定义一个变量来存储Bscroll的实例
      scroll: null,
      message: 'msg'
    }
  },

  // 组件挂载后调用
  mounted () {
    // 1·创建Bscroll对象
    this.scroll = new Bscroll(this.$refs.wapper, {
      observeDOM: true,
      probeType: this.probeType,
      pullUpLoad: this.pullUpLoad,
      // click这个属性禁止div以外的所有标签的click事件
      click: true

    })
    // 2·监听滚动的位置
    this.scroll.on('scroll', position => {
      // 发出自定义事件，让想要获得滚动距离的调用
      this.$emit('scroll', position)
    })
    // 3·上拉加载事件
    this.scroll.on('pullingUp', () => {
      this.$emit('pullLoad')
    })
  },

  methods: {
    // 封装scrollTo()
    scrollTo (x, y, time = 300) {
      // ScrollTo(x, y, time = 300)  time=300  设置时间为默认值300
      this.scroll.scrollTo(x, y, time)
    },
    // 封装finishPullUp()
    finishPullUp () {
      this.scroll.finishPullUp()
    }

  },
}
</script>

<style>
</style>