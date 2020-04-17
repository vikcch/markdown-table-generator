import Vue from 'vue';
import App from './App.vue';

Vue.config.productionTip = false;

import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
Vue.use(VueSweetalert2);

import './assets/global.css';

new Vue({
  render: h => h(App),
}).$mount('#app');

// STOPSHIP:: não usar varios index.vue... o debugger falha no browser

// TODO:: Navegação pela tabala com as arrows

// TODO:: copy to clipboard

// TODO:: Spreadsheet (numeros antes da primeira coluna)

// TODO:: remover absx e fxnl desnecessarios

// TODO:: alinhamento do header e do body

