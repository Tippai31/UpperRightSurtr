<template>
  <Firestore />
</template>

<script>
import Firestore from "./components/FireData.vue"
import "./assets/style/reset.css"

export default {
  name: "App",
  components: {
    Firestore,
  },
  mounted() {
    /*window.onload = () => {
      alert('ページが読み込まれました！')
    }*/
  }
}
</script>

<style>
#app {
  user-select: none;
  margin: 0 auto;
  font-family: Avenir, Helvetica, "Yu Gothic", Arial, sans-serif, ;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2C3333;
}

@font-face {
  font-family: 'logotype';
  src: url("@/assets/font/logotype.otf");
}

@font-face {
  font-family: 'timeline';
  src: url("@/assets/font/Timeline.ttf");
}

@font-face {
  font-family: 'molot';
  src: url("@/assets/font/Molot.otf");
}

@font-face {
  font-family: 'mono';
  src: url("@/assets/font/MONOFONT.TTF");
}
</style>