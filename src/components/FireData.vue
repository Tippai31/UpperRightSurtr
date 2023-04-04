<template>
  <div class="field">
    <div class="titleh1">
      <h1>Upper right Surtr.</h1>
      <div class="secret" @click="showSurtr" :class="[showvideo ? 'eventoff' : 'eventon']">
      </div>
      <div class="video" v-show="showvideo">
        <video class="suruto" autoplay muted width="150px" height="150px">
          <source src="" type="video/webm">
        </video>
        <canvas class="surutocav" width="150px" height="150px"></canvas>
      </div>
    </div>
    <div class="calc">
      <Transition name="scale">
        <Tips v-if="tipsShow" @closeing="tipscloseing" :tipsTitle="title" :tipsContents="contents"></Tips>
      </Transition>
      <div class="sanity" @click="mobileSwitch" :class="[switchingto ? 'off' : 'on']">
        <img src="/logo/sanity.png">
      </div>
      <TransitionGroup name="slide">
        <div class="main" v-show="((deviceWidth < 481 && switchingto == true) || deviceWidth > 480)" key="main">
          <ul class="status-list">
            <li>
              <div class="name">
                <p>{{ status.name }}</p>
              </div>
            </li>
            <li>
              <div class="title">
                <p>職業</p>
              </div>
              <div class="bold">
                <p>{{ status.class }}</p>
              </div>
            </li>
            <li>
              <div class="title">
                <p>HP</p>
              </div>
              <div>
                <p>{{ status.hp }}<span v-if="(potentialSwitch || trustSwitch || moduleSwitch != 'N') && addHp > 0">+{{
                  addHp }}</span></p>
              </div>
            </li>
            <li>
              <div class="title">
                <p>攻撃力</p>
              </div>
              <div>
                <Transition name="rotate" mode="out-in">
                  <p v-if="autoAny">{{ status.atk }}<span
                      v-if="(potentialSwitch || trustSwitch || moduleSwitch != 'N') && addAtk > 0">+{{
                        addAtk }}</span></p>
                  <div class="any" v-else>
                    <input type="text" v-model.number="anyatk" @focus="$event.target.select()">
                    <span v-if="(potentialSwitch || trustSwitch || moduleSwitch != 'N') && addAtk > 0">+{{
                      addAtk }}</span>
                  </div>
                </Transition>
              </div>
            </li>
            <li>
              <div class="title">
                <p>防御力</p>
              </div>
              <div>
                <p>{{ status.def }}<span v-if="(potentialSwitch || trustSwitch || moduleSwitch != 'N') && addDef > 0">+{{
                  addDef }}</span></p>
              </div>
            </li>
            <li>
              <div class="title">
                <p>術耐性</p>
              </div>
              <div>
                <p>{{ status.res }}<span v-if="(potentialSwitch || trustSwitch || moduleSwitch != 'N') && addRes > 0">+{{
                  addRes }}</span></p>
              </div>
            </li>
            <li>
              <div class="title">
                <p>攻速</p>
              </div>
              <div>
                <p>{{ status.interval }}</p>
              </div>
            </li>
            <li>
              <div class="title">
                <p>ブロック</p>
              </div>
              <div>
                <p>{{ status.block }}</p>
              </div>
            </li>
          </ul>

          <div class="switch-field">
            <ul class="status-switch">
              <li>
                <label :class="[trustSwitch ? 'on' : 'off']">
                  <input type="checkbox" v-model="trustSwitch">
                  <p>信頼度</p>
                </label>
              </li>
              <li>
                <label :class="[potentialSwitch ? 'on' : 'off']">
                  <input type="checkbox" v-model="potentialSwitch">
                  <p>潜在</p>
                </label>
              </li>
              <li>
                <label :class="[moduleSwitch == 'X' ? 'on' : 'off']">
                  <input type="radio" v-model="moduleSwitch" value="X">
                  <p>X</p>
                </label>
                <label :class="[moduleSwitch == 'N' ? 'on' : 'off']">
                  <input type="radio" v-model="moduleSwitch" value="N">
                  <p>N</p>
                </label>
                <label :class="[moduleSwitch == 'Y' ? 'on' : 'off']">
                  <input type="radio" v-model="moduleSwitch" value="Y">
                  <p>Y</p>
                </label>
              </li>
            </ul>
          </div>

          <ul class="buff-list">
            <li>
              <div class="title" @click="setTips('bufffixed')">
                <p>バフ(固定)</p>
              </div>
              <div>
                <input type="text" v-model.number="atkfixedbuff" @focus="$event.target.select()">
              </div>
            </li>
            <li>
              <div class="title" @click="setTips('buffaddition')">
                <p>バフ(加)</p>
              </div>
              <div>
                <input type="text" v-model.number="atkaddbuff" @focus="$event.target.select()">
              </div>
            </li>
            <li>
              <div class="title" @click="setTips('buffmulti')">
                <p>バフ(乗)</p>
              </div>
              <div>
                <input type="text" v-model.number="atkmultibuff" @focus="$event.target.select()">
              </div>
            </li>
            <li>
              <div class="title" @click="setTips('buffmulti')">
                <p>バフ(乗)</p>
              </div>
              <div>
                <input type="text" v-model.number="atkmultibuff2" @focus="$event.target.select()">
              </div>
            </li>
            <li>
              <div class="title" @click="setTips('buffscale')">
                <p>倍率</p>
              </div>
              <div>
                <input type="text" v-model.number="scale1" @focus="$event.target.select()">
              </div>
            </li>
            <li>
              <div class="title" @click="setTips('buffscale')">
                <p>倍率</p>
              </div>
              <div>
                <input type="text" v-model.number="scale2" @focus="$event.target.select()">
              </div>
            </li>
            <li>
              <div class="title" @click="setTips('buffspd')">
                <p>速度バフ</p>
              </div>
              <div>
                <input type="text" v-model.number="spdbuff" @focus="$event.target.select()">
                <span v-if="(potentialSwitch || trustSwitch || moduleSwitch != 'N') && addSpeed > 0">+{{
                  addSpeed }}</span>
              </div>
            </li>
            <li>
              <div class="title" @click="setTips('buffinterval')">
                <p>間隔＋－</p>
              </div>
              <div>
                <input type="text" v-model.number="interbalbuff" @focus="$event.target.select()">
              </div>
            </li>
            <li>
              <div class="title" @click="setTips('buffshort')">
                <p>短縮(%)</p>
              </div>
              <div>
                <input type="text" v-model.number="shortbuff" @focus="$event.target.select()">
              </div>
            </li>
            <li>
              <div class="title" @click="setTips('buffbarrage')">
                <p>連撃</p>
              </div>
              <div>
                <input type="text" v-model.number="barrage" @focus="$event.target.select()">
              </div>
            </li>
          </ul>
        </div>

        <div class="sub" v-show="((deviceWidth < 481 && switchingto == false) || deviceWidth > 480)" key="sub">

          <div class="switch-field">
            <ul>
              <li>
                <div :class="[physicsArts ? 'off' : 'on']" @click="physicsSwitch('physics')">
                  <p>物理</p>
                </div>

                <div :class="[physicsArts ? 'on' : 'off']" @click="physicsSwitch('arts')">
                  <p>術</p>
                </div>
              </li>
              <li>
                <div :class="[autoAny ? 'on' : 'off']" @click="inputSwitch('auto')">
                  <p>自動入力</p>
                </div>

                <div :class="[autoAny ? 'off' : 'on']" @click="inputSwitch('any')">
                  <p>任意入力
                  </p>
                </div>
              </li>
            </ul>
          </div>

          <ul class="status-list">
            <li>
              <div class="title">
                <p>敵のHP</p>
              </div>
              <div>
                <input type="text" v-model.number="ehp" @focus="$event.target.select()">
              </div>
            </li>
            <li>
              <div class="title">
                <p>防御力</p>
              </div>
              <div>
                <input type="text" v-model.number="edef" @focus="$event.target.select()">
              </div>
            </li>
            <li>
              <div class="title">
                <p>術耐性</p>
              </div>
              <div>
                <input type="text" v-model.number="eres" @focus="$event.target.select()">
              </div>
            </li>
            <li>
              <div class="title">
                <p>軽減(%)</p>
              </div>
              <div>
                <input type="text" v-model.number="eri" @focus="$event.target.select()">
              </div>
            </li>
            <li>
              <div class="title">
                <p>防＋－</p>
              </div>
              <div>
                <input type="text" v-model.number="defdebuff" @focus="$event.target.select()">
              </div>
            </li>
            <li>
              <div class="title">
                <p>防＋－(%)</p>
              </div>
              <div>
                <input type="text" v-model.number="defdebuff2" @focus="$event.target.select()">
              </div>
            </li>
            <li>
              <div class="title">
                <p>防無視</p>
              </div>
              <div>
                <input type="text" v-model.number="defignore" @focus="$event.target.select()">
              </div>
            </li>
            <li>
              <div class="title">
                <p>防無視(%)</p>
              </div>
              <div>
                <input type="text" v-model.number="defignore2" @focus="$event.target.select()">
              </div>
            </li>
            <li>
              <div class="title">
                <p>術＋－</p>
              </div>
              <div>
                <input type="text" v-model.number="resdebuff" @focus="$event.target.select()">
              </div>
            </li>
            <li>
              <div class="title">
                <p>術＋－(%)</p>
              </div>
              <div>
                <input type="text" v-model.number="resdebuff2" @focus="$event.target.select()">
              </div>
            </li>
            <li>
              <div class="title">
                <p>術無視</p>
              </div>
              <div>
                <input type="text" v-model.number="resignore" @focus="$event.target.select()">
              </div>
            </li>
            <li>
              <div class="title">
                <p>術無視(%)</p>
              </div>
              <div>
                <input type="text" v-model.number="resignore2" @focus="$event.target.select()">
              </div>
            </li>
          </ul>

          <ul class="result-list">
            <li>
              <div class="title">
                <p>必要な攻撃回数</p>
              </div>
              <div>
                <p>{{ atkTimes }}</p>
              </div>
            </li>
            <li>
              <div class="title">
                <p>所要時間</p>
              </div>
              <div>
                <p>{{ timeRequired }} s</p>
              </div>
            </li>
            <li>
              <div class="title">
                <p>ダメージ(1回)</p>
              </div>
              <div>
                <p>{{ damageCalc }}</p>
              </div>
            </li>
            <li>
              <div class="title">
                <p>総ダメージ</p>
              </div>
              <div>
                <p>{{ totalDamage }}</p>
              </div>
            </li>
          </ul>
        </div>
      </TransitionGroup>
      <div class="character-set" :style="{ 'background-image': 'url(' + chimg + ')' }" @click="listshowing">
      </div>
    </div>
  </div>
  <Transition name="list">
    <Charalist @select="pick" @showing="listshowing" v-show="listShow"></Charalist>
  </Transition>
