<template>
    <div class="CodeMirror-container" ref="cmContainer">
        <codemirror v-model="code" :options="cmOptions" ref="codemirror" v-on:input-read="onInputRead"></codemirror>
        <div style="position:absolute;right:40px;bottom:40px;">
            <button class="btn" style="margin-right:5px;" @click="onSave" title="保存脚本"><v-icon name="save"/></button>
            <button class="btn" @click="onRun" title="运行脚本"><v-icon name="play"/></button>
        </div>
        <message-box :type="msgBoxType" v-bind:visible.sync="showMsgBox">{{msg}}</message-box>
    </div>
</template>
<style>
    @import '../../node_modules/codemirror/lib/codemirror.css';
    @import '../../node_modules/codemirror/theme/material.css';
    @import '../../node_modules/codemirror/addon/hint/show-hint.css';
    @import url(https://cdn.jsdelivr.net/gh/tonsky/FiraCode@1.206/distr/fira_code.css);
    .CodeMirror-container{
        width: 100%;
        height: 100%;
        margin: 0;
        padding: 0;
        position: relative;
    }
    .CodeMirror{
        font-family:'Fira Code', Consolas, 'Courier New', monospace;
        font-variant-ligatures: contextual;
    }
     
    .CodeMirror-hints{
        font-family: Consolas, 'Courier New', monospace;
        border-radius:0px;
    }
    .CodeMirror-hints::-webkit-scrollbar{
        background-color: transparent;
        width: 4px;
    }
    .CodeMirror-hints::-webkit-scrollbar-thumb{
        background-color: #afafaf;
        border-radius: 2px;
    }
    .CodeMirror-hints::-webkit-scrollbar-track{
        background: transparent;
    }
    .CodeMirror-vscrollbar{
        background: transparent;
        border-left: 1px solid #505050;
    }
    .CodeMirror-vscrollbar::-webkit-scrollbar{
        background: transparent;
        width: 14px;
    }
    .CodeMirror-vscrollbar::-webkit-scrollbar-thumb{
        background: transparent;
    }
    .CodeMirror-vscrollbar::-webkit-scrollbar-track{
        background: transparent;
    }
    .CodeMirror-hscrollbar{
        background: transparent;
        border: none;
        /* border-left: 1px solid #505050; */
    }
    .CodeMirror-hscrollbar::-webkit-scrollbar{
        background: transparent;
        height: 14px;
    }
    .CodeMirror-hscrollbar::-webkit-scrollbar-thumb{
        background: transparent;
    }
    .CodeMirror-hscrollbar::-webkit-scrollbar-track{
        background: transparent;
    }
    .CodeMirror-scrollbar-filler{
        background: transparent;
        width: 15px !important;
        height: 16px !important;
        border-left: 1px solid #505050;
        border-top: 1px solid #505050;
    }
    .btn{
        background-color: #f35529b9;
        color: #ffffff;
        outline: none;
        border: none;
        box-shadow: 0px 0px 2px 0px rgb(158, 157, 157);
        width: 40px;
        height: 40px;
        border-radius: 100%;
        display: inline-flex;
        justify-content: center;
    }
    .btn:hover{
        background-color: #f35529e7;
    }
    .vue-codemirror:hover .CodeMirror-vscrollbar::-webkit-scrollbar-thumb{
        background: rgba(79, 79, 79, 0.45);
    }
    .vue-codemirror:hover .CodeMirror-hscrollbar::-webkit-scrollbar-thumb{
        background: rgba(79, 79, 79, 0.45);
    }
</style>

<script>
import {codemirror} from 'vue-codemirror';
import '../../node_modules/codemirror/mode/javascript/javascript.js';
import '../codeMirrorAddon/hint/show-hint.js';
import '../codeMirrorAddon/hint/javascript-hint.js';
import '../../node_modules/codemirror/addon/hint/anyword-hint.js';
import '../../node_modules/codemirror/addon/edit/closebrackets.js';
import '../../node_modules/codemirror/addon/edit/matchbrackets.js';
import '../../node_modules/vue-awesome/icons/save.js';
import '../../node_modules/vue-awesome/icons/play.js';
import Icon from '../../node_modules/vue-awesome/components/Icon';
import MessageBoxComponent from './MessageBoxComponent';
let _code = [
                '//编写获取图片的函数',
                'function getImages(vm){',
                '\t//设置vm.imageSrcList即可设置图片下载列表',
                '\tvm.imageSrcList.splice(0, vm.imageSrcList.length, ...Array.from(new Set(Array.from(document.images).map(x=>x.src))));',
                '}'
            ].join('\r\n');
let code = localStorage.getItem('Script4GettingImages') || _code;
export default {
    data() {
        return {
            code:code,
            cmOptions:{
                lineNumbers:true,
                mode:'text/javascript',
                theme:'material',
                autoCloseBrackets:true,
                matchBrackets:true
            },
            showMsgBox:false,
            msg:'',
            msgBoxType:'alert'
        }
    },
    methods: {
        onInputRead(cm){
            cm.showHint({container:this.$refs.codemirror.$el});
        },
        onSave(){
            if(this.code){
                localStorage.setItem('Script4GettingImages',this.code);
                this.msgBoxType = 'msg';
                this.msg = '保存成功！';
                this.showMsgBox = true;
            }
        },
        onRun(){
            if(this.code){
                localStorage.setItem('Script4GettingImages',this.code);
                this.$emit('run');
            }
        },
        showError(error){
            this.msgBoxType = 'alert';
            this.showMsgBox = true;
            this.msg = error;
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
        codemirror,
        'message-box':MessageBoxComponent,
        'v-icon':Icon
    }
}
</script>
