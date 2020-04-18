<template>

	<div>

		<p>Output:</p>

		<span>Copied!</span>

		<button @click="copyToClipboard_OnClick()">Copy to Clipboard</button>

		<pre class="code"><div ref="result"><app-line
            v-for="(row,index) in makedRows"
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

		// TODO:: meter em js-tips
		// Em 'computed' não "forçava o update" em alterações nas _checkboxs_
		// Funcionava com hack: `this.table.push([]); this.table.pop();`
		// (TINHA O METODO MAKEROWS AQUI)

		// Agora funciona em computed porque no 'input' > 'table options' estou a 
		// altera a data() 'options' de 'output' que posteriormente envio para
		// 'line.vue' pelas props (`:options="options"`, não está junto com intel)

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