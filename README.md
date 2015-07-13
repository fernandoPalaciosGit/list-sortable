## Sortable TODO list

#### Installation
- [Download Xampp (Apache + Mysql)](http://sourceforge.net/projects/xampp/)
- [Import Schema Database, by phpmyadmin or similar Workbench](http://www.cruzalosdedos.es/sortable-list/db/sortable-list-schema.sql)
- Create Authentication Keys to DB connection into **properties/private.php**
```php
<?php 
    // DATABASE CONNECTION
    define("CONN_USER", "user-connection");
    define("CONN_PASS", "apss-db-connection");
 ?>
```

#### Specifications
- [Full tutorial](http://www.funcion13.com/lista-de-elementos-ordenables-y-editables-usando-html5-jquery-php-y-mysql/)
- [Jquery UI sortable interface](http://api.jqueryui.com/sortable/)

#### [Demo](http://www.cruzalosdedos.es/sortable-list/public/index.php)