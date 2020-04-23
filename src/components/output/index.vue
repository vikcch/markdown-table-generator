<template>

	<div class="badge">

		<div class="divorced">
			<h2>Output:</h2>
			<app-button-copied ref="button-copied" />
		</div>

		<div
			ref="result"
			:key="rerenderHack"
		>

			<div v-if="isHTML">
				<pre class="code"><app-html-table :intel="htmlPartsMaker"/></pre>
			</div>

			<div v-else>
				<pre class="code"><div><app-line
					v-for="(row,index) in makedRows"
					:key="index"
					:intel="{value:row, index:index}"
				/></div></pre>
			</div>

		</div>

	</div>

</template>

<script>
import htmlTableVue from './html-table';
import lineVue from './line.vue';
import { head } from '../../units/absx';
import { addTextToTag } from '../../units/fxnl';
import buttonCopiedVue from './button-copied.vue';

export default {

	components: {

		'app-button-copied': buttonCopiedVue,
		'app-html-table': htmlTableVue,
		'app-line': lineVue,
	},

	data() {

		return {

			isHTML: false,
			rerenderHack: 0
		}
	},

	methods: {

		updateHack() {

			this.$data.rerenderHack++;
		}

	},

	updated() {

		this.$refs['button-copied'].copied = false;
	},

	computed: {

		highlightHeader() {

			const inputVue = head(this.$root.$children).$refs['input'];

			const { highlightHeader } = inputVue.$refs['options'];

			return highlightHeader;
		},


		// specialRow: Para ser 'top', 'bottom' ou 'entre header e body'
		makedRows() {

			const inputVue = head(this.$root.$children).$refs['input'];

			const specialRow = Array(inputVue.columnsCount).fill('');

			const result = [specialRow, inputVue.tableHead];

			if (this.highlightHeader) {

				result.push(specialRow);
			}

			result.push(...inputVue.tableBody, specialRow);

			console.log('maked rows');

			return result;
		},

		htmlPartsMaker() {

			const inputVue = head(this.$root.$children).$refs['input'];

			const { tableHead, tableBody } = inputVue;

			console.log('htmlPartsMaker');

			return { tableHead, tableBody };
		}
	}
}

</script>

<style scoped>
/* OPTIMIZE:: font size mais pequeno, desmarcar checkbox no inspector styles e ver tamanho */
pre.code {
	font-family: "Lucida Console", Monaco, monospace;
	font-size: 14px;
	white-space: pre-wrap;
	position: relative;
	border: 1px #b4b4b4 solid;
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

.badge {
	padding: 8px;
	background-color: #fafafa;
	border-radius: 3px;
	border: 1px solid #b4b4b4;
	box-shadow: 0 1px 1px rgba(0, 0, 0, 0.2),
		0 2px 0 0 rgba(255, 255, 255, 0.7) inset;
}
</style>