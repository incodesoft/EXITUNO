function revisa_compras() {
  $(document).ready(function () {
    $.ajax({
      beforeSend: function () {
        $("#pone_compras").html("Cargando... <img src='dist/img/default.gif'/>")
      },
      url: 'pone_compras_ini.php',
      type: 'POST',
      data: null,
      success: function (x) {
        $("#pone_compras").html(x);
      },
      error: function (jqXHR, estado, error) {
        $("#pone_compras").html("Ocurrio un error al cargar la informacion de compras..." + estado + "    " + error);
      }
    });
  })
}

/****************************************************/
function revisa_ventas() {
  $(document).ready(function () {
    $.ajax({
      beforeSend: function () {
        $("#pone_ventas").html("Cargando... <img src='dist/img/default.gif'/>")
      },
      url: 'pone_ventas_ini.php',
      type: 'POST',
      data: null,
      success: function (x) {
        $("#pone_ventas").html(x);
      },
      error: function (jqXHR, estado, error) {
        $("#pone_ventas").html("Ocurrio un error al cargar la informacion de ventas..." + estado + "    " + error);
      }
    });
  })
}
/*********************************************************************************/
function pone_gastos() {
  $(document).ready(function () {
    $.ajax({
      beforeSend: function () {
        $("#pone_gastos").html("Cargando... <img src='dist/img/default.gif'></img>")
      },
      url: 'pone_gastos_ini.php',
      type: 'POST',
      data: null,
      success: function (x) {
        $("#pone_gastos").html(x);
      },
      error: function (jqXHR, estado, error) {
        $("#pone_gastos").html("Ocurrio un error al cargar la informacion de gastos..." + estado + "    " + error);
      }
    });
  })
}
/**************************************************************************************/
function pone_users() {
  $(document).ready(function () {
    $.ajax({
      beforeSend: function () {
        $("#pone_users").html("Cargando... <img src='dist/img/default.gif'></img>")
      },
      url: 'pone_users_ini.php',
      type: 'POST',
      data: null,
      success: function (x) {
        $("#pone_users").html(x);
      },
      error: function (jqXHR, estado, error) {
        $("#pone_users").html("Ocurrio un error al cargar la informacion de usuarios..." + estado + "    " + error);
      }
    });
  })
}
/*************************************************************************************/
function genera_grafica() {
  $(document).ready(function () {
    $.getJSON("genera_array_grafica.php", function (json) {

      var donut = new Morris.Donut({
        element: 'line-chart-ventas',
        resize: true,
        colors: ["#3c8dbc", "#f56954", "#00a63a", "#db1f07", "#b50987",
          "#055e65", "#40100a", "#88cb09",
          "#620d62", "#db8107", "#b50909",
          "#796679", "#463114", "#748b95"],
        data: json,
        hideHover: 'auto'
      });
    });

  });
}
/**************************************************************
GOOGLE CHART***************/

function drawChart() {
  $(document).ready(function () {
    $.getJSON("genera_array_grafica.php", function (json) {
      var data = google.visualization.arrayToDataTable([
        ['Tareas', 'Hours per Day'],
        ['Trabajo', 11],
        ['Comida', 2],
        ['Commute', 2],
        ['Ver TV', 2],
        ['Dormir', 7],
        ['Libre', 14]
      ]);

      var options = {
        title: 'Ventas x País',
        is3D: true,
      };

      var chart = new google.visualization.PieChart(document.getElementById('piechart_3d'));
      chart.draw(data, options);
    });

  });
}
/*************************************************************
GENERAR GRAFICA BARRAS ***************/

function genera_grafica_barras() {
  $(document).ready(function () {
    $.getJSON("genera_array_grafica_barras.php", function (json) {

      var bar = new Morris.Bar({
        element: 'bar-chart',
        resize: true,
        data: json,
        barColors: ['#1aa8a8', '#ef8f0d'],
        xkey: 'y',
        ykeys: ['a', 'b'],
        labels: ['Total USD', 'Cantidad'],
        hideHover: 'auto',
        xLabelAngle: 60,
      });;
    });

  });
}
/*************************************************************
GENERAR GRAFICA BARRAS PRODUCCION ***************/

function genera_grafica_barras_produccion() {
  $(document).ready(function () {
    $.getJSON("genera_array_grafica_barras_produccion.php", function (json) {

      var bar = new Morris.Bar({
        element: 'bar-chart',
        resize: true,
        data: json,
        barColors: ['#1aa8a8', '#ef8f0d'],
        xkey: 'y',
        ykeys: ['a', 'b'],
        labels: ['Peso Kg', 'Scrap Kg'],
        hideHover: 'auto',
        xLabelAngle: 60,
      });;
    });

  });
}

/*****************************************************************************/
/*************************************************************
GENERAR GRAFICA BARRAS PRODUCCION TELAR 1 ***************/

function genera_grafica_barras_produccion_telar1() {
  $(document).ready(function () {
    $.getJSON("genera_array_grafica_barras_produccion_telar1.php", function (json) {

      var bar = new Morris.Bar({
        element: 'telar1',
        resize: true,
        data: json,
        barColors: ['#1aa8a8', '#ef8f0d'],
        xkey: 'y',
        ykeys: ['a', 'b'],
        labels: ['Peso Kg', 'Scrap Kg'],
        hideHover: 'auto',
        xLabelAngle: 60,
      });;
    });

  });
}

/*****************************************************************************/
/*************************************************************
GENERAR GRAFICA BARRAS PRODUCCION ***************/

