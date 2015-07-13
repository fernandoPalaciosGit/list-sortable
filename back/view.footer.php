    <!-- Modal Trigger for Remove Item -->
    <a class="js-modal-trigger-remove-item waves-effect waves-light btn hide" href="#modal-remove-item">Modal</a>

    <!-- Modal Structure for Remove Item -->
    <div id="modal-remove-item" class="modal">
        <div class="modal-content">
        <h4>Eliminar Tarea</h4>
            <p>Esta Tarea sera descartada y ocuparán su orden de prioridad las siguientes Tareas.</p>
        </div>
        <div class="modal-footer">
            <a href="#!" data-action="true" class="js-modal-action-remove-item modal-action modal-close btn red">OK</a>
            <a href="#!" data-action="false" class="js-modal-action-remove-item modal-action modal-close btn green">NEIN!!</a>
        </div>
    </div>
        
    <!-- materialize interaction -->
    <script src="<?= ROOT_PATH . '/bower_components/materialize/dist/js/materialize.min.js' ?>"></script>
    
    <!-- jquery ui sortable dependencies --> 
    <script src="<?= ROOT_PATH . '/bower_components/jquery.ui/ui/core.js' ?>"></script>
    <script src="<?= ROOT_PATH . '/bower_components/jquery.ui/ui/widget.js' ?>"></script>
    <script src="<?= ROOT_PATH . '/bower_components/jquery.ui/ui/mouse.js' ?>"></script>
    <script src="<?= ROOT_PATH . '/bower_components/jquery.ui/ui/sortable.js' ?>"></script>
    
    <!-- Application -->
    <script src="<?= ROOT_PATH . '/front/UiList.js' ?>"></script>
    <script src="<?= ROOT_PATH . '/front/widgetListFactory.js' ?>"></script>
    <script src="<?= ROOT_PATH . '/front/main.js' ?>"></script>
</body>  
</html>