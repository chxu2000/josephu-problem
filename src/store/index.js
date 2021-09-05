//该文件用于创建Vuex中最为核心的store
import Vue from 'vue'
import Vuex from 'vuex'

//引入Vuex
Vue.use(Vuex)

const actions = {

};

const mutations = {
	// 初始化数组
	initPersons(state, num) {
		state.radius = Math.sqrt(num - 1) * state.dis;
		var angle = 2 * Math.PI / num, i;
		for (i = 0; i < num; i++) {
			state.persons.push({
				name: (i + 1).toString(),
				x: state.radius * Math.sin(angle * i),
				y: -state.radius * Math.cos(angle * i),
				symbolSize: 50,
				itemStyle: {
					color: "#409EFF",
				},
				value: '未出列的人',
			});
		}
	},
	// 清空所有人
	clearPersons(state) {
		while (state.persons.length > 0) {
			state.persons.pop();
		}
		while (state.outPersons.length > 0) {
			state.outPersons.pop();
		}
	},
	// 一人出列
	leavePerson(state, index) {
		// 出列则清空报数标记
		while (state.marker.length > 0) {
			state.marker.pop();
		}
		while (state.showMarker.length > 0) {
			state.showMarker.pop();
		}
		var newPersons = state.persons.concat([]);
		// 一人出列
		state.outPersons.push(newPersons.splice(index, 1)[0]);
		state.radius = Math.sqrt(newPersons.length - 1) * state.dis;
		state.outPersons[state.outPersons.length - 1].itemStyle.color = "#F56C6C";
		state.outPersons[state.outPersons.length - 1].value = "已出列的人"
		var angle = 2 * Math.PI / newPersons.length, i;
		// 重新计算未出列人的坐标
		for (i = 0; i < newPersons.length; i++) {
			newPersons[i].x = state.radius * Math.sin(angle * i);
			newPersons[i].y = -state.radius * Math.cos(angle * i);
		}
		// 重新计算已出列人的坐标
		var middle = ((state.outPersons.length - 1) % 8 + 2) / 2;
		for (i = 0; i < state.outPersons.length; i++) {
			if (Math.floor(i / 8) === Math.floor((state.outPersons.length - 1) / 8)) {
				state.outPersons[i].x = (i % 8 + 1 - middle) * state.dis;
			}
			state.outPersons[i].y = state.radius + state.dis * (Math.floor(i / 8) + 1);
		}
		state.persons = newPersons;
		console.log(newPersons);
		console.log(state.outPersons);
	},
	// 选中某人
	selectPerson(state, index) {
		// console.log('selectPerson: ', index);
		var newPersons = state.persons.concat([]);
		newPersons[index].itemStyle.color = "#E6A23C";
		state.persons = newPersons;
	},
	// 反选某人
	deselectPerson(state, index) {
		// console.log('deselectPerson: ', index);
		var newPersons = state.persons.concat([]);
		newPersons[index].itemStyle.color = "#409EFF";
		state.persons = newPersons;
	},
	// 报数标记
	setMarker(state, index) {
		var angle = 2 * Math.PI / state.persons.length, mark = ['①', '②', '③', '④', '⑤', '⑥'], i;
		for (i = 0; i < state.marker.length; ++i) {
			if (state.marker[i].i === index) {
				// 置重复标记的show属性
				state.marker[i].show = false;
			}
		}
		state.marker.push({
			name: mark[state.marker.length],
			i: index,
			x: (state.radius - state.dis / 2) * Math.sin(angle * index),
			y: -(state.radius - state.dis / 2) * Math.cos(angle * index),
			symbolSize: 1,
			itemStyle: {
				color: "#909399",
			},
			value: '当前报数',
			label: {
				show: true,
				color: "#E6A23C",
				fontStyle: 'bold',
				fontSize: 25,
			},
			show: true,
		})
		// 过滤重复标记
		state.showMarker = state.marker.filter((e) => e.show);
	},
};

const state = {
	persons: [],
	outPersons: [],
	marker: [],
	showMarker: [],
	dis: 150,
	radius: 0,
};

//创建并暴露store
export default new Vuex.Store({
	actions,
	mutations,
	state,
})
