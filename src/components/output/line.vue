<template>

	<code> {{row}} </code>

</template>

<script>
import { head, removeLastChar } from '../../units/absx';

export default {

	props: {

		intel: Object,
		options: Object
	},

	methods: {

		getPad(index) {

			const inputVue = head(this.$root.$children).$refs['input'];

			const isSameWidth = this.options.sameWidth;

			const maxChars = isSameWidth
				? inputVue.maxCharsAllColumns()
				: inputVue.maxCharsColumn(index);

			const minChars = this.options.minimumWidth;

			return Math.max(minChars, maxChars);
		},

		getRow(fillers) {

			const rdc = (acc, cur, index) => {

				const padCount = this.getPad(index);

				const paddedText = cur.padStart(padCount, fillers.pad);

				const innerCell = `${fillers.pad}${paddedText}${fillers.pad}`;

				return `${acc}${innerCell}${fillers.columnSeparator}`;
			};

			const innerRow = removeLastChar(this.intel.value.reduce(rdc, ''));

			return `${fillers.leftEdge}${innerRow}${fillers.rightEdge}`;
		}

	},

	computed: {

		specialRowFiller() {

			const tableStyle = {
				mysql: {
					def: { top: '+-++', middle: '+-++', bottom: '+-++' }
				},
				ascii: {
					single: { top: '┌─┬┐', middle: '├─┼┤', bottom: '└─┴┘' },
					double: { top: '╔═╤╗', middle: '╟─┼╢', bottom: '╚═╧╝' }
				}
			};

			//  +--------+--------+  ╔════════╤════════╗  ┌────────┬────────┐ 
			//  | Header | Header |  ║ Header │ Header ║  │ Header │ Header │
			//  +--------+--------+  ╟────────┼────────╢  ├────────┼────────┤ 
			//  |   data |   data |  ║   data │   data ║  │   data │   data │
			//  |   data |   data |  ║   data │   data ║  │   data │   data │
			//  +--------+--------+  ╚════════╧════════╝  └────────┴────────┘

			const { style, border } = this.options.tableStyle;

			const selected = tableStyle[style][border] || tableStyle.mysql.def;

			const work = {

				// '0': { leftEdge: '╔', pad: '═', columnSeparator: '╤', rightEdge: '╗' },
				// '2': { leftEdge: '╟', pad: '─', columnSeparator: '┼', rightEdge: '╢' },
				// def: { leftEdge: '╚', pad: '═', columnSeparator: '╧', rightEdge: '╝' }
				'0': {
					leftEdge: selected.top[0], pad: selected.top[1],
					columnSeparator: selected.top[2], rightEdge: selected.top[3]
				},
				'2': {
					leftEdge: selected.middle[0], pad: selected.middle[1],
					columnSeparator: selected.middle[2], rightEdge: selected.middle[3]
				},
				def: {
					leftEdge: selected.bottom[0], pad: selected.bottom[1],
					columnSeparator: selected.bottom[2], rightEdge: selected.bottom[3]
				}
			};

			// TODO:: não preciso de toString() ver porquê
			const key = this.intel.index.toString();

			return key in work ? work[key] : work.def;
		},

		dataRowFiller() {

			const tableStyle = {
				mysql: {
					def: '| ||'
				},
				ascii: {
					single: '│ ││', double: '║ │║'
				}
			};

			const { style, border } = this.options.tableStyle;

			const selected = tableStyle[style][border] || tableStyle.mysql.def;

			return {
				leftEdge: selected[0], pad: selected[1],
				columnSeparator: selected[2], rightEdge: selected[3]
			};


			// return { leftEdge: '║', pad: ' ', columnSeparator: '│', rightEdge: '║' };
		},

		row() {
			
			const inputVue = head(this.$root.$children).$refs['input'];
			
			const highlight = this.options.highlightHeader;

			const tableLen = inputVue.table.length;

			const arr = highlight ? [0, 2, tableLen + 3] : [0, tableLen + 2];

			if (arr.includes(this.intel.index)) {

				return this.getRow(this.specialRowFiller);
			}

			return this.getRow(this.dataRowFiller);
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
