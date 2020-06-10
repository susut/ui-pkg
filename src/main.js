import Vue from 'vue';
import Index from './index.vue';
// import Ui from 'ui-pkg';
// import 'ui-pkg/lib/theme/index.css';
// import UiButton from 'ui-pkg';
// import 'ui-pkg/lib/theme/button.css';

import Ui from '../lib/index';

Vue.use(Ui);
// Vue.use(UiButton);

let app = new Vue({
    el: '#app',
    render: h => h(Index)
});
