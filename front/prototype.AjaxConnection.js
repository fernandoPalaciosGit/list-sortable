;(function ($, w) {
    'use strict';

    w.AjaxConnection = function (type, url, dataType) {
        this.type = type;
        this.url = url;
        this.dataType = dataType;
    };
    
    w.AjaxConnection.prototype.requestData = function (data) {
        return $.ajax({
            type: this.type,
            url: this.url,
            dataType: this.dataType,
            data: data
        });
    };
    
    w.AjaxConnection.prototype.logStatus = function (xhr) {
        console.info(xhr.responseJSON || xhr.responseText);
    };
    
}(jQuery, window));