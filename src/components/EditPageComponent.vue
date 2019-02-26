<template>
    <div class="CodeMirror-container" ref="cmContainer">
        <codemirror v-model="code" :options="cmOptions" ref="codemirror" v-on:input-read="onInputRead"></codemirror>
    </div>
</template>
<style>
    @import '../../node_modules/codemirror/lib/codemirror.css';
    @import '../../node_modules/codemirror/theme/monokai.css';
    @import '../../node_modules/codemirror/addon/hint/show-hint.css';
    .CodeMirror-container{
        width: 100%;
        height: 100%;
        margin: 0;
        padding: 0;
        /* overflow: hidden; */
    }
    .CodeMirror{
        font-family: Consolas, 'Courier New', monospace;
    }
     
    .CodeMirror-hints{
        font-family: Consolas, 'Courier New', monospace;
        border-radius:0px;
    }
</style>

<script>
import {codemirror} from 'vue-codemirror';
import '../../node_modules/codemirror/mode/javascript/javascript.js';
import '../codeMirrorAddon/hint/show-hint.js';
import '../../node_modules/codemirror/addon/hint/javascript-hint.js';
import '../../node_modules/codemirror/addon/hint/anyword-hint.js';
import '../../node_modules/codemirror/addon/edit/closebrackets.js';
export default {
    data() {
        return {
            code:[
                '//编写获取图片的函数',
                'function getImages(vm){',
                '\t//设置vm.imageSrcList即可设置图片下载列表',
                '\tvm.imageSrcList.splice(0, vm.imageSrcList.length, ...Array.from(new Set(Array.from(document.images).map(x=>x.src))));',
                '}'
            ].join('\r\n'),
            cmOptions:{
                lineNumbers:true,
                mode:'text/javascript',
                theme:'monokai',
                autoCloseBrackets:true
            }
        }
    },
    methods: {
        onInputRead(cm){
            cm.showHint({container:this.$refs.codemirror.$el});
        }
    },
    mounted () {
        this.$nextTick(()=>{
            this.$refs.codemirror.cminstance.setSize('100%',this.$refs.cmContainer.clientHeight + 'px');
        });
        window.addEventListener('resize',()=>{
            this.$nextTick(()=>{
                this.$refs.codemirror.cminstance.setSize('100%',this.$refs.cmContainer.clientHeight + 'px');
            }); 
        });   
    },
    components:{
        codemirror
    }
}
</script>
