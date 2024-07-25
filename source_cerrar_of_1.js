function lista_isograf() {

    $.ajax({
        beforeSend: function () {
        },
        url: 'listado_isograf.php',
        type: 'POST',
        data: null,
        success: function (x) {
            //console.log(x);

            $("#pone_isograf").html(x);
            $(".select2").select2();

        },
        error: function (jqXHR, estado, error) {
        }
    });

}

function lista_of_reg() {

    setTimeout(() => {
        fecha_i = $("#fecha_inix").val();
        fecha_f = $("#fecha_finx").val();
        isograf = $("#pone_isograf option:selected").val();
        // tipo = $("#filtro_tipo option:selected").val();



        $.ajax({
            beforeSend: function () {
                $("#lista_of_registrados").html("Recuperando Lista ...");
            },
            url: "consulta_listado_of_cerrar.php",
            type: "POST",
            data: { fecha_i: fecha_i, fecha_f: fecha_f, isograf: isograf },
            success: function (x) {
                $("#lista_of_registrados").html(x);
                $("#tabla_cot").DataTable({
                    order: [[0, 'desc']]
                });
            },
            error: function (jqXHR, estado, error) { },
        });

    }, 1500);
}


$(document).on('click', '#validar', function () {
    console.log('xd');
    var producto = $(this).closest("tr").find("td:eq(5)").text();

    if ($(this).is(':checked')) {
        $(this).parents("tr").find("td").css("background-color", "LightGreen");


    } else {
        $(this).parents("tr").find("td").css("background-color", "white");


    }

});

$(document).on("click", "#tabla_cot tbody tr", function () {
    // Encuentra el checkbox dentro de la fila actual
    var checkbox = $(this).find("#validar");


    // Cambia el estado del checkbox al hacer clic en cualquier parte de la fila
    checkbox.prop("checked", !checkbox.prop("checked"));
    // Actualiza la apariencia y el botón según el estado del checkbox
    actualizarFila_mocito(checkbox);
});


// Función para actualizar la visibilidad del botón de eliminación
function actualizarBotonEliminar() {
    var hayMarcados = $("#validar:checked").length > 0;
    if (hayMarcados) {
        $("#btn-eliminar").show();
    } else {
        $("#btn-eliminar").hide();
    }
}

// Monitorear cambios en los checkboxes
$("#validar").on('change', function () {
    actualizarBotonEliminar();
});

function actualizarFila_mocito(checkbox) {
    var docentry = $(checkbox).closest("tr").find("td:eq(1)").text();
    // Verifica si el checkbox está marcado
    if ($(checkbox).is(":checked")) {
        $(checkbox).closest("tr").find("td").css("background-color", "LightGreen");
        console.log(docentry);
    } else {
        $(checkbox).closest("tr").find("td").css("background-color", "white");
    }
    // Actualizar la visibilidad del botón de eliminación
    actualizarBotonEliminar();
}
function darbaja_of() {
    swal({
        title: "Quiere dar de Baja la OF?",
        text: "Recuerde Estar Seguro",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      })
      .then((willDelete) => {
        if (willDelete) {
          swal("Se ha elimniado la OF", {
            icon: "success",
          });
          console.log('xd');

          $("#validar:checked").each(function() {
            var docentry = $(this).closest("tr").find("td:eq(1)").text();
            // docentries.push(docentry);
           
            // console.log(docentries);
        $.ajax({
            beforeSend: function () { },
            url: "insertar_cola_service_of.php",
            type: "POST",
            data: { docentry: docentry, tipo_doc: '10', objtype: '20' },
            success: function (x) {
            },
            error: function (jqXHR, estado, error) {
                // $("#errores").html("Error... " + estado + "  " + error);
            },
        });
        $.ajax({
            beforeSend: function () { },
            url: "actualizar_cola_debaja.php",
            type: "POST",
            data: { docentry: docentry },
            success: function (x) {
                lista_of_reg();
            },
            error: function (jqXHR, estado, error) {
               
            },
        });
    
        });
        } else {
          swal("No se ha Eliminado la OF");
        }
      });
    // var docentries = [];
 
    
}