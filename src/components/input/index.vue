<template>

	<div>

		<div class="train bm-l ">

			<app-table-calibrator :intel="{name: 'Row', key:'row', value: rowsCount}" />

			<app-table-calibrator :intel="{name: 'Column', key:'column', value: columnsCount}" />

		</div>

		<app-table
			:tableHeader="tableHeader"
			:table="table"
		/>

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
import tableVue from './table.vue';

export default {

	components: {
		'app-table': tableVue,
		'app-table-calibrator': tableCalibratorVue,
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

			console.log(this.$refs['options'].columnsAlignment);
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



	},

	computed: {

		columnsCount() {

			return head(this.table).length;
		},

		rowsCount() {

			return this.table.length;
		},
	},

	watch: {

		tableHeader(value) {

			const bodyAlign = this.$refs['options'].columnsAlignment.body;

			/* ********************* */
			// const isAddingColumn = value.length - bodyAlign.length > 0;

			// if (isAddingColumn) bodyAlign.push('right');
			// else bodyAlign.pop();


			/* ********************* */

			// const key = value.length - bodyAlign.length;

			// const work = {
			// 	'1': () => bodyAlign.push('right'),
			// 	'-1': () => bodyAlign.pop()
			// };

			// work[key].call();


			/* ********************* */

			const isAddingColumn = value.length - bodyAlign.length > 0;

			const fn = isAddingColumn ? 'push' : 'pop';

			bodyAlign[fn]('right');

		}
	}

}
</script>

<style scoped>
</style>
