;( function ($, UiList, widgetListFactory) {
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
            $formList = $('.js-form-todo-list'),
            $controlChangeStatus = $formList.find('.js-control-status-list:radio'),
            $controlInsertItem = $formList.find('.js-control-insert-item:submit'),
            $controlNameItem = $formList.find('.js-control-todo-name'),
            $controlInlineEdit = uiList.$itemList.find('.js-control-edit-item'),
            $modalTrigger = $('.js-modal-trigger-remove-item'),
            $modalAction = $('.js-modal-action-remove-item');
        
        // change todo list status from default checked
        widget.toggleStatus(uiList, $controlChangeStatus.filter(':checked').val());
        uiList.$list
            // Initialize Todo Item Sortting Event
            .on('sortupdate', $.proxy(widget.onUpdateSortable, widget, uiList))
            // Eit and remove Todo Items
            .on('click', '.js-control-edit-item', function (evClick) {
                evClick.preventDefault();
                
                // before save Todo Item, check the sattus UIList
                if(uiList.isOrdered){
                    evClick.stopPropagation();
                }
            })
            .on('click', '.js-control-remove-item', function (evClick) {
                evClick.preventDefault();
                
                // trigger modal only for ordered estatus list
                if (uiList.isOrdered) {
                    uiList.setRemoveItem($(this).closest('.js-collection-todo-item'));
                    $modalTrigger.trigger('click');
                }
            });
        // Edit Todo Items
        $controlInlineEdit.inlineEdit({
            buttons: '<span class="badge badge-inlineEdit-item"><a href="#" class="save green-text"><i class="material-icons">done</i></a><a href="#" class="cancel red-text"><i class="material-icons">undo</i></a></span>',
            buttonsTag: 'a',
            cancelOnBlur: true,
            debug: false,
            save: function (event, newData, $input) {
                var nameItem = newData.value.trim(),
                    idItem = $input.element.closest('.js-collection-todo-item').data('idList');
                
                // Do not update nothing Todo, Nor InlineEdit or DB, never will rise save callback
                if (nameItem.length === 0) {
                    return false;  
                
                } else {
                    widget.onEditSortable(uiList, idItem, nameItem);
                }
            },
            change: function() {
                // after save OR cancel return to ordered state list
                $controlChangeStatus
                    .filter('#order')
                    .prop('checked', true)
                    .trigger('change');
            }
        });
        // Prevent onsubmit to insert Item
        $formList.on('submit', function (evSubmit) {
            evSubmit.preventDefault();
        });
        // Toggle UIList status : toEdit / toOrder
        $controlChangeStatus.on('change', function () {
            widget.toggleStatus(uiList, $(this).val());
        });
        // Permit onClick to insert Item
        $controlInsertItem.on('click', function () {
            var nameItem = $controlNameItem.val().trim();
            
            // Do not insert nothing Todo
            if (nameItem.length > 0) {
                $controlNameItem.val('');
                $controlChangeStatus
                    .filter('#order')
                    .prop('checked', true)
                    .trigger('change');
                widget.onInsertItem(uiList, nameItem);
            }
        });
        // initialize on remode Todo item modal
        $modalTrigger.leanModal({ dismissible: false });
        // Button modal action for remove Todo Items
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