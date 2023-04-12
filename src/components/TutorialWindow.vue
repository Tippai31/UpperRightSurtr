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
        </div>
        <div class="button">
          <div class="prev" @click="prev(currentPosition)"><img src="tutorial/left_anchor.webp"></div>
          <div class="next" @click="next(currentPosition)"><img src="tutorial/right_anchor.webp"></div>
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
      tutorialContents: 'シルエットになってるキャラの部分を押せばキャラクター一覧が開く。',
      tutorialImg: 'tutorial/tutorial01.jpg',
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
          this.tutorialContents = 'シルエットになってるキャラの部分を押せばキャラクター一覧が開く。'
          this.tutorialImg = 'tutorial/tutorial01.webp'
          break;
        case 1:
          this.tutorialTitle = 'ちゅーとりある２'
          this.tutorialContents = 'キャラクターor敵選択画面。【職業】または【フィルター】でフィルターが掛けられる。\n頑張って見つけろ。'
          this.tutorialImg = 'tutorial/tutorial02.webp'
          break;
        case 2:
          this.tutorialTitle = 'ちゅーとりある３'
          this.tutorialContents = 'バフ欄は項目タッチで簡単な説明が出る。所要時間（敵を倒すのにかかる時間）は、30フレームで丸めたり四捨五入のせいで多少ズレてる。（短い方にはズレない）\n【デバフ入力欄】は見れば分かる通り押せば入力欄が出てくる。\nダメージ（1回）は攻撃モーション1回に与えるダメージ。'
          this.tutorialImg = 'tutorial/tutorial03.webp'
          break;
        case 3:
          this.tutorialTitle = 'ちゅーとりある４'
          this.tutorialContents = 'スズシコ！！！！！！！！！！！！！！！！！\nミュルジスじゅるじゅる！！！！！！！！！！\nスワイヤーの水着早く実装しろ！！！！！\n下の画像はなんの関係もございません。※ちゅーとりあるおしり'
          this.tutorialImg = 'tutorial/tutorial07.webp'
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
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 50%;
  max-width: 600px;
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
  width: 95%;
  margin: 0 5px 0 5px;
}

.tutorialbox .contents img {
  object-fit: contain;
}

.tutorialbox .contents .contents-image {
  margin-top: 10px;
  display: flex;
  align-items: stretch;
  justify-content: space-evenly;
  height: 50%;
  max-height: 400px;
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
    width: 95%;
  }

  .tutorialbox .contents {
    font-size: 12px;
  }

}
</style>