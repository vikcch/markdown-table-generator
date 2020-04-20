<template>

	<div class="badge">

		<table
			ref="table"
			@keyup="onKeyUp"
            cellspacing="2"
		>

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

	</div>
</template>

<script>
import columnVue from './column.vue'
import rowVue from './row.vue'

export default {

	props: {
		tableHeader: Array,
		table: Array,
	},

	components: {
		'app-column': columnVue,
		'app-row': rowVue,
	},

	methods: {

		onKeyUp(event) {

			const arrowsCode = [37, 38, 39, 40];

			if (!event.ctrlKey || !arrowsCode.includes(event.keyCode)) {

				return;
			}

			const { key } = event;

			const tdFocused = document.activeElement.parentNode

			const tds = this.$refs['table'].querySelectorAll('td');

			const tdFocusedIndex = Array.from(tds).indexOf(tdFocused);

			const coords = {

				x: tdFocusedIndex % this.columnsCount,
				y: Math.floor(tdFocusedIndex / this.columnsCount)
			};

			// coords (x,y) => zero based
			const getIndex = ({ x, y }) => y * this.columnsCount + x;

			const work = {

				'ArrowUp': coords.y === 0
					? getIndex({ x: coords.x, y: this.rowsCount })
					: getIndex({ x: coords.x, y: coords.y - 1 }),

				'ArrowLeft': coords.x === 0
					? getIndex({ x: this.columnsCount - 1, y: coords.y })
					: getIndex({ x: coords.x - 1, y: coords.y }),

				'ArrowRight': coords.x === this.columnsCount - 1
					? getIndex({ x: 0, y: coords.y })
					: getIndex({ x: coords.x + 1, y: coords.y }),

				'ArrowDown': coords.y === this.rowsCount
					? getIndex({ x: coords.x, y: 0 })
					: getIndex({ x: coords.x, y: coords.y + 1 }),
			};

			key in work && tds[work[key]].firstChild.focus();
		}

	}

}
</script>

<style scoped>
.badge {
	padding: 8px;
	background-color: #fafafa;
	border-radius: 3px;
	border: 1px solid #b4b4b4;
	box-shadow: 0 1px 1px rgba(0, 0, 0, 0.2),
		0 2px 0 0 rgba(255, 255, 255, 0.7) inset;
}
</style>