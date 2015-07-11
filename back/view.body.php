<main class="container">
    
    <div class="row">
        <div class="col s12">
            <h4 class="indigo-text">LISTA DE TAREAS</h4>
        </div>
    </div>
    
    <div class="row">
        <div class="col m12 l6">
            <div class="collection collection-todo-list">
                <?php  foreach ($todoList->getList() as $id => $name) { ?>
                    <a  href="#!" contenteditable="true"
                        data-id-list="<?= $id ?>"
                        class="collection-item"><?= $name ?></a>
                <?php } ?>
            </div>
        </div>
        
        <div class="col m12 l6">
            <form class="form-todo-list" action="back/ctrl.actionList.php">
                <div class="row">
                    <div class="col s12">
                        <p>
                          <input    class="with-gap" checked="checked" type="radio" value="edit"
                                    id="edit" name="edit-order"/>
                          <label for="edit">Editar</label>
                        </p>
                        <p>
                          <input    class="with-gap" type="radio" value="order"
                                    id="order" name="edit-order"/>
                          <label for="order">Ordenar</label>
                        </p>
                    </div>
                </div>
                
                <div class="row">
                    <div class="input-field col s12">
                        <input  placeholder="Descripcion de la Tarea" type="text" class="validate"
                                id="name" name="name">
                        <label for="name" class="active">Nueva Tarea</label>
                    </div>
                </div>
                
                <div class="row">
                    <div class="input-field col s12 center-align">
                        <input class="waves-effect waves-light btn" type="submit" value="Añadir">
                    </div>
                </div>
            </div>
        </div>
    </div>
</main>