<template>
  <div class="wrapper">
    <div class="tutorialbox">
      <div class="title">
        <p>{{ tutorialTitle }}</p>
        <div class="close" @click="close"></div>
      </div>
      <div class="contents">
        <p>{{ tutorialContents }}</p>
        <div class="contents-image">
          <img :src="tutorialImg">
          <img :src="tutorialImg2">
        </div>
        <div class="button">
          <div class="prev" @click="prev(currentPosition)"><img src="tutorial/left_anchor.png"></div>
          <div class="next" @click="next(currentPosition)"><img src="tutorial/right_anchor.png"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tutorialTitle: 'ちゅーとりある',
      tutorialContents: 'シルエットになってるキャラの部分を押せばキャラクター一覧が開く。\n左上の【職業】でフィルターがかけられる。\nスマホだと左下にいる。',
      tutorialImg: 'tutorial/tutorial01.jpg',
      tutorialImg2: 'tutorial/tutorial02.jpg',
      currentPosition: 0
    }
  },
  methods: {
    prev(now) {
      console.log(this.currentPosition)
      if (this.currentPosition <= 0) {
        this.currentPosition = now
      } else {
        this.currentPosition -= 1
      }
    },
    next(now) {
      console.log(this.currentPosition)
      if (this.currentPosition >= 4) {
        this.currentPosition = now
      } else {
        this.currentPosition += 1
      }
    },
    close() {
      this.$emit('closeTutorial', '')
    }
  },
  watch: {
    currentPosition() {
      switch (this.currentPosition) {
        case 0:
          this.tutorialTitle = 'ちゅーとりある'
          this.tutorialContents = 'シルエットになってるキャラの部分を押せばキャラクター一覧が開く。\n左上の【職業】でフィルターがかけられる。\nスマホだと左下にいる。'
          this.tutorialImg = 'tutorial/tutorial01.jpg'
          this.tutorialImg2 = 'tutorial/tutorial02.jpg'
          break;
        case 1:
          this.tutorialTitle = 'ちゅーとりある２'
          this.tutorialContents = 'キャラクターを選択するとステータス(LvMaX時)が表示される。攻撃力の値はデフォルトは自動で入力されるが【手動】に切り替えも可能。\nスマホは右下のボタンで表示切り替えが出来る。'
          this.tutorialImg = 'tutorial/tutorial03.jpg'
          this.tutorialImg2 = 'tutorial/tutorial04.jpg'
          break;
        case 2:
          this.tutorialTitle = 'ちゅーとりある３'
          this.tutorialContents = '信頼度や潜在のところを押すとその分のステータスが加算される。所要時間については30フレームで丸めたりしてるので多少ズレてると思われる。\nガバ画質は気にするな。'
          this.tutorialImg = 'tutorial/tutorial05.jpg'
          this.tutorialImg2 = 'tutorial/tutorial06.jpg'
          break;
        case 3:
          this.tutorialTitle = 'ちゅーとりある４'
          this.tutorialContents = '当然だけど入力項目多いからPC表示推奨です。一応スマホ表示も適当に対応したけど。\nニコハゲへ。\n許可貰わず絵を使ってるのでダメだったら消します。絵柄すこすこ。'
          this.tutorialImg = 'tutorial/tutorial07.jpg'
          this.tutorialImg2 = 'tutorial/tutorial08.jpg'
          break;
      }
    }
  }
}
</script>

<style scoped>
.wrapper {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 54;
  width: 100vw;
  height: 100vh;
  background-color: rgba(44, 51, 51, 0.5);
}

.tutorialbox {
  z-index: 55;
  font-family: "logotype";
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 500px;
  margin: 0 auto;
  background-color: #F6F1F1;
  box-shadow: 1px 1px 2px #2C3333;
  color: #2C3333;
  border-width: 0 4px 4px 4px;
  border-style: solid;
  border-color: #9D2503;
}

.tutorialbox .title {
  text-align: center;
  position: relative;
  color: #F6F1F1;
  background-color: #9D2503;
  border-width: 4px 0 4px 0;
  border-style: solid;
  border-color: #9D2503;
}

.tutorialbox .contents {
  position: relative;
  font-size: 14px;
  padding: 5px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.tutorialbox .contents p {
  white-space: pre-line;
  text-align: left;
  height: 84px;
  margin: 0 10px 0 0;
}

.tutorialbox .contents img {
  width: 45%;
  object-fit: cover;
}

.tutorialbox .contents .contents-image {
  margin-top: 10px;
  display: flex;
  align-items: stretch;
  justify-content: space-evenly;
  height: 230px;
}

.button {
  position: absolute;
  bottom: 0;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  z-index: 56;
}

.button .prev,
.button .next {
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 50px;
  height: 50px;
  filter: drop-shadow(2px 2px 0 #2C3333);
}

.tutorialbox .contents .button div>img {
  width: 100%;
}

.close {
  cursor: pointer;
  display: block;
  position: absolute;
  top: 4px;
  right: 4px;
  width: 16px;
  height: 16px;
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

@media screen and (max-width: 480px) {
  .tutorialbox {
    width: 330px;
  }

  .tutorialbox .contents {
    font-size: 12px;
  }

  .tutorialbox .contents p {
    height: 72px;
  }
}
</style>