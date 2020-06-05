import Vue from 'vue';
import Index from './index.vue';
import router from './router/index';
import FdUI from '../packages/index';
// import FdUI from 'ui-pkg';
// import 'ui-pkg/lib/theme/index.css';
// import FdButton from 'ui-pkg';
// import 'ui-pkg/lib/theme/button.css';
Vue.use(FdUI);
// Vue.use(FdButton);

import demoBlock from './components/demo-block.vue';
Vue.component('demo-block', demoBlock);

let app = new Vue({
    el: '#app',
    router,
    render: h => h(Index)
});
