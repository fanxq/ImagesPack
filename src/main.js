import ImagesDlg from '../components/imagesDialog.vue';
import Vue from 'vue';
let mountedElement = document.createElement('DIV');
document.body.appendChild(mountedElement);
new Vue({
    template:`<imgs-dlg></imgs-dlg>`,
    components:{
        'imgs-dlg':ImagesDlg
    }    
}).$mount(mountedElement);