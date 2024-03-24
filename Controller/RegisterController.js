$(document).ready(function(){

    $("#btnRegistrar").on("click", function() {

        if ($("#emailRegister").val() != "" && $("#passwordRegister").val() != null && $("#userRegister").val() != "") {
            
            var usersRegisterString = localStorage.getItem('UsuariosRegistrados');

            if (usersRegisterString === null) {
                usersRegisterString = "[]";
            }
    
            var usersRegister = JSON.parse(usersRegisterString);

            var nuevoUsuario = {
                Mail: $("#emailRegister").val(),
                Password: $("#passwordRegister").val(),
                Username: $("#userRegister").val(),
                Id: usersRegister.length + 1
            };

            usersRegister.push(nuevoUsuario);
            localStorage.setItem('UsuariosRegistrados', JSON.stringify(usersRegister));
            window.location.href = '/View/Home/Home.html';
        }else{
            if ($("#emailRegister").val() == "") {
                $("#emailRegister").focus();
                alert("El campo Mail es obligatorio");
            }
            if ($("#passwordRegister").val() == "") {
                $("#passwordRegister").focus();
                alert("El campo Password es obligatorio");
            }
            if ($("#userRegister").val() == "") {
                $("#userRegister").focus();
                alert("El campo Nombre de Usuario es obligatorio");
            }
        }

    });
});
