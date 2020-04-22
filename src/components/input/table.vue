<template>

	<div class="badge scroll-auto">

		<table
			class="bm-m"
			ref="table"
			@keyup="onKeyUp"
			cellspacing="2"
		>

			<thead>

				<app-cell
					v-for="(col,index) in tableHead"
					:key="index"
					:intel="{value:col, index:index, key:'header'}"
				/>

			</thead>

			<tbody>

				<app-row
					v-for="(row, index) in tableBody"
					:key="index"
					:intel="row"
				/>

			</tbody>

		</table>
		<kbd>Ctrl</kbd> + <kbd>Arrows</kbd> to navigate
	</div>
</template>

<script>

import cellVue from './cell.vue';
import rowVue from './row.vue'

export default {

	props: {
		tableHead: Array,
		tableBody: Array,
	},

	components: {
		'app-cell': cellVue,
		'app-row': rowVue,
	},

	methods: {

		onKeyUp(event) {

			const arrowsCode = [37, 38, 39, 40];

			if (!event.ctrlKey || !arrowsCode.includes(event.keyCode)) {

				return;
			}

			const { key } = event;

			const { columnsCount, rowsCount } = this.$parent;

			const tdFocused = document.activeElement.parentNode

			const tds = this.$refs['table'].querySelectorAll('td');

			const tdFocusedIndex = Array.from(tds).indexOf(tdFocused);

			const coords = {

				x: tdFocusedIndex % columnsCount,
				y: Math.floor(tdFocusedIndex / columnsCount)
			};

			// coords (x,y) => zero based
			const getIndex = ({ x, y }) => y * columnsCount + x;

			const work = {

				'ArrowUp': coords.y === 0
					? getIndex({ x: coords.x, y: rowsCount })
					: getIndex({ x: coords.x, y: coords.y - 1 }),

				'ArrowLeft': coords.x === 0
					? getIndex({ x: columnsCount - 1, y: coords.y })
					: getIndex({ x: coords.x - 1, y: coords.y }),

				'ArrowRight': coords.x === columnsCount - 1
					? getIndex({ x: 0, y: coords.y })
					: getIndex({ x: coords.x + 1, y: coords.y }),

				'ArrowDown': coords.y === rowsCount
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

kbd {
	background-color: #eee;
	border-radius: 3px;
	border: 1px solid #b4b4b4;
	box-shadow: 0 1px 1px rgba(0, 0, 0, 0.2),
		0 2px 0 0 rgba(255, 255, 255, 0.7) inset;
	color: #333;
	display: inline-block;
	font-size: 0.85em;
	font-weight: 700;
	line-height: 1;
	padding: 2px 4px;
	white-space: nowrap;
}

.scroll-auto {
	overflow-x: auto;
}
</style>