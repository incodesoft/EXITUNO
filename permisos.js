function lista_permisos(){
    $(document).ready(function() {
     $.ajax({
     beforeSend: function(){
       $("#permiso2").html("Cargando...");
      },
     url: 'valida_permiso.php',
     type: 'POST',
     data: null,
     success: function(x){


        $("#permiso2").html(x);
        //$(".select2").select2();
       

      },
      error: function(jqXHR,estado,error){}
      });
     });
}









function lista_clientes(){
  $(document).ready(function() {
   $.ajax({
   beforeSend: function(){
     $("#pone_usuarios").html("Recuperando usuarios...");
    },
   url: 'pone_usuarios.php',
   type: 'POST',
   data: null,
   success: function(x){
    //alert(x);
     $("#pone_usuarios").html(x);
     $(".select2").select2();
    },
    error: function(jqXHR,estado,error){
    }
    });
   });
}
