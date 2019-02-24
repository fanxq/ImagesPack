import styles from "../style.css";
import stylesContent from './styles.js';
import ImagesDlg from './components/imagesDialog.vue';
import Vue from 'vue';

let show = false;
let overlay = document.createElement('DIV');
overlay.classList.add(styles.overlay);
overlay.style.display = 'none';
document.body.appendChild(overlay);
let container = document.createElement('DIV');
container.classList.add(styles.main);
overlay.appendChild(container);
let shadowRoot = container.attachShadow({
    mode: 'open'
});
shadowRoot.resetStyleInheritance = false;
let appElement = document.createElement('div');
let styleElement = document.createElement('style');
styleElement.innerText = stylesContent;
shadowRoot.appendChild(appElement);
shadowRoot.appendChild(styleElement);
new Vue({
    template: `<imgs-dlg v-on:close="onClose"></imgs-dlg>`,
    methods: {
        onClose: function () {
            overlay.style.display = 'none';
        }
    },
    components: {
        'imgs-dlg': ImagesDlg
    }
}).$mount(appElement);

chrome.runtime.onMessage.addListener(
    function (request, sender, sendResponse) {
        if (request && request.action == "imgpack") {
            show = !show;
            if (show) {
                overlay.style.display = 'block';
            } else {
                overlay.style.display = 'none';
            }
        }
    });