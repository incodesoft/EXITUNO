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
      url: "valida_usr.php",
      type: "POST",
      data: { usuario: usuario, pass: pass },
      success: function (data) {
        // alert(data);
        if (data == "") {
          swal({
            title: "Oops...",
            text: "Usuario y/o password incorrecta!",
            icon: "error",
          });
        } else {
          swal({
            title: "Bienvenido!",
            text: "ingreso!",
            icon: "success",
          });
          document.location.href = "inicio.php";
        }
      },
    });
  }
});
