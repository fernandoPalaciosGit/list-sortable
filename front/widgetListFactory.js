;(function($){
    'use strict';
    
    window.widgetListFactory = function () {
        var _actualStatus = {},

        // trigger TodoList state : Edit/order
        _updateStatusList = function (uiList) {
            uiList.updateItemList();
            uiList.$list.sortable(_actualStatus.sort).sortable('refresh');
            uiList.$itemList.attr('contenteditable', _actualStatus.isEditable);
            uiList.isOrdered = !_actualStatus.isEditable;
        },
        
        toggleStatus = function (uiList, actualStatus) {
            var status = {
                'toOrder': {
                    sort: 'enable',
                    isEditable: false
                },
                'toEdit': {
                    sort: 'disable',
                    isEditable: true                    
                }
            };
            
            _actualStatus = status[actualStatus];
            _updateStatusList(uiList);
        },
        
        // On submit new Todo Item
        onInsertItem = function (uiList, todoName) {
            $.ajax({
                type: 'POST',
                url: '../back/ctrl.actionList.php',
                dataType: 'json',
                data: {
                    action: 'insert',
                    name: todoName,
                    order: uiList.$itemList.size() + 1
                },
                success: function (data){
                    if (data.isActionDone){
                        $('<a>',{
                            href: '#',
                            'class': 'js-collection-todo-item collection-item',
                            'data-id-list': data.id,
                            'data-order-list': data.order,
                            text: data.name
                        }).appendTo(uiList.$list);
                        _updateStatusList(uiList);
                    }
                },
                complete: function (xhr) {
                    console.info(xhr.responseJSON || xhr.responseText);
                }
            });
        },
        
        // change DB state on update todoList order
        onUpdateSortable = function (uiList) {
            var sortableListId = uiList.$list.sortable('toArray', {attribute: 'data-id-list'} ).toString();
            
            if (uiList.isOrdered) {
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
        
        return {
            toggleStatus: toggleStatus,
            onInsertItem: onInsertItem,
            onUpdateSortable: onUpdateSortable
        };
    };
}(jQuery));