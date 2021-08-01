<template>
  <swiper class="detail-swiper" v-if="topImages.length">
    <swiper-item v-for="(item,index) in topImages" :key="index">
      <img :src="item" alt />
    </swiper-item>
  </swiper>
</template>

<script>
import { Swiper, SwiperItem } from 'components/common/swiper'

export default {
  name: 'DetailSwiper',
  props: {
    topImages: {
      type: Array,
      default: []
    }
  },
  components: {
    Swiper,
    SwiperItem
  },
  data () {
    return {

    }
  },
  create () {

  },
  methods: {

  }
}

</script>
<style scoped>
.detail-swiper {
  height: 300px;
  overflow: hidden;
}
</style>