</template>

<script>

import Charalist from "./CharaList.vue"
import Tips from "./TipsWindow.vue"
export default {
  name: "App",
  components: {
    Charalist,
    Tips,
  },
  data() {
    return {
      title: '',
      contents: '',
      bufffixed: {
        title: '攻撃バフ（固定値）',
        contents: '計算前の純粋な攻撃力値に足す項目。主に微調整用。'
      },
      buffaddition: {
        title: '攻撃バフ（加算）',
        contents: '攻撃力＋ｎ％ではなく、吟遊者の鼓舞のみ対象。'
      },
      buffmulti: {
        title: '攻撃バフ（乗算）',
        contents: '攻撃力＋ｎ％のこと。2項目用意してあるから適当に使え。'
      },
      buffscale: {
        title: '攻撃倍率',
        contents: '攻撃力ｎ％まで上昇～、もしくは攻撃力のｎ％の物理(術)ダメージって書き方はココ。'
      },
      buffspd: {
        title: '攻撃速度バフ',
        contents: 'スキルに攻撃速度＋ｎって書いてあったらココ。'
      },
      buffinterval: {
        title: '攻撃間隔の短縮や延長(秒)',
        contents: '攻撃の間隔を大幅に短縮～とか、攻撃間隔が延長し～とかが対象。'
      },
      buffshort: {
        title: '攻撃間隔の短縮や延長(％)',
        contents: '攻撃間隔を短縮～の割合verはココ。ここは内容の種類が多いので入力時注意が必要。※アンジェS2の表記の場合：-85%なので、そのまま-85と入力。ケオベS2の表記の場合は0.33倍(-67%)にするなので、-67と入れる。'
      },
      buffbarrage: {
        title: '1回の攻撃でｎ回のダメージ',
        contents: '剣豪の通常攻撃。水チェンのホリデーストーム(2回)、バグパイプのS3(3回)。'
      },
      listShow: false,
      tipsShow: false,
      video: "",
      canvas: "",
      canvas2d: "",
      canvasstate: 0,
      showvideo: false,
      switchingto: true,
      status: {
        name: "名前"
      },
      chimg: "",
      autoAny: true,
      physicsArts: false,
      potentialSwitch: false,
      trustSwitch: false,
      moduleSwitch: "N",
      anyatk: 0,
      atkfixedbuff: 0,
      atkaddbuff: 0,
      atkmultibuff: 0,
      atkmultibuff2: 0,
      scale1: 100,
      scale2: 100,
      spdbuff: 0,
      interbalbuff: 0,
      shortbuff: 0,
      barrage: 1,
      ehp: 0,
      edef: 0,
      eres: 0,
      eri: 0,
      defdebuff: 0,
      defdebuff2: 0,
      defignore: 0,
      defignore2: 0,
      resdebuff: 0,
      resdebuff2: 0,
      resignore: 0,
      resignore2: 0
    };
  },
  created: function () {
    this.chimg = "/chsd/noimg.png"
  },
  mounted: function () {
    this.video = document.querySelector('.suruto')
    this.video.addEventListener('timeupdate', this.onTimeUpdate, true)
    this.video.addEventListener('ended', this.Laevatein, true)
    this.canvas = document.querySelector('.surutocav')
    this.canvas.getContext("2d").drawImage(this.video, -30, -40, 150, 150);
  },
  methods: {
    pick(selected) {
      if (selected) {
        this.status = selected
        this.chimg = "/chsd/" + this.status.name + ".png"
      } else {
        this.chimg = "/chsd/noimg.png"
      }
    },
    onTimeUpdate() {
      setInterval(() => {
        if (this.video) {
          this.canvas.width = 150
          this.canvas.height = 150
          this.canvas.getContext("2d").drawImage(this.video, -30, -40, 150, 150);
        }
      }, 1000 / 30);
    },
    showSurtr() {
      this.showvideo = true
      this.video.src = '/chbg/スルトstart.webm';
    },
    Laevatein() {
      switch (this.canvasstate) {
        case 0:
          this.video.loop = true
          this.video.src = '/chbg/スルトidle.webm';
          this.canvas.addEventListener('click', this.Laevatein, true)
          this.canvasstate = 1
          break;
        case 1:
          this.canvas.removeEventListener('click', this.Laevatein, true)
          this.video.loop = false
          this.video.src = '/chbg/スルトs3start.webm';
          this.canvasstate = 2
          break;
        case 2:
          this.video.loop = true
          this.video.src = '/chbg/スルトs3loop.webm';
          setTimeout(() => {
            this.$data.video.loop = false
            this.canvasstate = 3
          }, 8000);
          break;
        case 3:
          this.video.loop = false
          this.video.src = '/chbg/スルトdie.webm';
          this.canvasstate = 4
          break;
        case 4:
          this.showvideo = false
          this.canvasstate = 0
          this.video.src = ""
          break;
      }
    },
    listshowing() {
      if (this.listShow) {
        this.listShow = false
      } else {
        this.listShow = true
      }
    },
    tipscloseing() {
      this.tipsShow = false
    },
    physicsSwitch(which) {
      if (which == "physics") {
        this.physicsArts = false
      } if (which == "arts") {
        this.physicsArts = true
      }
    },
    inputSwitch(which) {
      if (which == "auto") {
        this.autoAny = true
      } if (which == "any") {
        this.autoAny = false
      }
    },
    mobileSwitch() {
      if (this.switchingto) {
        this.switchingto = false
      } else {
        this.switchingto = true
      }
    },
    setTips(set) {
      this.title = this[set].title
      this.contents = this[set].contents
      this.tipsShow = true
    }
  },
  computed: {
    deviceWidth() {
      console.log(window.innerWidth)
      return window.innerWidth
    },
    damageCalc() {
      let x = 0;
      let atk = 0;
      let calculatedatk = 0;
      let result = 0;
      if (this.status.atk != undefined || this.autoAny == false) {
        if (this.autoAny == false) {
          atk = this.anyatk + this.addAtk
        } else {
          atk = this.status.atk + this.addAtk
        }
        x = atk + this.atkfixedbuff + this.atkaddbuff
        calculatedatk = (x * (1 + this.atkmultibuff / 100 + this.atkmultibuff2 / 100)) * (this.scale1 / 100) * (this.scale2 / 100)
        if (this.physicsArts == false) {
          let finaldef = (((this.edef + this.defdebuff) * (1 + this.defdebuff2 / 100)) - this.defignore) * (1 - this.defignore2 / 100)
          if (finaldef < 0) {
            finaldef = 0
          }
          result = ((calculatedatk - finaldef) * (1 - this.eri / 100))
        } else {
          let finalres = (((this.eres + this.resdebuff) * (1 + this.resdebuff2 / 100)) - this.resignore) * (1 - this.resignore2 / 100)
          if (finalres < 0) {
            finalres = 0
          } else if (finalres > 100) {
            finalres = 100
          }
          result = ((calculatedatk * (100 - finalres) / 100))
        }
        if (result > 0) {
          return Math.round(result)
        }
        else {
          return Math.round(atk * 0.05)
        }
      } else {
        return 0
      }

    },
    atkSpeed() {
      let speed = (this.status.interval + this.interbalbuff) * (1 + this.shortbuff / 100) * 100 / (100 + (this.spdbuff + this.addSpeed))
      speed = Math.round(speed * 30) / 30 * 1000
      return Math.round(speed) / 1000
    },
    atkTimes() {
      if (this.damageCalc > 0) {
        return Math.ceil(this.ehp / this.damageCalc / this.barrage)
      } else {
        return 0
      }
    },
    timeRequired() {
      if (this.status.interval) {
        let x = Math.round(this.atkSpeed * this.atkTimes * 10)
        if (this.damageCalc) {
          return x / 10
        } else {
          return 0
        }
      } else {
        return 0
      }
    },
    totalDamage() {
      if (this.damageCalc && this.atkTimes > 0) {
        return this.damageCalc * this.atkTimes * this.barrage
      } else if (this.atkTimes == 0) {
        return this.damageCalc
      } else {
        return 0
      }
    },
    addHp() {
      let addtotal = 0
      if (this.potentialSwitch && this.status.hp) {
        addtotal = addtotal + this.status.potential[0]
      }
      if (this.trustSwitch && this.status.hp) {
        addtotal = addtotal + this.status.trust[0]
      }
      if (this.moduleSwitch == 'X' && this.status.hp) {
        addtotal = addtotal + this.status.moduleX[0]
      }
      if (this.moduleSwitch == 'Y' && this.status.hp) {
        addtotal = addtotal + this.status.moduleY[0]
      }
      return addtotal
    },
    addAtk() {
      let addtotal = 0
      if (this.potentialSwitch && this.status.atk) {
        addtotal = addtotal + this.status.potential[1]
      }
      if (this.trustSwitch && this.status.atk) {
        addtotal = addtotal + this.status.trust[1]
      }
      if (this.moduleSwitch == 'X' && this.status.atk) {
        addtotal = addtotal + this.status.moduleX[1]
      }
      if (this.moduleSwitch == 'Y' && this.status.atk) {
        addtotal = addtotal + this.status.moduleY[1]
      }
      return addtotal
    },
    addDef() {
      let addtotal = 0
      if (this.potentialSwitch && this.status.def) {
        addtotal = addtotal + this.status.potential[2]
      }
      if (this.trustSwitch && this.status.def) {
        addtotal = addtotal + this.status.trust[2]
      }
      if (this.moduleSwitch == 'X' && this.status.def) {
        addtotal = addtotal + this.status.moduleX[2]
      }
      if (this.moduleSwitch == 'Y' && this.status.def) {
        addtotal = addtotal + this.status.moduleY[2]
      }
      return addtotal
    },
    addRes() {
      let addtotal = 0
      if (this.potentialSwitch && this.status.res) {
        addtotal = addtotal + this.status.potential[3]
      }
      if (this.trustSwitch && this.status.res) {
        addtotal = addtotal + this.status.trust[3]
      }
      if (this.moduleSwitch == 'X' && this.status.res) {
        addtotal = addtotal + this.status.moduleX[3]
      }
      if (this.moduleSwitch == 'Y' && this.status.res) {
        addtotal = addtotal + this.status.moduleY[3]
      }
      return addtotal
    },
    addSpeed() {
      let addtotal = 0
      if (this.potentialSwitch && this.status.interval) {
        addtotal = addtotal + this.status.potential[4]
      }
      if (this.trustSwitch && this.status.interval) {
        addtotal = addtotal + this.status.trust[4]
      }
      if (this.moduleSwitch == 'X' && this.status.interval) {
        addtotal = addtotal + this.status.moduleX[4]
      }
      if (this.moduleSwitch == 'Y' && this.status.interval) {
        addtotal = addtotal + this.status.moduleY[4]
      }
      return addtotal
    },
  },
  watch: {

  },
};
</script>

