<template>

	<div>

		<p>{{intel.name}}s:</p>

		<div class="train">

			<button
				:class="['button', styleStateRed]"
				@click="remove()"
				:disabled="isDisabled"
			>Remove {{ intel.name }}</button>

			<p class="intel-value"> {{ intel.value }}</p>

			<button
				class="button button--green"
				@click="add()"
			>Add {{ intel.name }}</button>

		</div>

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

				column: () => {

					this.$parent.tableHeader.pop();
					this.$parent.table.forEach(e => e.pop());
				}
			};

			work[this.intel.key].call();
		},


		add() {

			const columnsCount = this.$parent.columnsCount;

			const work = {

				row: () => {

					const arr = Array(columnsCount).fill('');
					this.$parent.table.push(arr);
				},

				column: () => {

					this.$parent.tableHeader.push('');
					this.$parent.table.forEach(e => e.push(''));
				},
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

	width: 50px;
	text-align: center;
}
</style>

