import { User } from "../Model/LoginModel.js";
import { GetAllUsers } from "../Service/Service.js";

$(document).ready(function(){
    var usuario = new User();
    GetAllUsers();

    var usuarios = JSON.parse(localStorage.getItem('UsuariosRegistrados'));

    if (Array.isArray(usuarios)) {
        var credenciales = usuarios.map(usuario => {
            return { id: usuario.id, email: usuario.email, password: usuario.password };
        });
    }
    
    $("#loginButton").on( "click", function() {

        usuario.Mail = $("#email").val();
        usuario.Password = $("#password").val();

        if (usuario.Mail != "" && usuario.Password != "") {
            credenciales.forEach(credencial => {
                if (credencial.email == usuario.Mail) {
                    if (credencial.password == usuario.Password) {
                        usuario.Id = credencial.id;
                        window.location.href = '/View/Home/Home.html';
                    }
                }
            });
        }else{
            if (usuario.Mail == "") {
                $("#email").focus();
                alert("El campo Mail es obligatorio");
            }
            if (usuario.Password == "") {
                $("#password").focus();
                alert("El campo Password es obligatorio");
            }
        }
    });
});