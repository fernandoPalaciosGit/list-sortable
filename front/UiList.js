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
    
    // change DB state on update todoList order
    w.UiList.prototype.onUpdateSortable = function () {
        var sortableListId = this.$list.sortable('toArray', {attribute: 'data-id-list'} ).toString();
        
        if (this.isOrdered) {
            $.ajax({
                type: 'POST',
                url: '../back/ctrl.actionList.php',
                dataType: 'json',
                data: {
                    action: 'order',
                    sortableListId: sortableListId 
                },
                complete: function (xhr) {
                    console.info(xhr.responseJSON || xhr.responseText);
                }
            });
        }
    };
}(jQuery, window));