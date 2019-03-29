<template>
    <div class="msg-box" v-bind:class="{overlay:isModal}" v-show="visible">
        <div class="msg-box-body" v-if="type === 'loading'">
            <span class="indicator"></span>
            <span>
                <slot>加载中...</slot>
            </span>
        </div>
        <div class="msg-box-body alert" v-else-if="type === 'alert'">
            <div><span class="btn-close" @click="onClose" title="关闭">&#10006;</span></div>
            <div class="alert-body">
                <slot>提示信息...........</slot>
            </div>
        </div>
        <div class="msg-box-body msg" v-else>
            <span style="color:#fff;">
                <slot>提示信息</slot>
            </span>
        </div>
    </div>
    
</template>
<style scoped>
    .msg-box{
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: 99999;
        pointer-events: none;
    }
    .overlay{
        background-color: rgba(128,128,128,0.5);
        pointer-events: initial;
    }
    .msg-box-body{
        padding: 20px;
        display: inline-flex;
        position: absolute;
        background-color: #ffffff;
        left: 50%;
        top: 50%;
        transform: translate(-50%,-50%);
        z-index: 9999;
        align-items: center; 
    }
    .indicator{
        display: inline-block;
        box-sizing: border-box;
        width: 40px;
        height: 40px;
        border: 7px solid rgb(161, 160, 160);
        border-radius: 100%;
        position: relative;
        margin-right: 15px;
    }
    .indicator::before{
        content: '';
        position: absolute;
        top: -7px;
        left: -7px;
        width: 40px;
        height: 40px;
        border: 7px solid #007acc;
        border-bottom-color: transparent;
        border-right-color: transparent;
        border-left-color: transparent;
        border-radius: 100%;
        animation: spin 1.5s linear 0s infinite;
        box-sizing: border-box;
    }
    @keyframes spin {
        from{
            transform: rotate(0deg);
        }
        to{
            transform: rotate(360deg)
        }
    }
    .btn-close{
        float:right;
        margin-right:5px;
        cursor: default;
    }
    .alert{
        flex-flow: column;
        align-items:normal;
        padding:5px;
    }
    .alert-body{
        color: red; 
        margin:10px;
        max-width: 300px;
        min-width: 150px;
    }
    .msg{
        background-color: rgba(63, 63, 63, 0.35);
        max-width: 120px;
    }
</style>
<script>
export default {
    data() {
        return {
            isModal:true
        }
    },
    props:{
        type:{
            type:String,
            default:'msg'
        },
        visible:{
            type:Boolean,
            default:false
        }
    },
    watch:{
        type:{
            handler(val){
                if(val && val === 'msg'){
                    this.isModal = false;
                }else{
                    this.isModal = true;
                }
            },
            immediate:true
        },
        visible(val){
            if(val && !this.isModal){
                 setTimeout(()=>{
                    this.$emit('update:visible',false);
                }, 1200);
            }
        }
    },
    methods:{
        onClose(){
            this.$emit('update:visible',false);
        }
    }
}
</script>
