<template>

	<div>

		<p>Output:</p>

		<span>Copied!</span>

		<button @click="copyToClipboard_OnClick()">Copy to Clipboard</button>

		<div ref="result">

			<pre class="code"><div v-if="isHTML">{{htmlTable}}</div><div v-else><app-line			
            v-for="(row,index) in makedRows"
            :key="index"
            :intel="{value:row, index:index}" /></div></pre>

		</div>
	</div>

</template>

<script>
import lineVue from './line.vue';
import { head } from '../../units/absx';
import { addTextToTag } from '../../units/fxnl';

export default {

	components: {

		'app-line': lineVue
	},

	data() {

		return {

			isHTML: false
		}
	},

	methods: {

		copyToClipboard_OnClick() {

			const text = this.$refs['result'].innerText;

			navigator.clipboard.writeText(text).then(function () {

				console.log('copiado', text);

			}, function (err) {


				/* eslint-disable-next-line */
				console.error(err);
			});

		}

	},

	computed: {

		highlightHeader() {

			const inputVue = head(this.$root.$children).$refs['input'];

			const { highlightHeader } = inputVue.$refs['options'];

			return highlightHeader;
		},


		// specialRow => Para ser 'top', 'bottom' ou 'entre header e body'
		makedRows() {

			const inputVue = head(this.$root.$children).$refs['input'];

			const specialRow = Array(inputVue.columnsCount).fill('');

			const result = [specialRow, inputVue.tableHeader];

			if (this.highlightHeader) {

				result.push(specialRow);
			}

			result.push(...inputVue.table, specialRow);

			return result;
		},

		htmlTable() {

			const inputVue = head(this.$root.$children).$refs['input'];

			const tr = addTextToTag('tr');
			const th = addTextToTag('th');
			const td = addTextToTag('td');

			const thEls = inputVue.tableHeader.map(v => th(v)).join('');

			// TODO:: usar pipe
			const thead = addTextToTag('thead')(tr(thEls));

			const makeTRs = arr => tr(arr.map(v => td(v)).join(''));

			const trEls = inputVue.table.map(makeTRs).join('');

			const tbody = addTextToTag('tbody')(trEls);

			const table = addTextToTag('table')(`${thead}${tbody}`);

			return table;
		}
	},

}
</script>

<style scoped>
/* OPTIMIZE:: font size mais pequeno, desmarcar checkbox no inspector styles e ver tamanho */
pre.code {
	white-space: pre-wrap;
	position: relative;
	border: 1px black solid;
	padding: 4px 8px;
	font-size: 14px;
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