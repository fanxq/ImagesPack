<template>
    <div class="modal">
        <header class="modal-header">
            <h3>ImagesPack</h3>
            <span class="btn-close" @click="onClose">&#10006;</span>
        </header>
        <section class="modal-body">
            <nav class="nav">
                菜单
                <ul>
                    <li v-for="(item, index) in menus" :key="index" 
                        @click="componentId = item.componentId"
                        v-bind:class="[{active:item.componentId === componentId}]">
                        {{item.title}}
                    </li>
                </ul>
            </nav>
            <keep-alive>
                <component :is="componentId" @run="onRunScript" @scriptError="onRunScriptError" ref="page"></component>
            </keep-alive>
        </section>
    </div>
</template>
<style scoped>
    .modal{
        height: 100%;
        display: flex;
        flex-direction: column;
        box-shadow: 0px 0px 5px 2px #888;  
    }
    .modal-header{
        padding: 0px 10px;
        background-color:#007acc;
        color: white;
        margin: 0;
        position: relative;
    }
    .modal-body{
        flex: 1;
        width: 100%;
        background-color: white;
        position: relative;
        overflow: hidden;
    }
    .btn-close{
        position: absolute;
        right: 10px;
        top: 50%;
        display: block;
        transform: translateY(-50%);
        cursor: default;
    }
    .nav{
        width: 50px;
        height: 50px;
        text-align: center;
        line-height: 50px;
        background-color: rgba(8, 6, 6, 0.35);
        color: white;
        position: absolute;
        left: 4px;
        top:4px;
        cursor: default;
        z-index: 99999;
    }
    .nav>ul{
        display: none;
        padding: 0px;
        margin: 0px;
        position: absolute;
        top:50px;
        list-style: none;
        background-color: inherit;
    }
    .nav>ul li{
        width: 50px;
        height: 50px;
    }
    .nav:hover>ul{
        display: block;
    }
    .nav>ul li:hover{
        background-color:  rgba(8, 6, 6, 0.65);
    }
    .nav>ul li.active{
        background-color: rgba(8, 6, 6, 0.83);
    }
</style>
<script>
import DownloadPageComponent from './DownloadPageComponent';
import EditPageComponent from './EditPageComponent';
export default {
    data() {
        return {
            menus:[
                {title:'下载',componentId:'download-page'},
                {title:'编辑',componentId:'editor-page'}
            ],
            componentId:null
        }
    },
    props:['visible'],
    watch:{
        visible:{
            handler(val){
                if(val && !this.componentId){
                    this.componentId = 'download-page'
                }
            },
            immediate:true
        }
    },
    methods: {
        onClose(){
            this.$emit('close');
        },
        onRunScript(){
            this.componentId = 'download-page';
            this.$nextTick(()=>{
                 let downloadPage = this.$refs.page;
                if(downloadPage && downloadPage.setImagesByRunningScript){
                    downloadPage.setImagesByRunningScript();
                }
            });    
        },
        onRunScriptError(error){
            this.componentId = 'editor-page';
            this.$nextTick(()=>{
                 let editorPage = this.$refs.page;
                if(editorPage && editorPage.showError){
                    editorPage.showError(error);
                }
            });    
        }
    },
    components:{
        'download-page':DownloadPageComponent,
        'editor-page':EditPageComponent
    }
}
</script>


