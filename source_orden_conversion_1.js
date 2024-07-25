let vista_modal = [];
function lista_ordenes() {
    $.ajax({
        beforeSend: function () {
            $("#lista_producto").html("Cargando...");
        },
        url: 'lista_orden_conver.php',
        type: 'POST',
        data: null,
        success: function (x) {
            $("#lista_producto").html(x);
            $('#tabla_iso').DataTable();
        },
        error: function (jqXHR, estado, error) {
            $("#lista_producto").html('Hubo un error: ' + estado + ' ' + error);
        }
    });
}


function procesa_convert(docentry) {
    $("#modal_procesar").modal("toggle");
    $('#nro_iso').val(docentry)
    consulta_datos_conver_cab(docentry);
    $("#lista_producto_mat").hide();
}

function consulta_datos_conver_cab(docentry) {
    $.ajax({
        beforeSend: function () {
            $("#lista_producto_det").html("Cargando...");
        },
        url: 'lista_orden_conver_det.php',
        type: 'POST',
        data: { docentry },
        success: function (x) {
            $("#lista_producto_det").html(x);
            $('#tabla_iso_det').DataTable();
        },
        error: function (jqXHR, estado, error) {
            $("#lista_producto").html('Hubo un error: ' + estado + ' ' + error);
        }
    });
}

function registrar_datos_of() {
    nro_iso = $('#nro_iso').val();
    fecha = $('#fecha').val();
    fecha_op = $('#fecha_op').val();
    fecha_fi = $('#fecha_fi').val();
    $('#tabla_iso_det > tbody > tr').each(function () {
        line = 0;
        num = $(this).find('td').eq(0).html()
        proceso = $(this).find('td').eq(1).html()
        cod_producto = $(this).find('td').eq(2).html()
        cantidad = $(this).find('td').eq(5).html()
        unidad = $(this).find('td').eq(6).html()

        reg_of_cab(line, num, proceso, cod_producto, cantidad, unidad)
        Swal.fire({
            icon: 'success',
            title: 'Registro Exitoso',
            text: 'El recibo fue registrado.',
            showConfirmButton: false, // Oculta el botón "Aceptar"
            timer: 2000
        }).then(function () {
            
            $("#modal_procesar").modal("hide");
        });

    });
}
function reg_of_cab(line, num, proceso, cod_producto, cantidad, unidad) {
    //console.log(cod_producto)  ;  
    $.ajax({
        url: "procesa_of_convert_cab.php",
        type: "POST",
        data: { nro_iso, fecha, fecha_op, fecha_fi, num, proceso, cod_producto, cantidad, unidad },
        success: function (x) {
            //console.log(cod_producto) 
            global = parseInt(x);
            console.log(global);
            reg_of_det(global, nro_iso, cod_producto, line, proceso)
            migrar_sap(global, 7)

        },
        error: function (jqXHR, estado, error) {
        }
    });
}

function reg_of_det(global, nro_iso, cod_producto, line, proceso) {
    $.ajax({
        url: 'lista_reg_convert_det.php',
        type: 'POST',
        dataType: 'json',
        data: { nro_iso, cod_producto },
        success: function (x) {
            console.log(x);
            for (let i = 0; i < x.length; i++) {
                $.ajax({
                    beforeSend: function () {
                    },
                    url: 'procesa_of_convert_det.php',
                    type: 'POST',
                    data: { line, proceso, codigo: x[i].OdtCodBobina, cantidad: x[i].OdtCantKilos, docentry: global },
                    success: function (data) {
                        var n = noty({
                            text: "Procesando OF...  articulo: " + cod_producto,
                            theme: 'relax',
                            layout: 'topLeft',
                            type: 'success',
                            timeout: 2000,
                        });
    
                    },
                    error: function (jqXHR, estado, error) {
                        //$("#errores").html('Error... ' + estado + '  ' + error);
                    }
                });
                
            }
            
        },
        error: function (jqXHR, estado, error) {
            //  $("#lista_producto").html('Hubo un error: ' + estado + ' ' + error);
        }
    });
}

function migrar_sap(docentry, tipo_dc) {
    $.ajax({
        beforeSend: function () { },
        url: "insertar_cola_service_of.php",
        type: "POST",
        data: { docentry: docentry, tipo_doc: tipo_dc, objtype: '202' },
        success: function (x) {
        },
        error: function (jqXHR, estado, error) {
            $("#errores").html("Error... " + estado + "  " + error);
        },
    });
}

function recibo_produccion_nroisograf(nro_of_isograf) {
    $("#modal_recibo_produc").modal("toggle");
    $.ajax({
        url: "consulta_listado_recibo_convert.php",
        type: "POST",
        data: {
            nro_of_isograf
        },
        success: function (x) {
            $("#data_rec").html(x);
            $(".select2").select2();
        },
        error: function (jqXHR, estado, error) { },
    });

}


