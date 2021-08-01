<template>
  <swiper v-if="banners.length">
    <swiper-item v-for="(item,index) in banners" :key="index">
      <a :href="item.link">
        <img :src="item.image" alt @load="imageLoad" />
      </a>
    </swiper-item>
  </swiper>
</template>

<script>
import { Swiper, SwiperItem } from 'components/common/swiper'

export default {
  name: "HomeSwiper",
  props: {
    banners: {
      type: Array,
      default () {
        return []
      }
    }
  },
  data () {
    return {
      isload: false
    }
  },
  methods: {

    imageLoad () {

      if (!this.isload) {
        //  图片加载完成之后发送自定义事件到首页
        this.$emit('swiperImageLoad')
        // 当监听完第一张图片的时候取反就停止往后的监听
        this.isload = true
      }
    }
  },
  components: {
    Swiper,
    SwiperItem
  }
}
</script>

<style scoped>
</style>
