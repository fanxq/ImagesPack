//const $ = require('jquery');
function Translate(proxy){
    this.proxy = proxy||"";
    this.api = "baidu";
    this.targetLanguage="";
    this.fromLanguage="";
    this.bLanguageDetection = true;

}

Translate.prototype.updateTranslate= function(str){
      //let doc = editor.document, str = doc.getText(editor.selection).trim();
        if (str.trim() == '')
            return;
        setTimeout(() => {
            this.bLanguageDetection
                ? this.languageDetection(str, this.fromLanguage).then((isReverse) => {
                    if (isReverse) {
                        [this.fromLanguage, this.targetLanguage] = [this.targetLanguage, this.fromLanguage];
                    }
                    this.dotranslate(encodeURIComponent(str), this.proxy, this.api, this.targetLanguage, this.fromLanguage);
                })
                : this.dotranslate(encodeURIComponent(str), this.proxy, this.api, this.targetLanguage, this.fromLanguage);
        }, 1000);
}

Translate.prototype.dotranslate = function(str, proxy, api, targetLanguage, fromLanguage){
    var translateStr = api == 'baidu' ? this.baiduTranslate(str, google2baidu[targetLanguage], google2baidu[fromLanguage]) : this.googleTranslate(str, targetLanguage, fromLanguage);
    // WebRequest.get(translateStr, { "proxy": proxy }).then(function (TResult) {
    //     var rs = '', res = JSON.parse(TResult.content.toString());
    //     if (api == 'baidu') {
    //         if (res.error)
    //             return;
    //         rs = res.trans_result.data[0].dst;
    //     }
    //     else {
    //         var result = [];
    //         res.sentences.forEach(function (v) {
    //             result.push(v.trans);
    //         });
    //         rs = result.join(',');
    //     }
    //     translateResult = rs;
    //     alert(translateStr);
    // });
    $.get(translateStr,{"proxy":proxy}).done(function(TResult){
        var rs = '', res = JSON.parse(TResult.content.toString());
        if (api == 'baidu') {
            if (res.error)
                return;
            rs = res.trans_result.data[0].dst;
        }
        else {
            var result = [];
            res.sentences.forEach(function (v) {
                result.push(v.trans);
            });
            rs = result.join(',');
        }
        // translateResult = rs;
        // alert(translateStr);
        alert(rs);
    });
}

Translate.prototype.languageDetection = function(str, fromLanguage){
    // return WebRequest.post('http://fanyi.baidu.com/langdetect', { "formData": { "query": str }, "timeout": 500 }).then(function (result) {
    //     var res = JSON.parse(result.content);
    //     if (res.error || res.lan == fromLanguage || fromLanguage == '') {
    //         return false;
    //     }
    //     else {
    //         return true;
    //     }
    // }, function () {
    //     return false;
    // });
    return $.post('http://fanyi.baidu.com/langdetect',{ "formData": { "query": str }, "timeout": 500 }).done(function(result) {
        var res = JSON.parse(result.content);
        if (res.error || res.lan == fromLanguage || fromLanguage == '') {
            return false;
        }
        else {
            return true;
        }
    })
    .fail(function() {
        return false;
    })
}

Translate.prototype.baiduTranslate = function(str, targetLanguage, fromLanguage){
    return 'http://fanyi.baidu.com/v2transapi?query=' + str + (fromLanguage ? '&from=' + fromLanguage : '') + (targetLanguage ? '&to=' + targetLanguage : '');
}

Translate.prototype. googleTranslate = function(str, targetLanguage, fromLanguage) {
    return 'https://translate.google.cn/translate_a/single?client=gtx&sl=' + (fromLanguage || 'auto') + '&tl=' + (targetLanguage || 'auto') + '&hl=zh-CN&dt=t&dt=bd&ie=UTF-8&oe=UTF-8&dj=1&source=icon&q=' + str;
}
$(function(){
    var translateIdle = new Translate();
    document.onmouseup = function(e){
        var selectObj = window.getSelection();
        if(selectObj){
            var selectedText = selectObj.toString();
            if(selectedText.trim() !== ""){
                translateIdle.updateTranslate(selectedText);
                //alert(selectedText);
            }
        }
    }
});
