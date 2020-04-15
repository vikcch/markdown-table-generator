<template>

	<tr>

		<app-column
			v-for="(col,index) in intel"
			:key="index"
			:intel="{value:col, index:index, key:'body'}"
		/>

	</tr>

</template>

<script>
import columnVue from './column.vue';

export default {

	components: {

		'app-column': columnVue
	},

	props: {

		intel: Array
	}
}
</script>

<style>
</style>