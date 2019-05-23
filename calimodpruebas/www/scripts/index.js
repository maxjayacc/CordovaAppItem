// Si quiere una introducción sobre la plantilla En blanco, vea la siguiente documentación:
// http://go.microsoft.com/fwlink/?LinkID=397704
// Para depurar código al cargar la página en cordova-simulate o en dispositivos o emuladores Android: inicie la aplicación, establezca puntos de interrupción 
// y ejecute "window.location.reload()" en la Consola de JavaScript.
(function () {
    "use strict";

    document.addEventListener( 'deviceready', onDeviceReady.bind( this ), false );






    function onDeviceReady() {
        // Controlar la pausa de Cordova y reanudar eventos
        document.addEventListener( 'pause', onPause.bind( this), false );
        document.addEventListener('resume', onResume.bind(this), false);

      // document.getElementById("btnBuscar").addEventListener('click', GetEquipo, false);
        GetEquipo();
        var el = document.getElementById('btnLogin');
        if (el) {
            document.getElementById('btnLogin').addEventListener('click', GetMetodo, false);
        }

       
              

        // TODO: Cordova se ha cargado. Haga aquí las inicializaciones que necesiten Cordova.

    };

    function onPause() {
        // TODO: esta aplicación se ha suspendido. Guarde el estado de la aplicación aquí.
    };

    function onResume() {
        // TODO: esta aplicación se ha reactivado. Restaure el estado de la aplicación aquí.
    };


    
    function GetEquipo() {

        console.log('Equipo');
        var SerieEquipo = 'ce19221515d359f4';
        console.log('NumeroEquipo' + SerieEquipo);
        if (SerieEquipo == '') {
            document.getElementById('divResultado').innerHTML = "Ingrese Usuario";

        } else {
            
            console.log('si enviaste un dato')
            console.log(SerieEquipo);

            $.get('http://200.60.128.162:2484/CmSoft_Inventarios/PublicarWS/Service1.svc/rest/GetEquipo/' + SerieEquipo)
                .then(function (data) { 
                    
                    var idEquipo = data.IdEquipo;
                    localStorage.setItem("idEquipo",idEquipo);
                    

                });

        }

    }
  function redireccionar() {

        var idUsuario = localStorage.getItem("idUsuario");
        
        if ((idUsuario != null) || (idUsuario != ''))
        {
            location.href = "Pagina1.html";
        }
  
    }

     function GetMetodo() {
       
        console.log('hola');
        console.log(document.getElementById("nombredeusuario").value);
        var datosUsuario = (document.getElementById("nombredeusuario").value).toString();
        var datosPassword = (document.getElementById("clave").value).toString();
        var Terminal = localStorage.getItem("idEquipo");
        if (datosUsuario == '') {
            document.getElementById('divResultado').innerHTML = "Ingrese Usuario";


        } else {
            
            $.ajax({
                url: "http://200.60.128.162:2484/CmSoft_Inventarios/PublicarWS/Service1.svc/rest/LoginUsuario",
                type: "POST",
                dataType: "json",
                contentType: 'application/json',
                data: '{"Usuario":"' + datosUsuario + '","idTerminal": "' + Terminal + '","Contrasena": "' + datosPassword + '"}',
                success: function (d) {

                    if (d.respuesta == 'correcto') {
                        var idUsuario = d.idUsuario;
                        localStorage.setItem("idUsuario", idUsuario);
                        redireccionar();
                    }
                    else {
                        navigator.notification.alert("Contraseña: " + d.respuesta);
                        console.log(d.respuesta);
                    }
                }
            });
        }
   }




    
} )();