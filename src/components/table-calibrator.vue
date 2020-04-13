<template>

	<div>
		<!-- <p>{{ this.$parent.$data['rows'] }}</p> -->
        <p>{{intel.name}}s:</p>

		<button
			class="button button-red"
			@click="remove()"
		>Remove {{ intel.name }}</button>
		
        <span class="intel-value"> {{ intel.value }}</span>
		
        <button
			class="button button-green"
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

			if (this.intel.value > 1) {

				--this.$parent.$data[this.intel.key];
			}
		},

		add() {

			this.$parent.$data[this.intel.key]++;
		}
	}

}
</script>

<style scoped>
.button-red {
	color: white;
	background-color: rgb(221, 51, 51);
}

.button-green {
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

.button:hover {
	background-image: linear-gradient(rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.1));
	/* filter: brightness(95%); */
}

.intel-value{

    font-size: 18px;
    font-weight: bold;

    margin: 0 8px;
}
</style>

