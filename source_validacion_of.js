function lista_of() {
    $.ajax({
        beforeSend: function () {
            //$("#lista_of_paraValidar").html("Recuperando Lista ...");
        },
        url: "listar_of_registradas.php",
        type: "POST",
        data: null,
        success: function (x) {
            var valores = x;
            var valores2= x.split(',').join("','");
            console.log(valores2);
            //console.log(valores);

            $.ajax({
                beforeSend: function () {
                    $("#lista_of_paraValidar").html("Recuperando Lista ...");
                },
                url: "lista_of_validar.php",
                type: "POST",
                data: { valores2 },
                success: function (x) {
                    $("#lista_of_paraValidar").html(x);
                    $("#tabla_validar").DataTable({
                        order: [[0, 'asc']]
                    });
                },
                error: function (jqXHR, estado, error) { },
            });
        },
        error: function (jqXHR, estado, error) { },
    });




}



$(document).on('click', '#validar', function () {
    var producto = $(this).closest("tr").find("td:eq(2)").text();

    if ($(this).is(':checked')) {
        $(this).parents("tr").find("td").css("background-color", "LightGreen");
        document.getElementById('btn_validar').disabled = false;
        llena_detalle(producto);
        pone_detalle_tabla2(producto);
        llena_elementos(producto);


    } else {
        $(this).parents("tr").find("td").css("background-color", "white");
        //document.getElementById('btn_validar').disabled = true;

        llena_detalle_contrario(producto);
        quita_detalle_tabla2(producto);
        llena_elementos_contrario(producto);

    }

});


$(document).on("click", "#tabla_validar tbody tr", function () {
    // Encuentra el checkbox dentro de la fila actual
    var checkbox = $(this).find("#validar");

   
    // Cambia el estado del checkbox al hacer clic en cualquier parte de la fila
    checkbox.prop("checked", !checkbox.prop("checked"));
    // Actualiza la apariencia y el botón según el estado del checkbox
    actualizarFila_mocito(checkbox);
});


function actualizarFila_mocito(checkbox) {
    var cant = checkbox.closest("tr").find("#validar:checked").length / 2;
    var producto = checkbox.closest("tr").find("td:eq(2)").text();
    // Verifica si el checkbox está marcado
    if (checkbox.is(":checked")) {
   
      checkbox.closest("tr").find("td").css("background-color", "LightGreen");
        llena_detalle(producto);
        llena_elementos(producto);
        llena_modelos(producto);
        pone_detalle_tabla2(producto);
        document.getElementById('btn_validar').disabled = false;
        
    } else {

      checkbox.closest("tr").find("td").css("background-color", "white");
        llena_detalle_contrario(producto);
        quita_detalle_tabla2(producto);
        llena_elementos_contrario(producto);
    }
}

function ultimo_valor_fila() {
    //let tableBody = document.getElementById('tabla_articulos_mod'); 
    let line = [];
    $("#tabla_articulos > tbody > tr").each(function () {
        articulos = parseFloat($(this).find("td").eq(0).html());
        line.push(articulos)
        //console.log(articulos);
    });

    line.sort(function (a, b) { return a - b });
    cantidad = line.length
    data = isNaN(line[cantidad - 1]) == true ? 0 : line[cantidad - 1]

    return data;
}



function ultimo_valor_fila_elementos() {
    //let tableBody = document.getElementById('tabla_articulos_mod'); 
    let line = [];
    $("#tabla_elementos > tbody > tr").each(function () {
        articulos = parseFloat($(this).find("td").eq(0).html());
        line.push(articulos)
        //console.log(articulos);
    });

    line.sort(function (a, b) { return a - b });
    cantidad = line.length
    data = isNaN(line[cantidad - 1]) == true ? 0 : line[cantidad - 1]

    return data;
}



function ultimo_valor_fila_tabla2() {
    //let tableBody = document.getElementById('tabla_articulos_mod'); 
    let line = [];
    $("#tabla_articulos2 > tbody > tr").each(function () {
        articulos = parseFloat($(this).find("td").eq(0).html());
        line.push(articulos)
        //console.log(articulos);
    });

    line.sort(function (a, b) { return a - b });
    cantidad = line.length
    data = isNaN(line[cantidad - 1]) == true ? 0 : line[cantidad - 1]

    return data;
}


