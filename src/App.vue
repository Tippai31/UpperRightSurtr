<template>
  <Transition name="fadeout">
    <div v-if="show" class="loading">
      <img src="loading.webp">
    </div>
  </Transition>
  <Transition name="fadeout">
    <div class="wrapper" v-if="firstvisit">
      <div class="welcome">
        <div class="title">
          <p>ようこそ、ハg...ドクター。</p>
        </div>
        <div class="contents">
          <div class="contents-text">
            <p>初めてのドクターに適当なチュートリアルが用意してあるよ！</p>
          </div>
          <div class="button">
            <div class="iru" @click="ikuiku()"><img src="tutorial/ikuiku.webp"></div>
            <div class="iranai" @click="ikanai()"><img src="tutorial/gomenne.webp"></div>
          </div>
        </div>
      </div>
    </div>
  </Transition>

  <Firestore />
  <Transition name="fadeout">
    <Tutorial v-if="tutorial" @closeTutorial="close"></Tutorial>
  </Transition>
</template>

<script>
import Firestore from "./components/FireData.vue"
import Tutorial from "./components/TutorialWindow.vue"
import "./assets/style/reset.css"

export default {
  name: "App",
  components: {
    Firestore,
    Tutorial,
  },
  data() {
    return {
      show: true,
      tutorial: false,
      firstvisit: false,
    }
  },
  mounted() {
    window.onload = () => {
      this.show = false
    }
    if (this.$cookies.isKey('visit')) {
      let visitCount = this.$cookies.get('visit')
      if (visitCount > 0) {
        this.firstvisit = false
      }
      visitCount = parseInt(visitCount) + 1
      this.$cookies.set('visit', visitCount, 60 * 60 * 24 * 7)
    } else {
      this.firstvisit = true
      this.$cookies.set('visit', 0, 60 * 60 * 24 * 7)
    }
  },
  methods: {
    ikuiku() {
      this.tutorial = true
      this.firstvisit = false
    },
    ikanai() {
      this.firstvisit = false
      this.tutorial = false
    },
    close() {
      this.tutorial = false
    }
  }
}
</script>

<style>
#app {
  user-select: none;
  margin: 0 auto;
  font-family: "Helvetica Neue",
    Arial,
    "Hiragino Kaku Gothic ProN",
    "Hiragino Sans",
    Meiryo,
    sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2C3333;
}

.wrapper {
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 54;
  background-color: rgba(44, 51, 51, 0.5);
}

.welcome {
  z-index: 55;
  font-family: "logotype";
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 50%;
  max-width: 600px;
  margin: 0 auto;
  background-color: #fff;
  box-shadow: 1px 1px 2px #2C3333;
  color: #2C3333;
  border-width: 0 4px 4px 4px;
  border-style: solid;
  border-color: #9D2503;
}

.welcome .title {
  text-align: center;
  position: relative;
  color: #F6F1F1;
  background-color: #9D2503;
  border-width: 4px 0 4px 0;
  border-style: solid;
  border-color: #9D2503;
}

.welcome .contents {
  position: relative;
  font-size: 14px;
  padding: 5px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.button {
  display: flex;
  align-items: center;
  justify-content: space-evenly;
}

.button .iru,
.button .iranai {
  cursor: pointer;
  width: 40%;
}

.loading {
  pointer-events: none;
  user-select: none;
  font-family: "timeline";
  font-size: 4rem;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  width: 100vw;
  height: 100vh;
  background-color: #fff;
  z-index: 999999;
}

.loading img {
  height: 100%;
}

.fadeout-enter-active {
  transition: 0.3s ease-in-out;
}

.fadeout-leave-active {
  transition: 0.3s ease-in-out;
}

.fadeout-enter-from,
.fadeout-leave-to {
  opacity: 0;
}

@media screen and (max-width: 480px) {
  .loading {
    font-size: 3rem;
    flex-direction: column;
  }

  .loading video:first-of-type {
    margin-bottom: 10px;
  }

  .loading video:last-of-type {
    margin-top: 10px;
  }

  .welcome {
    width: 95%;
  }
}

@font-face {
  font-family: 'logotype';
  src: url("@/assets/font/logotype.woff2");
}

@font-face {
  font-family: 'timeline';
  src: url("@/assets/font/Timeline.ttf");
}

@font-face {
  font-family: 'mono';
  src: url("@/assets/font/MONOFONT.TTF");
}
</style>