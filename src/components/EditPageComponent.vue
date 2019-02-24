<template>
    <div class="CodeMirror-container" ref="cmContainer">
        <codemirror v-model="code" :options="cmOptions" ref="codemirror"></codemirror>
    </div>
</template>
<style>
    @import '../../node_modules/codemirror/lib/codemirror.css';
    @import '../../node_modules/codemirror/theme/monokai.css';
    /* @import '../../node_modules/codemirror/addon/hint/show-hint.css'; */
    .CodeMirror-container{
        width: 100%;
        height: 100%;
        margin: 0;
        padding: 10px 30px;
        box-sizing: border-box;
        overflow: auto;
    }
    .CodeMirror{
        font-family: Consolas, 'Courier New', monospace;
    }
     
    /* .CodeMirror-hints{
        font-family: Consolas, 'Courier New', monospace;
        border-radius:0px;
    } */
</style>

<script>
import {codemirror} from 'vue-codemirror';
import '../../node_modules/codemirror/mode/javascript/javascript.js';
// import '../../node_modules/codemirror/addon/hint/show-hint.js';
// import '../../node_modules/codemirror/addon/hint/javascript-hint.js';
// import '../../node_modules/codemirror/addon/hint/anyword-hint.js';
export default {
    data() {
        return {
            code:`function getImages(){
                
            }`,
            cmOptions:{
                lineNumbers:true,
                mode:'text/javascript',
                theme:'monokai'
            }
        }
    },
    methods: {
        // onInputRead(cm){
        //     cm.showHint(/*{container:this.$refs.cmContainer}*/);
        // }
    },
    mounted () {
        // this.$nextTick(()=>{
        //     this.$refs.codemirror.cminstance.setSize('100%',(this.$refs.cmContainer.clientHeight - 20) + 'px');
        // })
        
    },
    components:{
        codemirror
    }
}
</script>