function llena_elementos(producto){
     $.ajax({
        beforeSend: function () {
        
        },
        url: "lista_elementos.php",
        dataType: 'json',
        type: 'POST',
        data: {  producto: producto },
        success: function (data) {
            console.log(data);
            console.log(data.length);
            if (data == 0) {
                var n = noty({
                    text: "No existe el articulo...!",
                    theme: 'relax',
                    layout: 'center',
                    type: 'error',
                    timeout: 2000,
                });
            } else {
                for (let i = 0; i < data.length; i++) {
                      var codigo = data[i].iso;
                   
                    $('#tabla_elementos tbody tr').each(function () {
                        var codigoTabla = $(this).find('td:eq(1)').text().trim();
                        //if (codigoTabla === data[i].iso) {

                            var codigoTabla2 = $(this).find('td:eq(1)').text().trim();
                        
                            var cantidadActual = parseInt($(this).find('td:eq(4)').text().trim());
                            var nuevaCantidad = cantidadActual + parseInt(data[i].cantidad);
                            //$(this).find('td:eq(4)').text(nuevaCantidad);
                            return false; // Terminar el bucle
                       // }
                    });


                    //if (!existeCodigoEnTabla_elemento(codigo)) {
                        var num =  ultimo_valor_fila_elementos() + 1;
                        precio = 1;
                        precio_igv = precio * 1.18;
                        precioigv_parse = parseFloat(precio_igv).toFixed(4);
                        li = parseFloat(num - 1).toFixed(0);

                        $("#tabla_elementos > tbody").append("<tr><td class='center'>" + num + "</td>" +
                            "<td class='center'>" + data[i].iso + "</td>" +
                            "<td style='center'>" + data[i].cod_elemento + "</td>" +
                            "<td style='center'>" + data[i].des_element + "</td>" +
                            "<td style='center'>" + data[i].cantidad + "</td>"
                        );
                    //}
                }
            }
        },
        error: function (jqXHR, estado, error) { },
    });
}


function llena_elementos_contrario(producto){
     $.ajax({
        beforeSend: function () {
        
        },
        url: "lista_elementos.php",
        dataType: 'json',
        type: 'POST',
        data: {  producto: producto },
        success: function (data) {
            if (data == 0) {
                var n = noty({
                    text: "No existe el articulo...!",
                    theme: 'relax',
                    layout: 'center',
                    type: 'error',
                    timeout: 2000,
                });
            } else {
                for (let i = 0; i < data.length; i++) {
                      var codigo = data[i].iso;
                   
                    $('#tabla_elementos tbody tr').each(function () {
                        var codigoTabla = $(this).find('td:eq(1)').text().trim();
                        if (codigoTabla === data[i].iso) {

                            var codigoTabla2 = $(this).find('td:eq(1)').text().trim();
                        
                            var cantidadActual = parseInt($(this).find('td:eq(4)').text().trim());
                            var nuevaCantidad = cantidadActual - parseInt(data[i].cantidad);
                            $(this).find('td:eq(4)').text(nuevaCantidad);
                            if (nuevaCantidad === 0) {
                                $(this).remove(); // Eliminar la fila si la cantidad es 0
                            }
                            return false; // Terminar el bucle
                        }
                    });
                }
            }
        },
        error: function (jqXHR, estado, error) { },
    });
}




function llena_detalle(producto) {
    $.ajax({
        beforeSend: function (x) {

        },
        url: 'pone_mate_validado.php',
        dataType: 'json',
        type: 'POST',
        data: { producto: producto },
        success: function (data) {
            console.log(data);
            if (data == 0) {
                var n = noty({
                    text: "No existe el articulo...!",
                    theme: 'relax',
                    layout: 'center',
                    type: 'error',
                    timeout: 2000,
                });
            } else {
                for (let i = 0; i < data.length; i++) {
                    var codigo = data[i].codmatS;



                    $('#tabla_articulos tbody tr').each(function () {
                        var codigoTabla = $(this).find('td:eq(1)').text().trim();
                        if (codigoTabla === data[i].codmatS) {

                            var codigoTabla2 = $(this).find('td:eq(1)').text().trim();
                            if (codigoTabla2 === '0') {
                                $(this).find("td").css("background-color", "red");
                            }


                            var cantidadActual = parseInt($(this).find('td:eq(5)').text().trim());
                            var nuevaCantidad = cantidadActual + parseInt(data[i].OdtCant);
                            $(this).find('td:eq(5)').text(nuevaCantidad);
                            return false; // Terminar el bucle
                        }
                    });


                    if (!existeCodigoEnTabla(codigo)) {
                        var num = ultimo_valor_fila() + 1;
                        precio = 1;
                        precio_igv = precio * 1.18;
                        precioigv_parse = parseFloat(precio_igv).toFixed(4);
                        li = parseFloat(num - 1).toFixed(0);

                        $("#tabla_articulos > tbody").append("<tr><td class='center'>" + num + "</td>" +
                            "<td class='center'>" + codigo + "</td>" +
                            "<td style='center'>" + data[i].DesLarga + "</td>" +
                            "<td style='center'>" + data[i].unim + "</td>" +
                            "<td style='center'>" + data[i].Tipos + "</td>" +
                            "<td style='center'>" + data[i].OdtCant + "</td>"
                        );
                    }
                }
            }
        },
        error: function (jqXHR, estado, error) {

        }
    });
}





