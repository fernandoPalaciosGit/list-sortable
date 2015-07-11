<main class="container">
    
    <div class="row">
        <div class="col s12">
            <h4 class="indigo-text">LISTA DE TAREAS</h4>
        </div>
        <div class="col s12">
            <div class="collection">
                <?php  foreach ($todoList->getList() as $id => $name) { ?>
                    <a href="#!" data-id-list="<?= $id ?>" class="collection-item"><?= $name ?></a>
                <?php } ?>
            </div>
        </div>
    </div>
</main>