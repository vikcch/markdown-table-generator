<template>

	<div>

		<app-table-calibrator :intel="{name: 'Row', key:'rows', value: rows}" />

		<app-table-calibrator :intel="{name: 'Column', key:'columns', value: columns}" />

		<table>

			<thead
				ref="thead"
				class="table-header"
			>
				<tr>
					<th>
						<div
							contentEditable="true"
							class="cell"
						>
							H C1
						</div>
					</th>
					<th>
						<div
							contentEditable="true"
							class="cell"
						>
							H C2
						</div>
					</th>
					<th>
						<div
							contentEditable="true"
							class="cell"
						>
							H C3
						</div>
					</th>
				</tr>
			</thead>
			<tbody ref="tbody">
				<tr>
					<td>
						<div
							contentEditable="true"
							class="cell"
						>
							vik
						</div>
					</td>
					<td>
						<div
							contentEditable="true"
							class="cell"
						>
							rita
						</div>
					</td>
					<td>
						<div
							contentEditable="true"
							class="cell"
						>
							joana
						</div>
					</td>
				</tr>
			</tbody>

		</table>

	</div>

</template>

<script>
import tableCalibratorVue from './table-calibrator.vue';

const addTextToTag = tag => text => `<${tag}>${text}</${tag}>`;

const createElement = type => function (attributes, ...innerHTML) {

	const element = document.createElement(type);

	Object.entries(attributes).forEach(e => element.setAttribute(e[0], e[1]));

	// element.innerHTML = text;

	// return element;
	// return element.innerHTML = text, element;

	// TODO:: nota em tips.js como não posso usar:
	// return element.innerHTML = text;
	// const f = a => (a.b = 3, a);
	// const r = f({ b: 2 });
	// console.log(r);
	// retorna apenas a propriedade

	const isString = value => typeof value === 'string';

	const child = e => isString(e) ? document.createTextNode(e) : e;

	innerHTML.forEach(e => element.appendChild(child(e)));

	return element;
}

const tr = createElement('tr');
const th = createElement('th');
const td = createElement('td');

const createDivCellEl = () => createElement('div')({
	contentEditable: 'true', class: 'cell'
}, 'merda');

export default {

	components: {

		'app-table-calibrator': tableCalibratorVue
	},

	data() {

		return {
			rows: 1,
			columns: 3
		};
	},

	methods: {

		removeRow() {

			if (this.rows > 1) this.rows--;
		},

		removeColumn() {

			if (this.columns > 1) this.columns--;
		}
	},

	watch: {

		rows(value, oldValue) {

			const tbody = this.$refs['tbody'];

			const isAdding = value - oldValue > 0;

			if (isAdding) {

				const transformToElement = () => td({}, createDivCellEl());

				const row = Array.from(Array(this.columns)).map(transformToElement);

				// TODO:: explicar os 3 pontos ... é array mas "destroi" porque
				// o parametro aceita ...
				const elTableRow = tr({}, ...row);

				tbody.appendChild(elTableRow);

			} else tbody.removeChild(tbody.lastChild);

		},

		columns(value, oldValue) {

			const tbody = this.$refs['tbody'];

			const thead = this.$refs['thead'];

			const isAdding = value - oldValue > 0;

			if (isAdding) {

				const createCell = cellType => cellType({}, createDivCellEl());

				const appendCell = cellType => tableRowEl => {

					tableRowEl.appendChild(createCell(cellType));
				};

				tbody.children.forEach(appendCell(td));

				thead.children.forEach(appendCell(th));

			} else {

				const removeLastCell = tableRowEl => tableRowEl.removeChild(tableRowEl.lastChild);

				tbody.children.forEach(removeLastCell);

				thead.children.forEach(removeLastCell);
			}
		}
	}

}
</script>

<style scoped>
::v-deep .cell {
	border: 1px gray solid;
	padding: 2px 4px;
	margin: 2px;
}
.table-header {
	background-color: lightgray;
}
</style>