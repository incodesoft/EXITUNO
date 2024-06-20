function registrarEventos(){
    eventos = $("#list_eventos option:selected").val();
    fecha = $("#event_fecha_ahora").val();
    hora_inicio = $("#event_hora_inicio").val();
    hora_fin = $("#event_hora_fin").val();
    observaciones = $("#even_observaciones").val();
    nro_isograf =0;
    docentry = 0;
    maquina = $("#lista_maquina select").val();
    bandera = true;
    if(maquina ==='Seleccione'){
        bandera= false;
    }
    if(bandera===true){
        $.ajax({
            url: "registrar_eventos.php",
            type: "POST",
            data: {
                eventos:eventos, fecha:fecha, hora_inicio:hora_inicio, hora_fin:hora_fin, observaciones:observaciones, nro_isograf:nro_isograf, docentry:docentry,maquina:maquina
            },
            success: function (x) {
                listar_eventos();
                Swal.fire({
                        icon: 'success',
                        title: 'Registro Exitoso',
                        text: 'El evento fue registrado.',
                        showConfirmButton: false, // Oculta el botón "Aceptar"
                        timer: 2000
                }).then(function () {
                      
                });
            },
            error: function (jqXHR, estado, error) { },
        }); 
    }
         
}




function listar_eventos(){
   
     $.ajax({
        url: "consulta_eventos_registrados.php",
        type: "POST",
        data: null,
        success: function (x) {
            $("#tabla_eventos").html(x);
            $("#tabla_eventos2").DataTable({
                order: [[0, 'asc']]
            });
           
        },
        error: function (jqXHR, estado, error) { },
    });
}



function listar_maquina(){   
     $.ajax({
        url: "consulta_maquinas.php",
        type: "POST",
        data: null,
        success: function (x) {
            
            $("#lista_maquina").html(x);
           $(".select2").select2();

        },
        error: function (jqXHR, estado, error) { },
    });
}




function finalizar_evento(id){
    nro_isograf = $("#iso_evento").val();
    docentry = $("#doc_evento").val();
    
    $.ajax({
        url: "finalizar_eventos.php",
        type: "POST",
        data: {
            id
        },
        success: function (x) {
             listar_eventos(docentry, nro_isograf);
        },
        error: function (jqXHR, estado, error) { },
    });        
}