function llena_detalle_contrario(producto) {
    $.ajax({
        beforeSend: function (x) {

        },
        url: 'pone_mate_validado.php',
        dataType: 'json',
        type: 'POST',

        data: { producto: producto },
        success: function (data) {
            //console.log(data); console.log(data[0]);
            if (data == 0) {
                var n = noty({
                    text: "No existe el articulo...!",
                    theme: 'relax',
                    layout: 'center',
                    type: 'error',
                    timeout: 2000,
                });
            } else {
                for (let i = 0; i < data.length; i++) {
                    var codigo = data[i].codmatS;

                    $('#tabla_articulos tbody tr').each(function () {
                        var codigoTabla = $(this).find('td:eq(1)').text().trim();
                        if (codigoTabla === data[i].codmatS) {


                            var cantidadActual = parseInt($(this).find('td:eq(5)').text().trim());
                            var nuevaCantidad = cantidadActual - parseInt(data[i].OdtCant);
                            $(this).find('td:eq(5)').text(nuevaCantidad);
                            if (nuevaCantidad === 0) {
                                $(this).remove(); // Eliminar la fila si la cantidad es 0
                            }
                            return false; // Terminar el bucle

                        }
                    });


                    // if (!existeCodigoEnTabla(codigo)) {
                    //     var num = ultimo_valor_fila() + 1;
                    //     precio = 1;
                    //     precio_igv = precio * 1.18;
                    //     precioigv_parse = parseFloat(precio_igv).toFixed(4);
                    //     li = parseFloat(num - 1).toFixed(0);

                    //     $("#tabla_articulos > tbody").append("<tr><td class='center'>" + num + "</td>" +
                    //         "<td class='center'>" + codigo + "</td>" +
                    //         "<td style='center'>" + data[i].DesLarga + "</td>" +
                    //         "<td style='center'>" + data[i].unim + "</td>" +
                    //         "<td style='center'>" + data[i].Tipos + "</td>" +
                    //         "<td style='center'>" + data[i].OdtCant + "</td>"
                    //     );
                    // }
                }
            }
        },
        error: function (jqXHR, estado, error) {

        }
    });
}




function pone_detalle_tabla2(producto) {
    $.ajax({
        beforeSend: function (x) {

        },
        url: 'pone_mate_validado.php',
        dataType: 'json',
        type: 'POST',
        data: { producto: producto },
        success: function (data) {
            //console.log(data); console.log(data[0]);
            if (data == 0) {
                var n = noty({
                    text: "No existe el articulo...!",
                    theme: 'relax',
                    layout: 'center',
                    type: 'error',
                    timeout: 2000,
                });
            } else {
                for (let i = 0; i < data.length; i++) {
                    fil = ultimo_valor_fila_tabla2()
                    if (fil === 0) {

                        $("#tabla_articulos2 > tbody > tr > td").remove();
                    }
                    var num = ultimo_valor_fila_tabla2() + 1;


                    $("#tabla_articulos2 > tbody").append("<tr><td class='center'>" + num + "</td>" +
                        "<td class='center'>" + data[i].codmatS + "</td>" +
                        "<td style='center'>" + data[i].DesLarga + "</td>" +
                        "<td style='center'>" + data[i].unim + "</td>" +
                        "<td style='center'>" + data[i].Tipos + "</td>" +
                        "<td style='center'>" + data[i].OdtCant + "</td>" +
                        "<td style='center'>" + data[i].odtcod + "</td>" +
                        "<td style='center'>" + data[i].MotNroElem + "</td>" +
                        "<td style='center'>" + data[i].etapa + "</td>" +
                        "<td style='center'>" + data[i].ALMACEN + "</td>" +
                        "<td style='center'>" + data[i].eotDes + "</td>"
                    );

                }
            }
        },
        error: function (jqXHR, estado, error) {

        }
    });
}



