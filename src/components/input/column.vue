<template>

	<td>

		<input
			type="text"
			ref="cell"
			:class="['cell', styleState]"
			:value="intel.value"
			@input="onInput()"
		>

	</td>

</template>

<script>
import { head } from '../../units/absx';
export default {

	props: {

		intel: Object
	},

	methods: {

		onInput() {

			const { index } = this.intel;

			const text = this.$refs['cell'].value;

			const work = {

				header: () => this.$parent.$data.tableHeader[index] = text,

				body: () => this.$parent.$props.intel[index] = text,
			};

			work[this.intel.key].call();

			head(this.$root.$children).$refs['output'].$forceUpdate();
		}
	},

	computed: {

		styleState() {

			return `cell--${this.intel.key}`;
		}
	}
}
</script>

<style scoped>
.cell {
	border: 1px solid gray;
	padding: 4px 8px;
}

.cell--header {
	background-color: lightgrey;
}
</style>