<template>

	<code> {{row}} </code>

</template>

<script>
import { head, removeLastChar, padSpacedEdges } from '../../units/absx';
import { padEdges } from '../../units/fxnl';

export default {

	props: {

		intel: Object,
	},

	methods: {

		getPad(columnIndex) {

			const inputVue = head(this.$root.$children).$refs['input'];

			const isSameWidth = this.options.sameWidth;

			const maxChars = isSameWidth
				? inputVue.maxCharsAllColumns()
				: inputVue.maxCharsColumn(columnIndex);

			const minChars = this.options.minimumWidth;

			return Math.max(minChars, maxChars);
		},

		getAlign(columnIndex) {

			const highlight = this.options.highlightHeader;

			const isHeaderRow = this.intel.index === 1;

			if (highlight && isHeaderRow) {

				return this.options.columnsAlignment.header;

			} else {

				return this.options.columnsAlignment.body[columnIndex];
			}
		},


		getPaddedText(text, fillerPad, columnIndex) {

			// const highlight = this.options.highlightHeader;

			// const isHeaderRow = this.intel.index === 1;

			// if (highlight && isHeaderRow) {

			// 	const work = {

			// 		left: text.padEnd(padCount, fillerPad),					
			// 		center: padSpacedEdges(text, padCount),
			// 		right: text.padStart(padCount, fillerPad),
			// 	};

			// 	const align = this.options.columnsAlignment.header;

			// 	return work[align];
			// }

			// return text.padEnd(padCount, fillerPad);

			const padCount = this.getPad(columnIndex);

			const work = {

				left: text.padEnd(padCount, fillerPad),
				center: padEdges(fillerPad)(text, padCount),
				right: text.padStart(padCount, fillerPad),
			};

			// 	const align = this.options.columnsAlignment[header];


			const align = this.getAlign(columnIndex);

			return work[align];


		},

		//       fillerPad
		//   ↓      ↓ ↓      ↓
		//  +--------+--------+ 
		//  | Header | Header | 
		//   ↑      ↑ ↑      ↑
		//       fillerPad 


		/* getRow(fillers) {

			const rdc = (acc, cur, index) => {

				const padCount = this.getPad(index);

				const paddedText = cur.padEnd(padCount, fillers.pad);

				const innerCell = `${fillers.pad}${paddedText}${fillers.pad}`;

				return `${acc}${innerCell}${fillers.columnSeparator}`;
			};

			const innerRow = removeLastChar(this.intel.value.reduce(rdc, ''));

			return `${fillers.leftEdge}${innerRow}${fillers.rightEdge}`;
		} */

		getRow(fillers) {

			const rdc = (acc, cur, index) => {

				// const padCount = this.getPad(index);

				const paddedText = this.getPaddedText(cur, fillers.pad, index);

				const innerCell = `${fillers.pad}${paddedText}${fillers.pad}`;

				return `${acc}${innerCell}${fillers.columnSeparator}`;
			};

			const innerRow = removeLastChar(this.intel.value.reduce(rdc, ''));

			return `${fillers.leftEdge}${innerRow}${fillers.rightEdge}`;
		}

	},

	computed: {



		options() {

			const inputVue = head(this.$root.$children).$refs['input'];

			const options = inputVue.$refs['options'];

			const { highlightHeader, sameWidth, minimumWidth, columnsAlignment } = options;

			const { style, border } = options.tableStyle;

			return {
				columnsAlignment,
				highlightHeader,
				sameWidth,
				minimumWidth,
				tableStyle: {
					style, border
				}
			};

		},

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

			const selected = tableStyle[style][border] || tableStyle[style].def;

			const work = {

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

			const selected = tableStyle[style][border] || tableStyle[style].def;

			return {

				leftEdge: selected[0], pad: selected[1],
				columnSeparator: selected[2], rightEdge: selected[3]
			};
		},

		row() {

			const inputVue = head(this.$root.$children).$refs['input'];

			const highlight = this.options.highlightHeader;

			const tableLen = inputVue.table.length;

			const arr = highlight ? [0, 2, tableLen + 3] : [0, tableLen + 2];

			const isSpecial = arr.includes(this.intel.index);

			const filler = isSpecial ? this.specialRowFiller : this.dataRowFiller;

			return this.getRow(filler);
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