function ver_detalle(datos) {

    $("#modal_vista_reci").modal("toggle");
    
    var idcl = datos.split("|");
    $("#cod_product").val(idcl[0]);
    $("#nombre_producto").val(idcl[1]);
    $("#uni_buenas").val(idcl[2]);
    $("#nro_iso_rec").val(idcl[3]);
    $("#doc_of_rec").val(idcl[6]);
    $("#uni_malas").val("0");
    //vista_modal = idcl[3];

    //console.log(vista_modal);
    listar_almacen2();
    listar_almacen_emi();
    lista_datos_recibo(idcl[6]);
}

function lista_datos_recibo(docentry_of) {
    $.ajax({
        url: 'lista_data_ofConvert_det.php',
        type: 'POST',
        dataType: 'json',
        data: {docentry_of },
        success: function (x) {
            //console.log(x);
            vista_modal = x;
            //console.log(vista_modal[0].CODIGO);
        },
        error: function (jqXHR, estado, error) {
           
        }
    });
}

function listar_almacen2() {
    $(document).ready(function () {
        $.ajax({
            beforeSend: function () {
                $("#almacen_detalle").html("Recuperando Lista ...");
            },
            url: 'lista_almacen_ordenF.php',
            type: 'POST',
            data: null,
            success: function (x) {
                $("#almacen_detalle").html(x);
                $(".select2").select2();
            },
            error: function (jqXHR, estado, error) {
            }
        });
    });
}

function listar_almacen_emi() {
    $(document).ready(function () {
        $.ajax({
            beforeSend: function () {
                $("#almacen_detalle_emi").html("Recuperando Lista ...");
            },
            url: 'lista_almacen_ordenF.php',
            type: 'POST',
            data: null,
            success: function (x) {
                $("#almacen_detalle_emi").html(x);
                $(".select2").select2();
            },
            error: function (jqXHR, estado, error) {
            }
        });
    });
}


function registrar_reciboP() {
    modal_op_iso = $("#nro_iso_rec").val();
    modal_pro = $("#cod_product").val();
    modal_des = $("#nombre_producto").val();
    modal_docentry = $("#doc_of_rec").val();
    modal_fi = $("#fec_ini_rec").val();
    modal_ff = $("#fec_fin_rec").val();

    unidad_buena = $("#uni_buenas").val();
    unidad_mala = $("#uni_malas").val();
    almacen = $("#almacen_detalle option:selected").val();
    observaciones = $("#uni_observaciones").val();

    bandera2 = true;

    if (unidad_buena === '') {
        bandera2 = false;
        alertify.error("Ingrese Unidad Buena");

    }

    if (unidad_mala === '') {
        bandera2 = false;
        alertify.error("Ingrese Unidad Mala");
    }

    if (bandera2 === true) {

        $.ajax({
            url: "inserta_datos_reciboCab_convert.php",
            type: "POST",
            data: { modal_op_iso: modal_op_iso, modal_pro: modal_pro, modal_des: modal_des, modal_docentry: modal_docentry, modal_fi: modal_fi, modal_ff: modal_ff },
            success: function (x) {

                global = parseInt(x);
                console.log(global);
                //aqui comienza el deta
                if (global == 0) {
                    alertify.error("No inserto");
                } else {
                    var unidad_buena = $("#uni_buenas").val();
                    var unidad_mala = $("#uni_malas").val();
                    var almacen = $("#almacen_detalle option:selected").val();
                    var observaciones = $("#uni_observaciones").val();

                    $.ajax({
                        beforeSend: function () { },
                        url: "inserta_datos_reciboDet_convert.php",
                        type: "POST",
                        data:
                            "&modal_op_iso=" +
                            modal_op_iso +
                            "&unidad_buena=" +
                            unidad_buena +
                            "&unidad_mala=" +
                            unidad_mala +
                            "&almacen=" +
                            almacen +
                            "&observaciones=" +
                            observaciones +
                            "&docentry=" +
                            global,
                        success: function (data) {

                            //$("#modal_recibo_produc").modal("hide");
                            //lista_recibo_prod();

                        },

                        error: function (jqXHR, estado, error) {

                        },
                    });
                    Swal.fire({
                        icon: 'success',
                        title: 'Registro Exitoso',
                        text: 'El recibo fue registrado.',
                        showConfirmButton: false, // Oculta el botón "Aceptar"
                        timer: 2000
                    }).then(function () {
                        migrar_sap(global, 8) 
                        registrar_datos() 
                        $("#modal_vista_reci").modal("hide");
                    });
                    


                    //migrar_sap(global, 3)
                }
            },
            error: function (jqXHR, estado, error) {

            }
        });
    }
}


function validar_numero(event) {
    //console.log(event);
    var charCode = (event.which) ? event.which : event.keyCode;
    if (charCode != 46 && charCode > 31 && (charCode < 48 || charCode > 57)) {
        alertify.error('No puede ingresar letras');
        return false;
    }
    return true;
}

function elegirRecibo(fila) {
    var vista = fila.querySelector('td[id]').id;

    cantidad = $("#cantidad_tot").val();

    for (let i = 0; i < cantidad; i++) {

        i2 = i + 1;
        vari = "data_" + i2;

        if (vista === vari) {
            $("#" + vista).show();
            
        } else {
            $("#" + vari).hide();
        }

    }

    vista2 = "#" + vista

}


