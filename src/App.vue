<template>
	<div
		id="app"
		class="page-container"
	>
		<app-header msg="MARKDOWN ASCII TABLE GENERATOR" />

		<app-input ref="input" />

		<app-output ref="output" />

	</div>
</template>

<script>
import headerVue from './components/header.vue';
import inputVue from './components/input';
import outputVue from './components/output';

export default {
	name: 'App',
	components: {
		'app-header': headerVue,
		'app-input': inputVue,
		'app-output': outputVue
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
