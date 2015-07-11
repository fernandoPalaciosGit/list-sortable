<?php 
require_once('../properties/include.php');
require_once(ROOT_PATH . '/back/db.Connection.php');
require_once(ROOT_PATH . '/back/db.TodoList.php');

$connection = new Connection();
$connection->connect();

$todoList = new TodoList();
$todoList->setListFromDb($connection->getConnecion());

require_once(ROOT_PATH . '/back/view.head.php');
require_once(ROOT_PATH . '/back/view.body.php');
require_once(ROOT_PATH . '/back/view.footer.php');

$connection->close();
  ?>}
