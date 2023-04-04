<template>
  <div class="list-field">
    <div class="filter">
      <div class="filter_b">
        <p @click="filterShow">職業</p>
        <div class="close" @click="filterClose"></div>

      </div>
      <Transition name="filter" tag="ul">
        <ul v-show="filter_switch">
          <li :class="[terms == item ? 'on' : 'off']" v-for="(item) in profession" :key="item"
            @click="filterActive(item)">
            <img :src="require('../../public/logo/' + item + '.png')">
          </li>
        </ul>
      </Transition>
    </div>
    <div class="cover">
      <div class="chara-list">
        <ul>
          <li v-for="item in filterdList" :key="item.name" @click="getName(item.name)"
            :style="{ backgroundImage: 'url(chbg/charabg' + item.rarity + '.png' }">
            <p>{{ item.name }}</p>
            <img :src="require('../../public/chimages/' + item.name + '.png')" :alt="item.name">
            <img class="profession" :src="require('../../public/logo/' + item.class + '.jpeg')">
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import charadata from "../assets/js/chara"
export default {
  data() {
    return {
      filter_switch: false,
      pickuped: "",
      data: [],
      terms: "",
      status: "",
      profession: ["先鋒", "前衛", "重装", "狙撃", "術師", "医療", "補助", "特殊"],
    };
  },
  created: function () {
    let terms = this.profession;
    this.data = charadata.character.sort(function (a, b) {
      if (a.rarity > b.rarity) return -1;
      if (a.rarity < b.rarity) return 1;
      if (terms.indexOf(a.class) > terms.indexOf(b.class)) return 1
      if (terms.indexOf(a.class) < terms.indexOf(b.class)) return -1
      if (a.name > b.name) return 1;
      if (a.name < b.name) return -1;
      return 0
    })
  },
  methods: {
    getName(selectedName) {
      this.pickuped = selectedName.replace(/\s+/g, "");
      let namae = this.pickuped
      if (this.data.find((el) => el.name == namae)) {
        this.status = this.data.find((el) => el.name == namae)
        this.$emit("select", this.status)
        this.$emit("showing", false)
      }
    },
    selected() {
      this.$emit("select", this.status)
    },
    filterShow() {
      if (this.filter_switch) {
        this.filter_switch = false
      } else {
        this.filter_switch = true
      }
    },
    filterClose() {
      this.$emit("showing", false)
    },
    filterActive(item) {
      if (this.terms == item) {
        this.terms = ""
      } else {
        this.terms = item
      }
    }
  },
  computed: {
    filterdList() {
      if (this.terms == "") {
        return this.data
      } else {
        return this.data.filter((el) => el.class == this.terms)
      }
    }
  },
  watch: {},
};
</script>

<style scoped>
.list-field {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  width: 80%;
  max-width: 900px;
  height: 80%;
  max-height: 900px;
  margin: auto;
  overflow: hidden;
  z-index: 88;
  box-shadow: 1px 1px 2px #2C3333;
}

.cover::-webkit-scrollbar {
  display: none;
}

.cover {
  height: 100%;
  overflow-x: hidden;
  overflow-y: auto;
  -ms-overflow-style: none;
  /* Firefox 対応 */
  scrollbar-width: none;
  background-color: #F6F1F1;
}

.filter {
  position: relative;
}

.filter_b {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  position: absolute;
  font-family: "logotype";
  height: 30px;
  padding: 2px 15px 2px 15px;
  top: 0;
  right: 0;
  z-index: 99;
  color: #F6F1F1;
  background-color: #2C3333;
}

.filter_b p {
  cursor: pointer;
  height: 100%;
}

.close {
  cursor: pointer;
  display: block;
  position: relative;
  width: 20px;
  height: 20px;
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

.filter ul {
  position: absolute;
  background-color: #000;
  opacity: 0.85;
  padding: 5px 0 5px 0;
  top: 30px;
  left: 0;
  z-index: 999;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
}

.filter ul li {
  width: 8%;
  cursor: pointer;
}

.filter ul li.on {
  background-color: #9D2503;
}

.filter ul li.off {
  background-color: #F6F1F1;
}

.chara-list {
  padding-top: 20px;
}

.chara-list ul {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  flex-wrap: wrap;
  padding: 10px 0.833% 10px 0.833%;
}

.chara-list ul li {
  position: relative;
  width: calc(100% / 12);
  margin: 5px 0.833% 5px 0.833%;
  white-space: nowrap;
  overflow: hidden;
  cursor: pointer;
  background-repeat: no-repeat;
  background-size: cover;
  box-shadow: 0px 3px 3px #2C3333;
}

.chara-list ul li img.profession {
  position: absolute;
  top: 0;
  left: 0;
  width: 18px;
  height: 18px;
  opacity: 0.8;
}

.chara-list ul li img:first-of-type {
  transition: 0.1s linear;
}

.chara-list ul li img:first-of-type:hover {
  transform: scale(1.05);
}


.chara-list ul li p {
  color: #F6F1F1;
  overflow: hidden;
  text-overflow: ellipsis;
  font-weight: bold;
  padding: 2px;
  font-size: 10px;
  background: rgba(30, 30, 30, 0.8);
  position: absolute;
  width: 100%;
  bottom: 0;
  z-index: 1;
}

.filter-enter-active {
  transition: 0.2s linear;
}

.filter-leave-active {
  transition: 0.2s linear;
}

.filter-enter-from,
.filter-leave-to {
  transform: translateX(100%);
}

@media screen and (max-width: 480px) {
  .list-field {
    width: 90%;
    max-width: 900px;
    height: 90%;
    max-height: 900px;
  }

  .chara-list ul {
    padding: 10px 2.5% 10px 2.5%;

  }

  .chara-list ul li {
    width: calc(100% / 5);
    margin: 5px 2.5% 5px 2.5%;
  }

  .chara-list ul li img.profession {
    width: 14px;
    height: 14px;
  }

  .filter ul {
    flex-wrap: wrap;
  }

  .filter ul li {
    width: 20%;
    margin: 2px 2.5% 2px 2.5%;
  }
}
</style>
