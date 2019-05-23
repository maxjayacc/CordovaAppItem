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

        ListarInventario();

    
        // TODO: Cordova se ha cargado. Haga aquí las inicializaciones que necesiten Cordova.

    };

    function onPause() {
        // TODO: esta aplicación se ha suspendido. Guarde el estado de la aplicación aquí.
    };

    function onResume() {
        // TODO: esta aplicación se ha reactivado. Restaure el estado de la aplicación aquí.
    };


    function ListarInventario() {
        var idUsuario = localStorage.getItem("idUsuario");
        var idTerminal = localStorage.getItem("idEquipo");
        console.log('entra');

        try {
            if (idUsuario == '') {
                document.getElementById('divResultado').innerHTML = "No tiene ningun Inventario Asignado";

            } else {
                console.log('ee');
                console.log(idUsuario);

                $.get('http://200.60.128.162:2484/CmSoft_Inventarios/PublicarWS/Service1.svc/rest/GetListadoDeInventario/' + idUsuario + '/' + idTerminal)
                    .then(function (data) {
                        console.log("error" + data);

                        //console.log('yyy');
                        //console.log(data.idInventario);
                        //console.log('yyy');

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
            node.className = "btn btn-secondary";
            node.id = "btnLogin1";
            node.value = post.idInventario;
            

            
            var textnode = document.createTextNode(post.AlmacenDescripcion + ' - ' + post.CompaniaDescripcion + ' NOMBRE: ' + post.NombreInventario);

            console.log('hhh');
            console.log(node);
            console.log('hhh');

            node.appendChild(textnode);
            document.getElementById("TablaDePosts").appendChild(node);

            var botones = document.getElementsByClassName("btn btn-secondary");
            for (var i = 0; i < botones.length; i++) {
                botones[i].onclick = function () {
                    localStorage.removeItem("idInventario");
                    console.log("click");
                    localStorage.setItem("idInventario", node.value);
                    redireccionar()
                }
            }


        }

        function redireccionar() {

            var idInventario = localStorage.getItem("idInventario");

            if ((idInventario != null) || (idInventario != '')) {
                location.href = "Pagina2.html";
            }

        }
       
          
    


            



        



})();