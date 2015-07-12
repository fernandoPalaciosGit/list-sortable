;(function($){
    'use strict';
    
    // TodoList contructor properties     
    window.UiList = function (list, items) {
        this.$list = $(list);
        this.$itemList = this.$list.children(items);
        this.isOrdered = false;    
        // init sortable list
        this.$list.sortable();
    };
    
    // change DB state on update todoList order
    UiList.prototype.onUpdateSortable = function (evSort) {
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
                complete: function (xhr, status) {
                    console.info(xhr.responseJSON);
                }
            });
        }
    };
}(jQuery));