// Si quiere una introducción sobre la plantilla En blanco, vea la siguiente documentación:
// http://go.microsoft.com/fwlink/?LinkID=397704
// Para depurar código al cargar la página en cordova-simulate o en dispositivos o emuladores Android: inicie la aplicación, establezca puntos de interrupción 
// y ejecute "window.location.reload()" en la Consola de JavaScript.
(function () {
    "use strict";

    document.addEventListener('deviceready', onDeviceReady.bind(this), false);

    function onDeviceReady() {
        // Controlar la pausa de Cordova y reanudar eventos
        document.addEventListener('pause', onPause.bind(this), false);
        document.addEventListener('resume', onResume.bind(this), false);

        // document.getElementById("btnBuscar").addEventListener('click', GetEquipo, false);

        ListarUbicaciones();

        // TODO: Cordova se ha cargado. Haga aquí las inicializaciones que necesiten Cordova.

    };

    function onPause() {
        // TODO: esta aplicación se ha suspendido. Guarde el estado de la aplicación aquí.
    };

    function onResume() {
        // TODO: esta aplicación se ha reactivado. Restaure el estado de la aplicación aquí.
    };

    function CerrarUbicacion() {
        var idUsuario = localStorage.getItem("idUsuario");
        var idInventario = localStorage.getItem("idInventario");
        var idUbicacion = localStorage.getItem("IdUbicacion");
        var idAsignacionUbicacion = localStorage.getItem("idAsignacionUbicacion")
        var EsInventarioKit = 1;

        console.log('entra');

        if (idUsuario == '') {
            document.getElementById('divResultado').innerHTML = "Ingresa valor";


        } else {

            $.ajax({
                url: "http://200.60.128.162:2484/CmSoft_Inventarios/PublicarWS/Service1.svc/rest/CerrarUbicacion_Local",
                type: "POST",
                async: false,
                dataType: "json",
                contentType: 'application/json',
                data: '{"idUsuario":"' + idUsuario + '","idInventario": "' + idInventario + '","idUbicacion": "' + idUbicacion + '","idAsignacionUbicacion": "'
                + idAsignacionUbicacion + '","EsInventarioKit": "' + EsInventarioKit + '"  }',
                success: function (d) {

                    if (d == 'exito') {

                        alertify.notify('se grabo correctamente', 'success', 0.5, null);
                    }

                    else {

                        alertify.notify('Item Incorrecto', 'error', 0.5, null);

                    }
                }
            });

        }
    }
    function ListarUbicaciones() {
        var idUsuario = localStorage.getItem("idUsuario");
        var idTerminal = localStorage.getItem("idEquipo");
        var idInventario = localStorage.getItem("idInventario");
        console.log('entra');

        try {
            if (idUsuario == '') {
                document.getElementById('divResultado').innerHTML = "No tiene ningun Inventario Asignado";

            } else {
                console.log('ee');
                console.log(idUsuario);

                $.get('http://200.60.128.162:2484/CmSoft_Inventarios/PublicarWS/Service1.svc/rest/GetListadoDeUbicaciones/' + idUsuario + '/' + idTerminal + '/' + idInventario)
                    .then(function (data) {
                        console.log("error" + data);

                        LlenarTablas(data);

                    });

            }
        }
        catch (error) {
            console.log('termina');

        }
    }

    function LlenarTablas(listaPost) {

        listaPost.forEach(post => {
            agregarFila(post);

        });
    }

    function agregarFila(post) {
        var node = document.createElement("button");
        var imagen = document.createElement("img");


        

        imagen.id = "ImgUbicacion" + post.IdUbicacion;
        imagen.title = post.IdAsignacionUbicacion;
        imagen.value = post.IdUbicacion;
        imagen.name = post.NombreUbicacion;
        imagen.src = "https://image.flaticon.com/icons/svg/24/24417.svg";

        node.value = post.IdUbicacion;
        node.name = post.NombreUbicacion;
        node.title = post.IdAsignacionUbicacion;
        node.className = "g";
        node.id = "btnLogin1" + post.IdUbicacion;
     
     


        var textnode = document.createTextNode(post.NombreUbicacion);
        var textimg = document.createTextNode("Cerrar");

        console.log('hhh');
        console.log(node);
        console.log(imagen);
        console.log('hhh');

        node.appendChild(textnode);
        document.getElementById("TablaDeUbi").appendChild(node);
        document.getElementById("TablaDeUbi").appendChild(imagen);
        
        
        //var botones = document.getElementsByClassName("g");
        //for (var i = 0; i < botones.length; i++) {
                imagen.onclick = function () {
                    localStorage.removeItem("IdUbicacion");
                    localStorage.removeItem("codBarra");
                    localStorage.removeItem("idAsignacionUbicacion");
                    console.log("click");
                    localStorage.setItem("IdUbicacion", imagen.value);
                    localStorage.setItem("codBarra", imagen.name);
                    localStorage.setItem("idAsignacionUbicacion", imagen.title);
                    console.log('verifi' + imagen.value)
                    if (post.Reconteo = 1) {
                    CerrarUbicacion();
                    redireccionar2();
                    }

        }


        


                node.onclick = function () {
                    localStorage.removeItem("IdUbicacion");
                    localStorage.removeItem("codBarra");
                    localStorage.removeItem("idAsignacionUbicacion");
                    console.log("click");
                    localStorage.setItem("IdUbicacion", node.value);
                    localStorage.setItem("codBarra", node.name);
                    localStorage.setItem("idAsignacionUbicacion", node.title);
                    console.log('verifi' + node.value)
                    if (post.Reconteo = 1) {
                        redireccionar();
                    }

                }

    }

    function redireccionar() {

        var idUbicacion = localStorage.getItem("IdUbicacion");

        if ((idUbicacion != null) || (idUbicacion != '')) {
            location.href = "Pagina3.html";
        }

    }
    function redireccionar2() {
         
         location.href = "Pagina2.html";
       

    }

})();