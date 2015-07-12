<?php
require_once('../properties/include.php');
require_once(ROOT_PATH . '/back/db.Connection.php');

// retrieve POST data
$action = Connection::getPost('action');
$id = Connection::getPost('id');
$name = Connection::getPost('name');
$order = Connection::getPost('order');

// check Ajax POST Status
if (Connection::checkPostStatus() &&  $action != false ) {
    require_once(ROOT_PATH . '/back/db.TodoList.php');

    $connection = new Connection();
    $connection->connect();
    
    $todoList = new TodoList();
    $todoList->setNewItem(  Connection::sanitizePost($action),
                            Connection::sanitizePost($id),
                            Connection::sanitizePost($name),
                            Connection::sanitizePost($order));
    $todoList->actionTodoList($connection->getConnecion());
    
    if (!empty($todoList->getList())) {
        echo json_encode($todoList->getList());
    }
    
    $connection->close();

} else {
    die('Cannot access correctly to action list.');
}
 ?>}
