
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


  $.ajax({
      beforeSend: function () {
      },
      url: 'registra_datos_articulos.php',
      type: 'POST',
      data: {numero_articulo:numero_articulo, descripcion_articulo:descripcion_articulo, clase_articulo:clase_articulo, grupo_articulo:grupo_articulo,
            num_catalogo:num_catalogo, codigo_um_compras:codigo_um_compras, igv_compras:igv_compras, igv_ventas:igv_ventas, cod_um_recuento:cod_um_recuento,  nom_um_recuento:nom_um_recuento},
      success: function (data) {
      $("#num_articulo").val("");
      $("#descripcion_articulo").val("");
      $("#num_catalogo").val("");
      $("#codigo_um_compras").val("");
      $("#cod_um_recuento").val("");
      $("#nom_um_recuento").val("");

      },
      error: function (jqXHR, estado, error) {
       $("#errores").html('Error... ' + estado + '  ' + error);
      }
  });

  
}
