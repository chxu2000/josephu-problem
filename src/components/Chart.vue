<template>
  <div id="chart" ref="chart"></div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
export default {
  name: "Chart",
  data() {
    return {
      chartInstance: null,
    };
  },
  computed: {
    ...mapState(["persons", "outPersons"]),
  },
  mounted() {
    this.initChart();
  },
  methods: {
    ...mapMutations(["initPersons", "clearPersons", "leavePerson"]),
    initChart() {
      this.initPersons(6);
      this.chartInstance = this.$echarts.init(this.$refs.chart);
      const initOption = {
        title: {
          text: "约瑟夫问题可视化演示",
        },
        tooltip: {
          trigger: "item",
          formatter: function (arg) {
            // console.log(arg)
            return arg.value + ': ' + arg.name;
          },
        },
        toolbox: {},
        series: [
          {
            name: "Persons",
            type: "graph",
            label: {
              show: true,
              position: "inside",
              fontSize: 20,
              offset: [0, 2],
            },
            data: this.persons.concat(this.outPersons),
          },
        ],
      };
      // console.log(initOption);
      this.chartInstance.setOption(initOption);
      window.onresize = () => {
        this.chartInstance.resize();
      };
    },
  },
  watch: {
    persons() {
      // console.log(this.persons.concat(this.outPersons))
      this.chartInstance.setOption({
        series: [
          {
            type: "graph",
            data: this.persons.concat(this.outPersons),
          },
          // {
          //   data: this.outPersons,
          // },
        ],
      });
    },
  },
};
</script>

<style scoped>
#chart {
  margin: 20px;
  height: 100%;
  width: 100%;
}
</style>