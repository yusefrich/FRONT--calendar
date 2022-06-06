import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import mitt from 'mitt';
import { Icon } from '@altipla/fa6-icon'
import './icons'
import store from "./store"

const app = createApp(App);
const emitter = mitt();

app.use(router);
app.use(store);
app.component(Icon.name, Icon)
app.directive('clickoutside', {
    bind(el, binding, vnode) {
        el.clickOutsideEvent = (event) => {
            if (!(el === event.target || el.contains(event.target))) {
            vnode.context[binding.expression](event);
            }
        };
        document.body.addEventListener("click", el.clickOutsideEvent);
    },
    unbind(el) {
        document.body.removeEventListener("click", el.clickOutsideEvent);
    },
})
app.provide('emitter', emitter);
app.mount("#app");
