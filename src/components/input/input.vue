<template>

	<div>

		<div class="train bm-l">

			<app-table-calibrator :intel="{name: 'Row', key:'row', value: rowsCount}" />

			<app-table-calibrator :intel="{name: 'Column', key:'column', value: columnsCount}" />

		</div>

		<app-table
			class="bm-l"
			:tableHead="tableHead"
			:tableBody="tableBody"
		/>

		<app-table-options
			class="bm-l"
			ref="options"
		/>

	</div>

</template>

<script>

import tableCalibratorVue from './table-calibrator.vue';
import { head } from './../../units/absx.js';
import tableOptionsVue from './table-options.vue';
import tableVue from './table.vue';


export default {

	components: {
		'app-table': tableVue,
		'app-table-calibrator': tableCalibratorVue,
		'app-table-options': tableOptionsVue,

	},

	data() {

		return {
			tableHead: ['H1', 'H2', 'H3'],
			tableBody: [['1', '2', '3'], ['4', '5', '6']],
		};
	},

	methods: {

		maxCharsColumn(index) {

			const maxBody = this.tableBody.reduce((acc, cur) => {

				const len = cur[index].length;

				return Math.max(len, acc);

			}, 0);

			const maxHeader = this.tableHead[index].length;

			return Math.max(maxHeader, maxBody);
		},

		maxCharsAllColumns() {

			const maxHeader = Math.max(...this.tableHead.map(x => x.length));

			const maxBody = this.tableBody.reduce((acc, cur) => {

				const maxCur = Math.max(...cur.map(x => x.length));
				return Math.max(maxCur, acc);
			}, 0);

			return Math.max(maxHeader, maxBody);
		},

	},

	computed: {

		columnsCount() {

			return head(this.tableBody).length;
		},

		rowsCount() {

			return this.tableBody.length;
		},
	},

	watch: {

		tableHead(value) {

			const bodyAlign = this.$refs['options'].columnsAlignment.body;

			const isAddingColumn = value.length - bodyAlign.length > 0;

			if (isAddingColumn) bodyAlign.push('right');
			else bodyAlign.pop();
		}
	}

}
</script>

<style scoped>
</style>
