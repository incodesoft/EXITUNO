function lista_of_primera(){
    var fechai = $("#fecha_inicio").val();
    var fechaf = $("#fecha_fin").val();

    $.ajax({
        beforeSend: function () {
            $("#lista_primera_tabla").html("Recuperando Lista ...");
        },
        url: "consulta_cab_ofV.php",
        type: "POST",
        data: {fechai:fechai, fechaf:fechaf},
        success: function (x) {
            $("#lista_primera_tabla").html(x);
            $("#tabla_primer").DataTable({
                order: [[0, 'asc']]
            });
        },
        error: function (jqXHR, estado, error) { },
    });

}


$(document).on("click", "#lista_primera_tabla tbody tr", function () {

    //$(this).find("td").css("background-color", "LightGreen");
    var id = $(this).closest("tr").find("td:eq(0)").text();

    lista_of_validadas(id)

});





function lista_of_validadas(id) {

    $.ajax({
        beforeSend: function () {
            $("#lista_of_validadas").html("Recuperando Lista ...");
        },
        url: "consulta_of_validadas.php",
        type: "POST",
        data: {id:id},
        success: function (x) {
            $("#lista_of_validadas").html(x);
            $("#tabla_of_va").DataTable({
                order: [[0, 'asc']]
            });
        },
        error: function (jqXHR, estado, error) { },
    });


    $.ajax({
        beforeSend: function () {
            $("#lista_tercera_detalle").html("Recuperando Lista ...");
        },
        url: "consulta_det_of_val.php",
        type: "POST",
        data: {id:id},
        success: function (x) {
            $("#lista_tercera_detalle").html(x);
            $("#tabla_tercero_det").DataTable({
                order: [[0, 'asc']]
            });
        },
        error: function (jqXHR, estado, error) { },
    });


}