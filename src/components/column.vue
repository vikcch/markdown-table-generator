<template>

	<td>

		<input
			type="text"
			ref="cell"
			class="cell"
			:value="intel.value"
			@change="onChange()"
		>

	</td>

</template>

<script>
export default {

	props: {
		intel: Object
	},

	methods: {

		onChange() {

			const { index } = this.intel;

			const text = this.$refs['cell'].value;

			this.$parent.$props.intel[index] = text;
		}
	}
}
</script>

<style scoped>
.cell {
	border: 1px solid gray;
	padding: 4px 8px;
}
</style>