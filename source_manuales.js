function pone_lista_campos_sap(){ 
 
    $(document).ready(function() {
      $.ajax({
        beforeSend: function(){
          $("#lista_tablasauto").html("Recuperando usuarios...");
        },
        url: 'busca_data_manuales.php',
        type: 'POST',
        data: {},
        success: function(x){
          $("#lista_tablasauto").html(x);
          $("#tabla_intercompany").DataTable();
        },
        error: function(jqXHR,estado,error){}
        });
    });
}
function genera_pdf_cotizacion(rut) {

  var ruta = rut.trim();
  console.log("Ruta del PDF:", ruta);
  // var ruta = 'manuales/LIMPIAR_TEMPORALES.pdf';

  $('#modal_data_pdf').modal('show');
  $('#modal_data_pdf').on('shown.bs.modal', function(){
    $(this).find('iframe').attr('src', ruta);
  }).on('hidden.bs.modal', function(){
    $(this).find('iframe').attr('src', '');
  });

  $("#navegador").off('click').on('click', function(){
    window.open(ruta, '_blank');
  });

  $("#imprimir").off('click').on('click', function(){
    $('#modal_data_pdf').find('iframe')[0].contentWindow.print();
  })
}
