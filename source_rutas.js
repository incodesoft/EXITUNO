function pone_lista_rutas(){
    $(document).ready(function() {
      $.ajax({
        beforeSend: function(){
          $("#lista_rutas").html("Recuperando usuarios...");
        },
        url: 'consulta_rutas.php',
        type: 'POST',
        data: null,
        success: function(x){
          $("#lista_rutas").html(x);
          $("#tabla_users").DataTable();
        },
        error: function(jqXHR,estado,error){}
        });
    });
}
function pone_lista_menus(){
    $(document).ready(function() {
      $.ajax({
        beforeSend: function(){
          $("#lista_rutas").html("Recuperando usuarios...");
        },
        url: 'consulta_rutas_menus.php',
        type: 'POST',
        data: null,
        success: function(x){
          $("#lista_rutas").html(x);
          $("#tabla_users").DataTable();
        },
        error: function(jqXHR,estado,error){}
        });
    });
}
function pone_lista_submenus(){
    $(document).ready(function() {
      $.ajax({
        beforeSend: function(){
          $("#lista_rutas").html("Recuperando usuarios...");
        },
        url: 'consulta_rutas_submenus.php',
        type: 'POST',
        data: null,
        success: function(x){
          $("#lista_rutas").html(x);
          $("#tabla_users").DataTable();
        },
        error: function(jqXHR,estado,error){}
        });
    });
}
function ver_ruta(id){
    var item= id;
    $('#modal_ver').modal('show');
    $.post("busca_datos_rutas.php", 
        {item:item}, 
        function(data){        
            $("#dataxd").html(data);
            setTimeout(() => {
                /* document.getElementById("codigo_modi").value=$("[name='codi']").text().trim();
                document.getElementById("nombre_modi").value=$("[name='nomi']").text().trim();
                document.getElementById("tipo_modi").value=$("[name='tipo2']").text().trim();
                document.getElementById("bodega_modi").value=$("[name='bodi']").text().trim(); */
            }, 500);
            
    });
  
}

