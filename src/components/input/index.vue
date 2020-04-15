<template>

	<div>

		<app-table-calibrator :intel="{name: 'Row', key:'row', value: rowsCount}" />

		<app-table-calibrator :intel="{name: 'Column', key:'column', value: columnsCount}" />

		<table>

			<thead>

				<app-column
					v-for="(col,index) in tableHeader"
					:key="index"
					:intel="{value:col, index:index, key:'header'}"
				/>

			</thead>

			<tbody>

				<app-row
					v-for="(row, index) in table"
					:key="index"
					:intel="row"
				/>

			</tbody>

		</table>

		<button @click="showData()">Show Data</button>

		<div class="ladder">

			<label>

				<input
					type="checkbox"
					ref="highlight-header"
					@change="highlightHeader_OnChange()"
					checked
				>
				<span>Highlight header</span>

			</label>

			<label>

				<input
					type="checkbox"
					ref="same-width"
					@change="sameWidth_OnChange()"
				>
				<span>Same width columns</span>

			</label>

			<label>

				<span>Columns minimum width</span>
				<input
					type="number"
					ref="min-width"
					min="2"
					value="6"
					@input="onInput()"
				>

			</label>

			<form>
				<p>Table style:</p>

				<div class="train-drift">

					<label class="rm-xl">

						<input
							type="radio"
							value="mysql"
							name="style"
							checked
						>
						<span>MySQL</span>

						<div>
							<pre class="ladder">
						<code class="demo">+--------+--------+</code>
						<code class="demo">| Header | Header |</code>
						<code class="demo">+--------+--------+</code>
						<code class="demo">|   data |   data |</code>
						<code class="demo">|   data |   data |</code>
						<code class="demo">+--------+--------+</code>
						</pre>
						</div>

					</label>

					<label>

						<input
							type="radio"
							value="ascii"
							name="style"
						>
						<span>Ascii</span>

						<div class="train">

							<div>
								<pre class="ladder">
								<code class="demo">╔════════╤════════╗</code>
								<code class="demo">║ Header │ Header ║</code>
								<code class="demo">╟────────┼────────╢</code>
								<code class="demo">║   data │   data ║</code>
								<code class="demo">║   data │   data ║</code>
								<code class="demo">╚════════╧════════╝</code>
								</pre>
							</div>

							<div class="ladder lm-m">

								<label>
									<input
										type="radio"
										value="ascii-double-border"
										name="ascii-border-style"
										checked
									>
									<span>Double border</span>
								</label>

								<label>
									<input
										type="radio"
										value="ascii-single-border"
										name="ascii-border-style"
									>
									<span>Single border</span>
								</label>

							</div>

						</div>

					</label>

				</div>
			</form>

		</div>

	</div>

</template>

<script>

import columnVue from './column.vue';
import rowVue from './row.vue';
import tableCalibratorVue from './table-calibrator.vue';
import { head } from './../../units/absx.js';

export default {

	components: {

		'app-table-calibrator': tableCalibratorVue,
		'app-column': columnVue,
		'app-row': rowVue
	},

	data() {

		return {
			tableHeader: ['H1', 'H2', 'H3'],
			table: [['1', '2', '3'], ['4', '5', '6']]
		};
	},

	methods: {

		showData() {

			console.log(this.tableHeader);

			console.log(this.table);

			console.log('mw', this.minWidth);
		},

		maxCharsColumn(index) {

			const maxBody = this.table.reduce((acc, cur) => {

				const len = cur[index].length;

				return Math.max(len, acc);

			}, 0);

			const maxHeader = this.tableHeader[index].length;

			return Math.max(maxHeader, maxBody);
		},

		maxCharsAllColumns() {


			const maxHeader = Math.max(...this.tableHeader.map(x => x.length));

			const maxBody = this.table.reduce((acc, cur) => {

				const maxCur = Math.max(...cur.map(x => x.length));
				return Math.max(maxCur, acc);
			}, 0);

			return Math.max(maxHeader, maxBody);
		},

		// TODO:: discriminar
		onInput() {

			head(this.$root.$children).$refs['output'].$forceUpdate();
		},

		highlightHeader_OnChange() {

			head(this.$root.$children).$refs['output'].$forceUpdate();
		},

		sameWidth_OnChange() {

			head(this.$root.$children).$refs['output'].$forceUpdate();
		}

	},

	computed: {

		columnsCount() {

			return head(this.table).length;
		},

		rowsCount() {

			return this.table.length;
		},		
	},

}
</script>

<style scoped>
code.demo {
	font-family: "Courier New", Courier, monospace;
	font-size: 8pt;
}
</style>
