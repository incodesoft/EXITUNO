
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
