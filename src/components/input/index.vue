<template>

	<div>

		<app-table-calibrator :intel="{name: 'Row', key:'row', value: rowsCount}" />

		<app-table-calibrator :intel="{name: 'Column', key:'column', value: columnsCount}" />

		<table
			ref="table"
			@keyup="onKeyUp"
		>

			<thead>

				<app-column
					v-for="(col,index) in tableHeader"
					:key="index"
					:intel="{value:col, index:index, key:'header'}"
				/>

			</thead>

			<tbody>

				<app-row
					ref="rrr"
					v-for="(row, index) in table"
					:key="index"
					:intel="row"
				/>

			</tbody>

		</table>

		<p>control + arrow to navigate</p>

		<button @click="showData()">Show Data</button>

		<app-table-options ref="options" />

	</div>

</template>

<script>

import columnVue from './column.vue';
import rowVue from './row.vue';
import tableCalibratorVue from './table-calibrator.vue';
import { head } from './../../units/absx.js';
import tableOptionsVue from './table-options.vue';

export default {

	components: {

		'app-table-calibrator': tableCalibratorVue,
		'app-column': columnVue,
		'app-row': rowVue,
		'app-table-options': tableOptionsVue
	},

	data() {

		return {
			tableHeader: ['H1', 'H2', 'H3'],
			table: [['1', '2', '3'], ['4', '5', '6']]
		};
	},

	methods: {

		showData() {

			console.log(this.tableHeader);

			console.log(this.table);

			// const outputVue = head(this.$root.$children).$refs['output'];

			// console.log(outputVue.options.bodyColumnsAlignment);
		},

		maxCharsColumn(index) {

			const maxBody = this.table.reduce((acc, cur) => {

				const len = cur[index].length;

				return Math.max(len, acc);

			}, 0);

			const maxHeader = this.tableHeader[index].length;

			return Math.max(maxHeader, maxBody);
		},

		maxCharsAllColumns() {

			const maxHeader = Math.max(...this.tableHeader.map(x => x.length));

			const maxBody = this.table.reduce((acc, cur) => {

				const maxCur = Math.max(...cur.map(x => x.length));
				return Math.max(maxCur, acc);
			}, 0);

			return Math.max(maxHeader, maxBody);
		},

		onKeyUp(event) {

			const arrowsCode = [37, 38, 39, 40];

			if (!event.ctrlKey || !arrowsCode.includes(event.keyCode)) {

				return;
			}

			const { key } = event;

			const tdFocused = document.activeElement.parentNode

			const tds = this.$refs['table'].querySelectorAll('td');

			const tdFocusedIndex = Array.from(tds).indexOf(tdFocused);

			const coords = {

				x: tdFocusedIndex % this.columnsCount,
				y: Math.floor(tdFocusedIndex / this.columnsCount)
			};

			// coords (x,y) => zero based
			const getIndex = ({ x, y }) => y * this.columnsCount + x;

			const work = {

				'ArrowUp': coords.y === 0
					? getIndex({ x: coords.x, y: this.rowsCount })
					: getIndex({ x: coords.x, y: coords.y - 1 }),

				'ArrowLeft': coords.x === 0
					? getIndex({ x: this.columnsCount - 1, y: coords.y })
					: getIndex({ x: coords.x - 1, y: coords.y }),

				'ArrowRight': coords.x === this.columnsCount - 1
					? getIndex({ x: 0, y: coords.y })
					: getIndex({ x: coords.x + 1, y: coords.y }),

				'ArrowDown': coords.y === this.rowsCount
					? getIndex({ x: coords.x, y: 0 })
					: getIndex({ x: coords.x, y: coords.y + 1 }),
			};

			key in work && tds[work[key]].firstChild.focus();
		}

	},

	computed: {

		columnsCount() {

			return head(this.table).length;
		},

		rowsCount() {

			return this.table.length;
		},
	},

}
</script>

<style scoped>
</style>
