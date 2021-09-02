<template>
  <div id="tool-bar">
    <div class="box top" ref="topbox">
      <el-row class="h-row">
        <h1>配置项</h1>
      </el-row>
      <el-row type="flex" justify="space-between" class="h-row">
        <el-col :span="14"> <h2>总人数</h2> </el-col>
        <el-col :span="10" class="v-col">
          <el-input-number
            v-model="totalNum"
            :disabled="disabled"
            :min="2"
            :max="NaN"
            label="游戏人数"
          ></el-input-number>
        </el-col>
      </el-row>
      <el-row type="flex" justify="space-between" class="h-row">
        <el-col :span="14"> <h2>动画间隔 / ms</h2> </el-col>
        <el-col :span="10" class="v-col">
          <el-slider
            :disabled="disabled"
            v-model="aniInt"
            :min="200"
            :max="1000"
            label="动画间隔"
            :step="10"
            style="width: 100%"
          ></el-slider>
        </el-col>
      </el-row>
      <el-row type="flex" justify="space-between" class="h-row last">
        <el-col :span="14"> <h2>开始游戏</h2> </el-col>
        <el-col :span="10" class="v-col">
          <el-button :disabled="disabled" @click="play">开始</el-button>
        </el-col>
      </el-row>
      <el-row type="flex" justify="space-between" class="h-row last">
        <el-col :span="14"> <h2>重置游戏</h2> </el-col>
        <el-col :span="10" class="v-col">
          <el-button :disabled="rdisabled" @click="remake">重置</el-button>
        </el-col>
      </el-row>
    </div>
    <div class="box bottom" ref="bottombox">
      <el-row class="h-row">
        <h1>骰子</h1>
      </el-row>
      <el-row type="flex" justify="space-between" class="h-row">
        <h2>当前骰子点数为: {{ points }}</h2>
      </el-row>
      <el-row>
        <div id="dice-box"></div>
      </el-row>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
import rollADie from "roll-a-die";

function response(res) {
  // returns an array of the values from the dice
  console.log(res);
}

function rollDiceWithValues(value) {
  const element = document.getElementById("dice-box");
  const numberOfDice = 1;
  const valuesToThrow = [value];
  const options = {
    element, // element to display the animated dice in.
    numberOfDice, // number of dice to use
    values: valuesToThrow, // values to throw. When provided, overides library generated values. Optional.
    callback: response,
  };
  rollADie(options);
}

export default {
  name: "ToolBar",
  data() {
    return {
      totalNum: 6,
      aniInt: 600,
      timer: 0,
      disabled: false,
      rdisabled: true,
      points: "- -",
    };
  },
  computed: {
    ...mapState(["persons"]),
  },
  methods: {
    ...mapMutations([
      "initPersons",
      "clearPersons",
      "leavePerson",
      "selectPerson",
      "deselectPerson",
    ]),
    shinePerson(index) {
      console.log("shinePerson: ", index);
      setTimeout(() => {
        this.selectPerson(index);
      }, this.aniInt * this.timer);
      setTimeout(() => {
        this.deselectPerson(index);
      }, this.aniInt * this.timer + this.aniInt / 4);
      setTimeout(() => {
        this.selectPerson(index);
      }, this.aniInt * this.timer + this.aniInt / 2);
      setTimeout(() => {
        this.deselectPerson(index);
      }, this.aniInt * this.timer++ + (3 * this.aniInt) / 4);
    },
    remake() {
      this.clearPersons();
      this.initPersons(this.totalNum);
      this.rdisabled = true;
      this.disabled = false;
    },
    play() {
      this.disabled = true;
      this.rdisabled = true;
      this.timer = 0;
      var i,
        j,
        choice,
        pointer = 0,
        len = this.persons.length;
      for (i = 0; i < len - 1; i++) {
        choice = Math.floor(Math.random() * 6) + 1;
        // choice = 5;
        ((c) => {
          setTimeout(() => {
            rollDiceWithValues(c);
          }, this.aniInt * this.timer);
          setTimeout(() => {
            this.points = c;
          }, this.aniInt * this.timer + 500);
        })(choice);
        this.timer += 1000 / this.aniInt;
        // console.log("choice: ", choice);
        // console.log("pointer: ", pointer);
        for (j = 0; j < choice; j++) {
          pointer %= len - i;
          this.shinePerson(pointer);
          if (j == choice - 1) {
            ((p, l) => {
              console.log("leavePerson: ", p);
              setTimeout(() => {
                this.leavePerson(p);
              }, this.aniInt * this.timer++);
              if (l != 1) {
                this.shinePerson(p % l);
                setTimeout(() => {
                  this.selectPerson(p % l);
                }, this.aniInt * this.timer++);
              }
            })(pointer, len - i - 1);
          } else {
            ++pointer;
          }
        }
      }
      setTimeout(() => {
        this.rdisabled = false;
        this.points = "- -";
      }, this.aniInt * this.timer + 500);
    },
  },
  watch: {
    totalNum(newValue) {
      this.clearPersons();
      this.initPersons(newValue);
    },
  },
};
</script>

<style scoped>
#tool-bar {
  width: 100%;
  height: 100%;
  display: flex;
  flex-wrap: wrap;
}
.box {
  width: 85%;
  /* margin: auto; */
  border-width: 2px;
  border-radius: 10px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  float: left;
}
.box.top {
  margin: auto 0 5% 5%;
}
.box.bottom {
  margin: 5% 0 auto 5%;
}
.box.last {
  margin-right: 20px;
}
.v-col {
  display: flex;
  align-items: center;
  justify-content: center;
}
h1 {
  font-size: 20px;
  font-weight: bold;
  height: 25px;
  line-height: 25px;
  margin-top: 18px;
  margin-bottom: 5px;
}
h2 {
  font-size: 17px;
  font-weight: bold;
  height: 20px;
  line-height: 20px;
  color: #1f2f3d;
  margin-bottom: 2px;
}
p {
  padding: 0 0 5px 0px;
  text-align: center;
  color: #1f2f3d;
}
.h-row {
  margin-bottom: 5px;
  padding: 1% 6% 0 6%;
  flex-wrap: wrap;
  /* display: flex; */
  align-items: center;
}
.i-row {
  margin-top: 5px;
  margin-bottom: 5px;
}
.i-row.s-row {
  margin-top: 15px;
}
.m-row {
  margin-bottom: 15px;
}
.block {
  text-align: center;
}
.s-line {
  line-height: 44px;
}
.last {
  margin-bottom: 20px;
}
#dice-box {
  margin: auto;
  width: 100px;
  height: 150px;
}
</style>