function quita_detalle_tabla2(producto) {
    $('#tabla_articulos2 tbody tr').each(function () {
        var productoTabla = $(this).find('td:eq(6)').text().trim();
        if (productoTabla === producto) {
            $(this).remove(); // Eliminar la fila
        }
    });
}


function existeCodigoEnTabla(codigo) {
    var existe = false;
    $('#tabla_articulos tbody tr').each(function () {
        var codigoTabla = $(this).find('td:eq(1)').text().trim();
        if (codigoTabla === codigo) {
            existe = true;
            return false; // Terminar el bucle
        }
    });
    return existe;
}


function existeCodigoEnTabla_elemento(codigo) {
    var existe = false;
    $('#tabla_elementos tbody tr').each(function () {
        var codigoTabla = $(this).find('td:eq(1)').text().trim();
        if (codigoTabla === codigo) {
            existe = true;
            return false; // Terminar el bucle
        }
    });
    return existe;
}


function validar_swal() {
    $("#modal_procesar_validacion").modal("toggle");
    //enviar_correo(4)
}

function enviar_correo(valor) {
    $.ajax({
        url: "enviar_correo_validacion_of.php",
        type: "POST",
        data: {
            correo: 'produccion_sap@exituno.pe', docentry: valor,
        },
        success: function (x) {
            alertify.success('Se envio Correo');
        },
        error: function (jqXHR, estado, error) {
        },
    });
}



function validar_modal() {
    swal({
        title: "Validar OF",
        text: "¿Confirma validacion de OF?",
        icon: "warning",
        buttons: true,
        dangerMode: true,
    })
        .then((willDelete) => {
            if (willDelete) {

                validar();

            } else {
                swal("No se ha validado");
            }
        });
}



