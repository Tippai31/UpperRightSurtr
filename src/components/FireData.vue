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
    <div class="vs-wrap">
      <div class="vs-field">
        <div class="ally" @click="listshowing">
          <img :src="chimg" alt="キャラクター画像">
        </div>
        <div class="enemy" @click="enemylistshowing">
          <img :src="enemyimg" alt="敵の画像">
        </div>
      </div>
    </div>
    <div class="calc">
      <Transition name="scale">
        <Tips v-show="tipsShow" @closeing="tipscloseing" :tipsTitle="title" :tipsContents="contents"></Tips>
      </Transition>
      <div class="sanity" @click="mobileSwitch" :class="[switchingto ? 'off' : 'on', switchingto ? '' : 'rotate']">
        <img src="../../public/logo/sanity.webp">
      </div>
      <TransitionGroup name="slide">
        <div class="main" v-show="(switchingto == true || deviceWidth > 480)" key="main">
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
                <p>バフ(調整)</p>
              </div>
              <div>
                <input type="text" v-model.number="atkfixedbuff" @focus="$event.target.select()">
              </div>
            </li>
            <li>
              <div class="title" @click="setTips('buffaddition')">
                <p>鼓舞</p>
              </div>
              <div>
                <input type="text" v-model.number="atkaddbuff" @focus="$event.target.select()">
              </div>
            </li>
            <li>
              <div class="title" @click="setTips('buffmulti')">
                <p>バフ(加)</p>
              </div>
              <div>
                <input type="text" v-model.number="atkmultibuff" @focus="$event.target.select()">
              </div>
            </li>
            <li>
              <div class="title" @click="setTips('buffmulti')">
                <p>バフ(加)</p>
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
        <div class="sub" v-show="(switchingto == false || deviceWidth > 480)" key="sub">
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
                  <p>自動</p>
                </div>

                <div :class="[autoAny ? 'off' : 'on']" @click="inputSwitch('any')">
                  <p>手動
                  </p>
                </div>
              </li>
              <li>
                <div :class="[enemyautoAny ? 'on' : 'off']" @click="inputEnemySwitch('auto')">
                  <p>敵自動</p>
                </div>

                <div :class="[enemyautoAny ? 'off' : 'on']" @click="inputEnemySwitch('any')">
                  <p>敵手動
                  </p>
                </div>
              </li>
            </ul>
          </div>
          <div class="enemy-status-list">
            <li>
              <div class="title">
                <p>敵のHP</p>
              </div>
              <div>
                <Transition name="rotate" mode="out-in">
                  <p v-if="enemyautoAny">{{ enemystatus.hp }}</p>
                  <div class="any" v-else>
                    <input type="text" v-model.number="ehp" @focus="$event.target.select()">
                  </div>
                </Transition>
              </div>
            </li>
            <li>
              <div class="title">
                <p>防御力</p>
              </div>
              <div>
                <Transition name="rotate" mode="out-in">
                  <p v-if="enemyautoAny">{{ enemystatus.def }}</p>
                  <div class="any" v-else>
                    <input type="text" v-model.number="edef" @focus="$event.target.select()">
                  </div>
                </Transition>
              </div>
            </li>
            <li>
              <div class="title">
                <p>術耐性</p>
              </div>
              <div>
                <Transition name="rotate" mode="out-in">
                  <p v-if="enemyautoAny">{{ enemystatus.res }}</p>
                  <div class="any" v-else>
                    <input type="text" v-model.number="eres" @focus="$event.target.select()">
                  </div>
                </Transition>
              </div>
            </li>
            <li>
              <div class="title">
                <p>エリート</p>
              </div>
              <div>
                <Transition name="rotate" mode="out-in">
                  <p v-if="enemyautoAny">{{ enemyelite }}</p>
                  <div class="any" v-else>
                    <p></p>
                  </div>
                </Transition>
              </div>
            </li>
            <li>
              <div class="title">
                <p>ボス</p>
              </div>
              <div>
                <Transition name="rotate" mode="out-in">
                  <p v-if="enemyautoAny">{{ enemyboss }}</p>
                  <div class="any" v-else>
                    <p></p>
                  </div>
                </Transition>
              </div>
            </li>
            <li>
              <div class="title">
                <p>移動／マス</p>
              </div>
              <div>
                <Transition name="rotate" mode="out-in">
                  <p v-if="enemyautoAny">{{ enemymoves }}</p>
                  <div class="any" v-else>
                    <p></p>
                  </div>
                </Transition>
              </div>
            </li>
          </div>
          <div class="debuffinput">
            <p @click="debufflistshowing">↓デバフ入力欄↓</p>
            <Transition name="debufflist">
              <ul class="status-list" v-show="debuffList">
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
            </Transition>
          </div>
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
    </div>
  </div>
  <Transition name="list">
    <Charalist @select="pick" @showing="listshowing" v-show="listShow"></Charalist>
  </Transition>
  <Transition name="list">
    <Enemylist @select="pickEnemy" @showing="enemylistshowing" v-if="enemylistShow"></Enemylist>
  </Transition>

  <!--<EnemyList></EnemyList>-->
