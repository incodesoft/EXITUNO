function lista_recibo_prod() {
    fi = $("#fecha_inicio").val();
    ff = $("#fecha_fin").val();

    $.ajax({
        beforeSend: function () {
            $("#lista_recibo_pro").html("Recuperando Lista ...");
        },
        url: "consulta_reciboP.php",
        type: "POST",
        data: {fi:fi, ff:ff},
        success: function (x) {
            $("#lista_recibo_pro").html(x);
            $("#tabla_RP").DataTable({
                order: [[0, 'desc']]
            });
        },
        error: function (jqXHR, estado, error) { },
    });

}




function lista_recibo_prod_cargar() {
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
            $("#lista_recibo_pro").html("Recuperando Lista ...");
        },
        url: "consulta_reciboP.php",
        type: "POST",
        data: {fi:fechaInicio, ff:ff },
        success: function (x) {
            $("#lista_recibo_pro").html(x);
            $("#tabla_RP").DataTable({
                order: [[0, 'desc']]
            });
        },
        error: function (jqXHR, estado, error) { },
    });
}
