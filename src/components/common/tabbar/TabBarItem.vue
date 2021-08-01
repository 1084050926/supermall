<template>
  <!-- 监听事件 -->
  <div class="tab-bar-item" @click="itemClick">
    <div v-if="!isActive">
      <slot name="item-icon"></slot>
    </div>
    <div v-else>
      <slot name="item-icon-active"></slot>
    </div>

    <div :style="active">
      <slot name="item-text"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TabBaritem',

  props: {
    // 接收父组件传过来的path路径
    path: String,
    // 接收父组件传过来的文字颜色
    activeColor: {
      type: String,
      default: 'rgb(255, 87, 119)'
    }
  },
  // data () {
  //   return {
  //     isactive: true
  //   }
  // },
  computed: {
    isActive () {
      // 判断$route里面的path是否包含当前页面的path 如果包含返回true
      return this.$route.path.indexOf(this.path) !== -1
    },
    active () {
      return this.isActive ? { color: this.activeColor } : {}
    }
  },
  methods: {
    itemClick () {
      console.log('itemClick')
      // 展现活跃路径的页面
      this.$router.replace(this.path).catch(err => err)
    }

  },
}
</script>

<style scoped>
.tab-bar-item {
  flex: 1;
  text-align: center;
  height: 49px;
  font-size: 14px;
}
.tab-bar-item img {
  width: 24px;
  height: 24px;
  vertical-align: middle;
  margin-top: 3px;
  margin-bottom: 2px;
}
/* .active {
  color: rgb(255, 87, 119);
} */
</style>