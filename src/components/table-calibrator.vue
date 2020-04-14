<template>

	<div>

		<p>{{intel.name}}s:</p>

		<button
			:class="['button', styleStateRed]"
			@click="remove()"
			:disabled="isDisabled"
		>Remove {{ intel.name }}</button>

		<span class="intel-value"> {{ intel.value }}</span>

		<button
			class="button button--green"
			@click="add()"
		>Add {{ intel.name }}</button>

	</div>

</template>

<script>
export default {

	props: {
		intel: Object,
	},

	methods: {

		remove() {

			const work = {

				row: () => this.$parent.table.pop(),

				column: () => this.$parent.table.forEach(e => e.pop()),
			};

			work[this.intel.key].call();
		},


		add() {

			const columnsCount = this.$parent.columnsCount;

			const work = {

				row: () => this.$parent.table.push(Array(columnsCount)),

				column: () => this.$parent.table.forEach(e => e.push(Math.random(10))),
			};

			work[this.intel.key].call();
		},

	},
	computed: {

		isDisabled() {

			return this.intel.value < 2;
		},

		styleStateRed() {

			return `button--${this.isDisabled ? 'disabled' : 'red'}`;
		},
	}

}
</script>

<style scoped>
.button--red {
	color: white;
	background-color: rgb(221, 51, 51);
}

.button--green {
	color: white;
	background-color: #218838;
}

.button {
	padding: 10px;
	border: none;
	border-radius: 6px;
	cursor: pointer;
}

.button:active {
	/* background-image: linear-gradient(rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2)); */
	filter: brightness(90%);
}

.button:enabled:hover {
	background-image: linear-gradient(rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.1));
	/* filter: brightness(95%); */
}

.intel-value {
	font-size: 18px;
	font-weight: bold;

	margin: 0 8px;
}
</style>

