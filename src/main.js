import "./images-pack.js";
import {
  crxDialog
} from './assets/css/global.css';


let vueApp = new Vue({
  data: {
    show: false,
    crxDialog
  },
  methods: {
    onClose() {
      this.show = false;
    }
  },
  template: `<images-pack @close="onClose" :class="[crxDialog]" v-show="show" :visible="show"></images-pack>`
}).$mount();
document.body.appendChild(vueApp.$el);
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request && request.action == "imgpack") {
    vueApp.show = !vueApp.show;
  }
});