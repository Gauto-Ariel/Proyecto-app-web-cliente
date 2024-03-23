import { User } from "../Model/LoginModel.js";
import { GetAllUsers } from "../Service/Service.js";

$(document).ready(function(){
    var usuario = new User();
    GetAllUsers();

    var usuarios = JSON.stringify(localStorage.getItem('UsuariosRegistrados'));
    var credenciales = usuarios.map(usuario => {
        return { id:usuario.Id , email: usuario.email, password: usuario.password };
    });   

    
    $("#loginButton").on( "click", function() {

        usuario.Mail = $("#email").val();
        usuario.Password = $("#password").val();

        credenciales.forEach(credencial => {
            if (credencial.email == usuario.Mail) {
                if (credencial.password == usuario.Password) {
                    usuario.Id = credencial.id;
                    window.location.href = '/View/Home/Home.html';
                }
            }
        });
    });
});