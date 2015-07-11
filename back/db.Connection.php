<?php 
class Connection {
    private $host = CONN_HOST;
    private $user = CONN_USER;
    private $pass = CONN_PASS;
    private $db = CONN_DB;
    private $myconn;

    function connect() {
        $this->myconn = mysqli_connect($this->host, $this->user, $this->pass, $this->db);
        if (!$this->myconn) {
            die('Could not connect to database!');
        }
    }

    function close() {
        mysqli_close($this->myconn);
    }
    
    public function getConnecion() {
        return $this->myconn;
    }
}
 ?>
