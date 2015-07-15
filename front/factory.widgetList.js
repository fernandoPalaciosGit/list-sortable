;( function ($, AjaxConnection) {
    'use strict';
    
    window.widgetListFactory = function () {
        var _actualStatus = {},
        
        _ajaxConnection = new AjaxConnection('POST', '../back/ctrl.actionList.php', 'json'),
        
        _renderItemTemplate = function (id, order, name) {
            var html = '';
            html += '<span class="badge badge-remove-item js-control-remove-item">';
            html += '<i class="material-icons red-text">delete</i></span>';
            html += '<span class="item-name js-control-edit-item truncate">' + name + '</span>';
            
            return $('<a>', {
                href: '#',
                'data-id-list': id,
                'data-order-list': order,
                'class': 'collection-item js-collection-todo-item',
                html: html
            });
        },

        // trigger TodoList state : Edit/order
        _updateStatusList = function (uiList) {
            uiList.updateItemList();
            uiList.$list.sortable(_actualStatus.sort).sortable('refresh');
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
            _ajaxConnection
                .requestData({
                    action: 'insert',
                    name: name,
                    order: uiList.$itemList.size() + 1
                })
                .success( function (data) {
                    if (data.isActionDone){
                        var frag = document.createDocumentFragment(),
                            $item = _renderItemTemplate(data.id, data.order, data.name);
                        
                        frag.appendChild($item.get(0));
                        uiList.$list.append(frag);
                        _updateStatusList(uiList);
                        Materialize.toast('Cambios guardados, nueva Tarea.', 3000, 'rounded');
                    }
                })
                .complete(_ajaxConnection.logStatus);
        },
        
        // change DB state on update todoList order
        onUpdateSortable = function (uiList) {
            var sortableListId = uiList.$list.sortable('toArray', {attribute: 'data-id-list'} ).toString();
            
            _ajaxConnection
                .requestData({
                    action: 'order',
                    sortableListId: sortableListId 
                })
                .success( function () {
                    Materialize.toast('Cambios guardados, Tareas ordenadas.', 3000, 'rounded');
                })
                .complete(_ajaxConnection.logStatus);
        },
                
        onEditSortable = function (uiList, id, name) {
            _ajaxConnection
                .requestData({
                    action: 'edit',
                    id: id,
                    name: name
                })
                .success(function () {
                    Materialize.toast('Cambios guardados, Tarea editada.', 3000, 'rounded');
                })
                .complete(_ajaxConnection.logStatus);
        },
        
        onRemoveSortable = function ($itemList, id, order) {
            _ajaxConnection
                .requestData({
                    action: 'remove',
                    orden: order,
                    id: id
                })
                .success( function () {
                    $itemList.fadeOut('slow').remove();
                    Materialize.toast('Cambios guardados, Tarea eliminada.', 3000, 'rounded');
                })
                .complete(_ajaxConnection.logStatus);
        };
        
        return {
            toggleStatus: toggleStatus,
            onInsertItem: onInsertItem,
            onUpdateSortable: onUpdateSortable,
            onEditSortable: onEditSortable,
            onRemoveSortable: onRemoveSortable
        };
    };
}(jQuery, window.AjaxConnection));