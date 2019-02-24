<template>
    <div class="container" v-on:click="onContainerClick">
        <div v-for="(item, index) in imageSrcList" :key="index" class="imgWrapper">
            <img v-bind:src="item" >
            <div class="checkboxWrapper">
                <input type="checkbox" class="styledCheckbox" v-bind:id="'img'+index" v-bind:value="item" v-model="selectedImageSrcList">
                <label v-bind:for="'img'+index"></label>
            </div>
        </div>
    </div>
</template>
<style scoped>
    .checkboxWrapper{
        position: absolute;
        bottom: 3px;
        right: 3px;
        margin: 0;
        padding: 0;
        z-index: 99;
    }
    .styledCheckbox {
        position: absolute;
        opacity: 0;
    }
    .styledCheckbox + label {
        position: relative;
        cursor: pointer;
        padding: 0;
        font-size: 14px;
    }
    .styledCheckbox + label:before {
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
    .styledCheckbox:hover + label:before {
        border: 2px solid #f35429;
    }

    .styledCheckbox:checked + label:before {
        background: #f35429;
    }
    .styledCheckbox:disabled + label {
        color: #b8b8b8;
        cursor: auto;
    }
    .styledCheckbox:disabled + label:before {
        box-shadow: none;
        background: #ddd;
    }
    .styledCheckbox:checked + label:after {
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
        flex: 1;
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        background-color: #ffffff;
        overflow-y: auto;
        align-content: flex-start;
    }

    .imgWrapper{
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
    .imgWrapper img{
        width: 100%;
        height: 100%;
        object-fit: contain;
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
                var cnt  = 0;
                var self = this;
                this.imgZip = new JSZip();
                var imageZip = this.imgZip.folder("images");
                for(var i = 0; i < this.selectedImageSrcList.length; i++){
                    var xhr = new XMLHttpRequest();
                    xhr.open('GET', this.selectedImageSrcList[i], true);
                    xhr.responseType = 'arraybuffer';
                    var imgUrl = this.selectedImageSrcList[i];
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
                        if(cnt == self.selectedImageSrcList.length){
                            //console.log(cnt);
                            self.imgZip.generateAsync({type:"blob"})
                            .then(function(content) {
                                self.onClose();
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
        //this.imageSrcList.splice(0, this.imageSrcList.length, ...Array.from(new Set(Array.from(document.images).map(x=>x.src))));
    }
}
</script>


