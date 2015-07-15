<a href="https://github.com/fernandoPalaciosGit/list-sortable">
    <img    style="position: absolute; top: 0; left: 0; border: 0;"
            src="https://camo.githubusercontent.com/82b228a3648bf44fc1163ef44c62fcc60081495e/68747470733a2f2f73332e616d617a6f6e6177732e636f6d2f6769746875622f726962626f6e732f666f726b6d655f6c6566745f7265645f6161303030302e706e67"
            alt="Fork me on GitHub"
            data-canonical-src="https://s3.amazonaws.com/github/ribbons/forkme_left_red_aa0000.png">
</a>

<main class="container">
    
    <div class="row">
        <div class="col s12">
            <h4 class="light red-text text-lighten-2 center">Lista de tareas Ordenables</h4>
        </div>
    </div>
    
    <div class="row">
        <div class="col s12 m7 l6">
            <div class="collection js-collection-todo-list">
                <?php  foreach ($todoList->getItemList() as $itemList) { ?>
                    <a  href="#"
                        data-id-list="<?= $itemList['id'] ?>"
                        data-order-list="<?= $itemList['order'] ?>"
                        class="collection-item js-collection-todo-item">
                        <span class="badge badge-remove-item js-control-remove-item"><i class="material-icons red-text">delete</i></span>
                        <span class="item-name js-control-edit-item truncate"><?= $itemList['name'] ?></span>
                    </a>
                <?php } ?>
            </div>
        </div>
        
        <div class="col s12 m5 l6">
            <form class="js-form-todo-list" action="back/ctrl.actionList.php">
                <div class="row">
                    <div class="col s12">
                        <p>
                          <input    class="with-gap js-control-status-list" type="radio"
                                    id="edit" name="edit-order" value="toEdit"/>
                          <label for="edit">Editar</label>
                        </p>
                        <p>
                          <input    class="with-gap js-control-status-list"
                                    checked="checked" type="radio"
                                    id="order" name="edit-order" value="toOrder"/>
                          <label for="order">Ordenar</label>
                        </p>
                    </div>
                </div>
                
                <div class="row">
                    <div class="input-field col s12">
                        <input  placeholder="Descripcion de la Tarea" type="text"
                                class="validate js-control-todo-name" id="name" name="name">
                        <label for="name" class="active">Nueva Tarea</label>
                    </div>
                </div>
                
                <div class="row">
                    <div class="input-field col s12 center-align">
                        <input  class="btn js-control-insert-item"
                                type="submit" value="Añadir"/>
                    </div>
                </div>
            </form>
        </div>
    </div>
</main>