<?php 
class TodoList {
    private $list = array();
    
    private function setItemList ($id, $data) {
        $this->list[$id] = $data;
    }
    
    public function setListFromDb ($conn) {
        $sqlSelect = "SELECT * FROM elements ORDER BY 'order'";
        $result = mysqli_query($conn, $sqlSelect);
        while ($data = mysqli_fetch_assoc($result)) {
            $this->setItemList($data['id'], $data['name']);
        }
    }
    
    public function getList () {
        return $this->list;
    }
}
 
 ?>
