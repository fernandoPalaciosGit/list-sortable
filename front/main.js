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
            $formList = $('.js-form-todo-list'),
            $controlChangeStatus = $formList.find('.js-control-status-list:radio'),
            $controlInsertItem = $formList.find('.js-control-insert-item:submit'),
            $controlNameItem = $formList.find('.js-control-todo-name');
        
        // change todo list status from default checked
        widget.toggleStatus(uiList, $controlChangeStatus.filter(':checked').val());
        
        // events from UI
        uiList.$list.on('sortupdate', $.proxy(uiList.onUpdateSortable, uiList));
        
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
               widget.onInsertItem(uiList, nameItem);
               $formList.get(0).reset();
            }
        });
    });
}(jQuery, window.UiList, window.widgetListFactory));