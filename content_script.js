 
     var overlayer = document.createElement('div');
        overlayer.style.width = document.body.clientWidth +'px';
        overlayer.style.height = document.body.clientHeight +'px';
        overlayer.style.position = 'absolute';
        overlayer.style.top = '0px';
        overlayer.style.left = '0px';
        overlayer.style.zIndex = '9999';
        overlayer.style.backgroundColor = 'lightgrey';
    
        overlayer.style.opacity = '0.5';
        overlayer.onclick = function(e){
            if(overlayer){
                document.body.removeChild(overlayer);
                if(imgListPanel){
                    document.body.removeChild(imgListPanel);
                }
            }
        }
        document.body.appendChild(overlayer);
        var imgListPanel = document.createElement('div');
        imgListPanel.style.width = '400px';
        imgListPanel.style.height = '600px';
        imgListPanel.style.position = 'absolute';
        imgListPanel.style.top = '50%';
        imgListPanel.style.left = '50%';
        imgListPanel.style.backgroundColor = 'white';
        imgListPanel.style.overflow = 'auto';
        imgListPanel.style.transform = 'translate(-200px,-300px)';
        imgListPanel.style.display = 'flex';
        imgListPanel.style.flexWrap = 'wrap';
        imgListPanel.style.alignItems = 'flex-start';
        //imgListPanel.style.justifyContent = 'space-around';
        imgListPanel.style.zIndex = '10000';
        document.body.appendChild(imgListPanel);

        var imgListInCurPage = document.getElementsByTagName('img');
        for(var i = 0 ; i< imgListInCurPage.length; i++){
        //    alert(imgListInCurPage[i].src);
            var tempImgDiv = document.createElement('div');
            tempImgDiv.style.width = '80px';
            tempImgDiv.style.height = '90px';
            tempImgDiv.style.backgroundColor = 'lightgrey';
            tempImgDiv.style.margin = '5px';
            tempImgDiv.style.padding = '0px';
            tempImgDiv.style.position = 'relative';
            tempImgDiv.id = 'imgContainer_'+i;
            imgListPanel.appendChild(tempImgDiv);
        
    }
    for(var i= 0; i<imgListInCurPage.length; i++){
        var container = document.getElementById('imgContainer_'+i);
        var imgElement = document.createElement('img');
            imgElement.style.width = '80px';
            imgElement.style.height = '90px';
            imgElement.style.padding = '0px';
            imgElement.style.margin = '0px';
            imgElement.src = imgListInCurPage[i].src;
            container.appendChild(imgElement);
        var ckBox = document.createElement('input');
        ckBox.type = 'checkbox';
        ckBox.style.width = '20px';
        ckBox.style.height = '20px';
        ckBox.style.display = 'block';
        ckBox.style.position = 'absolute';
        ckBox.style.right = '2px';
        ckBox.style.bottom = '2px';
        ckBox.style.zIndex = '3';
        ckBox.style.webkitAppearance = 'none';
        ckBox.style.backgroundColor = 'ffffff';
        ckBox.style.border = '2px solid red';
        container.appendChild(ckBox);

    }

 