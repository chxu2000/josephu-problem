//该文件用于创建Vuex中最为核心的store
import Vue from 'vue'
import Vuex from 'vuex'

//引入Vuex
Vue.use(Vuex)

const actions = {

};

const mutations = {
	initPersons(state, num) {
		// console.log('num: ', num);
		state.radius = Math.sqrt(num - 1) * state.dis;
		// console.log('radius: ', state.radius);
		var angle = 2 * Math.PI / num;
		for (var i = 0; i < num; i++) {
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
	clearPersons(state) {
		while (state.persons.length > 0) {
			state.persons.pop();
		}
		while (state.outPersons.length > 0) {
			state.outPersons.pop();
		}
	},
	leavePerson(state, index) {
		var newPersons = state.persons.concat([]);
		state.outPersons.push(newPersons.splice(index, 1)[0]);
		state.radius = Math.sqrt(newPersons.length - 1) * state.dis;
		state.outPersons[state.outPersons.length - 1].itemStyle.color = "#E6A23C";
		state.outPersons[state.outPersons.length - 1].value = "已出列的人"
		var angle = 2 * Math.PI / newPersons.length, i;
		for (i = 0; i < newPersons.length; i++) {
			newPersons[i].x = state.radius * Math.sin(angle * i);
			newPersons[i].y = -state.radius * Math.cos(angle * i);
		}
		var middle = ((state.outPersons.length - 1) % 8 + 2) / 2;
		for (i = 0; i < state.outPersons.length; i++) {
			if (Math.floor(i / 8) === Math.floor((state.outPersons.length - 1) / 8)) {
				state.outPersons[i].x = (i % 8 + 1 - middle) * state.dis;
			}
			state.outPersons[i].y = state.radius + state.dis * (Math.floor(i / 8) + 2);
		}
		state.persons = newPersons;
		console.log(newPersons);
		console.log(state.outPersons);
	},
	selectPerson(state, index) {
		// console.log('selectPerson: ', index);
		var newPersons = state.persons.concat([]);
		newPersons[index].itemStyle.color = "#E6A23C";
		state.persons = newPersons;
	},
	deselectPerson(state, index) {
		// console.log('deselectPerson: ', index);
		var newPersons = state.persons.concat([]);
		newPersons[index].itemStyle.color = "#409EFF";
		state.persons = newPersons;
	},
};

const state = {
	persons: [],
	outPersons: [],
	dis: 150,
	radius: 0,
};

//创建并暴露store
export default new Vuex.Store({
	actions,
	mutations,
	state,
})
