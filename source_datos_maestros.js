
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
