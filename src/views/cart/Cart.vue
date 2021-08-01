<template>
  <div id="cart">
    <!-- 导航栏 -->
    <nav-bar class="nav-bar">
      <div slot="center">购物车({{cartLength}})</div>
    </nav-bar>
    <!-- 商品列表 -->
    <cart-list />
    <!-- 商品汇总 -->
    <cart-button-bar />
  </div>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar'
import CartList from './childComps/CartList.vue'
import CartButtonBar from './childComps/CartButtonBar.vue'
// 导入mapGetters
import { mapGetters } from 'vuex'

export default {
  name: 'Cart',
  components: {
    NavBar,
    CartList,
    CartButtonBar
  },
  computed: {
    // 将getters转换为计算属性
    ...mapGetters(['cartLength'])
  }
}
</script>

<style scoped>
#cart {
  height: 100vh;
}
.nav-bar {
  background-color: var(--color-tint);
  color: #fff;
}
</style>