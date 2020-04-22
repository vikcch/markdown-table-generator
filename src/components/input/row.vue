<template>

	<tr>

		<app-cell
			v-for="(col,index) in intel"
			:key="index"
			:intel="{value:col, index:index, key:'body'}"
		/>

	</tr>

</template>

<script>
import cellVue from './cell.vue'


export default {

	components: {

		'app-cell': cellVue
	},

	props: {

		intel: Array
	}
}
</script>

<style>
</style>