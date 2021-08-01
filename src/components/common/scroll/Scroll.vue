<template>
  <div class="wrapper" ref="wrapper">
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
    this.scroll = new Bscroll(this.$refs.wrapper, {
      observeDOM: true,
      probeType: this.probeType,
      pullUpLoad: this.pullUpLoad,
      // click这个属性禁止div以外的所有标签的click事件
      click: true

    })
    // 2·监听滚动的位置
    if (this.probeType === 2 || this.probeType === 3) {
      this.scroll.on('scroll', position => {
        // 发出自定义事件，让想要获得滚动距离的调用
        this.$emit('scroll', position)
      })
    }

    // 2·监听上拉加载
    if (this.pullUpLoad) {
      this.scroll.on('pullingUp', () => {
        // 发送自定义事件
        this.$emit('pullingUp')
      })
    }



  },

  methods: {
    // 封装scrollTo()
    scrollTo (x, y, time = 300) {
      // ScrollTo(x, y, time = 300)  time=300  设置时间为默认值300
      this.scroll && this.scroll.scrollTo(x, y, time)
    },
    // 封装finishPullUp()
    finishPullUp () {
      this.scroll && this.scroll.finishPullUp()

    },
    // 封装refresh()
    refresh () {
      this.scroll && this.scroll.refresh()
    },
    getScrollY () {
      return this.scroll ? this.scroll.y : 0
    }



  },
}
</script>

<style>
</style>