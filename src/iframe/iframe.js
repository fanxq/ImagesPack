import ImagesDlg from '../components/imagesDialog.vue';
import Vue from 'vue';

let vm = new Vue({
    el:'#app',
    methods:{
        onClose:function(){
            //this.show = false;
            //to do
            //notify parent to hide imgs-dlg
        }
    },
    components:{
        'imgs-dlg':ImagesDlg
    }  
});


