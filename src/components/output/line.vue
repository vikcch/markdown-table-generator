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

		/**		 
		 * É o comprimento da string resultante.
		 * padCount = 4 
		 * Ex.: '6'.padFunction(padCount, '0')		// '0006'
		 * @param {Number} 		columnIndex
		 * @return {Number}
		 */
		getPadCount(columnIndex) {

			const inputVue = head(this.$root.$children).$refs['input'];

			const isSameWidth = this.options.sameWidth;

			const maxChars = isSameWidth
				? inputVue.maxCharsAllColumns()
				: inputVue.maxCharsColumn(columnIndex);

			const minChars = this.options.minimumWidth;

			return Math.max(minChars, maxChars);
		},

		/**
		 * Alinhamento da coluna ('left', 'center', 'right')
		 * Permite que *sem* `header highlight` alinhe a primeira
		 *   row juntamente com as restantes.
		 * @param {Number} 		columnIndex
		 * @return {String}	
		 */
		getAlign(columnIndex) {

			const highlight = this.options.highlightHeader;

			const isHeaderRow = this.intel.index === 1;

			return highlight && isHeaderRow
				? this.options.columnsAlignment.header
				: this.options.columnsAlignment.body[columnIndex];
		},

		/**
		 * Preenche a string consuante o tamanho (length) da maior coluna 
		 * ou maior de todas as colunas
		 * @param {String} 		text			Dados da celula 
		 * @param {String} 		fillerPad		Caratere para preencher
		 * @param {Number} 		columnIndex		
		 * @return {String}						
		 */
		getPaddedText(text, fillerPad, columnIndex) {

			const padCount = this.getPadCount(columnIndex);

			const work = {

				left: text.padEnd(padCount, fillerPad),
				center: padEdges(fillerPad)(text, padCount),
				right: text.padStart(padCount, fillerPad),
			};

			const align = this.getAlign(columnIndex);

			return work[align];
		},

		/**
		 * fillers.leftEdge
		 * fillers.pad
		 * fillers.columnSeparator
		 * fillers.rightEdge
		 * 
		 *       fillers.pad
		 *   ↓      ↓ ↓      ↓
		 *  +--------+--------+ 
		 *  | Header | Header | 
		 *   ↑      ↑ ↑      ↑
		 *       fillers.pad 
		 */

		/**		
		 * Row formatada com padding e bordas.
		 * 'index' no reduce representa a coluna
		 * 
		 * @param {Object} 		fillers			blueprint acima		
		 * @return {String}						
		 */
		getRow(fillers) {

			const rdc = (acc, cur, index) => {

				const paddedText = this.getPaddedText(cur, fillers.pad, index);

				const innerCell = `${fillers.pad}${paddedText}${fillers.pad}`;

				return `${acc}${innerCell}${fillers.columnSeparator}`;
			};

			const innerRow = removeLastChar(this.intel.value.reduce(rdc, ''));

			return `${fillers.leftEdge}${innerRow}${fillers.rightEdge}`;
		},

		/**
		 * Adiciona nova coluna na primeira posição com o numero da linha.
		 * A 'row' vem completa com as bordas e separador, é adicionada a
		 *   coluna a seguir ao primeiro carater (borda), e o separador 
		 *   como sendo o ultimo carater inserido.
		 * 
		 * 'tail':	  		tudo o que não é o primeiro.
		 * 'isSpecialRow':	bordas (topo, fundo) e separador entre header e body
		 * @param {String} 		row				
		 * @param {Object} 		fillers			blueprint acima		
		 * @return {String}		
		 */
		addSpreadsheet: function (fillers) {

			return (row) => {

				const inputVue = head(this.$root.$children).$refs['input'];

				const isSpecialRow = fillers.pad !== ' ';

				const { rowsCount } = inputVue;

				const highlight = this.options.highlightHeader;

				const isHeaderRow = this.intel.index === 1;

				const lineNumber = this.intel.index - (highlight ? 2 : 0);

				const rowsCountLen = (rowsCount + (highlight ? 0 : 1)).toString().length + 1;

				const padCount = Math.max(rowsCountLen, 2);

				const cellText = isSpecialRow || highlight && isHeaderRow
					? ''.padStart(padCount, fillers.pad)
					: lineNumber.toString().padStart(padCount, ' ');

				const innerCell = `${fillers.pad}${cellText}${fillers.pad}`;

				const tail = row.slice(1);

				return `${head(row)}${innerCell}${fillers.columnSeparator}${tail}`;
			}
		},

		addComment(row) {

			const { style, before, after } = this.options.commentStyle;

			const work = {

				custom: `${before}${row}${after}`,
				doubleslant: `// ${row} `,
				slantsplat: `/* ${row} */`,
				xml: `<!-- ${row} -->`,
			};

			return work[style];
		}

	},

	computed: {

		/**
		 * Opções do 'input.vue' > 'table-options.vue'
		 * @return {Object}		
		 */
		options() {

			const inputVue = head(this.$root.$children).$refs['input'];

			const options = inputVue.$refs['options'];

			return options;
		},

		/**
		 * "Special Row" são as bordas (topo, fundo) e separador entre 
		 *   header e body (top, middle, bottom).		
		 * +--------+--------+  ╔════════╤════════╗  ┌────────┬────────┐ ← top
		 * | Header | Header |  ║ Header │ Header ║  │ Header │ Header │
		 * +--------+--------+  ╟────────┼────────╢  ├────────┼────────┤ ← middle
		 * |   data |   data |  ║   data │   data ║  │   data │   data │
		 * |   data |   data |  ║   data │   data ║  │   data │   data │
		 * +--------+--------+  ╚════════╧════════╝  └────────┴────────┘ ← bottom
		 * 
		 * @return {Object}		{ leftEdge, pad, columnSeparator, rightEdge }
		 */
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

			const key = this.intel.index.toString();

			return key in work ? work[key] : work.def;
		},

		/**
		 * "Data Row" representa linha com dados
		 * @return {Object}		{ leftEdge, pad, columnSeparator, rightEdge }
		 */
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

		/**
		 * 'this.intel.index' é o total de linhas, incluindo bordas (top, fundo)
		 *   e separador enter header e body.
		 * O primeiro e o ultimo (top e fundo) são sempre "special rows", caso
		 *   haja o separador (highlightHeader) é sempre o terceiro (index 2), 
		 *   e o ultimo é o 'rowsCount' mais 3 (top, header, separador), já que 
		 *   'rowsCount' conta apenas as rows do body
		 * @return {Boolean}
		 */
		isSpecialRow() {

			const inputVue = head(this.$root.$children).$refs['input'];

			const highlight = this.options.highlightHeader;

			const rowsCount = inputVue.rowsCount;

			const arr = highlight ? [0, 2, rowsCount + 3] : [0, rowsCount + 2];

			return arr.includes(this.intel.index);
		},

		/**
		 * Interpolação
		 * @return {String}		
		 */
		row() {

			const filler = this.isSpecialRow
				? this.specialRowFiller
				: this.dataRowFiller;

			const row = this.getRow(filler);

			// const spreadsheet = this.options.spreadsheet;

			// return spreadsheet ? this.addSpreadsheet(row, filler) : row;
			// return spreadsheet ? this.addSpreadsheet(filler)(row) : row;

			// TODO:: pra fxnl ou absx
			const pipe = (...fns) => arg => fns.reduce((acc, cur) => cur(acc), arg);

			const { spreadsheet } = this.options;

			const sprFilledOrSkip = spreadsheet ? this.addSpreadsheet(filler) : r => r;

			return pipe(sprFilledOrSkip, this.addComment)(row);
		}
	},

	updated() {

		this.$parent.$refs['button-copied'].copied = false;

		console.log('em line');
	},
}
</script>

<style scope>
code {
	display: block;
	background-color: beige;
}
</style>
