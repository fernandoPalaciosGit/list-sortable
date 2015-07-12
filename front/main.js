;(function($, UiList, widgetListFactory){
    'use strict';
    
    var APP = {
        TodoList: {
            uiList: new UiList('.collection-todo-list'),
            widget: widgetListFactory()
        }
    };
    
    $(document).on('ready', function () {
        APP.TodoList.widget.init();
    });
}(jQuery, window.UiList, window.widgetListFactory));