function validar() {

    var proceso = "VALIDACION OF";
    var fecha = $("#fechapag").val();
    var comentario = $("#comentario").val();

    $.ajax({
        beforeSend: function () { },
        url: "inserta_proceso_valor.php",
        type: "POST",
        data:
            "&proceso=" +
            proceso +
            "&fecha=" +
            fecha +
            "&comentario=" +
            comentario,

        success: function (data) {
            $("#comentario").val("");
            $("#modal_procesar_validacion").modal('hide');

            global = parseInt(data);

            $("[name='validar[]']:checked").each(function (key) {
                var fecha = $(this).parents("tr").find('td:eq(1)').text();
                var isograf = $(this).parents("tr").find('td:eq(2)').text();
                var descripcion = $(this).parents("tr").find('td:eq(3)').text();
                var um = $(this).parents("tr").find('td:eq(4)').text();
                var cantidad = $(this).parents("tr").find('td:eq(5)').text();


                $.ajax({
                    beforeSend: function () { },
                    url: "inserta_of_valida_cab.php",
                    type: "POST",
                    data:
                        "&fecha=" +
                        fecha +
                        "&isograf=" +
                        isograf +
                        "&descripcion=" +
                        descripcion +
                        "&um=" +
                        um +
                        "&cantidad=" +
                        cantidad +
                        "&global=" +
                        global,

                    success: function (data) {
                        var n = noty({
                            text: "Registrando Validacion OF ... " + isograf,
                            theme: 'relax',
                            layout: 'topLeft',
                            type: 'success',
                            timeout: 2000,
                        });
                        $("#tabla_articulos > tbody:last").children().remove();
                        $("#tabla_articulos2 > tbody:last").children().remove();
                        lista_of();
                    },

                    error: function (jqXHR, estado, error) {

                    },
                });
            });




            $('#tabla_articulos2 > tbody > tr').each(function () {
                linea = $(this).find('td').eq(0).html()
                lina2 = linea;
                var line = parseInt(linea);

                var codigo = $(this).find('td').eq(1).html();
                var descripcion = $(this).find('td').eq(2).html();
                var um = $(this).find('td').eq(3).html();
                var tipo = $(this).find('td').eq(4).html();
                var cantidad = $(this).find('td').eq(5).html();
                var isograf = $(this).find('td').eq(6).html();
                var cox = $(this).find('td').eq(7).html();
                var etapa = $(this).find('td').eq(8).html();
                var almacen = $(this).find('td').eq(9).html();
                var eotDesc = $(this).find('td').eq(10).html();

                if (codigo === '0') {

                } else {
                    $.ajax({
                        beforeSend: function () {
                        },
                        url: 'inserta_materiales_det.php',
                        type: 'POST',
                        data: '&line=' + line + '&codigo=' + codigo + '&descripcion=' + descripcion + '&um=' + um + '&tipo=' + tipo + '&cantidad=' + cantidad + '&isograf=' + isograf + '&global=' + global + '&cox=' + cox + '&etapa=' + etapa + '&almacen=' + almacen + '&eotDesc=' + eotDesc,
                        success: function (data) {


                        },
                        error: function (jqXHR, estado, error) {
                            $("#errores").html('Error... ' + estado + '  ' + error);
                        }
                    });
                }

            });


            $('#tabla_elementos > tbody > tr').each(function () {
                linea = $(this).find('td').eq(0).html()
                lina2 = linea;
                var line = parseInt(linea);
                var isograf = $(this).find('td').eq(1).html();
                var codigo = $(this).find('td').eq(2).html();
                var desc = $(this).find('td').eq(3).html();
                var cantidad = $(this).find('td').eq(4).html();

                if (codigo === '0') {

                } else {
                    $.ajax({
                        beforeSend: function () {
                        },
                        url: 'inserta_elementos.php',
                        type: 'POST',
                        data: '&line=' + line + '&isograf=' + isograf + '&codigo=' + codigo + '&desc=' + desc + '&cantidad=' + cantidad + '&global=' + global,
                        success: function (data) {


                        },
                        error: function (jqXHR, estado, error) {
                            $("#errores").html('Error... ' + estado + '  ' + error);
                        }
                    });
                }

            });

            enviar_correo(global)
        },

        error: function (jqXHR, estado, error) {

        },
    });





}
function ultimo_valor_fila_modelos() {
    //let tableBody = document.getElementById('tabla_articulos_mod'); 
    let line = [];
    $("#tabla_modelos > tbody > tr").each(function () {
        articulos = parseFloat($(this).find("td").eq(0).html());
        line.push(articulos)
        //console.log(articulos);
    });

    line.sort(function (a, b) { return a - b });
    cantidad = line.length
    data = isNaN(line[cantidad - 1]) == true ? 0 : line[cantidad - 1]

    return data;
}


function llena_modelos(producto){
     $.ajax({
        beforeSend: function () {
        
        },
        url: "lista_elementos.php",
        dataType: 'json',
        type: 'POST',
        data: {  producto: producto },
        success: function (data) {
            console.log(data);
            console.log(data.length);
            if (data == 0) {
                var n = noty({
                    text: "No existe el articulo...!",
                    theme: 'relax',
                    layout: 'center',
                    type: 'error',
                    timeout: 2000,
                });
            } else {
                for (let i = 0; i < data.length; i++) {
                      var codigo = data[i].iso;
                   
                    $('#tabla_modelos tbody tr').each(function () {
                        var codigoTabla = $(this).find('td:eq(1)').text().trim();
                        //if (codigoTabla === data[i].iso) {

                            var codigoTabla2 = $(this).find('td:eq(1)').text().trim();
                        
                            var cantidadActual = parseInt($(this).find('td:eq(4)').text().trim());
                            var nuevaCantidad = cantidadActual + parseInt(data[i].cantidad);
                            //$(this).find('td:eq(4)').text(nuevaCantidad);
                            return false; // Terminar el bucle
                       // }
                    });


                    //if (!existeCodigoEnTabla_elemento(codigo)) {
                        var num =  ultimo_valor_fila_modelos() + 1;
                        precio = 1;
                        precio_igv = precio * 1.18;
                        precioigv_parse = parseFloat(precio_igv).toFixed(4);
                        li = parseFloat(num - 1).toFixed(0);

                        $("#tabla_modelos > tbody").append("<tr><td class='center'>" + num + "</td>" +
                            "<td class='center'>" + data[i].iso + "</td>" +
                            "<td style='center'>" + data[i].cod_elemento + "</td>" +
                            "<td style='center'>" + data[i].des_element + "</td>" +
                            "<td style='center'>" + data[i].cantidad + "</td>"
                        );
                    //}
                }
            }
        },
        error: function (jqXHR, estado, error) { },
    });
}