<style scoped>
.field {
  max-width: 900px;
  margin: 0 auto;
}

.titleh1 {
  position: relative;
  width: 100%;
  font-family: "timeline";
  padding-top: 20px;
  font-size: 2em;
}

.bold {
  font-size: 14px;
  font-weight: bold;
}

.secret {
  position: absolute;
  content: "";
  top: 0;
  width: 10%;
  height: 100%;
  right: 0;
}

.video {
  position: absolute;
  top: 0;
  left: calc(100% - 30px);
  transition: 0.2s;
}

.video video {
  position: absolute;
  visibility: hidden;
  opacity: 0;
}

.sanity {
  display: none;
  align-items: center;
  justify-content: center;
  position: fixed;
  z-index: 998;
  background-color: rgba(44, 51, 51, 0.8);
  border-radius: 50%;
  width: 80px;
  height: 80px;
  bottom: 10px;
  right: 12px;
}

.sanity img {
  width: 90%;
  border-radius: 50%;
}

.calc {
  position: relative;
  font-family: "logotype";
  margin-top: 15px;
  display: flex;
  padding: 10px;
  width: 100%;
  flex-direction: row;
  align-items: stretch;
  justify-content: space-between;
  background-image: url("../../public/logo/logo_rhodes.png");
  background-repeat: no-repeat;
  background-size: contain;
  z-index: 2;
  background-position: 50% 50%;
}


