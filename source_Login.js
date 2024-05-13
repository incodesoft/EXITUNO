$("#validausr").submit(function (e) {
  e.preventDefault();
  var usuario = $.trim($("#username").val());
  var pass = $.trim($("#Pass").val());
  if (usuario.length == "" || pass == "") {
    swal({
      title: "Debe ingresar un usuario o password",

      icon: "warning",
    });

    return false;
  } else {
  $.ajax({
      beforeSend: function () {},
      url: "valida_login.php",
      type: "POST",
      data: { usuario: usuario, pass: pass },
      success: function (data) {
        console.log(data);
        dat = parseInt(data);
        if (dat == 0) {
          swal(
            "Nombre o contraseña invalidos",
            "Por favor verifique sus datos " +
              usuario + " e intente nuevamente",
            "error"
          );
        } else {
          swal("¡Bienvenido!", "Sistema WEB - EXITUNO", "success");
          document.location.href = "inicio.php";
        }
      },
    });
  }
});
