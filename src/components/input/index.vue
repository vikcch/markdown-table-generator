<template>

	<div @keyup="onKeyUp">

		<app-table-calibrator :intel="{name: 'Row', key:'row', value: rowsCount}" />

		<app-table-calibrator :intel="{name: 'Column', key:'column', value: columnsCount}" />

		<table ref="table">

			<thead>

				<app-column
					v-for="(col,index) in tableHeader"
					:key="index"
					:intel="{value:col, index:index, key:'header'}"
				/>

			</thead>

			<tbody>

				<app-row
					v-for="(row, index) in table"
					:key="index"
					:intel="row"
				/>

			</tbody>

		</table>

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

			console.log('mw', this.minWidth);
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

			console.log(coords);

			const work = {

				ArrowUp: () => {

					const index = coords.y === 0
						? getIndex({ x: coords.x, y: this.rowsCount })
						: getIndex({ x: coords.x, y: coords.y - 1 });

					tds[index].firstChild.focus();
				},

				ArrowLeft: () => {
					/* 
										if (coords.x === 0) {
					
											const index = (coords.y + 1) * this.columnsCount;
					
											tds[index - 1].firstChild.focus();
					
										} else {
					
											tds[tdFocusedIndex - 1].firstChild.focus();
										} */

					const index = coords.x === 0
						? getIndex({ x: this.columnsCount - 1, y: coords.y })
						: getIndex({ x: coords.x - 1, y: coords.y });

					tds[index].firstChild.focus();

				},

				ArrowRight: () => {

					/* 					if (coords.x === this.columnsCount - 1) {
					
											const index = coords.y * this.columnsCount;
											tds[index].firstChild.focus();
					
										} else {
					
											tds[tdFocusedIndex + 1].firstChild.focus();
										} */


					const index = coords.x === this.columnsCount - 1
						? getIndex({ x: 0, y: coords.y })
						: getIndex({ x: coords.x + 1, y: coords.y });

					tds[index].firstChild.focus();


				},
				ArrowDown: () => {

					const index = coords.y === this.rowsCount
						? getIndex({ x: coords.x, y: 0 })
						: getIndex({ x: coords.x, y: coords.y + 1 });

					tds[index].firstChild.focus();
				},
			};

			key in work && work[key].call();


			// TODO:: fazer circular

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
