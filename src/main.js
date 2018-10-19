import ImagesDlg from '../components/imagesDialog.vue';
import Vue from 'vue';
let mountedElement = document.createElement('DIV');
document.body.appendChild(mountedElement);
let vm = new Vue({
    data:{
        show:false
    },
    template:`<imgs-dlg v-bind:show="show"></imgs-dlg>`,
    components:{
        'imgs-dlg':ImagesDlg
    }    
}).$mount(mountedElement);
chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
      if (request && request.action == "imgpack"){
            vm.show = !vm.show;
      }
  });