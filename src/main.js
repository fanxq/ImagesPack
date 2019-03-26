import "./images-pack.js";

let vueApp = new Vue({
  data: {
    show: false
  },
  methods: {
    onClose() {
      this.show = false;
    }
  },
  template: '<images-pack @close="onClose" style="width:80%;height:80%;min-width:500px;min-height:500px;position:fixed;top:10%;left:10%;margin:0;padding:0px;z-index:999999;font-family:Microsoft YaHei;font-size:14px;" v-show="show"></images-pack>'
}).$mount();
document.body.appendChild(vueApp.$el);
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request && request.action == "imgpack") {
    vueApp.show = !vueApp.show;
  }
});