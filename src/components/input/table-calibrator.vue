<template>

	<div class="badge rm-xl">

		<p class="bm-s">{{intel.name}}s:</p>

		<div class="train">

			<button
				:class="['button', styleStateRed]"
				@click="remove()"
				:disabled="isDisabled"
			>-</button>

			<p class="intel-value"> {{ intel.value }}</p>

			<button
				class="button button--green"
				@click="add()"
			>+</button>

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

				row: () => this.$parent.tableBody.pop(),

				column: () => {

					this.$parent.tableHead.pop();
					this.$parent.tableBody.forEach(e => e.pop());
				}
			};

			work[this.intel.key].call();
		},


		add() {

			const columnsCount = this.$parent.columnsCount;

			const work = {

				row: () => {

					const arr = Array(columnsCount).fill('');
					this.$parent.tableBody.push(arr);
				},

				column: () => {

					this.$parent.tableHead.push('');
					this.$parent.tableBody.forEach(e => e.push(''));
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
	border: 1px solid #dc3545;
}

.button--green {
	color: white;
	background-color: #218838;
	border: 1px solid #1e7e34;
}

.button {
	padding: 6px 10px;
	border-radius: 6px;
	cursor: pointer;
	font-size: 18px;
	font-family: "Courier New", Courier, monospace;
	font-weight: bold;

	text-shadow: 0 -1px 0 rgba(0, 0, 0, 0.3);
	box-shadow: 0 1px 0 rgba(255, 255, 255, 0.2) inset;
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

.badge {
	padding: 8px;
	background-color: #fafafa;
	border-radius: 3px;
	border: 1px solid #b4b4b4;
	box-shadow: 0 1px 1px rgba(0, 0, 0, 0.2),
		0 2px 0 0 rgba(255, 255, 255, 0.7) inset;
}
</style>

