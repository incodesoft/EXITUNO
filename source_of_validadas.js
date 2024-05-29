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



function char2() {
  $.ajax({
    beforeSend: function () {
      $("#data_cc").html("Recuperando proveedores...");
    },
    url: "listar_of_ca2.php",
    dataType: 'json',
    type: "POST",
    data: null,
    success: function (x) {
      cajas_cerraras = x[0].OF_CERRADAS
      cajas_abiertas = x[0].OF_ABIERTAS
      cajas_totales = x[0].OF_TOTALES
      var total = cajas_totales; // La suma de los valores en los datos
      var value = parseFloat(cajas_abiertas / cajas_totales * 100).toFixed(2);
      var ctx = $('#myDoughnutChart2')[0].getContext('2d');
      var myDoughnutChart = new Chart(ctx, {
        type: 'doughnut',
        data: {
          labels: ['Abierta', 'Cerrada'],
          datasets: [{
            data: [value, 100 - value], // El primer segmento tendrá el valor actual
            backgroundColor: [
              'rgba(255, 99, 132)',
              'rgba(54, 162, 235)'
            ]
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              display: false // Oculta la leyenda
            },
            tooltip: {
              callbacks: {
                label: function (tooltipItem) {
                  if (tooltipItem.label === 'Abierta') {
                    return 'Abierta: ' + tooltipItem.raw;
                  } else if (tooltipItem.label === 'Cerrada') {
                    return 'Cerrada: ' + tooltipItem.raw;
                  }
                  return tooltipItem.label + ': ' + tooltipItem.raw;
                }
              }
            }
          },
          onClick: function (event, elements) {
            // Evita que se cambie el valor por clic en el gráfico
          }
        }
      });

      function updateChart(value) {
        myDoughnutChart.data.datasets[0].data[0] = parseFloat(cajas_abiertas).toFixed(2);
        myDoughnutChart.data.datasets[0].data[1] = parseFloat(cajas_totales - cajas_abiertas).toFixed(2);
        myDoughnutChart.update();
        $("#chartValueContainer2").text(cajas_abiertas);
      }
      // Generar leyenda manualmente
      function generateLegend(chart) {
        var text = [];
        chart.data.labels.forEach(function (label, index) {
          text.push('<div class="legend-item"><div class="legend-color-box" style="background-color:' + chart.data.datasets[0].backgroundColor[index] + '"></div>' + label + '</div>');
        });
        return text.join('');
      }

      $("#chartLegend").html(generateLegend(myDoughnutChart));
      updateChart(cajas_abiertas);

    },
    error: function (jqXHR, estado, error) { },
  });
}
