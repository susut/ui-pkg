import Vue from 'vue';
import Index from './index.vue';
import FdUI from 'ui-pkg';
// import 'ui-pkg/lib/theme/index.css';
// import FdButton from 'ui-pkg';
// import 'ui-pkg/lib/theme/button.css';
Vue.use(FdUI);
// Vue.use(FdButton);

let app = new Vue({
    el: '#app',
    render: h => h(Index)
});