function modificar_menus(id) {
    $('#modal_modificar_menu').modal('show'); 
    $.post("busca_datos_rutas.php", 
        {item:id}, 
        function(data){        
            $("#dataxd").html(data);
            setTimeout(() => {
                document.getElementById("id_menu2").value = id;
                document.getElementById("nombre_menu2").value=$("[name='nom']").text().trim();
                document.getElementById("icono_menu2").value=$("[name='ico']").text().trim();
                document.getElementById("orden_menu2").value=$("[name='orden']").text().trim();
            }, 500);
            
    });
}
function mod_menus() {
    nombre=document.getElementById('nombre_menu2').value;
    icono=document.getElementById('icono_menu2').value;
    orden=document.getElementById('orden_menu2').value;     
    id=document.getElementById('id_menu2').value;    
    if (nombre ==="" ){
        alertify.error('Falta nombre');
    }
    if (icono ==="" ){
        alertify.error('Falta icono');
    }
    if (orden ==="" ){
        alertify.error('Falta orden');
    } 
    if (nombre !=="" && icono !=="" && orden !=="") {
        $.post("modificar_datos_menu.php", 
            {nombre:nombre,icono:icono,orden:orden,id:id}, 
            function(data){    
                $('#modal_modificar_menu').modal('hide');
                pone_lista_menus();
        }); 
    }
    
}
function modificar_submenu(id) {
    $('#modal_modificar_submenu').modal('show'); 
    $.post("busca_datos_rutas.php", 
        {item:id}, 
        function(data){        
            $("#dataxd").html(data);
            setTimeout(() => {
                document.getElementById("id_submenu2").value = id;
                setTimeout(() => {
                   menu = $("[name='menu3']").text().trim();                 
                    $('#menu_sub').val(menu).trigger('change.select2'); 
                    //document.getElementById("menu_sub").value = $("[name='menu3']").text().trim();
                }, 500);
                document.getElementById("nombre_submenu2").value=$("[name='nom3']").text().trim();
                document.getElementById("icono_submenu2").value=$("[name='ico3']").text().trim();
                document.getElementById("orden_submenu2").value=$("[name='orden3']").text().trim();
            }, 500);
            
    });
}
function mod_submenus() {
    menu=$("#menu3 option:selected").val().trim();
    nombre=document.getElementById('nombre_submenu2').value;
    icono=document.getElementById('icono_submenu2').value;
    orden=document.getElementById('orden_submenu2').value;
    id=document.getElementById('id_submenu2').value;     
    if (nombre ==="" ){
        alertify.error('Falta nombre');
    }
    if (icono ==="" ){
        alertify.error('Falta icono');
    }
    if (orden ==="" ){
        alertify.error('Falta orden');
    } 
    if (menu ==="Seleccione" ){
        alertify.error('Falta Menu');
    } 
    if (nombre !=="" && icono !=="" && orden !=="" && menu !=="Seleccione" ) {
        $.post("modificar_datos_submenu.php", 
            {nombre:nombre,icono:icono,orden:orden,menu:menu,id:id}, 
            function(data){    
                $('#modal_submenu').modal('hide');
                pone_lista_submenus();
        }); 
    }
    
}
function modificar_ruta(id,name) {
    $('#modal_modificar').modal('show'); 
    $.post("busca_datos_rutas.php", 
        {item:id,item2:name}, 
        function(data){        
            $("#dataxd").html(data);
            setTimeout(() => {
                lista_menu_men2();
                setTimeout(() => {
                    sis_impresion=$("[name='nom_men']").text().trim();
                    $('#men_3').val(sis_impresion).trigger('change.select2');   
                    listar_submenu2(name)
                    setTimeout(() => {
                        id_submenu=$("[name='id_submenu']").text().trim();
                        $('#submenu2').val(id_submenu).trigger('change.select2');   
                    }, 500);
                }, 500);
                
                //$("#men_3").select2("val", "3");
                document.getElementById("id_ruta2").value = id;            
                document.getElementById('nombre_ver2').value=$("[name='nom4']").text().trim();
                document.getElementById('ruta_ver2').value=$("[name='ruta4']").text().trim();
                document.getElementById('icono_ver2').value=$("[name='ico4']").text().trim();
                document.getElementById('orden_ver2').value=$("[name='orden4']").text().trim();
            }, 500);
            
    });
}
function modi_ruta() {
    code2 = $("#sub_menu4 option:selected").val().trim();
    code = $("#menu_men2 option:selected").val().trim();
    nombre=document.getElementById('nombre_ver2').value;
    icono=document.getElementById('icono_ver2').value;
    orden=document.getElementById('orden_ver2').value;
    ruta=document.getElementById('ruta_ver2').value;
    id= document.getElementById("id_ruta2").value;     
    if (nombre ==="" ){
        alertify.error('Falta nombre');
    }
    if (icono ==="" ){
        alertify.error('Falta icono');
    }
    if (orden ==="" ){
        alertify.error('Falta orden');
    } 
    if (ruta ==="" ){
        alertify.error('Falta ruta');
    } 
    if (code ==="" ){
        alertify.error('Falta elegir menu');
    } 
    if (code2 ==="Seleccione" ){
        code2=0;
    }
    if (nombre !=="" && icono !=="" && orden !=="" && ruta !=="" && code !=="" ) {
        $.post("modificar_datos_ruta.php", 
            {nombre:nombre,icono:icono,orden:orden,id:id,ruta:ruta,code:code,code2:code2}, 
            function(data){    
                $('#modal_modificar').modal('hide');
                pone_lista_rutas();
                //location.reload();
        }); 
    }
}
function lista_menus(){
    $(document).ready(function() {
        $.ajax({
            beforeSend: function(){
            $("#menu_men").html("Recuperando Estructura...");
        },
        url: 'Lista_menu_ruta.php',
        type: 'POST',
        data: null,
        success: function(x){
            $("#menu_men").html(x);
            $(".select2").select2();
        },
        error: function(jqXHR,estado,error){
        }
        });
    });
}
function lista_menus2(){
    $(document).ready(function() {
        $.ajax({
            beforeSend: function(){
            $("#menu2").html("Recuperando Estructura...");
        },
        url: 'Lista_menu_ruta2.php',
        type: 'POST',
        data: null,
        success: function(x){
            $("#menu2").html(x);
            $(".select2").select2();
        },
        error: function(jqXHR,estado,error){
        }
        });
    });
}
function lista_menus3(){
    $(document).ready(function() {
        $.ajax({
            beforeSend: function(){
            $("#menu3").html("Recuperando Estructura...");
        },
        url: 'Lista_menu_ruta.php',
        type: 'POST',
        data: null,
        success: function(x){
            $("#menu3").html(x);
            $(".select2").select2();
        },
        error: function(jqXHR,estado,error){
        }
        });
    });
}
function lista_menu_men2(){
    $(document).ready(function() {
        $.ajax({
            beforeSend: function(){
            $("#menu_men2").html("Recuperando Estructura...");
        },
        url: 'Lista_menu_ruta3.php',
        type: 'POST',
        data: null,
        success: function(x){
            $("#menu_men2").html(x);
            $(".select2").select2();
        },
        error: function(jqXHR,estado,error){
        }
        });
    });
}
function listar_submenu(id_menu) {
    var code=id_menu;
   console.log(id_menu)
    $.post("Lista_submenu_ruta.php", {code:code}, 
        function(data){    
            $("#sub_menu").html(data);  
            $(".select2").select2();
        });
}
function listar_submenu2(id_menu) {
    var code=id_menu;
   console.log(id_menu)
    $.post("Lista_submenu_ruta2.php", {code:code}, 
        function(data){    
            $("#sub_menu4").html(data);  
            $(".select2").select2();
        });
}

