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
            $controlRemoveList = uiList.$itemList.find('.js-control-remove-item'),
            $controlInlineEdit = uiList.$itemList.find('.js-control-edit-item'),
            $modalTrigger = $('.js-modal-trigger-remove-item'),
            $modalAction = $('.js-modal-action-remove-item'); //.modal-action
        
        // change todo list status from default checked
        widget.toggleStatus(uiList, $controlChangeStatus.filter(':checked').val());
        
        // events from UI
        uiList.$list.on('sortupdate', $.proxy(widget.onUpdateSortable, widget, uiList));
                
        // on Edit todo list (inline edit vendor)
        $controlInlineEdit
            .on('click', function (evClick) {
                
                // before save Todo Item, check the sattus UIList
                if(uiList.isOrdered){
                    evClick.stopPropagation();
                }
            })
            .inlineEdit({
                buttons: '<span class="badge badge-inlineEdit-item"><a href="#" class="save green-text"><i class="material-icons">done</i></a><a href="#" class="cancel red-text"><i class="material-icons">undo</i></a></span>',
                buttonsTag: 'a',
                cancelOnBlur: true,
                debug: false,
                save: function (event, newData, $input) {
                    var nameItem = newData.value.trim(),
                        idItem = $input.element.closest('.collection-item').data('idList');
                    
                    // Do not update nothing Todo, Nor InlineEdit or DB, never will rise save callback
                    if (nameItem.length === 0) {
                        return false;  
                    
                    } else {
                        $controlChangeStatus
                            .filter('#order')
                            .prop('checked', true)
                            .trigger('change');
                        widget.onEditSortable(uiList, idItem, nameItem);
                    }
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