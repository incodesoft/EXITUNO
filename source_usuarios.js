function pone_lista_usuarios() {
    $(document).ready(function () {
        $.ajax({
            beforeSend: function () {
                $("#lista_users").html("Recuperando usuarios...");
            },
            url: 'consulta_usuarios.php',
            type: 'POST',
            data: null,
            success: function (x) {
                $("#lista_users").html(x);
                $("#tabla_users").DataTable();
            },
            error: function (jqXHR, estado, error) { }
        });
    });
}
function activar_usuario(codigo) {
    var id2 = codigo;
    console.log(codigo)
    alertify.confirm('Activar', 'Desea Activar?', function (E) {

        activar_usuario_2(id2);
        // alertify.success('Activado') ;


    }, function () { alertify.error('Cancelado') });
    //  var bool=confirm("Seguro de eliminar el dato?");
}
/*******************************************************************************************/
function activar_usuario_2(id) {
    var item = id;
    $(document).ready(function () {

        $.post("activar_usuario.php",
            { item: item },
            function (data) {
                pone_lista_usuarios()
                $("#lista_scaneo6").html(data);
                alertify.success('El Usuario fue ACTIVADO correctamente.');
            });
    });


}
function dar_baja(codigo) {
    var id2 = codigo;
    console.log(codigo)
    alertify.confirm('Eliminar', 'Desea Eliminar?', function (E) {

        dar_baja_2(id2);
        // alertify.success('Eliminado') ;


    }, function () { alertify.error('Cancelado') });
    //  var bool=confirm("Seguro de eliminar el dato?");
}
/*******************************************************************************************/
function dar_baja_2(id) {
    var item = id;
    $(document).ready(function () {

        $.post("dar_baja_usuario.php",
            { item: item },
            function (data) {
                pone_lista_usuarios()
                $("#lista_scaneo6").html(data);
                alertify.error('El Usuario fue dado de baja correctamente.');
            });
    });


}
function modificar_usuario(id) {
    var item = id;
    $('#modal_modificar').modal('show');
    $.post("busca_datos_usu.php",
        { item: item },
        function (data) {
            $("#dataxd").html(data);
            setTimeout(() => {
                document.getElementById("codigo_modi").value = $("[name='codi']").text().trim();
                document.getElementById("nombre_modi").value = $("[name='nomi']").text().trim();
                document.getElementById("tipo_modi").value = $("[name='tipo2']").text().trim();
                document.getElementById("bodega_modi").value = $("[name='bodi']").text().trim();
            }, 500);

        });

}

function modificar_datos() {
    codigo = document.getElementById("codigo_modi").value;
    nombre = document.getElementById("nombre_modi").value;
    tipo = document.getElementById("tipo_modi").value;
    bodega = document.getElementById("bodega_modi").value;
    $.post("modificar_datos_usu.php",
        { codigo: codigo, nombre: nombre, tipo: tipo, bodega: bodega },
        function (data) {
            pone_lista_usuarios()
            $("#lista_scaneo6").html(data);
            alertify.success('Los datos fueron actualizados correctamente.');
        });
}
function mostrarContrasena() {
    var tipo = document.getElementById("pass_reg");
    if (tipo.type == "password") {
        tipo.type = "text";
    } else {
        tipo.type = "password";
    }
}
function reg_usu(id) {
    $('#modal_registrar').modal('show');
    document.getElementById("cod_oass").value = id;
}

function registrar_datos() {
    console.log("emtro");
    codigo = document.getElementById("codigo_reg").value;
    nombre = document.getElementById("nombre_reg").value;
    pass = document.getElementById("pass_reg").value;
    tipo = document.getElementById("tipo_reg").value;
    bodega = document.getElementById("bodega_reg").value;
    // Validar campos
    var hayErrores = false;

    if (codigo === "") {
        mostrarError("codigo_reg", "Por favor, ingrese el código.");
        hayErrores = true;
    }

    if (nombre === "") {
        mostrarError("nombre_reg", "Por favor, ingrese el nombre.");
        hayErrores = true;
    }

    if (pass === "") {
        mostrarError("pass_reg", "Por favor, ingrese la contraseña.");
        hayErrores = true;
    }

    if (tipo === "Seleccione") {
        mostrarError("tipo_reg", "Por favor, seleccione el tipo.");
        hayErrores = true;
    }

    if (bodega === "Seleccione") {
        mostrarError("bodega_reg", "Por favor, seleccione la bodega.");
        hayErrores = true;
    }

    if (hayErrores) {
        return false; // Devuelve false solo si hay errores
    } else {
        // Continuar con el resto de la lógica si todos los campos son válidos
        // return true;

        $.post("registrar_datos_usu.php",
            { codigo: codigo, nombre: nombre, tipo: tipo, bodega: bodega, pass: pass },
            function (data) {
                alertify.success('El usuario se registró correctamente.');
                pone_lista_usuarios()
            });
    }

}

function mostrarError(idCampo, mensaje) {
    document.getElementById(idCampo + "_label").style.color = "red";
    document.getElementById(idCampo).style.borderColor = "red";
    document.getElementById(idCampo + "_error").innerHTML = mensaje;

}

function resetearEstilos(idCampo) {
    document.getElementById(idCampo + "_label").style.color = "initial";
    document.getElementById(idCampo).style.borderColor = "initial";
    document.getElementById(idCampo + "_error").innerHTML = "";
}
function cambiar_pass(id) {
    $('#modal_pass').modal('show');
    document.getElementById("cod_oass").value = id
}
function cambiar_pass2() {
    codigo = document.getElementById("cod_oass").value
    pass2 = document.getElementById("pass2").value;
    pass3 = document.getElementById("pass3").value;
    if (pass2 === pass3) {
        $.post("modificar_pass_usu.php",
            { pass2: pass2, codigo: codigo },
            function (data) {
                alertify.success('La Contraseña fue actualizada correctamente.');
                $("#pass2").val("");
                $("#pass3").val("");

            });
    } else {
        alertify.error('No coinciden contraseñas');
    }

    //
}