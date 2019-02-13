<template>
    <div style="margin:0;padding:0;width:100%;height:100%;">
        <div class="imgDlg" v-show="!packing">
            <div class="header">
                <span class="title">图片列表</span>
                <span v-on:click="onClose" class="closeBtn">&times;</span>
            </div>
            <div class="container" v-on:click="onContainerClick">
                <div v-for="(item, index) in items" :key="index" class="imgWrapper">
                    <img v-bind:src="item" >
                    <div class="checkboxWrapper">
                        <input type="checkbox" class="styledCheckbox" v-bind:id="'img'+index" v-bind:value="item" v-model="selectImgs">
                        <label v-bind:for="'img'+index"></label>
                    </div>
                </div>
            </div>
            <div class="footer">
                <div class="selectAllWrapper">
                    <div class="selectAll">
                        <input type="checkbox" class="styledCheckbox" id="selectAll" v-model="selectAll">
                        <label for="selectAll" style="color:#fff;">全选</label>
                    </div>
                </div>
                <div>
                    <button type='button' v-on:click="downloadImgs" class="downloadBtn">下载</button>
                </div>
            </div>
        </div>
        <div class="tips" v-show="packing">
           <span style="font-size:20px;font-weight:bold;">正在打包图片...</span>
        </div>
    </div>
</template>
<script>
import JSZip from 'jszip';
import FileSaver from 'file-saver';
export default {
    data(){
        return{
            items:[],
            selectImgs:[],
            selectAll:false,
            imgZip:null,
            packing:false
        }
    },
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
        onContainerClick:function(e){
            if(e){
                let target = e.target;
                if(target && target.tagName === 'IMG'){
                    let src = target.getAttribute('src');
                    if(src){
                      let idx = this.selectImgs.indexOf(src);
                      if(idx !== -1){
                          this.selectImgs.splice(idx,1);
                      }else{
                          this.selectImgs.push(src);
                      }
                    }
                }
            }
        },
        onClose:function() {
            this.selectImgs.splice(0, this.selectImgs.length);
            this.packing = false;
            this.$emit('close');
        },
        downloadImgs:function () {
            if(this.selectImgs.length > 0){
                this.packing = true;
                var cnt  = 0;
                var self = this;
                this.imgZip = new JSZip();
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
        this.items.splice(0, this.items.length, ...Array.from(new Set(Array.from(document.images).map(x=>x.src))));
    }
}
</script>
