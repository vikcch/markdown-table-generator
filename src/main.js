import Vue from 'vue';
import App from './App.vue';

Vue.config.productionTip = false;

import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
Vue.use(VueSweetalert2);

import './assets/global.css';

window.EventVue = new Vue;

new Vue({
	render: h => h(App),
}).$mount('#app');

// STOPSHIP:: não usar varios index.vue... o debugger falha no browser

// TODO:: remover absx e fxnl desnecessarios

// TODO:: desintalar sweetAlert

// TODO:: remomear column.vue para cell

// TODO:: comentário... 14 estilos => https://ozh.github.io/ascii-tables/

// TODO:: estilo html <table></table>

// TODO:: hand nos tableStyles label