<template>

	<div>

		<app-table-calibrator :intel="{name: 'Row', key:'row', value: rowsCount}" />

		<app-table-calibrator :intel="{name: 'Column', key:'column', value: columnsCount}" />

		<table>

			<tbody>

				<app-row
					v-for="(row, index) in table"
					:key="index"
					:intel="row"
				/>

			</tbody>

		</table>

		<button @click="showData()">Show Data</button>

	</div>

</template>

<script>

import rowVue from './row.vue';
import tableCalibratorVue from './table-calibrator.vue';
import { head } from './../units/absx.js';

export default {

	components: {

		'app-table-calibrator': tableCalibratorVue,
		'app-row': rowVue
	},

	data() {

		return {

			table: [['1', '2', '3'], ['4', '5', '6']]
		};
	},

	methods: {

		showData() {

			console.log(this.table);
		}
	},

	computed: {

		columnsCount() {

			return head(this.table).length;
		},

		rowsCount() {

			return this.table.length;
		}
	}
}
</script>

<style>
</style>