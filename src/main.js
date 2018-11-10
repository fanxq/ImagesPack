// import ImagesDlg from '../components/imagesDialog.vue';
// import Vue from 'vue';
// let mountedElement = document.createElement('DIV');
// document.body.appendChild(mountedElement);
// let vm = new Vue({
//     data:{
//         show:false
//     },
//     template:`<imgs-dlg v-bind:show="show" v-on:close="onClose"></imgs-dlg>`,
//     methods:{
//         onClose:function(){
//             this.show = false;
//         }
//     },
//     components:{
//         'imgs-dlg':ImagesDlg
//     }    
// }).$mount(mountedElement);
import styles from "../style.css";

let show = false;
let overlay = document.createElement('DIV');
overlay.classList.add(styles.overlay);
overlay.style.display = 'none';
let container = document.createElement('DIV');
container.classList.add(styles.main);
overlay.appendChild(container);
let iframe = document.createElement('IFRAME');
iframe.src = chrome.extension.getURL('iframe.html');
iframe.frameborder = '0';
iframe.scrolling = 'no';
iframe.width = '100%';
iframe.height = '100%';
container.appendChild(iframe);
document.body.appendChild(overlay);
chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        if (request && request.action == "imgpack"){
            //vm.show = !vm.show;
            show = !show;
            if(show){
                overlay.style.display = 'block';
            }else{
                overlay.style.display = 'none';
            }
        }
});

