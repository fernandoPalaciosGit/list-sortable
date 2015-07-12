;(function($){
    'use strict';
    
    window.widgetListFactory = function () {
        var _actualStatus = {},
        _ajaxStatus = {
            type: 'POST',
            url: '../back/ctrl.actionList.php',
            dataType: 'json'   
        },

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
        onInsertItem = function (uiList, name) {
            $.ajax({
                type: _ajaxStatus.type,
                url: _ajaxStatus.url,
                dataType: _ajaxStatus.dataType,
                data: {
                    action: 'insert',
                    name: name,
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
                        Materialize.toast('Cambios guardados, nueva Tarea.', 3000, 'rounded')
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
                    type: _ajaxStatus.type,
                    url: _ajaxStatus.url,
                    dataType: _ajaxStatus.dataType,
                    data: {
                        action: 'order',
                        sortableListId: sortableListId 
                    },
                    success: function () {
                        Materialize.toast('Cambios guardados, Tareas ordenadas.', 3000, 'rounded')
                    },
                    complete: function (xhr) {
                        console.info(xhr.responseJSON || xhr.responseText);
                    }
                });
            }
        },
        
        onEditSortable = function (uiList, id, name) {
            $.ajax({
                type: _ajaxStatus.type,
                url: _ajaxStatus.url,
                dataType: _ajaxStatus.dataType,
                data: {
                    action: 'edit',
                    id: id,
                    name: name
                },
                success: function () {
                    Materialize.toast('Cambios guardados, Tarea editada.', 3000, 'rounded')
                },
                complete: function (xhr) {
                    console.info(xhr.responseJSON || xhr.responseText);
                }
            });
        };
        
        return {
            toggleStatus: toggleStatus,
            onInsertItem: onInsertItem,
            onUpdateSortable: onUpdateSortable,
            onEditSortable: onEditSortable
        };
    };
}(jQuery));