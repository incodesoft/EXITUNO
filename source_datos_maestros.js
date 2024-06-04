function lista_datos_ma() {
fechai = $("#fechai").val();
fechaf = $("#fechaf").val();
  $.ajax({
    beforeSend: function () {
      $("#lista_datos_maestros").html("Recuperando Lista ...");
    },
    url: "consulta_listado_maestros.php",
    type: "POST",
    data: { fechai:fechai,fechaf:fechaf  },
    success: function (x) {
      $("#lista_datos_maestros").html(x);
      $("#tabla_cot").DataTable({
        order: [[0, 'desc']],
        columnDefs: [{
          width: "120px",
          targets: 1
        }
        ]
      });
    },
    error: function (jqXHR, estado, error) { },
  });
}

function lista_grupoA() {
  $(document).ready(function () {

    $.ajax({
      beforeSend: function () {
        $("#grupo_articulo").html("Cargando...");
      },
      url: 'pone_grupo_articulos.php',
      type: 'POST',
      data: null,
      success: function (x) {
        $("#grupo_articulo").html(x);
        $(".select2").select2();
      },
      error: function (jqXHR, estado, error) {
      }
    });
  });
}


function lista_grupoUnidad() {
  $(document).ready(function () {

    $.ajax({
      beforeSend: function () {
        $("#grupo_medida").html("Cargando...");
      },
      url: 'pone_grupo_unidad.php',
      type: 'POST',
      data: null,
      success: function (x) {
        $("#grupo_medida").html(x);
        $(".select2").select2();
      },
      error: function (jqXHR, estado, error) {
      }
    });
  });
}


function lista_igv_compras() {
  $(document).ready(function () {

    $.ajax({
      beforeSend: function () {
        $("#igv_compras").html("Cargando...");
      },
      url: 'pone_igv_compras.php',
      type: 'POST',
      data: null,
      success: function (x) {
        $("#igv_compras").html(x);
        $(".select2").select2();
      },
      error: function (jqXHR, estado, error) {
      }
    });
  });
}


function lista_igv_ventas() {
  $(document).ready(function () {

    $.ajax({
      beforeSend: function () {
        $("#igv_ventas").html("Cargando...");
      },
      url: 'pone_igv_ventas.php',
      type: 'POST',
      data: null,
      success: function (x) {
        $("#igv_ventas").html(x);
        $(".select2").select2();
      },
      error: function (jqXHR, estado, error) {
      }
    });
  });
}


function registrar_datos(){
  numero_articulo = $("#num_articulo").val();
  descripcion_articulo = $("#descripcion_articulo").val();
  clase_articulo = $("#clase_articulo option:selected").val();
  grupo_articulo = $("#grupo_articulo option:selected").val();
  grupo_medida = $("#grupo_medida option:selected").val();
  num_catalogo = $("#num_catalogo").val();
  codigo_um_compras = $("#codigo_um_compras").val();
  igv_compras = $("#igv_compras option:selected").val();
  igv_ventas = $("#igv_ventas option:selected").val();
  cod_um_recuento = $("#cod_um_recuento").val();
  nom_um_recuento = $("#nom_um_recuento").val();
  if ($('#check_articulo_Inven').prop('checked')) {
    check_inventario = 'YES';
  } else {
     check_inventario = 'NO';
  }
  if ($('#check_articulo_Compra').prop('checked')) {
    check_compra= 'YES';
  } else {
     check_compra = 'NO';
  }
  if ($('#check_articulo_Venta').prop('checked')) {
    check_venta = 'YES';
  } else {
     check_venta = 'NO';
  }
  sub_familia = $("#subfamilia_articulo select").val();
  familia = $("#familia_articulo select").val();
  bandera = true;

  if (descripcion_articulo === ''){
    bandera = false;
    alertify.error("Ingresar Descripcion");
  }
  if (num_catalogo === ''){
    bandera = false;
    alertify.error("Ingresar # de Catalogo");
  }
  if (codigo_um_compras === ''){
    bandera = false;
    alertify.error("Ingresar codigo UM de Compras");
  }
  if (igv_compras === ''){
    bandera = false;
    alertify.error("Seleccione IGV de Compras");
  }
  if (igv_ventas === ''){
    bandera = false;
    alertify.error("Seleccione IGV de Ventas");
  }
  if (bandera === true){
    $.ajax({
        beforeSend: function () {
        },
        url: 'registra_datos_articulos.php',
        type: 'POST',
        data: {numero_articulo:numero_articulo, descripcion_articulo:descripcion_articulo, clase_articulo:clase_articulo, grupo_articulo:grupo_articulo,grupo_medida:grupo_medida,
              num_catalogo:num_catalogo, codigo_um_compras:codigo_um_compras, igv_compras:igv_compras, igv_ventas:igv_ventas, cod_um_recuento:cod_um_recuento,  nom_um_recuento:nom_um_recuento,
              check_inventario:check_inventario,check_compra:check_compra,check_venta:check_venta,sub_familia:sub_familia,familia:familia},
        success: function (data) {
        $("#num_articulo").val("");
        $("#descripcion_articulo").val("");
        $("#num_catalogo").val("");
        $("#codigo_um_compras").val("");
        $("#cod_um_recuento").val("");
        $("#nom_um_recuento").val("");
          swal("Se registro correctamente ", {
            icon: "success",
          });
  
        },
        error: function (jqXHR, estado, error) {
         $("#errores").html('Error... ' + estado + '  ' + error);
        }
    });
  }
  
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



$(document).on("change", "#grupo_articulo select", function () {
  var id = this.value
  $("#num_articulo").val(id);

  $.ajax({
      beforeSend: function () {
        $("#familia_articulo").html("Cargando...");
      },
      url: 'lista_familia_grupo_oitm.php',
      type: 'POST',
      data: {docentry:id},
      success: function (x) {
        $("#familia_articulo").html(x);
        $(".select2").select2();
      },
      error: function (jqXHR, estado, error) {
      }
    });  
})
$(document).on("change", "#familia_articulo select", function () {

  id = $("#num_articulo").val();
  id2= id + this.value
  $("#num_articulo").val(id2);

   $.ajax({
      beforeSend: function () {
        $("#subfamilia_articulo").html("Cargando...");
      },
      url: 'lista_subfamilia_grupo_oitm.php',
      type: 'POST',
      data: {docentry:this.value},
      success: function (x) {
        $("#subfamilia_articulo").html(x);
        $(".select2").select2();
      },
      error: function (jqXHR, estado, error) {
      }
    }); 
}) 
$(document).on("change", "#subfamilia_articulo select", function () {

  id = $("#num_articulo").val();
  id2= id + this.value
  $("#num_articulo").val(id2);

    $.ajax({
      beforeSend: function () {
       // $("#subfamilia_articulo").html("Cargando...");
      },
      url: 'lista_codigo_sap_oitm.php',
      type: 'POST',
      data: {docentry:id2},
      success: function (x) {
        id = $("#num_articulo").val();
        value= x;
        let numericValue = parseInt(value, 10);
        let newValue = (numericValue + 1).toString();
        
        // Añadir ceros a la izquierda si es necesario (4 dígitos)
        while (newValue.length < value.length) {
            newValue = '0' + newValue;
        }
        let resultText = `${newValue}`;
        console.log(resultText)
         id2= id + resultText
        
          $("#num_articulo").val(id2);
      },
      error: function (jqXHR, estado, error) {
      }
    });  
}) 
$(document).on("change", "#grupo_medida select", function () {
  id = this.value;

  $('#cod_um_recuento').val();
  $('#cod_um_recuento').val();
})