function registrar_datos() {
    tipo_mod = 'CON';
    estado_mod = 'CON';
    producto_mod = $("#cod_product").val();
    um_mod = 'UNIDAD'
    des_mod = $("#nombre_producto").val();
    cant_plan_mod = $("#uni_buenas").val();
    almacen_modal =  $("#almacen_detalle_emi option:selected").val();
    docentry_mod = vista_modal[0].DOCENTRY;
    comentarios = $("#uni_observaciones").val();
    fechai_modal = $("#fec_ini_rec").val();
    fechaf_modal = $("#fec_fin_rec").val();
    maquinaria_modal = '';
    turno_modal = '';
    operario_modal = '';
    modal_docentry = $("#doc_of_rec").val();

    bandera2 = true;        

    if (bandera2 === true) {
        $.ajax({
            url: "inserta_datos_entrega_convert_cab.php",
            type: "POST",
            data: {
                tipo_mod: tipo_mod, estado_mod: estado_mod, producto_mod: producto_mod, um_mod: um_mod, des_mod:
                    des_mod, cant_plan_mod: cant_plan_mod, almacen_modal: almacen_modal, docentry_mod: docentry_mod, comentarios:
                    comentarios, fechai_modal: fechai_modal, fechaf_modal: fechaf_modal, maquinaria_modal: maquinaria_modal, turno_modal: turno_modal, operario_modal: operario_modal
            },
            success: function (x) {                
                global = parseInt(x);                
                if (global == 0) {
                    alertify.error("No inserto");
                } else {                    
                        var BaseLineNum = 1
                        var baseentry = modal_docentry;
                        var proceso = 'CON';
                        var codigo = vista_modal[0].CODIGO;
                        var descripcion = vista_modal[0].ItemName;
                        var tipo = 'CON';
                        var cant_b = vista_modal[0].CANTIDAD_REQUERIDA;
                        var cant_r = vista_modal[0].CANTIDAD_REQUERIDA;
                        var cant_mala = 0;
                        var cant_mala2 = parseFloat(cant_mala);
                        var ingresarcantidad = vista_modal[0].CANTIDAD_REQUERIDA;
                        var almacen = $("#almacen_detalle_emi option:selected").val();
                        console.log(almacen);
                        var cant_almacen = vista_modal[0].CANTIDAD_REQUERIDA;
                        var ingresarcantidad2 = parseFloat(ingresarcantidad);
                        var nro_isograph = $("#nro_iso_rec").val();

                        $.ajax({
                            beforeSend: function () { },
                            url: "inserta_datos_entrega_convert_det.php",
                            type: "POST",
                            data:
                                "&BaseLineNum=" +
                                BaseLineNum +
                                "&baseentry=" +
                                baseentry +
                                "&proceso=" +
                                proceso +
                                "&codigo=" +
                                codigo +
                                "&descripcion=" +
                                descripcion +
                                "&tipo=" +
                                tipo +
                                "&cant_b=" +
                                cant_b +
                                "&cant_r=" +
                                cant_r +
                                "&cant_mala=" +
                                cant_mala2 +
                                "&ingresarcantidad=" +
                                ingresarcantidad2 +
                                "&almacen=" +
                                almacen +
                                "&cant_almacen=" +
                                cant_almacen +
                                "&docentry=" +
                                global +
                                "&nro_isograph=" +
                                nro_isograph,
                            success: function (data) {

                                migrar_sap(global, 9) 
                            },

                            error: function (jqXHR, estado, error) {

                            },
                        });
                   
                }
            },
            error: function (jqXHR, estado, error) {

            }
        });
    }  

}

$(document).on("click", "#tabla_iso_det tbody tr", function () {
    // Al hacer clic, verificamos si la fila ya estaba seleccionada.
    var estabaSeleccionada = $(this).hasClass("seleccionada");

    // Removemos la clase 'seleccionada' de todas las filas para asegurarnos de que solo una pueda estar seleccionada a la vez.
    $("#tabla_iso_det tbody tr").removeClass("seleccionada").css("background-color", "white");

    if (estabaSeleccionada) {
        // Si la fila ya estaba seleccionada, desactivamos los detalles.
        $("#lista_producto_mat").hide();
    } else {
        // Si la fila no estaba seleccionada, la marcamos como seleccionada y cambiamos su color de fondo.
        $(this).addClass("seleccionada").css("background-color", "LightGreen");

        // Extraemos los códigos de apertura y caja de la fila seleccionada.
        var docentry = $(this).closest("tr").find("td:eq(2)").text();


        // Mostramos los detalles de los pagos realizados.
        lista_mate(docentry);
    }
});

function lista_mate(docentry) {
    $("#lista_producto_mat").show();
    nro_iso= $("#nro_iso").val()

    $.ajax({
        url: "lista_orden_conver_mat.php",
        type: "POST",
        data: {
            nro_iso: nro_iso,cod_material:docentry
        },
        success: function (x) {
            $("#lista_producto_mat").html(x);
            $("#tabla_ConsumoE_modal2").DataTable({
                order: [[0, 'asc']]
            });
        },
        error: function (jqXHR, estado, error) { },
    });

}
