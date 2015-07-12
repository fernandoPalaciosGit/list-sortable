<?php 
class TodoList {
    private $itemList = array();
    private $itemPost = array(
        "action" => null,
        "isActionDone" => false,
        "id" => null,       // INT (10) AI
        "name" => null,     // VARCHAR (300) NULL
        "order" => null     // INT (10) NULL
    );
    
    // SETTERS GETTERS
    private function setItemList ($id, $name) {
        $this->itemList[$id] = $name;
    }
    
    public function getItemList () {
        return $this->itemList;
    }
    
    public function setNewItem ($action = 'edit', $id, $name, $order = 1) {
        $this->itemPost['action'] = $action;
        $this->itemPost['id'] = $id;
        $this->itemPost['name'] = $name;
        $this->itemPost['order'] = $order;
    }
    
    // LOGIC CONTROLLER
    public function actionTodoList () {
        switch ($this->itemPost['action']) {
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
    public function getItemListFromDb ($conn) {
        $query = "SELECT * FROM elements ORDER BY 'order';";
        $result = mysqli_query($conn, $query);
        while ($data = mysqli_fetch_assoc($result)) {
            $this->setItemList($data['id'], $data['name']);
        }
    }
    
    private function insertItemFromDb ($conn) {
        $parseQuery = "INSERT INTO elements (name, order) VALUES ('%s', %d);";
        $query = sprintf($parseQuery, $this->itemPost['name'], $this->itemPost['order']);
        if (mysqli_query($conn, $query)){
            $this->itemPost['id'] = mysqli_insert_id($conn);
            $this->itemPost['isActionDone'] = true;
        }   
    }
    
    private function removeItemFromDb ($conn) {
        
    }
    
    private function editItemFromDb ($conn) {
    
    }
    
    private function orderItemFromDb ($conn) {
    
    }
}
 
 ?>
