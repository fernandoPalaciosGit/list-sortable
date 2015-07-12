;(function($, w){
    'use strict';
    
    // TodoList contructor properties     
    w.UiList = function (list, items) {
        this.itemsSel = list;
        this.listSel = items;
        this.$list = $(this.itemsSel);
        this.updateItemList();
        this.isOrdered = false;    
        // init sortable list
        this.$list.sortable();
    };
    
    w.UiList.prototype.updateItemList = function () {
        this.$itemList = this.$list.children(this.listSel);
    };
}(jQuery, window));