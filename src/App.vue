<template>
	<div
		id="app"
		class="page-container"
	>
		<app-header />

		<app-input ref="input" />

		<app-output ref="output" />

		<app-footer />
	</div>
</template>

<script>
import headerVue from './components/header';
import inputVue from './components/input/input';
import outputVue from './components/output/output';
import footerVue from './components/footer';

export default {
	name: 'App',
	components: {
		'app-header': headerVue,
		'app-input': inputVue,
		'app-output': outputVue,
		'app-footer': footerVue
	},

	mounted() {

		document.body.addEventListener('keydown', (event) => {

			const arrowsCode = [37, 38, 39, 40];

			if (event.ctrlKey && arrowsCode.includes(event.keyCode)) {

				event.preventDefault();
			}
		});
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
