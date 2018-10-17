<template>
    <div class="overlay_1">
        <div class="main_1">
            <div class="header_1">
                <span style="font-size:20px;font-weight:bold;color:#fff;">图片列表</span>
            </div>
            <div class="container_1">
                <div v-for="(item, index) in items" :key="index" class="imgWapper">
                    <img v-bind:src="item" >
                    <div class="checkbox-wraper">
                        <input type="checkbox" class="md-checkbox" v-bind:id="'img'+index" v-bind:value="item" v-model="selectImgs">
                        <label v-bind:for="'img'+index"></label>
                    </div>
                </div>
            </div>
            <div class="footer_1">
                <div style="display:inline-block;">
                    <input type="checkbox" class="md-checkbox" id="selectAll" v-model="selectAll">
                    <label for="selectAll"></label>
                    <label for="selectAll" style="vertical-align: top;color:#fff;">全选</label>
                </div>
                <div class="float:right;display:inline-block;">
                    <button type='button' class='download-btn'>下载</button>
                </div>
            </div>
        </div>
    </div>
</template>
<style scoped>
.overlay_1{
    position: fixed;
    width: 100%;
    height: 100%;
    margin: 0;
    padding: 0;
    left:0px;
    top: 0px;
    background-color: rgba(128, 128, 128, 0.45);
    z-index: 9007199254740991;
}
.main_1{
    width: 50%;
    height: 80%;
    margin: 0 auto;
    top: 10%;
    position: relative;
    box-shadow: 0 4px 5px 0 rgba(0,0,0,0.14),0 1px 10px 0 rgba(0,0,0,0.12),0 2px 4px -1px rgba(0,0,0,0.3);
}
.container_1{
    width: 100%;
    height: 80%;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    background-color: #ffffff;
    overflow-y: auto;
}

.imgWapper{
    width: 32%;
    margin-left: 1%;
    margin-top: 1%;
    height: 120px;
    border: 1px solid #ccc;
    padding: 5px 0px;
    position: relative;
}
.imgWapper img{
    width: 100%;
    height: 100%;
    object-fit: contain;
}
.header_1{
    background-color: #007acc;
    margin: 0;
    padding: 2.5% 20px;
}
.footer_1{
    background-color: #007acc;
    margin: 0;
    padding: 2.5% 20px;
}
</style>
<script>
import "../style.css";
export default {
    data(){
        return{
            items:[],
            selectImgs:[],
            selectAll:false
        }
    },
    mounted(){
        var set = new Set();
        Array.prototype.forEach.call(document.images,function(img) {
            img.src && set.add(img.src);
        });
        if(set.size > 0){
            this.items.push(...Array.from(set));
        }
    }
}
</script>
