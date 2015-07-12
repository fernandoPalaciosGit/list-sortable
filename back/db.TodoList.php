<?php 
class TodoList {
    private $itemList = array();
    private $itemPost = array(
        "action" => null,
        "isActionDone" => false,
        "sortableListId"  => null,
        "id" => null,       // INT (10) AI
        "name" => null,     // VARCHAR (300) NULL
        "order" => null     // INT (10) NULL
    );
    
    // SETTERS GETTERS
    private function setItemList ($id, $name, $order) {
        $newItemList = array(
            'id' => $id,
            'name' => $name,
            'order' => $order,
        );
        array_push($this->itemList, $newItemList);
    }
    
    public function getItemList () {
        return $this->itemList;
    }
    
    public function setNewItem ($conn, $action, $id, $name, $order, $sortableListId) {
        $this->itemPost['action'] = mysqli_real_escape_string($conn, $action);
        $this->itemPost['id'] = mysqli_real_escape_string($conn, $id);
        $this->itemPost['name'] = mysqli_real_escape_string($conn, $name);
        $this->itemPost['order'] = mysqli_real_escape_string($conn, $order);
        $this->itemPost['sortableListId'] = mysqli_real_escape_string($conn, $sortableListId);
    }
    
    public function getNewItem () {
        return $this->itemPost;
    }
    
    // LOGIC CONTROLLER
    public function actionTodoList ($conn) {
        
        switch ($this->itemPost['action']) {
            case 'insert':
                $this->insertItemFromDb($conn);
                break;
                
            case 'remove':
                $this->removeItemFromDb($conn);
                break;
            
            case 'edit':
                $this->editItemFromDb($conn);
                break;
                
            case 'order':
                $this->orderItemFromDb($conn);
                break;
        }
    }
    
    // MYSQL DDL DML
    public function getItemListFromDb ($conn) {
        $query = "SELECT * FROM elements ORDER BY `order`;";
        $result = mysqli_query($conn, $query);
        
        while ($data = mysqli_fetch_assoc($result)) {
            $this->setItemList($data['id'], $data['name'], $data['order']);
        }
    }
    
    private function insertItemFromDb ($conn) {
        $parseQuery = "INSERT INTO elements (`name`, `order`) VALUES ('%s', %d);";
        $query = sprintf($parseQuery, $this->itemPost['name'], $this->itemPost['order']);
        
        if (mysqli_query($conn, $query)) {
            $this->itemPost['id'] = mysqli_insert_id($conn);
            $this->itemPost['isActionDone'] = true;
        }   
    }
    
    private function removeItemFromDb ($conn) {
        $parseQuery = "DELETE FROM elements WHERE `id` = %d;";
        $query = sprintf($parseQuery, $this->itemPost['id']);
        
        if (mysqli_query($conn, $query)) {
            // sort items that are ahead of the modified
            $parseQuery = "UPDATE elements SET `order` = order - 1 WHERE `order` > %d;";
            $query = sprintf($parseQuery, $this->itemPost['order']);
            mysqli_query($conn, $query); 
            $this->itemPost['isActionDone'] = true;
        }
    }
    
    private function editItemFromDb ($conn) {
        $parseQuery = "UPDATE elements SET `name` = '%s' WHERE `id` = %d;";
        $query = sprintf($parseQuery, $this->itemPost['name'], $this->itemPost['id']);
     
        if (mysqli_query($conn, $query)) {
            $this->itemPost['isActionDone'] = true;
        }
    }
    
    private function orderItemFromDb ($conn) {
        // manage new ordered items id´s (by toArray interface)
        $sortableListId = explode(',', $this->itemPost['sortableListId']);
        $query = 'UPDATE elements SET `order` = CASE `id` ' . PHP_EOL;
        
        // update all itemList with new sorted value
        foreach ($sortableListId as $index => $idList){
            $idList = mysqli_real_escape_string($conn, $idList);
            $order = mysqli_real_escape_string($conn, $index + 1);
            $query .= 'WHEN ' . $idList .'  THEN ' . $order . '' . PHP_EOL;
        }
        
        $query .= 'ELSE `order` ' . PHP_EOL . 'END;';

        if (mysqli_query($conn, $query)) {
            $this->itemPost['isActionDone'] = true;
        }
    }
}
 ?>
