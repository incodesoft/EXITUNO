function lista_of_entrega() {
    fi = $("#fecha_inicio").val();
    ff = $("#fecha_fin").val();


    $.ajax({
        beforeSend: function () {
            $("#lista_entrega_mat").html("Recuperando Lista ...");
        },
        url: "consulta_materialesE.php",
        type: "POST",
        data: {fi:fi, ff:ff},
        success: function (x) {
            $("#lista_entrega_mat").html(x);
            $("#tabla_entrega_d").DataTable({
                order: [[0, 'asc']]
            });
        },
        error: function (jqXHR, estado, error) { },
    });
}



function lista_of_entrega_cargar() {
      // Obtenemos la fecha actual
      var fechaActual = new Date();
      // Creamos una nueva fecha con el primer día del mes actual
      var primerDiaMes = new Date(fechaActual.getFullYear(), fechaActual.getMonth(), 1);
      // Formateamos la fecha en dd-mm-yyyy
      var fechaInicio = ('0' + primerDiaMes.getDate()).slice(-2) + '-' + ('0' + (primerDiaMes.getMonth() + 1)).slice(-2) + '-' + primerDiaMes.getFullYear();
      // Asignamos la fecha al campo de fecha de inicio
      $("#fecha_inicio").val(fechaInicio);
      ff = $("#fecha_fin").val();


    $.ajax({
        beforeSend: function () {
            $("#lista_entrega_mat").html("Recuperando Lista ...");
        },
        url: "consulta_materialesE.php",
        type: "POST",
        data: {fi:fechaInicio, ff:ff },
        success: function (x) {
            $("#lista_entrega_mat").html(x);
            $("#tabla_entrega_d").DataTable({
                order: [[0, 'asc']]
            });
        },
        error: function (jqXHR, estado, error) { },
    });
}







function detalle_entrega(docentry) {
    $("#modal_detalle_entrega").modal("toggle");
    datos_entrega_det(docentry);

}


function datos_entrega_det(docentry) {
    $.ajax({
        url: "consulta_listado_entregaD.php",

        type: "POST",
        data: {
            docentry,
        },
        success: function (x) {
            $("#tabla_entrega_detcito").html(x);
            $("#tabla_ODDET").DataTable({
                order: [[0, 'asc']]
            });
        },
        error: function (jqXHR, estado, error) { },
    });
}