function genera_grafica_barras_ventas_gpoarticulos() {
  $(document).ready(function () {
    $.getJSON("genera_array_grafica_barras_ventas_gpoarticulos.php", function (json) {

      var bar = new Morris.Bar({
        element: 'bar-chart-ventas',
        resize: true,
        data: json,
        barColors: ['#1aa8a8', '#ef8f0d'],
        xkey: 'y',
        //      ykeys: ['a', 'b'],
        //      labels: ['Total USD', 'Cantidad'],
        ykeys: ['a', 'b'],
        labels: ['Total USD', 'PesoKG'],
        hideHover: 'auto',
        xLabelAngle: 30,
      });;
    });

  });
}

/*****************************************************************************/
/*************************************************************
GENERAR GRAFICA BARRAS VTAS VENDEDOR ***************/

function genera_grafica_barras_ventas_vendedor() {
  $(document).ready(function () {
    $.getJSON("genera_array_grafica_barras_ventas_vendedor.php", function (json) {

      var bar = new Morris.Bar({
        element: 'bar-chart-ventas_vendedor',
        resize: true,
        data: json,
        barColors: ['#db1f07', '#459006'],
        xkey: 'y',
        //      ykeys: ['a', 'b'],
        //      labels: ['Total USD', 'Cantidad'],
        ykeys: ['a', 'b'],
        labels: ['Vta USD', 'Proy. Vta'],
        hideHover: 'auto',
        xLabelAngle: 30,
      });

      var bar2 = new Morris.Bar({
        element: 'bar-chart-ventas_vendedor2',
        resize: true,
        data: json,
        barColors: ['#6d1004', '#59be04'],
        xkey: 'y',
        ykeys: ['a', 'b'],
        labels: ['Vta USD', 'Proy. Vta'],
        hideHover: 'auto',
        xLabelAngle: 30,
      });
    });

  });
}

/*****************************************************************************/
/*****************************************************************************/
/*************************************************************
GENERAR GRAFICA BARRAS VTAS MENSUAL ***************/

function genera_grafica_barras_ventas_mensual() {
  $(document).ready(function () {
    $.getJSON("genera_array_grafica_barras_ventas_mensual.php", function (json) {

      var bar = new Morris.Bar({
        element: 'bar-chart-ventas_mensual',
        resize: true,
        data: json,
        //  barColors: ['#db1f07', '#43a2b4'],
        xkey: 'y',
        //      ykeys: ['a', 'b'],
        //      labels: ['Total USD', 'Cantidad'],
        ykeys: ['a', 'b'],
        labels: ['Vta USD', 'Proy. Vta'],
        //hideHover: 'auto',
        xLabelAngle: 30,
        //pointFillColors:['#a6bae0','#bcd8a5'],
        //pointStrokeColors: ['red','blue'],

        fillOpacity: 0.6,
        hideHover: 'auto',
        behaveLikeLine: true,
        resize: true,
        pointFillColors: ['#ffffff'],
        pointStrokeColors: ['black'],
        lineColors: ['gray', 'red'],


      });

      var bar2 = new Morris.Line({
        element: 'bar-chart-ventas_mensual2',
        resize: true,
        data: json,
        barColors: ['#6d1004', '#59be04'],
        xkey: 'y',
        ykeys: ['a', 'b'],
        labels: ['Vta USD', 'Proy. Vta'],
        hideHover: 'auto',
        xLabelAngle: 30,

      });
    });

  });
}

/*****************************************************************************/

function genera_grafica_existe() {
  $(document).ready(function () {
    $.getJSON("genera_array_existencias.php", function (json) {

      var line = new Morris.Line({
        element: 'line-chart-existe',
        resize: true,
        data: json,
        xkey: 'a',
        ykeys: ['item1'],
        labels: ['Cantidad'],
        lineColors: ['#3c8dbc'],
        hideHover: 'auto'
      });
    });

  });
}



/*****************************************************************************/
function revisa_caducidades() {
  $(document).ready(function () {
    $.ajax({
      beforeSend: function () {
        $("#").html("Cargando... <img src='dist/img/default.gif'></img>")
      },
      url: 'analiza_cad_prods.php',
      type: 'POST',
      dataType: 'json',
      data: null,
      success: function (x) {
        if (x.length > 0) {
          $.each(x, function (y, item) {
            $(".arti_caducos").append("<li><a href='#'><i class='fa fa-barcode'></i>El producto " + x[y].codigo + " esta por caducar...!</a></li>");
          });

          $(".num_noti").html("");
          $(".num_noti").html(x.length);
        }
      },
      error: function (jqXHR, estado, error) {
      }
    });
  })
}

/****************** GC PONE VENTAS INI **********************************/
function revisa_ventas_mes() {
  $(document).ready(function () {
    $.ajax({
      beforeSend: function () {
        $("#pone_ventas_mes").html("Cargando... <img src='dist/img/default.gif'/>")
      },
      url: 'pone_ventas_mes_ini.php',
      type: 'POST',
      data: null,
      success: function (x) {
        $("#pone_ventas_mes").html(x);
      },
      error: function (jqXHR, estado, error) {
        $("#pone_ventas_mes").html("Ocurrio un error al cargar la informacion de compras..." + estado + "    " + error);
      }
    });
  })
}
/*****************************************************************
BUSCA MODAL GRAFICO VENTAS VENDEDOR
***************************/
function busca_grafico1() {
  $(document).ready(function () {
    $("#modal_tabla_grafico_ventas_vendedor").modal({
      show: true,
      backdrop: 'static',
      keyboard: false
    });
  })
}
/******************************************************************************/
/****************** MA AUTORIZAR **********************************/

function Autoclick() {
  $(document).ready(function () {
    $("#modal_Tp_AUTO").modal({
      show: true,
      backdrop: 'static',
      keyboard: false
    });
  })

}

/******************************************************************************/
