<template>
    <div v-bind:class="[styles.overlay]" v-show="show">
        <div v-bind:class="[styles.main]">
            <div v-bind:class="[styles.header]">
                <span style="font-size:20px;font-weight:bold;color:#fff;">图片列表</span>
            </div>
            <div v-bind:class="[styles.container]">
                <div v-for="(item, index) in items" :key="index" v-bind:class="[styles.imgWapper]">
                    <img v-bind:src="item" >
                    <div v-bind:class="[styles.checkbox_wraper]">
                        <input type="checkbox" v-bind:class="[styles.md_checkbox]" v-bind:id="'img'+index" v-bind:value="item" v-model="selectImgs">
                        <label v-bind:for="'img'+index"></label>
                    </div>
                </div>
            </div>
            <div v-bind:class="[styles.footer]">
                <div>
                    <input type="checkbox" v-bind:class="[styles.md_checkbox]" id="selectAll" v-model="selectAll">
                    <label for="selectAll"></label>
                    <label for="selectAll" style="vertical-align: top;color:#fff;">全 选</label>
                </div>
                <div>
                    <button type='button' v-on:click="downloadImgs" v-bind:class="[styles.download_btn]">下载</button>
                </div>
            </div>
        </div>
    </div>
</template>
<style>
/*.overlay_1{
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
    margin-right: 0;
    height: 120px;
    border: 1px solid #ccc;
    padding: 5px 0px;
    position: relative;
    box-sizing: border-box;
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
    display: flex;
    justify-content: space-between;
}*/
</style>
<script>
import JSZip from 'jszip';
import FileSaver from 'file-saver';
import styles from "../style.css";
export default {
    data(){
        return{
            items:[],
            selectImgs:[],
            selectAll:false,
            imgZip:null,
            styles:styles
        }
    },
    props:["show"],
    watch:{
        selectAll:function(val){
            if(val){
                this.items && this.selectImgs.splice(0, this.selectImgs.length, ...this.items);
            }else{
                this.selectImgs.splice(0, this.selectImgs.length);
            }
        }
    },
    methods:{
        downloadImgs:function () {
            if(this.selectImgs.length > 0){
                var cnt  = 0;
                var self = this;
                var imageZip = this.imgZip.folder("images");
                for(var i = 0; i < this.selectImgs.length; i++){
                    var xhr = new XMLHttpRequest();
                    xhr.open('GET', this.selectImgs[i], true);
                    xhr.responseType = 'arraybuffer';
                    var imgUrl = this.selectImgs[i];
                    var fileName ="img"+i;
                    if(imgUrl.toLowerCase().indexOf(".png") !== -1){
                        fileName += ".png";
                    }
                    else if(imgUrl.toLowerCase().indexOf("gif") !== -1){
                        fileName += ".gif";
                    }
                    else{
                        fileName += ".jpg";
                    }
                    xhr.imgFileName = fileName;
                    xhr.onreadystatechange = function(e){
                        if(this.status == 200 && this.readyState == 4){
                            var blob = this.response;
                            imageZip.file(this.imgFileName, blob);
                        }
                    }
                    xhr.onloadend = function(e){
                        cnt += 1;
                        if(cnt == self.selectImgs.length){
                            console.log(cnt);
                            self.imgZip.generateAsync({type:"blob"})
                            .then(function(content) {
                                // see FileSaver.js
                                FileSaver.saveAs(content, "images.zip");
                            });
                        }     
                    }
                    xhr.send();
                }  
            }
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
        this.imgZip = new JSZip();
    }
}
</script>
