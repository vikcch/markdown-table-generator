<template>
	<div
		id="app"
		class="page-container"
	>
		<app-header msg="MARKDOWN ASCII TABLE GENERATOR" />
		<app-input />
	</div>
</template>

<script>
import Header from './components/header.vue'
import Input from './components/input.vue'

export default {
	name: 'App',
	components: {
		'app-header': Header,
		'app-input': Input
	}
}
</script>

<style>
#app {
	font-family: "Open Sans", Arial, Helvetica, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	font-size: 15px;

	color: #6a737c;
}

.page-container {
	max-width: 960px;
	margin: auto;
}
</style>
