import styles from "../style.css";

let show = false;
let overlay = document.createElement('DIV');
overlay.classList.add(styles.overlay);
overlay.style.display = 'none';
let container = document.createElement('DIV');
container.classList.add(styles.main);
overlay.appendChild(container);
let iframe = document.createElement('IFRAME');
let iframeUrl =  chrome.extension.getURL('iframe.html');
iframe.src = iframeUrl;
iframe.scrolling = 'no';
iframe.width = '100%';
iframe.height = '100%';
iframe.setAttribute('frameborder','0');
iframe.onload = function(){
    var set = new Set();
    Array.prototype.forEach.call(document.images,function(img) {
        img.src && set.add(img.src);
    });
    var imgUrls = [];
    if(set.size > 0){
        imgUrls.push(...Array.from(set));
    }
    this.contentWindow.postMessage(JSON.stringify(imgUrls),iframeUrl);
}
container.appendChild(iframe);
document.body.appendChild(overlay);

chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        if (request && request.action == "imgpack"){
            show = !show;
            if(show){
                overlay.style.display = 'block';
            }else{
                overlay.style.display = 'none';
            }
        }
});

window.addEventListener('message',function(e){
    if(e.data && e.data === 'close'){
        show = !show;
        if(show){
            overlay.style.display = 'block';
        }else{
            overlay.style.display = 'none';
        }
    }
},false)
