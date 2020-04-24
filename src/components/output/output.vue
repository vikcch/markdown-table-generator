<template>

	<div class="badge bm-l">

		<div class="divorced">
			<h2>Output:</h2>
			<app-button-copied ref="button-copied" />
		</div>

		<div
			ref="result"
			:key="rerenderHack"
		>

			<div v-if="isHTML">
				<pre class="code pre-wrap"><app-html-table :intel="htmlPartsMaker"/></pre>
			</div>

			<div v-else>
				<pre class="code scroll-auto"><div class="padded-r"><app-line
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
import buttonCopiedVue from './button-copied.vue';

// class="scroll-auto"

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

			return result;
		},

		htmlPartsMaker() {

			const inputVue = head(this.$root.$children).$refs['input'];

			const { tableHead, tableBody } = inputVue;

			return { tableHead, tableBody };
		}
	}
}

</script>

<style scoped>
pre.code {
	font-family: "Lucida Console", Monaco, monospace;
	font-size: 14px;
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
	content: counter(listing) "  ";
	background-color: rgb(223, 223, 187);
	margin-right: 4px;
}

.pre-wrap {
	white-space: pre-wrap;
}

.scroll-auto {
	overflow-x: auto;
}

.padded-r {
	padding-right: 4px;
	background-color: beige;
}
</style>