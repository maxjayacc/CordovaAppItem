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

        NombrarUbicacion();

        var el = document.getElementById('CapturaCaja');
        if (el) {
            document.getElementById('CapturaCaja').addEventListener('keypress', CapturaCajaItem, false);
            
        }
        var el1 = document.getElementById('inputUbicacion');
        if (el1) {
            document.getElementById('inputUbicacion').addEventListener('keypress', confirmarUbicacion, false);

        }
        var el2 = document.getElementById('ItemPar');
        if (el2) {
            document.getElementById('ItemPar').addEventListener('keypress', CapturaItemKit, false);

        }
        var inputConfirmar = document.getElementById('inputUbicacion');
        if (inputConfirmar) {
            inputConfirmar.focus();
            
        }

       


        // TODO: Cordova se ha cargado. Haga aquí las inicializaciones que necesiten Cordova.

    };

    function onPause() {
        // TODO: esta aplicación se ha suspendido. Guarde el estado de la aplicación aquí.
    };

    function onResume() {
        // TODO: esta aplicación se ha reactivado. Restaure el estado de la aplicación aquí.
    };

    

    function NombrarUbicacion() {
        let nombrar = document.getElementById('inputUbicacion');
        $(nombrar).attr('placeholder', localStorage.getItem('codBarra'));
        console.log(localStorage.getItem('codBarra'));

    }



    function confirmarUbicacion() {

        var inputConfirmar=document.getElementById('inputUbicacion')
        var confirmar = localStorage.getItem('codBarra').toString();
        var lectura = (inputConfirmar.value).toString();
        console.log(confirmar);
        console.log(lectura);
        if (confirmar.trim() == lectura)
            {
            let capturaCaja = document.getElementById('CapturaCaja');           
            capturaCaja.focus();       
            alertify.notify('se grabo correctamente', 'success', 1, null);
            }
        else {
            alertify.alert('Ubicación','Ubicación Incorrecta');
            let inputUbicacion = document.getElementById('inputUbicacion');  
            inputUbicacion.onfocus = this.value = '';
        }
    }


    function CapturaCajaItem() {

        var idUsuario = localStorage.getItem("idUsuario");
        var idEquipo = localStorage.getItem("idEquipo");
        var idInventario = localStorage.getItem("idInventario");
        var idUbicacion = localStorage.getItem("IdUbicacion");
        var idAsignacionUbicacion = localStorage.getItem("idAsignacionUbicacion");
        var Codigo_Caja = (document.getElementById("CapturaCaja").value).toString();
        var Estado = "P";
        var Es_Automatico = "1";
        var Cantidad_Tomada = 1.0;
    
        if (idUsuario == '') {
            document.getElementById('divResultado').innerHTML = "Ingrese Usuario";


        } else {

            $.ajax({
                url: "http://200.60.128.162:2484/CmSoft_Inventarios/PublicarWS/Service1.svc/rest/LecturaItemCaja",
                type: "POST",
                async: false,
                dataType: "json",
                contentType: 'application/json',
                data: '{"idUsuario":"' + idUsuario + '","idEquipo": "' + idEquipo + '","idInventario": "' + idInventario + '","idUbicacion": "'
                + idUbicacion + '","idAsignacionUbicacion": "' + idAsignacionUbicacion + '","Codigo_Caja": "' + Codigo_Caja + '","Estado": "' + Estado + '","Es_Automatico": "' + Es_Automatico + '","Cantidad_Tomada": "' + Cantidad_Tomada + '"  }',
                success: function (d) {

                    if (d == 'exito') {
                        let ItemPar = document.getElementById('ItemPar');
                        ItemPar.focus();
                        alertify.notify('se grabo correctamente', 'success', 1, null);
                       
                    }
                  
                    else {

                        alertify.notify('Item caja Incorrecto', 'error', 1, null);
                        let CapturaCaja = document.getElementById('CapturaCaja');
                        CapturaCaja.value="";


                    }
                }
            });
        }
    }

    function CapturaItemKit() {

        var idUsuario = localStorage.getItem("idUsuario");
        var idEquipo = localStorage.getItem("idEquipo");
        var idInventario = localStorage.getItem("idInventario");
        var idUbicacion = localStorage.getItem("IdUbicacion");
        var idAsignacionUbicacion = localStorage.getItem("idAsignacionUbicacion");
        var Codigo_Caja = (document.getElementById("CapturaCaja").value).toString();
        var Codigo_Subordinado = (document.getElementById("ItemPar").value).toString();
        var Estado = "P";
        var Es_Automatico = "1";
        var Cantidad_Tomada = 1.0;

        if (idUsuario == '') {
            document.getElementById('divResultado').innerHTML = "Ingrese Usuario";


        } else {

            $.ajax({
                url: "http://200.60.128.162:2484/CmSoft_Inventarios/PublicarWS/Service1.svc/rest/LecturaItemKit",
                type: "POST",
                async: false,
                dataType: "json",
                contentType: 'application/json',
                data: '{"idUsuario":"' + idUsuario + '","idEquipo": "' + idEquipo + '","idInventario": "' + idInventario + '","idUbicacion": "'
                + idUbicacion + '","idAsignacionUbicacion": "' + idAsignacionUbicacion + '","Codigo_Caja": "' + Codigo_Caja + '","Codigo_Subordinado": "' + Codigo_Subordinado + '","Estado": "' + Estado + '","Es_Automatico": "' + Es_Automatico + '","Cantidad_Tomada": "' + Cantidad_Tomada + '"  }',
                success: function (d) {


                    if (d == 'exito') {
                        let ItemPar = document.getElementById('ItemPar');
                        ItemPar.value = "";
                        alertify.notify('se grabo correctamente', 'success', 0.5, null);
                    }

                    else {


                        let ItemPar = document.getElementById('ItemPar');
                        ItemPar.value = "";
                        alertify.notify('Item Incorrecto', 'error', 0.5, null);
                        
                    }
                }
            });
        }
    }


   

    function redireccionar() {

        var idUbicacion = localStorage.getItem("IdUbicacion");

        if ((idUbicacion != null) || (idUbicacion != '')) {
            location.href = "Pagina3.html";
        }

    }

})();