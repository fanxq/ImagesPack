<template>
    <div style="margin:0;padding:0;width:100%;height:100%;">
        <div v-bind:class="[styles.imgDlg]" v-show="!packing">
            <div v-bind:class="[styles.header]">
                <span v-bind:class="[styles.title]">图片列表</span>
                <span v-on:click="onClose" v-bind:class="[styles.closeBtn]">&times;</span>
            </div>
            <div v-bind:class="[styles.container]" v-on:click="onContainerClick">
                <div v-for="(item, index) in items" :key="index" v-bind:class="[styles.imgWrapper]">
                    <img v-bind:src="item" >
                    <div v-bind:class="[styles.checkboxWrapper]">
                        <input type="checkbox" v-bind:class="[styles.styled_checkbox]" v-bind:id="'img'+index" v-bind:value="item" v-model="selectImgs">
                        <label v-bind:for="'img'+index"></label>
                    </div>
                </div>
            </div>
            <div v-bind:class="[styles.footer]">
                <div v-bind:class="[styles.selectAllWrapper]">
                    <div v-bind:class="[styles.selectAll]">
                        <input type="checkbox" v-bind:class="[styles.styled_checkbox]" id="selectAll" v-model="selectAll">
                        <label for="selectAll" style="color:#fff;">全选</label>
                    </div>
                </div>
                <div>
                    <button type='button' v-on:click="downloadImgs" v-bind:class="[styles.downloadBtn]">下载</button>
                </div>
            </div>
        </div>
        <div v-bind:class="[styles.tips]" v-show="packing">
           <span style="font-size:20px;font-weight:bold;">正在打包图片...</span>
        </div>
    </div>
</template>
<script>
import JSZip from 'jszip';
import FileSaver from 'file-saver';
import styles from "../iframe/iframe.css";
export default {
    data(){
        return{
            items:[],
            selectImgs:[],
            selectAll:false,
            imgZip:null,
            styles:styles,
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
            chrome.runtime.sendMessage('close', function(response){
                console.log(response);
            });
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
        var that = this;
        window.addEventListener('message',function(e){
            if(e.data){
                try {
                    var imgUrls = JSON.parse(e.data);
                    imgUrls && that.items.splice(0, that.items.length, ...imgUrls);
                } catch (error) {
                    
                } 
            }
        });
        //this.imgZip = new JSZip();
    }
}
</script>
