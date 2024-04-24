/*******************************FECHA DE BUSQUEDA**************************************/

function fecha_Reporte_ofabri(){
    $(document).ready(function(){
      $.ajax({
        beforeSend: function(){
           $("#pone_fecha").html("Poniendo opciones...");
         },
        url: 'Mostrar_ReporteORDEFabri.php',
        type: 'POST',
        data: 'option='+1,
        success: function(res){
          $("#pone_fecha").html(res);
             $(function(){
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
         var xstart=start.format('YYYY-MM-DD');
         var xend=end.format('YYYY-MM-DD');
         $("#fi").val(xstart);
         $("#ff").val(xend);
         //alert(start.format('YYYY-MM-DD')+'    '+end.format('YYYY-MM-DD'));
        }
       );
      });
       $("#numero_caja").select2();
       $("#numero_ticket").inputmask('mask',{'alias':'numeric','autogroup':true,'digits':0,'digitsOptional': false});
         },
        error: function(jqXHR,estado,error){
          alert("Hubor un error al establecer las opciones de consulta de venta, reporte a soporte...!");
          $("#pone_fecha").hmtl(estado+"     "+error);
         }
       });
    })
  }


  /*******************************Buscar las ordesnes de producion**************************************/


    function  ReorteOP(){
        $(document).ready(function(){
          if($("#fi").val()!=""||$("#ff").val()!=""){
          $.ajax({
              beforeSend: function(){
                 $("#data").html("Buscando ODP CERRADAS, un momento...");
               },
              
              url: 'Listar_Report_OP.php',
              type: 'POST',
              data: 'fechai='+$("#fi").val()+
              '&fechaf='+$("#ff").val()+
              '&sed='+$("#sed option:selected").val(),
            
              success: function(data2){
                 
        
              $("#lista_Repor_OP").html(data2);
                 $('#tbpr').DataTable(); 
              },
              error: function(jqXHR,estado,error){
                alert("Hubor un error al buscar las ODP CERRADAS...por favor reporte a soporte...!");
                $("#tbpr").hmtl(estado+"     "+error);
               }
             });
             }else{
              alertify.error("Selecciona un rango de fechas para poder continuar...!");
        }
        })
        }

     /*******************************Detalle de producion*************************************/
     $('#modal_detalle_op .modal-header').css({'background-color' : '#FFA500','color' : '#fff',
     'border-radius' : '5px 5px 0 0'});
     
     function  Consultar_Detalle_Produc(id){
      
        $("#modal_detalle_op").modal({
            show:true,
            backdrop: 'static',
            keyboard: false
          });
    $.post("Consulta_Detalle_Prod.php", { id: id },
     function(data1){
      $("#detalle_de_ocp").html(data1);
      $('#taboc').DataTable();
       });




    }
 /*******************************GENERAR EXCEL************************************/
     
 function Gexof(){
   fechai=$("#fi").val();
   fechaf=$("#ff").val();
    sede=$("#sed option:selected").val();

  javascript:window.open('Rerpote_OFabrica_Excel.php?fechai='+fechai+'&fechaf='+fechaf+'&sede='+sede+'');

};

    