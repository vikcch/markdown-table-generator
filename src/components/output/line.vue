<template>

	<code> {{row}} </code>

</template>

<script>
import { head } from '../../units/absx';

export default {

	props: ['intel'],

	methods: {

		// TODO:: ser computed
		getPad(index) {

			const inputVue = head(this.$root.$children).$refs['input'];

			const isSameWidth = inputVue.$refs['same-width'].checked

			if (isSameWidth) return inputVue.maxCharsAllColumns();
			else {

				const minChars = inputVue.$refs['min-width'].value;
				const maxChars = inputVue.maxCharsColumn(index)

				return Math.max(minChars, maxChars);
			}
		},


		getTopBoundary() {

			// const inputVue = head(this.$root.$children).$refs['input'];

			// const minChars = inputVue.$refs['min-width'].value;

			// const rdc = (acc, cur, index) => {

			// 	const maxChars = inputVue.maxCharsColumn(index);

			// 	const pad = Math.max(minChars, maxChars);

			// 	return `${acc}-${cur.padStart(pad, '-')}-+`;
			// };

			// return this.intel.value.reduce(rdc, '+');


			const rdc = (acc, cur, index) => {

				const pad = this.getPad(index);

				return `${acc}-${cur.padStart(pad, '-')}-+`;
			};

			return this.intel.value.reduce(rdc, '+');
		},



		getDataRow() {

			const rdc = (acc, cur, index) => {

				const pad = this.getPad(index);

				return `${acc} ${cur.padStart(pad, ' ')} |`;
			};

			return this.intel.value.reduce(rdc, '|');

		}

	},

	computed: {

		row() {

			// TODO:: objecto com 6 props?
			// topRight middleLeft ...

			const inputVue = head(this.$root.$children).$refs['input'];

			const highlight = inputVue.$refs['highlight-header'].checked

			const tableLen = inputVue.table.length;

			const arr = highlight ? [0, 2, tableLen + 3] : [0, tableLen + 2];

			if (arr.includes(this.intel.index)) {

				return this.getTopBoundary();
			}

			return this.getDataRow();
		}
	}
}
</script>

<style scope>
code {
	display: block;
	background-color: beige;
}
</style>