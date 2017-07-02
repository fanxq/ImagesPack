//const $ = require('jquery');
var imgZip = new JSZip();

Array.prototype.unique = function(){
    var uniqueArray = [];
    for(var i = 0; i < this.length; i++){
        if(uniqueArray.indexOf(this[i]) === -1){
            uniqueArray.push(this[i]);
        }
    }
    return uniqueArray;
}

function onLoadImage(e){
    var width = e.data.width;
    var height = e.data.height;
    var imgElementWidth = width||120;
    if(e.target.naturalHeight > e.target.naturalWidth){
        var rate = height/e.target.naturalHeight;
        var newWidth = e.target.naturalWidth*rate;
        if(newWidth > imgElementWidth){
            $(e.target).css("width",imgElementWidth);
        }
        else{
            $(e.target).css("width",newWidth);
            var newLeft = (imgElementWidth - newWidth)/2;
            $(e.target).css("left", newLeft);
        }  
    }
    else{
        var rate = imgElementWidth/e.target.naturalWidth;
        var newHeight = e.target.naturalHeight*rate;
        if(newHeight > height){
            $(e.target).css("height",height);
        }
        else{
            $(e.target).css("height",newHeight);
            var newTop = (height - newHeight)/2;
            $(e.target).css("top",newTop);
        } 
    }
}

