;(function($, UiList, widgetListFactory){
    'use strict';
    
    var APP = {
        TodoList: {
            uiList: new UiList('.js-collection-todo-list', '.js-collection-todo-item'),
            widget: widgetListFactory()
        }
    };
    
    $(document).on('ready', function () {
        var uiList = APP.TodoList.uiList,
            widget = APP.TodoList.widget,
            KEY_TAB = 9, KEY_ENTER = 13, 
            $formList = $('.js-form-todo-list'),
            $controlChangeStatus = $formList.find('.js-control-status-list:radio'),
            $controlInsertItem = $formList.find('.js-control-insert-item:submit'),
            $controlNameItem = $formList.find('.js-control-todo-name'),
            $controlRemoveList = uiList.$itemList.find('.js-control-remove-item'),
            $modalTrigger = $('.js-modal-trigger-remove-item'),
            $modalAction = $('.js-modal-action-remove-item'); //.modal-action
        
        // change todo list status from default checked
        widget.toggleStatus(uiList, $controlChangeStatus.filter(':checked').val());
        
        // events from UI
        uiList.$list
            .on('sortupdate', $.proxy(widget.onUpdateSortable, widget, uiList))
            .on('keydown', uiList.$itemList, function (ev) {
                var key = ev.which || ev.keyCode,
                    $target = $(ev.target),
                    nameItem = $target.text().trim();
                
                // avoid break line on Enter
                key === KEY_ENTER && ev.preventDefault();
                
                // update todolist on Enter or Tab and not for order status
                if (!uiList.isOrdered && nameItem.length > 0 &&
                    (key === KEY_ENTER || key === KEY_TAB)) {
                    var idItem = $target.data('idList');
                    
                    $controlChangeStatus
                        .filter('#order')
                        .prop('checked', true)
                        .trigger('change');
                    widget.onEditSortable(uiList, idItem, nameItem);
                }
            });
        
        // Events from From
        $formList.on('submit', function (evSubmit) {
            evSubmit.preventDefault();
        });
        $controlChangeStatus.on('change', function () {
            widget.toggleStatus(uiList, $(this).val());
        });
        $controlInsertItem.on('click', function () {
            var nameItem = $controlNameItem.val().trim();
            
            if (nameItem.length > 0) {
                $controlNameItem.val('');
                $controlChangeStatus
                    .filter('#order')
                    .prop('checked', true)
                    .trigger('change');
               widget.onInsertItem(uiList, nameItem);
            }
        });
        // initialize modal
        $modalTrigger.leanModal({ dismissible: false });
        $controlRemoveList.on('click', function () {
            
            // trigger modal only for ordered estatus list
            if (uiList.isOrdered) {
                uiList.setRemoveItem($(this).closest('.collection-item'));
                $modalTrigger.trigger('click');
            }
        });
        $modalAction.on('click', function () {
            var $item = uiList.getRemoveItem();
            
            // remove item only on agree action
            if ($(this).data('action') && !$.isEmptyObject($item)) {
                widget.onRemoveSortable($item, $item.data('idList'), $item.data('orderList'));
                uiList.setRemoveItem({});
            }
        });
    });
}(jQuery, window.UiList, window.widgetListFactory));