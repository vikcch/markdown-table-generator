<template>

	<div>

		<p>Output:</p>

		<pre class="code"><div><app-line
            v-for="(row,index) in getMakedRows()"
            :key="index"
            :intel="{value:row, index:index}" /></div>

        </pre>

	</div>

</template>

<script>
import lineVue from './line.vue';
import { head } from '../../units/absx';

export default {

	components: {

		'app-line': lineVue
	},

	methods: {

		// Em 'computed' não "forçava o update" em alterações nas _checkboxs_
		// Funcionava com hack: `this.table.push([]); this.table.pop();`

		getMakedRows() {

			const inputVue = head(this.$root.$children).$refs['input'];

			const topBoundary = Array(inputVue.columnsCount).fill('-');

			const result = [topBoundary, inputVue.tableHeader];

			if (inputVue.$refs['highlight-header'].checked) {

				result.push(topBoundary);
			}

			result.push(...inputVue.table, topBoundary);

			return result;
		}

	},

	computed: {},

}
</script>

<style scoped>
/* OPTIMIZE:: font size mais pequeno, desmarcar checkbox no inspector styles e ver tamanho */
pre.code {
	white-space: pre-wrap;
	position: relative;
	border: 1px black solid;
	padding: 4px 8px;

	display: flex;
	justify-content: flex-start;
}
pre.code:before {
	counter-reset: listing;
}
pre.code code {
	counter-increment: listing;
	text-align: right;
}
pre.code code::before {
	content: counter(listing) ". ";
	background-color: lightgray;
}
</style>