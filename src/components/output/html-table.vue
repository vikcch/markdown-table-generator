<template>

	<div>{{htmlTable}}</div>

</template>

<script>
import { head } from '../../units/absx';
import { addTextToTag } from '../../units/fxnl';
export default {

	props: {

		intel: Object,
	},

	computed: {

		htmlTable() {

			const tr = addTextToTag('tr');
			const th = addTextToTag('th');
			const td = addTextToTag('td');

			const thEls = this.$props.intel.tableHead.map(v => th(v)).join('');

			const thead = addTextToTag('thead')(tr(thEls));

			const makeTRs = arr => tr(arr.map(v => td(v)).join(''));

			const trEls = this.$props.intel.tableBody.map(makeTRs).join('');

			const tbody = addTextToTag('tbody')(trEls);

			const table = addTextToTag('table')(`${thead}${tbody}`);

			return table;
		}
	},
}
</script>

<style>
</style>