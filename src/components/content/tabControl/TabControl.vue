<template>
  <div class="tabControl">
    <div
      v-for="(item, index) in titles"
      :key="index"
      class="tab-control-item"
      :class="{active:index===currentIndex}"
      @click="itemClick(index)"
    >
      <span>{{item}}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TabControl',
  // 导航栏内容数量根据父组件传递过来的标题数量来决定
  props: {
    titles: {
      type: Array,
      default () {
        return []
      }
    }
  },
  data () {
    return {
      currentIndex: 0
    }
  },
  methods: {
    itemClick (index) {
      // console.log(index);
      this.currentIndex = index
      this.$emit('tabClick', index)
    },

  },
}
</script>

<style>
.tabControl {
  display: flex;
  height: 40px;
  line-height: 40px;
  font-size: 15px;
  text-align: center;
  background-color: #fff;
  z-index: 9;
}
.tab-control-item {
  flex: 1;
}
.active {
  color: var(--color-high-text);
}
.tab-control-item span {
  padding: 4px;
}
.active span {
  border-bottom: 2px solid var(--color-tint);
}
</style>