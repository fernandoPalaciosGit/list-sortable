<?php 
class Connection {
    private $host = CONN_HOST;
    private $user = CONN_USER;
    private $pass = CONN_PASS;
    private $db = CONN_DB;
    private $myconn;

    public function connect() {
        $this->myconn = @new mysqli($this->host, $this->user, $this->pass, $this->db);
        
        if ($this->myconn->connect_errno) {
            printf("Fallo de conexion: %s", $this->myconn->connect_error);
            die();
        }
    }

    public function close() {
        mysqli_close($this->myconn);
    }
    
    public function getConnecion() {
        return $this->myconn;
    }
    
    static function checkPostStatus () {
        return  isset($_SERVER['HTTP_X_REQUESTED_WITH']) &&
                $_SERVER['HTTP_X_REQUESTED_WITH'] == 'XMLHttpRequest';
    }
    
    static function getPost ($key) {
        return isset($_POST[$key]) && !empty($_POST[$key]) ? $_POST[$key] : false;
    }
}
 ?>
