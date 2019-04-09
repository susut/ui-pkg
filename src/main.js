import Vue from 'vue';
import Index from './index.vue';
// import FdUI from 'ui-pkg';
import FdUI from '../packages/index.js';

Vue.use(FdUI);

let app = new Vue({
    el: '#app',
    render: h => h(Index)
});