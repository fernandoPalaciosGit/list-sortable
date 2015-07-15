;(function($, w){
    'use strict';
    
    // TodoList contructor properties     
    w.UiList = function (list, items) {
        this.itemsSel = list;
        this.listSel = items;
        this.$list = $(this.itemsSel);
        this.updateItemList();
        this.$removeItemList = {};
        this.isOrdered = false;    
        // init sortable list
        this.$list.sortable();
    };
    
    w.UiList.prototype.updateItemList = function () {
        this.$itemList = this.$list.children(this.listSel);
    };
    
    w.UiList.prototype.getRemoveItem = function () {
        return this.$removeItemList || {};
    };
    
    w.UiList.prototype.setRemoveItem = function ($item) {
        this.$removeItemList = $item;
    };
}(jQuery, window));