$(function(){
    $("body").css("position","relative");
    var overLayer = $('<div></div>').appendTo($('body'));
    overLayer.css({
        "background-color":"lightgray",
         "opacity":"0.7",
         "position":"absolute",
         "left":"0",
         "top":"0",
         "width":"100%",
         "height":"100%",
         "margin":"0",
         "z-index":"2147483647"
    });  

    overLayer.click(function(e){
        $(this).remove();
        if(imgPanel){
            imgPanel.remove();
        }
    });

    var imgPanel = $('<div></div').appendTo($('body'));
    imgPanel.css(
        {
            "position":"absolute",
            "background-color":"white",
            "width":"400px",
            "height":"600px",
            "margin":"0",
            "padding":"0",
            "left":"50%",
            "transform":"translateX(-200px)",
            "box-shadow":" 0 4px 5px 0 rgba(0,0,0,0.14),0 1px 10px 0 rgba(0,0,0,0.12),0 2px 4px -1px rgba(0,0,0,0.3)",
            "z-index":"2147483647"
        }
    );
    var imgPanelHeight = ($(window).height()-100);
    imgPanel.css("height",imgPanelHeight);
    //var firstTopVal = $(window).scrollTop() + 50;//首先显示时imgPanel的top值
    var firstTopVal = ($(window).height()-imgPanelHeight)/2;
    imgPanel.css("top", firstTopVal);

    var titleBar4ImgPanel = $('<div></div>').appendTo(imgPanel);
    titleBar4ImgPanel.html(
        `<h3 style='padding-left:10px;height:50px;margin:0;line-height:50px;background-image:none;text-align:left;font-family:"Microsoft YaHei"'>
        图片列表
        </h3>`
    );
    titleBar4ImgPanel.css(
        {
            "background-color":"#cccedb",
            "height":"50px",
            "width":"100%"
        }
    );
    var imgListContainer =$('<div></div>').appendTo(imgPanel);
    imgListContainer.css(
        {
            "width":"100%",
            "margin":"0",
            "padding":"0",
            "overflow":"auto",
            "height":"calc(100% - 100px)",
            "display":"flex",
            "flex-wrap":"wrap",
            "align-items":"flex-start"
        }
    );
    var backBtn;
    imgListContainer.click(function(e){
        if(e.target.tagName == "IMG"){
            //$(this).empty();
            $(this).children().hide();
            var newImageLsPanel = $('<div class="image-list-panel"></div>').appendTo($(this));
            var ulistElemet = $('<ul></ul>').appendTo(newImageLsPanel);
            for(var i = 0; i < imgs.length; i++){
                var liElement = $('<li></li>').appendTo(ulistElemet);
                var imgElement = $('<img></img>').appendTo(liElement);
                imgElement.attr("src", imgs[i]);
                imgElement.on('load',{width:liElement.width(), height:liElement.height()},onLoadImage);
            }
            ulistElemet.on('click',function(e){
                e.stopPropagation();
                if(e.target.tagName =="IMG"){
                    $(".image-viewer").find("img").attr('src',$(e.target).attr('src'));
                }
            })
            var imgViewer = $('<div></div>').appendTo($(this));
            imgViewer.addClass("image-viewer");
            var showImg = $(`<img style="width:100%;height:100%;margin:0;padding:0; position: absolute;top:0;left: 0;"></img>`).appendTo(imgViewer);
            showImg.attr("src", e.target.src);
            var viewWidth = imgViewer.width();
            var viewHeight = imgViewer.height();
            showImg.on('load', {width:viewWidth, height:viewHeight}, onLoadImage);
            if(bottomBar){
                bottomBar.children().hide();
                bottomBar.css(
                    {
                        "position":"absolute",
                        "right":"10px",
                        "bottom":"10px"
                    }
                );
                bottomBar.animate({width:"50px",borderRadius:"100%"},500,"swing",function(){
                    if(backBtn){
                        backBtn.show();
                    }else{
                        backBtn = $("<div></div>").appendTo(bottomBar);
                        backBtn.addClass("back-btn");
                        backBtn.text("<");
                        backBtn.fadeIn();
                        backBtn.click(function(e){
                            $(this).hide();
                            bottomBar.animate({width:"100%",right:"0", bottom:"0",borderRadius:"0px"},1000,"swing",function(){
                                bottomBar.css(
                                    {
                                        "position":"static",
                                        "box-shadow":"none"
                                    }
                                )
                                bottomBar.children().not(".back-btn").show();
                            });
                            imgListContainer.children().show();
                            imgListContainer.children('.image-viewer').hide();
                            imgListContainer.children('.image-list-panel').hide();
                        })
                        bottomBar.css("border-radius","100%");
                        bottomBar.css("box-shadow"," 0 4px 5px 0 rgba(0,0,0,0.14),0 1px 10px 0 rgba(0,0,0,0.12),0 2px 4px -1px rgba(0,0,0,0.3)");
                    }
                    
                    
                });
            }
        }
    })
    imgListContainer.attr("id","imgLsPanel");
    var bottomBar = $('<div></div>').appendTo(imgPanel);
    bottomBar.css(
        {
            "background":"#cccedb",
            "height":"50px",
            "margin":"0",
            "padding":"0",
            "width":"100%"
        }
    );
   
    $(window).scroll(function(e){
        var st = $(this).scrollTop();
        if(imgPanel){
            imgPanel.css("top",st + 50);
        }
    }); 
    var imgs = [];
    var selectedImgs = [];
    $("img").each(function(i){
       var imgSrc =  $(this).attr('src');
       console.log(imgSrc);
       if(imgs.indexOf(imgSrc) === -1){
            imgs.push(imgSrc);
            var imgCbxId = "imgCbxId"+i;
            var imgWarp = $('<div style="width:30%; height:90px; margin:10px 1%;padding:0;position:relative;"></div>').appendTo($("#imgLsPanel"));
            imgWarp.html(`
                <div class="checkbox-wraper" data-imgsrc="${imgSrc}">
                    <input type="checkbox" class="md-checkbox" id="${imgCbxId}">
                    <label for="${imgCbxId}"></label>
                </div>
            `);
            var imgElement = $('<img></img>').appendTo(imgWarp);
            imgElement.css(
                {
                    "width":"100%",
                    "height":"100%",
                    "margin":"0",
                    "padding":"0",
                    "position":"absolute",
                    "left":"0",
                    "top":"0"
                }
            );
            imgElement.attr("src", imgSrc);
            var imgElementWidth = imgElement.width();
            imgElement.on('load',{width:imgElementWidth,height:90}, onLoadImage);
        }
       
    });

    var cbxAllImgs = $(`<div class="checkbox-wraper-1">
                    <input type="checkbox" class="md-checkbox" id="checkAll" >
                    <label for="checkAll"></label>
                   <div style="display:inline-block;margin:0;position:relative;margin-left:5px;padding:0;height:18px;line-height:18px;">全选</div>
                </div>`).appendTo(bottomBar);
    cbxAllImgs.find(':checkbox').change(function(){
        var ck = $(this).is(':checked');
        if(ck){
            $("#imgLsPanel").find(":checkbox").prop("checked",true);
        }
        else{
            $("#imgLsPanel").find(":checkbox").prop('checked',false);
            //$("#imgLsPanel").find("input[type='checkbox']:checked").attr("checked",false)
        }
    });

    var cnt = 0;
    var imageZip = imgZip.folder("images");
    var downloadBtn = $("<button type='button' class='download-btn'>下载</button>");
    downloadBtn.appendTo(bottomBar);
    downloadBtn.click(function(e){
        cnt = 0;
        selectedImgs = [];
        $("#imgLsPanel").find(":checkbox").each(function(idx,cbx){
            if($(cbx).is(":checked") == true){
                var imSrc = $(cbx).parent('.checkbox-wraper').attr("data-imgsrc");
                console.log("select:"+imSrc);
                selectedImgs.push(imSrc);
            }
        })
        if(selectedImgs.length != 0){
            //imgs = imgs.unique();
            for(var i = 0; i < selectedImgs.length; i++){
                var xhr = new XMLHttpRequest();
                xhr.open('GET', selectedImgs[i], true);
                xhr.responseType = 'arraybuffer';
                var imgUrl = selectedImgs[i];
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
                    if(cnt == selectedImgs.length){
                        console.log(cnt);
                        imgZip.generateAsync({type:"blob"})
                        .then(function(content) {
                            // see FileSaver.js
                            saveAs(content, "images.zip");
                        });
                    }     
                }
                xhr.send();
            }  
        }
    });
    
    
});