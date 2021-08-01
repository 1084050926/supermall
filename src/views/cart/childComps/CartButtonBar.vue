<template>
  <div id="button-bar">
    <div class="check-content">
      <check-button class="check-button" :is-checked="isSelectAll" @click.native="checkButtonAll" />
      <span>全选</span>
    </div>
    <div class="price">合计：{{totalprice}}</div>
    <div class="buy" @click="buyToast">去结算：{{checkLength}}</div>
  </div>
</template>

<script>
import CheckButton from 'components/content/checkButton/CheckButton'
import { mapGetters } from 'vuex'
export default {
  name: 'CartButtonBar',
  data () {
    return {

    }
  },
  components: {
    CheckButton
  },
  computed: {
    ...mapGetters(['cartList']),
    // 计算总价格
    totalprice () {
      return '￥' + this.cartList.filter(item => {
        return item.checked
      }).reduce((preValue, item) => {
        return preValue + item.price * item.count
      }, 0).toFixed(2)
    },
    // 获取已经选择的商品的数量
    checkLength () {
      return this.cartList.filter(item => item.checked).length
    },
    isSelectAll () {
      // 判断cartlist里面是否有值
      if (this.cartList.length === 0) return false
      // 使用filter
      // return !this.cartList.filter(item => !item.checked).length
      // 使用some
      return !this.cartList.find(item => !item.checked)

    }
  },
  methods: {
    checkButtonAll () {
      if (this.isSelectAll) {//全部选中
        this.cartList.forEach(item => item.checked = false)
      } else {//部分选中
        this.cartList.forEach(item => item.checked = true)
      }
    },
    buyToast () {
      this.$toast.show('请选择购买的商品')
    }
  },
}

</script>
   
<style scoped>
#button-bar {
  display: flex;
  position: relative;
  height: 40px;
  background-color: #eee;
  align-items: center;
  font-size: 14px;
  /* width: 60px; */
  /* line-height: 20px; */
}
.check-content {
  display: flex;
  margin-left: 10px;
  line-height: 40px;
}
.check-button {
  width: 20px;
  height: 20px;
  margin-top: 10px;
  margin-right: 5px;
  line-height: 20px;
}
.price {
  margin-left: 20px;
  flex: 1;
}
.buy {
  height: 40px;
  width: 90px;
  line-height: 40px;
  background-color: red;
  color: #fff;
  text-align: center;
}
</style>