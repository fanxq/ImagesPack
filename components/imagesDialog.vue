<template>
    <div class="overlay">
        <div class="main">
            <div class="header">
                <h5>图片列表</h5>
            </div>
            <div class="container">
                <div v-for="(item, index) in items" :key="index" class="imgWapper">
                    <img v-bind:src="item" >
                    <div class="checkbox-wraper">
                        <input type="checkbox" class="md-checkbox" v-bind:id="'img'+index" v-bind:value="item" v-model="selectImgs">
                        <label v-bind:for="'img'+index"></label>
                    </div>
                </div>
            </div>
            <div class="footer">
                
            </div>
        </div>
    </div>
</template>
<style socped>
.overlay{
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
.main{
    width: 50%;
    height: 80%;
    margin: 0 auto;
    top: 10%;
    position: relative;
    box-shadow: 0 4px 5px 0 rgba(0,0,0,0.14),0 1px 10px 0 rgba(0,0,0,0.12),0 2px 4px -1px rgba(0,0,0,0.3);
}
.container{
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
.header{
    background-color: #007acc;
    height: 10%;
    width: 100%;
    margin: 0;
    padding: 0;
}
.footer{
    background-color: #007acc;
    height: 10%;
    width: 100%;
    margin: 0;
    padding: 0;
}
</style>
<script>
import "../style.css";
export default {
    data(){
        return{
            items:[],
            selectImgs:[]
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
