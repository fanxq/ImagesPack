<template>
    <div class="overlay">
        <div class="panel">
            <span class="indicator"></span>
            <span>
                <slot>加载中...</slot>
            </span>
        </div>
    </div>
    
</template>
<style scoped>
    .overlay{
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(128,128,128,0.5);
        z-index: 99999;
    }
    .panel{
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
</style>