</template>

<script>
import Enemylist from "./EnemyList.vue"
import Charalist from "./CharaList.vue"
import Tips from "./TipsWindow.vue"
export default {
  name: "App",
  components: {
    Charalist,
    Enemylist,
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
        title: '攻撃バフ（直接加算）',
        contents: '攻撃力＋ｎ％ではなく、吟遊者の鼓舞のみ対象。'
      },
      buffmulti: {
        title: '攻撃バフ（加算）',
        contents: '攻撃力＋ｎ％のこと。2項目用意してあるから適当に使え。'
      },
      buffscale: {
        title: '攻撃倍率（乗算）',
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
        contents: '一度の攻撃モーションで攻撃する回数。剣豪の通常攻撃。水チェンのホリデーストーム(2回)、バグパイプのS3(3回)。'
      },
      listShow: false,
      enemylistShow: false,
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
      enemystatus: "",
      chimg: "",
      enemyimg: "",
      debuffList: false,
      autoAny: true,
      enemyautoAny: true,
      physicsArts: false,
      potentialSwitch: false,
      trustSwitch: false,
      moduleSwitch: "N",
      anyatk: 0,
      enemyanyhp: 0,
      enemyanydef: 0,
      enemyanyres: 0,
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
    this.chimg = "chsd/noimg.webp"
    this.enemyimg = "enemy/sd/noimg.webp"
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
        this.chimg = "chsd/" + this.status.name + ".webp"
      } else {
        this.chimg = "chsd/noimg.webp"
      }
      let bg = document.querySelector('body');

      switch (this.status.name) {
        case "ウタゲ":
          bg.style.transition = "background-image 5s linear"
          bg.style.backgroundImage = "url('chbg/utage_summer.webp')"
          bg.style.backgroundSize = "contain"
          bg.style.backgroundPosition = "center 0"
          bg.style.backgroundRepeat = "no-repeat"
          break;
        case "トミミ":
          bg.style.transition = "background-image 5s linear"
          bg.style.backgroundImage = "url('chbg/gavil_normal.webp')"
          bg.style.backgroundSize = "contain"
          bg.style.backgroundPosition = "center 0"
          bg.style.backgroundRepeat = "no-repeat"
          break;
        case "Ash":
          bg.style.transition = "background-image 5s linear"
          bg.style.backgroundImage = "url('chbg/ash_neko.webp')"
          bg.style.backgroundSize = "contain"
          bg.style.backgroundPosition = "center 0"
          bg.style.backgroundRepeat = "no-repeat"
          break;
        case "スズラン":
          bg.style.transition = "background-image 5s linear"
          bg.style.backgroundImage = "url('chbg/suzuran_light.webp')"
          bg.style.backgroundSize = "contain"
          bg.style.backgroundPosition = "center 0"
          bg.style.backgroundRepeat = "no-repeat"
          break;
        case "ロックロック":
          bg.style.transition = "background-image 5s linear"
          bg.style.backgroundImage = "url('chbg/sutein.webp')"
          bg.style.backgroundSize = "contain"
          bg.style.backgroundPosition = "center 0"
          bg.style.backgroundRepeat = "no-repeat"
          break;
        default:
          bg.style.transition = "background-image 0.5s linear"
          bg.style.backgroundImage = "url('chbg/white.webp')"
          bg.style.backgroundSize = "auto"
          bg.style.backgroundRepeat = "auto"
      }
    },
    pickEnemy(selected) {
      this.enemystatus = selected
      this.enemyimg = "enemy/sd/" + this.enemystatus.name + ".webp"
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
      this.video.src = 'chbg/スルトstart.webm';
    },
    Laevatein() {
      switch (this.canvasstate) {
        case 0:
          this.video.loop = true
          this.video.src = 'chbg/スルトidle.webm';
          this.canvas.addEventListener('click', this.Laevatein, true)
          this.canvasstate = 1
          break;
        case 1:
          this.canvas.removeEventListener('click', this.Laevatein, true)
          this.video.loop = false
          this.video.src = 'chbg/スルトs3start.webm';
          this.canvasstate = 2
          break;
        case 2:
          this.video.loop = true
          this.video.src = 'chbg/スルトs3loop.webm';
          setTimeout(() => {
            this.$data.video.loop = false
            this.canvasstate = 3
          }, 8000);
          break;
        case 3:
          this.video.loop = false
          this.video.src = 'chbg/スルトdie.webm';
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
    enemylistshowing() {
      if (this.enemylistShow) {
        this.enemylistShow = false
      } else {
        this.enemylistShow = true
      }
    },
    debufflistshowing() {
      if (this.debuffList) {
        this.debuffList = false
      } else {
        this.debuffList = true
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
    inputEnemySwitch(which) {
      if (which == "auto") {
        this.enemyautoAny = true
      } if (which == "any") {
        this.enemyautoAny = false
      }
    },
    mobileSwitch() {
      if (this.deviceWidth < 481) {
        if (this.switchingto) {
          this.switchingto = false
        } else {
          this.switchingto = true
        }
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
    enemyelite() {
      if (this.enemystatus.elite) {
        return "○"
      } else {
        return "×"
      }
    },
    enemyboss() {
      if (this.enemystatus.boss) {
        return "○"
      } else {
        return "×"
      }
    },
    enemymoves() {
      if (this.enemystatus.move) {
        return (this.enemystatus.move * 0.5) + " s"
      } else {
        return ""
      }
    },
    damageCalc() {
      let x = 0;
      let atk = 0;
      let calculatedatk = 0;
      let result = 0;
      let def = 0;
      let res = 0;
      if (this.enemyautoAny == false) {
        def = this.edef
        res = this.eres
      } else if (this.enemyautoAny == true && this.enemystatus.name) {
        def = this.enemystatus.def
        res = this.enemystatus.res
      }
      if (this.status.atk != undefined || this.autoAny == false) {
        if (this.autoAny == false) {
          atk = this.anyatk + this.addAtk
        } else {
          atk = this.status.atk + this.addAtk
        }
        x = atk + this.atkfixedbuff + this.atkaddbuff
        calculatedatk = (x * (1 + this.atkmultibuff / 100 + this.atkmultibuff2 / 100)) * (this.scale1 / 100) * (this.scale2 / 100)
        console.log(this.physicsArts)
        if (this.physicsArts == false) {
          let finaldef = (((def + this.defdebuff) * (1 + this.defdebuff2 / 100)) - this.defignore) * (1 - this.defignore2 / 100)
          if (finaldef < 0) {
            finaldef = 0
          }
          result = ((calculatedatk - finaldef) * (1 - this.eri / 100))
        } else {
          let finalres = (((res + this.resdebuff) * (1 + this.resdebuff2 / 100)) - this.resignore) * (1 - this.resignore2 / 100)
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
        let enemyHP = 0
        if (this.enemyautoAny == false) {
          enemyHP = this.ehp
        } else if (this.enemyautoAny == true && this.enemystatus.name != undefined) {
          enemyHP = this.enemystatus.hp
        }
        return Math.ceil(enemyHP / this.damageCalc / this.barrage)
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
  transition: background-image 5s linear;
  background-size: cover;
  background-position: 50% 50%;
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
  transition: 0.3s;
  align-items: center;
  justify-content: center;
  position: fixed;
  z-index: 998;
  background-color: rgba(44, 51, 51, 0.8);
  border-radius: 50%;
  width: 50px;
  height: 50px;
  bottom: 5px;
  right: 5px;
  opacity: 0.6;
}

.sanity img {
  width: 90%;
  border-radius: 50%;
}

.calc {
  position: relative;
  font-family: "logotype";
  display: flex;
  padding: 10px;
  width: 100%;
  flex-direction: row;
  align-items: stretch;
  justify-content: space-between;
  background-image: url("../../public/logo/logo_rhodes.webp");
  background-repeat: no-repeat;
  z-index: 2;
  background-position: 50% 50%;
}


.main,
.sub {
  z-index: 5;
  width: 48%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  background: rgba(0, 0, 0, 0.1);
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

.vs-wrap {
  width: 100%;
  background-size: contain;
}

.vs-field {
  margin: 15px auto;
  max-width: 400px;
  position: relative;
  width: 50%;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  background-repeat: no-repeat;
  border-bottom: 20px solid #474a4d;
  z-index: 2;
}

.vs-field::before {
  content: "";
  position: absolute;
  width: calc(100% - 60px);
  height: 60px;
  bottom: 0;
  left: 0px;
  z-index: 3;
  border-bottom: 60px solid #595857;
  border-left: 60px solid rgba(44, 51, 51, 0);
}

.vs-field::after {
  content: "";
  position: absolute;
  width: 60px;
  height: 60px;
  bottom: 0;
  left: calc(100% - 60px);
  z-index: 3;
  border-left: 60px solid #595857;
  border-top: 60px solid rgba(44, 51, 51, 0);
}

.vs-field img {
  width: 100%;
}

.vs-field .ally,
.vs-field .enemy {
  position: relative;
  width: 48%;
  cursor: pointer;
  z-index: 4;
}

.vs-field .ally>img {
  filter: drop-shadow(-2px -2px 0 #ffd900) drop-shadow(2px 2px 0 #ef9950);
}

.vs-field .enemy>img {
  filter: drop-shadow(-2px -2px 0 #8d93c8) drop-shadow(2px 2px 0 #4d4398);

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
  width: 32%;
  display: flex;
  align-items: stretch;
  background-color: #2C3333;
  box-shadow: 1px 1px 2px #2C3333;
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

.debuffinput {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  margin-top: 2px;
  width: 100%;
}

.debuffinput>.status-list {
  position: absolute;
  top: 0;
  left: 0;
  padding-top: 24px;
  background-color: rgba(44, 51, 51, 0.5);
  z-index: 3;
}

.debuffinput>p {
  cursor: pointer;
  width: calc(100% - 16px);
  background-color: #2C3333;
  color: #F6F1F1;
  height: 1.5rem;
  font-size: 14px;
  z-index: 4;
}

.status-list,
.buff-list,
.enemy-status-list {
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
.buff-list li,
.enemy-status-list li {
  background-color: #F6F1F1;
  margin: 8px;
  width: calc(50% - 16px);
  display: flex;
  justify-content: center;
  align-items: stretch;
  box-shadow: 1px 1px 2px #2C3333;
}

.status-list li div,
.buff-list li div,
.enemy-status-list li div {
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
.enemy-status-list li div p,
li div input {
  width: 100%;
}

li div input {
  border: none;
}

.status-list li>div:first-of-type,
.buff-list li>div:first-of-type,
.result-list li>div:first-of-type,
.enemy-status-list li>div:first-of-type {
  font-size: 14px;
  height: 1.5rem;
  color: #F6F1F1;
  background-color: #2C3333;
  user-select: none;
}

.status-list li div:last-of-type,
.buff-list li div:last-of-type,
.result-list li div:last-of-type,
.enemy-status-list li div:last-of-type {
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

.rotate {
  transform: rotate(180deg);
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

.slide-move,
.slide-enter-active,
.slide-leave-active {
  transition: all 0.3s ease-in-out;
}

.slide-enter-from,
.slide-leave-to {
  opacity: 0;
}

.debufflist-enter-active {
  transition: 0.4s ease-in-out;
}

.debufflist-leave-active {
  transition: 0.4s ease-in-out;
}

.debufflist-enter-from,
.debufflist-leave-to {
  opacity: 0;
}

@media screen and (max-width: 480px) {
  .field {
    width: 100%;
  }

  .titleh1 {
    padding-top: 5px;
    font-size: 16px;
  }

  .secret {
    width: 15%;
  }

  .video {
    position: fixed;
    top: 5px;
    left: calc(100% - 120px);
    transition: 0.2s;
  }

  .secret {
    position: fixed;
    height: 100px;
  }

  .vs-field {
    margin: 0 auto;
    width: 85%;
  }

  .calc {
    display: flex;
    height: 100%;
    flex-direction: column;
    padding: 0;
  }

  .switch-field ul li {
    margin-top: 3px;
  }

  .sanity {
    display: flex;
  }

  .main,
  .sub {
    position: absolute;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: start;
  }

  .buff-list {
    margin-top: 3px;
  }

  .status-list li,
  .buff-list li {
    margin: 4px;
    width: calc(50% - 8px);
  }

  .result-list li {
    margin: 4px;
    width: calc(50% - 8px);
  }
}
</style>