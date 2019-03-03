<template>
    <div class="container">
        <div class="imagelist" v-on:click="onContainerClick">
            <div v-for="(item, index) in imageSrcList" :key="index" class="imagelist-item">
                <img v-bind:src="item" >
                <div class="checkbox">
                    <input type="checkbox" v-bind:id="'img'+index" v-bind:value="item" v-model="selectedImageSrcList">
                    <label v-bind:for="'img'+index"></label>
                </div>
            </div>
        </div>
        <div style="position:absolute;right:10px;bottom:70px;">
            <div class="checkbox" style="width:60px;">
                <input type="checkbox" id="selectAll" v-model="selectAll">
                <label for="selectAll">全选</label>
            </div>
        </div>
        <div style="position:absolute;right:30px;bottom:20px;">
            <button  class="btn" @click="downloadImgs" title="下载所选图片">&#8595;</button>
        </div>
    </div>
</template>
<style scoped>
    .checkbox{
        position: absolute;
        bottom: 3px;
        right: 3px;
        margin: 0;
        padding: 0;
        z-index: 99;
    }
    .checkbox >input[type="checkbox"]{
        position: absolute;
        opacity: 0;
    }
    .checkbox >input[type="checkbox"] + label {
        position: relative;
        cursor: pointer;
        padding: 0;
        font-size: 14px;
    }
    .checkbox >input[type="checkbox"] + label:before {
        content: '';
        margin-right: 10px;
        display: inline-block;
        vertical-align: text-top;
        width: 20px;
        height: 20px;
        background: transparent;
        box-sizing: border-box;
        border: 1px solid #f35429;
    }
    .checkbox >input[type="checkbox"]:hover + label:before {
        border: 2px solid #f35429;
    }

    .checkbox >input[type="checkbox"]:checked + label:before {
        background: #f35429;
    }
    .checkbox >input[type="checkbox"]:disabled + label {
        color: #b8b8b8;
        cursor: auto;
    }
    .checkbox >input[type="checkbox"]:disabled + label:before {
        box-shadow: none;
        background: #ddd;
    }
    .checkbox >input[type="checkbox"]:checked + label:after {
        content: '';
        position: absolute;
        left: 5px;
        top: 9px;
        background: white;
        width: 2px;
        height: 2px;
        box-shadow: 2px 0 0 white, 4px 0 0 white, 4px -2px 0 white, 4px -4px 0 white, 4px -6px 0 white, 4px -8px 0 white;
        -webkit-transform: rotate(45deg);
        transform: rotate(45deg);
    }
    .container{
        width: 100%;
        height: 100%;
        overflow: auto;
        padding: 30px 50px;
        box-sizing: border-box;
    }
    .imagelist{
        width: 100%;
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        background-color: #ffffff;
        justify-content: space-around;
    }

    .imagelist-item{
        width: 140px;
        margin: 10px 10px 0px 0px;
        height: 160px;
        border: 1px solid #ccc;
        padding: 4px;
        position: relative;
        box-sizing: border-box;
    }
    .imagelist-item img{
        width: 100%;
        height: 100%;
        object-fit: contain;
    }
    .btn{
        width:40px;
        height:40px;
        box-sizing: border-box;
        border-radius: 100%;
        background-color: #f35529b9;
        color: #ffffff;
        outline: none;
        border: none;
        box-shadow: 0px 0px 2px 0px rgb(158, 157, 157);
        text-align: center;
    }
    .btn:hover{
        background-color: #f35529e7;
    }
</style>
<script>
import JSZip from 'jszip';
import FileSaver from 'file-saver';
export default {
    data(){
        return{
            imageSrcList:[],
            selectedImageSrcList:[],
            selectAll:false,
            imgZip:null,
            packing:false
        }
    },
    watch:{
        selectAll:function(val){
            if(val){
                this.imageSrcList && this.selectedImageSrcList.splice(0, this.selectedImageSrcList.length, ...this.imageSrcList);
            }else{
                this.selectedImageSrcList.splice(0, this.selectedImageSrcList.length);
            }
        }
    },
    methods:{
        onContainerClick:function(e){
            if(e){
                let target = e.target;
                if(target && target.tagName === 'IMG'){
                    let src = target.getAttribute('src');
                    if(src){
                      let idx = this.selectedImageSrcList.indexOf(src);
                      if(idx !== -1){
                          this.selectedImageSrcList.splice(idx,1);
                      }else{
                          this.selectedImageSrcList.push(src);
                      }
                    }
                }
            }
        },
        onClose:function() {
            this.selectedImageSrcList.splice(0, this.selectedImageSrcList.length);
            this.packing = false;
            this.$emit('close');
        },
        downloadImgs:function () {
            if(this.selectedImageSrcList.length > 0){
                this.packing = true;
                let cnt  = 0;
                let self = this;
                this.imgZip = new JSZip();
                var imageZip = this.imgZip.folder("images");
                for(let i = 0; i < this.selectedImageSrcList.length; i++){
                    let xhr = new XMLHttpRequest();
                    xhr.open('GET', this.selectedImageSrcList[i], true);
                    xhr.responseType = 'arraybuffer';
                    xhr.onreadystatechange = function(e){
                        if(this.status == 200 && this.readyState == 4){
                            let blob = this.response;
                            let baseFileName = `img${i}.`;
                            let imgFileName = baseFileName + 'jpg'; 
                            let contentType = this.getResponseHeader('Content-Type');
                            switch(contentType){
                                case 'image/jpeg':
                                    imgFileName = baseFileName + 'jpg';
                                    break;
                                case 'image/png':
                                    imgFileName = baseFileName + 'png';
                                    break;
                                case 'image/gif':
                                    imgFileName = baseFileName + 'gif';
                                    break;
                            }
                            imageZip.file(imgFileName, blob);
                        }
                    }
                    xhr.onloadend = function(e){
                        cnt += 1;
                        if(cnt == self.selectedImageSrcList.length){
                            //console.log(cnt);
                            self.imgZip.generateAsync({type:"blob"})
                            .then(function(content) {
                                //self.onClose();
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
        this.imageSrcList.splice(0, this.imageSrcList.length, ...Array.from(new Set(Array.from(document.images).map(x=>x.src))));
    }
}
</script>