function num_orden(id_menu) {
    var code=id_menu;
   console.log(id_menu)
    $.post("num_orden_ruta.php", {code:code}, 
        function(data){
            $("#dataxd").html(data);     
            document.getElementById("orden_ver").value=$("[name='orden']").text().trim();
        });
}
function num_orden2(id_submenu) {
    var code=id_submenu;
   console.log(id_submenu)
    $.post("num_orden_ruta2.php", {code:code}, 
        function(data){
            $("#dataxd2").html(data);     
            document.getElementById("orden_ver").value=$("[name='orden2']").text().trim();
        });
}
function reg_menu() {
    code=0;
    $('#modal_menu').modal('show');
    $.post("num_orden_ruta2.php", {code:code}, 
        function(data){
            $("#dataxd2").html(data);     
            document.getElementById("orden_menu").value=$("[name='orden3']").text().trim();
        });
}
function reg_submenu() {
    
    $('#modal_submenu').modal('show');
    
}
function reg_submenus(){
    menu=$("#menu2 option:selected").val().trim();
    nombre=document.getElementById('nombre_submenu').value;
    icono=document.getElementById('icono_submenu').value;
    orden=document.getElementById('orden_submenu').value;     
    if (nombre ==="" ){
        alertify.error('Falta nombre');
    }
    if (icono ==="" ){
        alertify.error('Falta icono');
    }
    if (orden ==="" ){
        alertify.error('Falta orden');
    } 
    if (menu ==="Seleccione" ){
        alertify.error('Falta Menu');
    } 
    if (nombre !=="" && icono !=="" && orden !=="" && menu !=="Seleccione" ) {
        $.post("registrar_datos_submenu.php", 
            {nombre:nombre,icono:icono,orden:orden,menu:menu}, 
            function(data){    
                $('#modal_submenu').modal('hide');
                
        }); 
    }
    
}


function reg_rut() {
    $('#modal_registrar').modal('show');
}

function registrar_ruta(){    
    nombre=document.getElementById('nombre_ver').value;
    ruta=document.getElementById('ruta_ver').value;
    icono=document.getElementById('icono_ver').value;
    orden=document.getElementById('orden_ver').value;       

        menu=$("#menu_men option:selected").val().trim();
        submenu=$("#submenu option:selected").val().trim();;       

   
          
 

    if (nombre ==="" ){
        alertify.error('Falta nombre');
    }
    if (ruta ==="" ){
        alertify.error('Falta ruta');
    }
    if (icono ==="" ){
        alertify.error('Falta icono');
    }
    if ($("#menu_men option:selected").val().trim() ==="Seleccione" ){
        alertify.error('Falta Elegir menu');
    }
    console.log();
    if (nombre !=="" && ruta !=="" && icono !=="" && $("#menu_men option:selected").val().trim() !=="Seleccione") {
        $.post("registrar_datos_ruta.php", 
            {nombre:nombre,ruta:ruta,icono:icono,orden:orden,menu:menu,submenu:submenu}, 
            function(data){        
                
                $('#modal_registrar').modal('hide');
                
        }); 
    }
    
}

function reg_menus(){
    nombre=document.getElementById('nombre_menu').value;
    icono=document.getElementById('icono_menu').value;
    orden=document.getElementById('orden_menu').value;     
    if (nombre ==="" ){
        alertify.error('Falta nombre');
    }
    if (icono ==="" ){
        alertify.error('Falta icono');
    }
    if (orden ==="" ){
        alertify.error('Falta orden');
    } 
    if (nombre !=="" && icono !=="" && orden !=="") {
        $.post("registrar_datos_menu.php", 
            {nombre:nombre,icono:icono,orden:orden}, 
            function(data){    
                $('#modal_menu').modal('hide');
                pone_lista_menus(); 
        }); 
    }
    
}

/*******************************************************************************************/
function eliminar_ruta(id){
    var id2= id;
    console.log(id);
    alertify.confirm('Eliminar', 'Desea Eliminar?', function(E){  
        eli_ruta(id2);
    alertify.success('Eliminado') ;
  
  
  }, function(){ alertify.error('Cancelado')});
  //  var bool=confirm("Seguro de eliminar el dato?");
}
/*******************************************************************************************/
function eli_ruta(id){
    var item= id;
    $(document).ready(function() {  
  
      $.post("eliminar_ruta.php", 
        {item:item}, 
        function(data){
            //pone_lista_ficha_usuario()
            //$("#lista_scaneo6").html(data);
          }); 
    }) ;
  
  
  
}