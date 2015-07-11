<?php 
class TodoList {
    private $list = array();
    private $postItem = array(
        "action" => null,
        "id" => null,
        "name" => null,
        "order" => null,
        "return" => array()
    );
    
    // SETTERS GETTERS
    private function setItemList ($id, $data) {
        $this->list[$id] = $data;
    }
    
    public function getList () {
        return $this->list;
    }
    
    public function setNewItem ($action = 'edit', $id, $name, $order = 1) {
        $this->postItem['action'] = $action;
        $this->postItem['id'] = $id;
        $this->postItem['name'] = $name;
        $this->postItem['order'] = $order;
    }
    
    // LOGIC CONTROLLER
    public function actionTodoList () {
        switch ($this->postItem['action']) {
            case 'insert':
                $this->insertItemFromDb();
                break;
                
            case 'remove':
                $this->removeItemFromDb();
                break;
            
            case 'edit':
                $this->editItemFromDb();
                break;
                
            case 'order':
                $this->orderItemFromDb();
                break;
        }
    }
    
    // MYSQL DDL DML
    public function setListFromDb ($conn) {
        $sqlSelect = "SELECT * FROM elements ORDER BY 'order'";
        $result = mysqli_query($conn, $sqlSelect);
        while ($data = mysqli_fetch_assoc($result)) {
            $this->setItemList($data['id'], $data['name']);
        }
    }
    
    private function insertItemFromDb ($conn) {
           
    }
    
    private function removeItemFromDb ($conn) {
        
    }
    
    private function editItemFromDb ($conn) {
    
    }
    
    private function orderItemFromDb ($conn) {
    
    }
}
 
 ?>
