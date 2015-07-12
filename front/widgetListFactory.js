;(function($){
    'use strict';
    
    window.widgetListFactory = function () {
        var _actualStatus = {},

        // trigger TodoList state : Edit/order
        _updateStatusList = function (uiList) {
            uiList.$list.sortable(_actualStatus.sort);
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
        onInsertItem = function ($uiList, $controlNewItem) {
            
        };
        
        return {
            toggleStatus: toggleStatus,
            onInsertItem: onInsertItem
        };
    };
}(jQuery));