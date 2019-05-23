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



        var el = document.getElementById('CodigoBarra');
        if (el) {
            document.getElementById('CodigoBarra').addEventListener('keypress', CapturaCodigoBarra, false);
            el.focus();

        }
       

        // TODO: Cordova se ha cargado. Haga aquí las inicializaciones que necesiten Cordova.

    };

    function onPause() {
        // TODO: esta aplicación se ha suspendido. Guarde el estado de la aplicación aquí.
    };

    function onResume() {
        // TODO: esta aplicación se ha reactivado. Restaure el estado de la aplicación aquí.
    };



    function CapturaCodigoBarra() {

        var Codigo_barra = (document.getElementById('CodigoBarra').value).toString();

        localStorage.setItem("Codigo_barra2", Codigo_barra);

        if (Codigo_barra == '') {
            document.getElementById('divResultado').innerHTML = "Ingrese Codigo";
        }
        else {

            console.log('entrando al servicio' + Codigo_barra);


            $.ajax({
                url: "http://200.60.128.162:2486/ServiciosAngular/Service1.svc/rest/DetalleCodigoBarra",
                type: "POST",
                async: false,
                dataType: "json",
                contentType: 'application/json',
                data: '{"codigoBarras": "' + Codigo_barra + '"  }',
                success: function (d) {

                    var tipo = d.Tipo;
                    localStorage.setItem("Tipo", tipo);
                    var refCodigoBarra = d.CodigoBarraReferencia;
                    localStorage.setItem("refCodigoBarra", refCodigoBarra);
                    var DescripcionLocal = d.DescripcionLocal;
                    localStorage.setItem("DescripcionLocal", DescripcionLocal);
                    var Estado = d.Estado;
                    localStorage.setItem("Estado", Estado);

                    let BorrarCodigo = document.getElementById('CodigoBarra');
                    BorrarCodigo.value = "";

                    
                    if (refCodigoBarra == 'sin datos') {
                        alertify.error('No esta registrado en Spring', 'Error', 1, null);
                    }
                    if (refCodigoBarra == 'No tiene Referencia') {
                        alertify.warning('No tiene Referencia', 'warining', 1, null);
                    }
                    if (refCodigoBarra.length == 0) {
                        alertify.warning('No tiene Referencia', 'warining', 1, null);
                    }
                    if (refCodigoBarra !== 'sin datos' & refCodigoBarra !== 'No tiene Referencia' & refCodigoBarra.length != 0 ) {
                        alertify.success('se verifico correctamente', 'success', 1, null);
                    }


                    }
                
            });



            LlenarCampos() 

            }

    }

    function LlenarCampos() {

     

        let nombrarCodigoBarra = document.getElementById('CodigoBarraDes');
        nombrarCodigoBarra.innerHTML = localStorage.getItem('Codigo_barra2');



        let nombrarCodigoBarraReferencia = document.getElementById('CodigoBarraReferencia');
        $(nombrarCodigoBarraReferencia).attr('value', localStorage.getItem('refCodigoBarra'));

        let nombrarDescripcionLocal1 = document.getElementById('DescripcionLocal1');
        nombrarDescripcionLocal1.innerHTML = localStorage.getItem('DescripcionLocal');

        //let nombrarDescripcionLocal = document.getElementById('DescripcionLocal');
        //$(nombrarDescripcionLocal).attr('placeholder', localStorage.getItem('DescripcionLocal'));

        let nombrarEstado = document.getElementById('Estado');
        $(nombrarEstado).attr('value', localStorage.getItem('Estado'));

        let nombrarTipo = document.getElementById('Tipo');
        $(nombrarTipo).attr('value', localStorage.getItem('Tipo'));


       
        



   
    }

    

          


   

})();