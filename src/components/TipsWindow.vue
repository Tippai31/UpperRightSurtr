<template>
  <div class="messagebox">
    <div class="title">
      <p>{{ tipsTitle }}</p>
      <div class="close" @click="close"></div>
    </div>
    <div class="contents">
      <p>{{ tipsContents }}</p>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    "tipsTitle": {
      type: String,
      default: ''
    },
    "tipsContents": {
      type: String,
      default: ''
    }
  },
  data() {
    return {
    }
  },
  methods: {
    close() {
      this.$emit('closeing', '')
    }
  }
}
</script>

<style scoped>
.messagebox {
  z-index: 55;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 300px;
  margin: 0 auto;
  background-color: #F6F1F1;
  box-shadow: 1px 1px 2px #2C3333;
  color: #F6F1F1;
  font-family: "logotype";
}

.messagebox .title {
  text-align: center;
  position: relative;
  padding: 4px 0 4px 0;
  height: 2rem;
  background-color: #9D2503;

}

.messagebox .contents {
  text-align: left;
  color: #2C3333;
  padding: 10px;
  min-height: 2rem;
}

.close {
  cursor: pointer;
  display: block;
  position: absolute;
  top: 4px;
  right: 4px;
  width: 24px;
  height: 24px;
}

.close::before,
.close::after {
  /* 共通設定 */
  content: "";
  position: absolute;
  top: 50%;
  left: 50%;
  width: 5px;
  /* 棒の幅（太さ） */
  height: 1.5rem;
  /* 棒の高さ */
  background: #F6F1F1;
}

.close::before {
  transform: translate(-50%, -50%) rotate(45deg);
}

.close::after {
  transform: translate(-50%, -50%) rotate(-45deg);
}
</style>