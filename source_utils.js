/*********************************************************************/
function valida_acceso() {
  $(document).ready(function () {
    $.ajax({
      beforeSend: function () {
        $("#btn-valida").html("Validando...");
      },
      url: 'valida_acceso.php',
      type: 'POST',
      data: "pass=" + $("#pass").val() + "&opt=" + $("#opcion").val(),
      success: function (res) {
        if (res == 1) {
          document.location.href = 'aju_inventarios.php';
        }
        if (res == 0) {
          alert('La contrase\u00f1a no es correcta...');
          document.location.href = 'valida_cambio.php?opt=1265780909';
        }
        if (res == 2) {
          alert('La contrase\u00f1a no es correcta...');
          document.location.href = 'valida_cambio.php?opt=582963741';
        }
        if (res == 3) {
          document.location.href = 'util_backup.php';
        }
      },
      error: function (jqXHR, estado, error) {
      }
    });
  })
}
/***********************************************************************/
function pulsar(e) {
  tecla = (document.all) ? e.keyCode : e.which;
  return (tecla != 13);
}
/***********************************************************************/
function genera_opcion() {
  $(document).ready(function () {
    $.ajax({
      beforeSend: function () {
        $("#pone_opcion").html("Poniendo opciones...");
      },
      url: 'opciones_cancel_venta.php',
      type: 'POST',
      data: 'option=' + $("#tipo_buscar").val(),
      success: function (res) {
        $("#pone_opcion").html(res);
        $(function () {
          $('#daterange-btn').daterangepicker(
            {
              ranges: {
                'Este dia': [moment(), moment()],
                'Ayer': [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
                'Los ultimos 7 dias': [moment().subtract(6, 'days'), moment()],
                'Los ultimos 30 dias': [moment().subtract(29, 'days'), moment()],
                'Este mes': [moment().startOf('month'), moment().endOf('month')],
                'El mes pasado': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')]
              },
              startDate: moment().subtract(29, 'days'),
              endDate: moment()
            },
            function (start, end) {
              $('.fe').html(start.format('MMMM D, YYYY') + ' - ' + end.format('MMMM D, YYYY'));
              var xstart = start.format('YYYY-MM-DD');
              var xend = end.format('YYYY-MM-DD');
              $("#fi").val(xstart);
              $("#ff").val(xend);
              //alert(start.format('YYYY-MM-DD')+'    '+end.format('YYYY-MM-DD'));
            }
          );
        });
        $("#numero_caja").select2();
        $("#numero_ticket").inputmask('mask', { 'alias': 'numeric', 'autogroup': true, 'digits': 0, 'digitsOptional': false });
      },
      error: function (jqXHR, estado, error) {
        alert("Hubor un error al establecer las opciones de consulta de venta, reporte a soporte...!");
        $("#pone_opcion").hmtl(estado + "     " + error);
      }
    });
  })
}
/*********************************************************************/
function busca_ventas() {
  $(document).ready(function () {
    if ($("#fi").val() != "" || $("#ff").val() != "") {
      $.ajax({
        beforeSend: function () {
          $("#data").html("Buscando las ventas, un momento...");
        },
        url: 'busca_ventas_cancel.php',
        type: 'POST',
        data: 'fechai=' + $("#fi").val() + '&fechaf=' + $("#ff").val(),
        success: function (res) {
          $("#data").html(res);
          $(document).ready(function () {
            $('#tabla_ventas').DataTable();
          });
        },
        error: function (jqXHR, estado, error) {
          alert("Hubor un error al buscar las ventas...por favor reporte a soporte...!");
          $("#data").hmtl(estado + "     " + error);
        }
      });
    } else {
      alert("Selecciona un rango de fechas para poder continuar...!");
    }
  })
}
/****************************************************************************/
function cancela_ticket(num_ticket) {
  $(document).ready(function () {
    var ticket = num_ticket.split("|");
    var n = noty({
      text: "Seguro que deseas cancelar la venta/ticket de Sesión: " + ticket[0] + " " + "Numero: " + ticket[1],
      theme: 'relax',
      layout: 'center',
      type: 'information',
      modal: 'true',
      buttons: [
        {
          addClass: 'btn btn-primary',
          text: 'Si',
          onClick: function ($noty) {
            $noty.close();
            $.ajax({
              beforeSend: function () {
              },
              url: 'cancela_ticket.php',
              type: 'POST',
              data: 'serie=' + ticket[0] + '&numero=' + ticket[1],
              success: function (res) {
                if (res != "0") {
                  alert("Se cancelo el ticket...!");
                  $("#data").empty();
                } else {
                  alert("Ocurrio un error al intentar cancelar el ticket, es necesario que reportes a Soporte..!");
                }
              },
              error: function (jqXHR, estado, error) {
                alert("Hubor un error al intentar cancelar la venta...por favor reporte a soporte...!");
                $("#data").hmtl(estado + "     " + error);
              }
            });
          }
        },
        {
          addClass: 'btn btn-danger',
          text: 'No',
          onClick: function ($noty) {
            $noty.close();
          }
        }
      ]
    });
  })
}
/*****************************************************************************/
function muestra_detalle(num_ticket) {
  var tic = num_ticket.split("|");
  $("#modal_detalle_venta").modal({
    show: true,
    backdrop: 'static',
    keyboard: false
  });
  $.ajax({
    beforeSend: function () {
      $("#detalle_de_venta").html("Consultando detalle...");
    },
    url: 'consulta_detalle_venta.php',
    type: 'POST',
    data: 'serie=' + tic[0] + '&numero=' + tic[1],
    success: function (x) {
      $(".nuticket").html("");
      $(".nuticket").append("Detalle de venta | <span class='label label-warning'>Ticket: " + tic[0] + " - " + tic[1] + "</span>");
      $("#detalle_de_venta").html(x);
    },
    error: function (jqXHR, estado, error) {
      $("#detalle_de_venta").html('Hubo un error: ' + estado + ' ' + error);
    }
  });
}
/**********************************************************************************/
function busca_ventas_numero() {
  $(document).ready(function () {
    if ($("#numero_ticket").val() != '0') {
      //alert($("#numero_ticket").val());
      $.ajax({
        beforeSend: function () {
          $("#data").html("Buscando detalle de venta, un momento...");
        },
        url: 'busca_ventas_cancel_numero.php',
        type: 'POST',
        data: 'serie_c=' + $("#numero_caja").val() + '&numero_t=' + $("#numero_ticket").val(),
        success: function (res) {
          $("#data").html(res);
        },
        error: function (jqXHR, estado, error) {
          alert("Hubor un error al buscar las ventas...por favor reporte a soporte...!");
          $("#data").hmtl(estado + "     " + error);
        }
      });
    } else {
      alert("El numero de ticket, no puede ser cero...");
      $("#numero_ticket").focus();
    }
  })

}
/****************************************************************************************/
function limpia_divs() {
  $("#pone_opcion").empty();
  $("#data").empty();
}
/****************************************************************************************/
function alta_gasto() {
  $(document).ready(function () {
    if ($("#fecha").val() != "" || $("#num_dock").val() != "" || $("#subtotal").val() != "") {
      $.ajax({
        beforeSend: function () {
          $("#btn-altas").attr('disabled', true);
          $("#btn-altas").html("Registrando...");
        },
        url: 'graba_gasto.php',
        type: 'POST',
        data: 'fecha=' + $("#fecha").val() + '&numero_fact=' + $("#num_dock").val() + '&proveedor=' + $("#proveedor").val() + '&subtotal=' + $("#subtotal").val() + '&iva=' + $("#iva").val() + '&total=' + $("#total").val() + '&concepto=' + $("#concepto").val(),
        success: function (res) {
          if (res == 'error') {
            var n = noty({
              text: "No se registro el gasto, los campos SUBTOTAL, IVA, TOTAL no pueden ser inferiores a Cero...",
              theme: 'relax',
              layout: 'center',
              type: 'error',
              timeout: 2000,
            });
            $("#btn-altas").html("<i class='fa fa-check-circle'></i> Registrar el gasto.");
            $("#btn-altas").attr('disabled', false);
          } else {
            var n = noty({
              text: "Se registro el gasto correctamente...!",
              theme: 'relax',
              layout: 'center',
              type: 'information',
              timeout: 2000,
            });
            $("#btn-altas").attr('disabled', false);
            $("#btn-altas").html("<i class='fa fa-check-circle'></i> Registrar el gasto.");
            cancela_campos_gasto();
          }
        },
        error: function (jqXHR, estado, error) {
          alert("Hubor un error al registrar el gasto...por favor reporte a soporte...!");
          $("#btn-altas").html(estado + "     " + error);
        }
      });
    } else {
      alert("Es necesario registrar los campos...");
    }
  })
}
/********************************************************************************/
function cancela_campos_gasto() {
  $("#fecha").val("");
  $("#num_dock").val("");
  $("#proveedor").val("");
  $("#concepto").val("");
  $("#subtotal").val("");
  $("#iva").val("");
  $("#total").val("");
}
/********************************************************************************/
function respalda() {
  $.ajax({
    beforeSend: function () {
      $("#btn-procede").prop("disabled", true)
      $("#respuesta").html("Respaldando base de datos... <img src='Imagenes/loader.gif'></img>");
    },
    url: 'crea_respaldo.php',
    type: 'POST',
    data: null,
    success: function (x) {
      $("#respuesta").html(x);
    },
    error: function (jqXHR, estado, error) {
      $("#respuesta").html('Hubo un error al generar el respaldo!!!Reporte a soporte...' + '     ' + estado + ' ' + error);
    }
  });
}
/*****************************************************************GC - Busca Ventas Autorizaciones*******************/
/*********************************************************************/
function busca_ventas_autorizaciones() {
  $(document).ready(function () {
    if ($("#fi").val() != "" || $("#ff").val() != "") {
      $.ajax({
        beforeSend: function () {
          $("#data").html("Buscando las ventas, un momento...");
        },
        url: 'busca_ventas_autorizaciones.php',
        type: 'POST',
        data: 'fechai=' + $("#fi").val() + '&fechaf=' + $("#ff").val(),
        success: function (res) {
          $("#data").html(res);
          $(document).ready(function () {
            $('#tabla_ventas').DataTable();
          });
        },
        error: function (jqXHR, estado, error) {
          alert("Hubor un error al buscar las ventas...por favor reporte a soporte...!");
          $("#data").hmtl(estado + "     " + error);
        }
      });
    } else {
      alert("Selecciona un rango de fechas para poder continuar...!");
    }
  })
}

/*****************************************************************
GC Muestra Detalle Autoriza
************/
function muestra_detalle_autorizaciones(num_ticket) {
  var tic = num_ticket.split("|");
  $("#modal_detalle_venta").modal({
    show: true,
    backdrop: 'static',
    keyboard: false
  });
  $.ajax({
    beforeSend: function () {
      $("#detalle_de_venta").html("Consultando detalle...");
    },
    url: 'consulta_detalle_venta_autorizaciones.php',
    type: 'POST',
    data: 'serie=' + tic[0] + '&numero=' + tic[1],
    success: function (x) {
      $(".nuticket").html("");
      $("#idpedido").val(tic[1]);
      $(".nuticket").append("AUTORIZACIONES: Detalle de venta | <span class='label label-warning'>Ticket: " + tic[0] + " - " + tic[1] + "</span>");
      $("#detalle_de_venta").html(x);

      var idpedido = '';
      idpedido = tic[1];
      $(document).ready(function () {
        $.ajax({
          //          beforeSend: function(){
          //            $("#montolp").html("Recuperando Lista Precios...");
          //           },
          url: 'pone_modelo_autoriza_venta_condicion.php',

          type: 'POST',
          data:
            { idpedido },
          success: function (x) {
            $("#idmodelo").val("");
            $("#comentariosaut").val("");
            $("#pone_cmodelo").html(x);
            $(".select2").select2();
            //              alert($("#totales").html())
            //$("#montolp2").val($("#montolp").val());

          },
          error: function (jqXHR, estado, error) {
          }
        });
      });

    },
    error: function (jqXHR, estado, error) {
      $("#detalle_de_venta").html('Hubo un error: ' + estado + ' ' + error);
    }
  });
}
/**********************************************************************************/
/*******PROCESA AUTORIZACION******************************/
function procesa_autorizacion() {
  $(document).ready(function () {

    var idautoriza = '1';
    var id_ticket = '0';
    var idmodel = '';
    var comentaaut = '';
    // $('#modal_detalle_venta').modal('toggle');
    id_ticket = $("#idpedido").val();
    idmodel = $("#idmodelo").val();
    comentaaut = $("#comentariosaut").val();
    if ($("#idmodelo").val() != "") {
      $.ajax({
        beforeSend: function () {
        },
        url: 'procesa_venta_autorizacion.php',
        type: 'POST',
        data: 'idautoriza=' + idautoriza + '&id_ticket=' + id_ticket + '&idquery=' + idmodel + '&comentario=' + comentaaut,
        success: function (x) {
          var n = noty({
            text: "Se ha procedido a la AUTORIZACION del pedido N°: " + id_ticket,
            theme: 'relax',
            layout: 'topLeft',
            type: 'success',
            timeout: 2000,
          });
          $("#comentarios").val("");

        }
        ,
        error: function (jqXHR, estado, error) {
          $("#errores").html('Error... ' + estado + '  ' + error);
        }
      });
    } else {
      var n = noty({
        text: "Debe seleccionar un Modelo de Autorización...: " + id_ticket,
        theme: 'relax',
        layout: 'topLeft',
        type: 'warning',
        timeout: 2000,
      });
    }
  });
}

/***********************************************************************************/
/*******PROCESA AUTORIZACION******************************/
function procesa_rechazo() {
  $(document).ready(function () {

    var idautoriza = '0';
    var id_ticket = '0';
    var idmodel = '';
    var comentaaut = '';
    // $('#modal_detalle_venta').modal('toggle');
    id_ticket = $("#idpedido").val();
    idmodel = $("#idmodelo").val();
    comentaaut = $("#comentariosaut").val();
    if ($("#idmodelo").val() != "") {
      $.ajax({
        beforeSend: function () {
        },
        url: 'procesa_venta_rechazo.php',
        type: 'POST',
        data: 'idautoriza=' + idautoriza + '&id_ticket=' + id_ticket + '&idquery=' + idmodel + '&comentario=' + comentaaut,
        success: function (x) {
          var n = noty({
            text: "Se ha procedido al RECHAZO del pedido N°: " + id_ticket,
            theme: 'relax',
            layout: 'topLeft',
            type: 'warning',
            timeout: 2000,
          });

        }
        ,
        error: function (jqXHR, estado, error) {
          $("#errores").html('Error... ' + estado + '  ' + error);
        }
      });
    } else {
      var n = noty({
        text: "Debe seleccionar un Modelo de Autorización....: " + id_ticket,
        theme: 'relax',
        layout: 'topLeft',
        type: 'warning',
        timeout: 2000,
      });
    }
  });
}


/*********************************************************************/
function busca_ventas_despacho() {
  $(document).ready(function () {
    if ($("#fi").val() != "" || $("#ff").val() != "") {
      $.ajax({
        beforeSend: function () {
          $("#datadespacho").html("Buscando los despachos de ventas un momento...");
        },
        url: 'busca_ventas_despacho.php',
        type: 'POST',
        data: 'fechai=' + $("#fi").val() + '&fechaf=' + $("#ff").val(),
        success: function (res) {
          $("#datadespacho").html(res);
          $(document).ready(function () {
            $('#tabla_ventas_despacho').DataTable();
          });
        },
        error: function (jqXHR, estado, error) {
          alert("Hubor un error al buscar los despachos...por favor reporte a soporte...!");
          $("#datadespacho").hmtl(estado + "     " + error);
        }
      });
    } else {
      alert("Selecciona un rango de fechas para poder continuar...!");
    }
  })
}
/****************************************************************************/
/**************GC PONE OPCIONES CONSULTA DESPACHOS*********************************************************/
function genera_opcion_despacho() {
  $(document).ready(function () {
    $.ajax({
      beforeSend: function () {
        $("#pone_opcion_despacho").html("Poniendo opciones...");
      },
      url: 'opciones_venta_despachos.php',
      type: 'POST',
      data: 'option=' + $("#tipo_buscar").val(),
      success: function (res) {
        $("#pone_opcion_despacho").html(res);
        $(function () {
          $('#daterange-btn').daterangepicker(
            {
              ranges: {
                'Este dia': [moment(), moment()],
                'Ayer': [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
                'Los ultimos 7 dias': [moment().subtract(6, 'days'), moment()],
                'Los ultimos 30 dias': [moment().subtract(29, 'days'), moment()],
                'Este mes': [moment().startOf('month'), moment().endOf('month')],
                'El mes pasado': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')]
              },
              startDate: moment().subtract(29, 'days'),
              endDate: moment()
            },
            function (start, end) {
              $('.fe').html(start.format('MMMM D, YYYY') + ' - ' + end.format('MMMM D, YYYY'));
              var xstart = start.format('YYYY-MM-DD');
              var xend = end.format('YYYY-MM-DD');
              $("#fi").val(xstart);
              $("#ff").val(xend);
              //alert(start.format('YYYY-MM-DD')+'    '+end.format('YYYY-MM-DD'));
            }
          );
        });
        $("#numero_caja").select2();
        $("#numero_ticket").inputmask('mask', { 'alias': 'numeric', 'autogroup': true, 'digits': 0, 'digitsOptional': false });
      },

      error: function (jqXHR, estado, error) {
        alert("Hubor un error al establecer las opciones de consulta de despachos, reporte a soporte...!");
        $("#pone_opcion_despacho").hmtl(estado + "     " + error);
      }
    });
  })
}
/*****************************************************************
GC Muestra Detalle Autoriza
************/
function muestra_detalle_autorizaciones_despacho(num_ticket) {
  var tic = num_ticket.split("|");
  $("#modal_detalle_venta").modal({
    show: true,
    backdrop: 'static',
    keyboard: false
  });
  $.ajax({
    beforeSend: function () {
      $("#detalle_de_venta").html("Consultando detalle despachos...");
    },
    url: 'consulta_detalle_venta_autorizaciones_despacho.php',
    type: 'POST',
    data: 'serie=' + tic[0] + '&numero=' + tic[1],
    success: function (x) {
      $(".nuticket").html("");
      $("#idpedido").val(tic[0]);
      $(".nuticket").append("Detalle de despachos | <span class='label' style='background-color: royalblue'>#: " + tic[0] + "</span>");
      $("#detalle_de_venta").html(x);

      var idpedido = '';
      idpedido = tic[0];
      $(document).ready(function () {
        $.ajax({
          //          beforeSend: function(){
          //            $("#montolp").html("Recuperando Lista Precios...");
          //           },
          url: 'pone_modelo_autoriza_venta_condicion.php',

          type: 'POST',
          data:
            { idpedido },
          success: function (x) {
            $("#idmodelo").val("");
            $("#comentariosaut").val("");
            $("#pone_cmodelo").html(x);
            $(".select2").select2();
            //              alert($("#totales").html())
            //$("#montolp2").val($("#montolp").val());

          },
          error: function (jqXHR, estado, error) {
          }
        });
      });

    },
    error: function (jqXHR, estado, error) {
      $("#detalle_de_venta").html('Hubo un error: ' + estado + ' ' + error);
    }
  });
}
/**********************************************************************************/
/*******PROCESA DECISION DESPACHO ACEPTADO******************************/





/*********************************************************************/
function busca_ventas_pedidos_pendientes() {
  $(document).ready(function () {
    if ($("#fechai").val() != "" || $("#fechaf").val() != "") {
      $.ajax({
        beforeSend: function () {
          $("#datapedidospendientes").html("Buscando los pedidos pendientes de ventas un momento...");
        },
        url: 'busca_ventas_pedidospendientes.php',
        type: 'POST',
        data: 'fechai=' + $("#fechai").val() + '&fechaf=' + $("#fechaf").val() + '&cliente=' + $("#cliente").val(),
        success: function (res) {
          $("#datapedidospendientes").html(res);
          $(document).ready(function () {
            $('#tabla_ventas_pedidospendientes').DataTable();
          });
        },
        error: function (jqXHR, estado, error) {
          alert("Hubor un error al buscar los pedidos pendientes...por favor reporte a soporte...!");
          $("#datapedidospendientes").hmtl(estado + "     " + error);
        }
      });
    } else {
      alert("Selecciona un rango de fechas para poder continuar...!");
    }
  })
}
/****************************************************************************/
/***********************************************************************************/
/*****************************************************************
GC Muestra Detalle Pedidos Pendientes
************/
function muestra_detalle_autorizaciones_pedidospendientes(num_ticket) {
  var tic = num_ticket.split("|");
  $("#modal_detalle_venta").modal({
    show: true,
    backdrop: 'static',
    keyboard: false
  });
  $.ajax({
    beforeSend: function () {
      $("#detalle_de_venta").html("Consultando detalle pedidos pendientes...");
    },
    url: 'consulta_detalle_venta_autorizaciones_pedidospendientes.php',
    type: 'POST',
    data: 'serie=' + tic[0] + '&numero=' + tic[1],
    success: function (x) {
      $(".nuticket").html("");
      $("#idpedido").val(tic[0]);
      $(".nuticket").append("Detalle de pedidos pendientes | <span class='label' style='background-color: royalblue'>#: " + tic[0] + "</span>");
      $("#detalle_de_venta").html(x);


    },
    error: function (jqXHR, estado, error) {
      $("#detalle_de_venta").html('Hubo un error: ' + estado + ' ' + error);
    }
  });
}
/*********************************FIN - GC Muestra Detalle Pedidos Pendientes *************************************************/
/***********************************************************************************/
/******************************************************
LISTA MODELOS DE AUTORIZACION
***************************/
function lista_modelo_autorizacion_condicion() {
  //	var idpedido='';
  //	idpedido=$("#idpedido").val();
  //
  //         $(document).ready(function() {
  //          $.ajax({
  ////          beforeSend: function(){
  ////            $("#montolp").html("Recuperando Lista Precios...");
  ////           },
  //          url: 'pone_modelo_autoriza_venta_condicion.php',
  //           
  //          type: 'POST',
  //          data: 
  //        {idpedido},
  //          success: function(x){
  //			  	  $("#idmodelo").val("");
  //            $("#pone_cmodelo").html(x);
  //            $(".select2").select2();
  ////              alert($("#totales").html())
  //              //$("#montolp2").val($("#montolp").val());
  //              
  //           },
  //           error: function(jqXHR,estado,error){
  //           }
  //           });
  //          });
}
/******************************************************
LISTA pedidos pendientes
***************************/
//script datatable 
/*********************************************************************/
function datatablenew() {
  $(document).ready(function () {
    var groupColumn = 2;
    var table = $('#tabla_ventas_pedidospendientes').DataTable({
      "columnDefs": [
        { "visible": false, "targets": groupColumn }
      ],
      "order": [[groupColumn, 'asc']],
      "displayLength": 25,
      "drawCallback": function (settings) {
        var api = this.api();
        var rows = api.rows({ page: 'current' }).nodes();
        var last = null;

        api.column(groupColumn, { page: 'current' }).data().each(function (group, i) {
          if (last !== group) {
            $(rows).eq(i).before(
              '<tr class="group"><td colspan="5">' + group + '</td></tr>'
            );

            last = group;
          }
        });
      }
    });

    // Order by the grouping

    $('#tabla_ventas_pedidospendientes tbody').on('click', 'tr.group', function () {
      var currentOrder = table.order()[0];
      if (currentOrder[0] === groupColumn && currentOrder[1] === 'asc') {
        table.order([groupColumn, 'desc']).draw();
      }
      else {
        table.order([groupColumn, 'asc']).draw();
      }
    });
  });
}
/****************************************************************************/
function muestra_pdf(id, name) {

  $('#modal_pdf').modal('show');
  document.getElementById("clie_pdf").value = name
  document.getElementById("num_pdf").value = id
  var clie_pdf = document.getElementById("clie_pdf").value

  var num_pdf = document.getElementById("num_pdf").value
  //console.log('entre');
  $.post("listar_pedidos_pdf2.php", {
    num_ficha5: num_pdf, clie_pdf: clie_pdf
  },
    function (data) {

      $("#pdfs").html(data);

    });

}
/****************************************************************************/
function pedido_pdf(num_ficha, ruta) {

  var num_ficha_lista2 = num_ficha;
  var ruta_lista = ruta;
  $global_num2 = num_ficha_lista2;
  $global_ruta = ruta_lista;
  //console.log(ruta_lista)

  $(document).ready(function () {
    // document.getElementById("num_fix").value = num_ficha;
    $('#modal_pre2').modal('show');
    $('.modal_pre2').on('shown.bs.modal', function () {      //correct here use 'shown.bs.modal' event which comes in bootstrap3
      $(this).find('iframe').attr('src', $global_ruta)
    })
    $("#navegador3").on('click', function () {
      window.location.href = $global_ruta
    })
  });
}

/*******PROCESA REVISION CONTROL DE GUIAS******************************/
function procesa_controlguia_revision() {
  $(document).ready(function () {

    var idautoriza = '1';
    var id_ticket = '0';
    var idmodel = '';
    var comentaaut = '';
    // $('#modal_detalle_venta').modal('toggle');
    id_ticket = $("#idpedido").val();

    comentaaut = $("#comentariosaut").val();
    $.ajax({
      beforeSend: function () {
      },
      url: 'procesa_controlguia_revision.php',
      type: 'POST',
      data: 'id_ticket=' + id_ticket + '&comentario=' + comentaaut,
      success: function (x) {
        var n = noty({
          text: "Se ha procedido con el registro de revisión para el documento #: " + id_ticket,
          theme: 'relax',
          layout: 'topLeft',
          type: 'success',
          timeout: 2000,
        });
        $("#comentariosaut").val("");

      }
      ,
      error: function (jqXHR, estado, error) {
        $("#errores").html('Error... ' + estado + '  ' + error);
      }
    });

  });
}

/***********************************************************************************/
/*******PROCESA observado CONTROL DE GUIAS******************************/
function procesa_controlguia_observado() {
  $(document).ready(function () {

    var idautoriza = '1';
    var id_ticket = '0';
    var idmodel = '';
    var comentaaut = '';
    // $('#modal_detalle_venta').modal('toggle');
    id_ticket = $("#idpedido").val();

    comentaaut = $("#comentariosaut").val();
    $.ajax({
      beforeSend: function () {
      },
      url: 'procesa_controlguia_observado.php',
      type: 'POST',
      data: 'id_ticket=' + id_ticket + '&comentario=' + comentaaut,
      success: function (x) {
        var n = noty({
          text: "Se ha procedido con el registro de observado para el documento #: " + id_ticket,
          theme: 'relax',
          layout: 'topLeft',
          type: 'success',
          timeout: 2000,
        });
        $("#comentariosaut").val("");

      }
      ,
      error: function (jqXHR, estado, error) {
        $("#errores").html('Error... ' + estado + '  ' + error);
      }
    });

  });
}

function listar_empresas() {
  $(document).ready(function () {
  $.post("listar_empresas.php", {
 
  },
    function (data) {
      //console.log(data);
      $("#listar_empresas").html(data);
      $(".select2").select2();

    }); 
  }); 
}
/***********************************************************************************/