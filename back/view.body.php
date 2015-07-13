<main class="container">
    
    <div class="row">
        <div class="col s12">
            <h4 class="light red-text text-lighten-2 center">Lista de tareas</h4>
        </div>
    </div>
    
    <div class="row">
        <div class="col m12 l6">
            <div class="collection js-collection-todo-list">
                <?php  foreach ($todoList->getItemList() as $itemList) { ?>
                    <a  href="#" contenteditable=""
                        data-id-list="<?= $itemList['id'] ?>"
                        data-order-list="<?= $itemList['order'] ?>"
                        class="js-collection-todo-item collection-item">
                        <span class="badge js-control-remove-item"><i class="material-icons red-text">delete</i></span>
                        <?= $itemList['name'] ?>
                    </a>
                <?php } ?>
            </div>
        </div>
        
        <div class="col m12 l6">
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
                        <input  class="waves-effect waves-light btn js-control-insert-item"
                                type="submit" value="Añadir">
                    </div>
                </div>
            </div>
        </div>
    </div>
</main>