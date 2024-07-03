function lista_of_reg() {
   
    tipo = $("#filtro_tipo option:selected").val();
    fi = $("#fecha_inicio").val();
    ff = $("#fecha_fin").val();


    $.ajax({
        beforeSend: function () {
            $("#lista_of_registrados").html("Recuperando Lista ...");
        },
        url: "consulta_cant_of.php",
        type: "POST",
        data: { tipo: tipo, fi:fi, ff:ff },
        success: function (x) {
            $("#lista_of_registrados").html(x);
            $("#tabla_cot").DataTable({
                //  order: [[0, 'asc']]
            });
           
        },
        error: function (jqXHR, estado, error) { },
    });
}



function lista_of_reg_cargar() {
    tipo = $("#filtro_tipo option:selected").val();
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
            $("#lista_of_registrados").html("Recuperando Lista ...");
        },
        url: "consulta_cant_of.php",
        type: "POST",
        data: { tipo: tipo, fi:fechaInicio, ff:ff },
        success: function (x) {
            $("#lista_of_registrados").html(x);
            $("#tabla_cot").DataTable({
                //  order: [[0, 'asc']]
            });
           
        },
        error: function (jqXHR, estado, error) { },
    });
}






function ver_detalle(docentry) {
    $("#modal_procesar_detalle").modal("toggle");
    $.ajax({
        url: "consulta_detalle.php",

        type: "POST",
        data: {
            docentry,
        },
        success: function (x) {
            $("#tabla_ver_detalle").html(x);
            $("#tabla_detalle2do").DataTable({
                order: [[1, 'asc']]
            });
        },
        error: function (jqXHR, estado, error) { },
    });


}


function ver_detallePT(docentry) {
    $("#modal_procesar_detalle").modal("toggle");

    $.ajax({
        url: "consulta_detallePT.php",

        type: "POST",
        data: {
            docentry,
        },
        success: function (x) {
            $("#tabla_ver_detalle").html(x);
            $("#tabla_detalle2do").DataTable({
                order: [[1, 'asc']]
            });
        },
        error: function (jqXHR, estado, error) { },
    });

}
