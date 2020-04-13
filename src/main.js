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



const f = a => (a.b = 3, a);

console.log(f({ b: 2 }));

let c;
const x = c = 6;
console.log(x);