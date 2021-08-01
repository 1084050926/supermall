<template>
  <div id="check-button" :class="{checked:isChecked}">
    <img src="~assets/img/cart/tick.svg" alt />
  </div>
</template>

<script>
export default {
  name: 'CheckButton',
  props: {
    isChecked: {
      type: Boolean,
      default () {
        return false
      }
    }
  },
  data () {
    return {

    }
  },
}

</script>
<style scoped>
#check-button {
  border-radius: 50%;
  border: 2px solid #c0c0c0;
}
.checked {
  border-color: red;
  background-color: red;
}
</style>