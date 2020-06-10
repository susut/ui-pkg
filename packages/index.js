import UiButton from "./button/index.js";

const components = [
    UiButton
];
const Ui = {
    UiButton
}

Ui.install = Vue => {
    components.forEach(component => Vue.component(component.name, component));
};

export default Ui;

export {
    UiButton
}