.main,
.sub {
  z-index: 5;
  width: 40%;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.character-set {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 50%;
  height: 75%;
  transform: translate(-50%, -50%);
  z-index: 3;
  cursor: pointer;
  filter: drop-shadow(-2px -2px 0 #ffd900) drop-shadow(2px 2px 0 #ef9950);
  background-position: 50% 50%;
  background-repeat: no-repeat;
  background-size: contain;
  overflow: visible;
}


.main ul {
  padding: 2px;
}

.sub ul {
  padding: 2px 0 5px 0;
}

.sub {
  align-items: end;
}

.switch-field {
  width: 100%;
}

.switch-field ul {
  display: flex;
  align-items: stretch;
}

.switch-field ul li {
  height: 1.5rem;
  font-size: 14px;
  margin: 8px 8px 0px 8px;
  width: 30%;
  display: flex;
  align-items: stretch;
  background-color: #2C3333;
  box-shadow: 1px 1px 2px #2C3333;
}

.sub .switch-field ul li:nth-of-type(2) {
  width: calc(70% - 16px);
}

.switch-field ul li div {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 50%;
  transition: 0.2s linear;
}

.switch-field ul.status-switch li input[type=checkbox],
.switch-field ul.status-switch li input[type=radio] {
  display: none;
}

.switch-field ul.status-switch li label {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  color: #F6F1F1;
}

.status-list,
.buff-list {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
}

input {
  text-align: center;
  background-color: #F6F1F1;
}

.title {
  text-align: center;
}

.buff-list {
  margin-top: 10px;
}

.status-list li,
.buff-list li {
  background-color: #F6F1F1;
  margin: 8px;
  width: calc(50% - 16px);
  display: flex;
  justify-content: center;
  align-items: stretch;
  box-shadow: 1px 1px 2px #2C3333;
}

.status-list li div,
.buff-list li div {
  position: relative;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.status-list li div {
  position: relative;
}

.status-list li div.any {
  display: flex;
  align-items: stretch;
  justify-content: center;
  height: 1.5rem;
}

.status-list li div.any span,
.buff-list li div span {
  position: absolute;
  top: 0;
  right: 4px;
  height: 1.5rem;
  color: #9D2503;
  pointer-events: none;
}

.status-list li div span {
  color: #9D2503;
}

.status-list .name {
  padding: 0 1px 0 1px;
}

.status-list .name p {
  white-space: nowrap;
}

.status-list li div p,
li div input {
  width: 100%;
}

li div input {
  border: none;
}

.status-list li>div:first-of-type,
.buff-list li>div:first-of-type,
.result-list li>div:first-of-type {
  font-size: 14px;
  height: 1.5rem;
  color: #F6F1F1;
  background-color: #2C3333;
  user-select: none;
}

.status-list li div:last-of-type,
.buff-list li div:last-of-type,
.result-list li div:last-of-type {
  font-family: "molot", "logotype";
  height: 1.5rem;
}

.result-list {
  user-select: none;
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  align-items: stretch;
  justify-content: space-between;
}

.result-list li {
  margin: 8px 8px 0 8px;
  background-color: #F6F1F1;
  width: calc(50% - 16px);
  box-shadow: 1px 1px 2px #2C3333;
}

.result-list li div:first-of-type {
  background-color: #9D2503;
}

.on {
  color: #F6F1F1;
  background-color: #9D2503 !important;
}

.off {
  color: #F6F1F1;
  background-color: #2C3333 !important;
}

.eventon {
  pointer-events: all;
}

.eventoff {
  pointer-events: none;
}

.list-enter-active {
  transition: 0.4s ease-in-out;
}

.list-leave-active {
  transition: 0.4s ease-in-out;
}

.list-enter-from,
.list-leave-to {
  transform: translateY(-100vh);
  opacity: 0;
}

.rotate-enter-active {
  transition: 0.2s ease-in-out;
}

.rotate-leave-active {
  transition: 0.2s ease-in-out;
}

.rotate-enter-from,
.rotate-leave-to {
  transform: rotateX(90deg);
  background-color: #9D2503;
}

.scale-enter-active {
  transition: 0.3s ease-in-out;
}

.scale-leave-active {
  transition: 0.3s ease-in-out;
}

.scale-enter-from,
.scale-leave-to {
  opacity: 0;
}

.slide-move,
.slide-enter-active,
.slide-leave-active {
  transition: 0.3s ease-in-out;
}

.slide-enter-from,
.slide-leave-to {
  opacity: 0;
  transform: translateY(150px);
}

.slide-leave-active {
  position: absolute;
}


@media (width < 480px) {
  .field {
    width: 100%;
  }

  .titleh1 {
    font-size: 20px;
  }

  .secret {
    width: 15%;
  }

  .video {
    position: absolute;
    top: 15px;
    left: calc(100% - 120px);
    transition: 0.2s;
  }

  .secret {
    position: fixed
  }

  .calc {
    margin-top: 5px;
    display: flex;
    flex-direction: column;
    padding: 0;
  }

  .sanity {
    display: flex;
  }

  .main,
  .sub {
    width: 100%;
    height: 500px;
    display: flex;
    flex-direction: column;
    justify-content: start;
  }

  .character-set {
  position: fixed;
  top: auto;
  bottom: -10px;
  left: 0;
  width: 130px;
  height: 130px;
  transform: none;
  z-index: 6;
}
}
</style>