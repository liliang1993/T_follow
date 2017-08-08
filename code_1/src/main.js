import Vue from 'vue';
import i18n from './i18n';
// element-ui
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-default/index.css';
Vue.use(ElementUI);

Vue.config.productionTip = true;
Vue.config.devtools      = true;


import router from 'router/';
import 'register/';
import store from 'store/';

//bel-table
import BelTable from 'vue-bel-table'
Vue.use(BelTable);

import App from './App';

new Vue({
    el: '#app',
    router,
    store,
    template: '<App/>',
    components: {App}
})
