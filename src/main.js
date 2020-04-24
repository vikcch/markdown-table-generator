import Vue from 'vue';
import App from './App.vue';

Vue.config.productionTip = false;

import './assets/global.css';

window.EventVue = new Vue;

import Analytics from 'analytics'
import googleAnalytics from '@analytics/google-analytics'

Analytics({
	app: 'Markdown Table Generator',
	plugins: [
		googleAnalytics({
			trackingId: 'UA-146771103-5'
		})
	]
});

new Vue({
	render: h => h(App),
}).$mount('#app');

/* eslint-disable-next-line */
console.log(`
%cMarkdown Table Generator is open source! https://github.com/vikcch/markdown-table-generator`,
	'color:Chocolate; font-weight:bold');