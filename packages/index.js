import FdButton from "./button/index.js";

const components = [
    FdButton
];
const FdUI = {
    FdButton
}

FdUI.install = Vue => {
    components.forEach(component => Vue.component(component.name, component));
};

export default FdUI;

export {
    FdButton
}