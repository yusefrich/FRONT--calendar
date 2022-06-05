import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import { Icon } from '@altipla/fa6-icon'
import './icons'
import store from "./store"

const app = createApp(App);

app.use(router);
app.use(store);
app.component(Icon.name, Icon)
app.directive('click-outside', {
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
app.mount("#app");
