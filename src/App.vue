<template>
  <div id="app">
    <!-- 使用组件 -->
    <keep-alive exclude="Detail">
      <router-view />
    </keep-alive>
    <main-tab-bar />
  </div>
</template>

<script>
// 导入MainTabbar组件
import MainTabBar from 'components/content/mainTabbar/MainTabbar'

export default {

  name: 'app',
  // 注册组件
  components: {
    MainTabBar,
  }


}
</script>

<style>
@import 'assets/css/base.css';
</style>
