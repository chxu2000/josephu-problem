<template>
  <div id="app">
    <div id="chart">
      <chart />
    </div>
    <div id="tool-bar">
      <tool-bar />
    </div>
  </div>
</template>

<script>
import Chart from "./components/Chart";
import ToolBar from "./components/ToolBar";

export default {
  components: {
    Chart,
    ToolBar,
  },
};
</script>

<style>
html,
body {
  height: 100%;
  width: 100%;
  /* overflow: hidden; */
}
* {
  padding: 0;
  margin: 0;
  font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB",
    "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
}
#app {
  height: 100%;
  width: 100%;
}
#chart {
  height: 100%;
  width: 60%;
  float: left;
}
#tool-bar {
  height: 100%;
  width: 40%;
  float: left;
}
</style>