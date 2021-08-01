<template>
  <div id="Toast" v-show="isshow">
    <div>{{message}}</div>
  </div>
</template>

<script>
export default {
  name: 'Toast',
  props: {
  },
  data () {
    return {
      message: '',
      isshow: false
    }
  },
  methods: {
    show (message = '默认提示信息', duration = 2000) {
      this.isshow = true
      this.message = message

      setTimeout(() => {
        this.isshow = false
        this.message = ''
      }, duration);
    }
  },
}

</script>
<style scoped>
#Toast {
  position: fixed;
  top: 50%;
  left: 50%;
  padding: 8px 10px;
  transform: translate(-50%, -50%);
  background-color: rgba(0, 0, 0, 0.7);
  color: #fff;
  z-index: 999;
}
</style>