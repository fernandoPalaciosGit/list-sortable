<?php 
require_once('../properties/include.php');
require_once(ROOT_PATH . '/back/db.Connection.php');
require_once(ROOT_PATH . '/back/db.TodoList.php');

$connection = new Connection();
$connection->connect();

$todoList = new TodoList();
$todoList->setListFromDb($connection->getConnecion());

  ?>
  <pre><?= print_r($todoList->getList()); ?></pre>