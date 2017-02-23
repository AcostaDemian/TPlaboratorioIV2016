var proyecto = angular.module('proyecto',['ui.router','satellizer','angularFileUpload','ngMap','nvd3']);
proyecto.config(function ($stateProvider, $urlRouterProvider,$authProvider){

 
$authProvider.loginUrl = '/servidor/php/auth.php'
$authProvider.tokenName = "miToken"
$authProvider.tokenPrefix = "pizzeria"
$authProvider.authHeader = "data"

  $stateProvider

      .state('inicio', {
                url : '/inicio',
                templateUrl : 'vistas/main.html',
                controller: 'loginCtrl',
                resolve:{
                    test: function(loginS){
                            loginS.checkLogin();
                          }
                }

            })

      .state('locales', {
                url : '/locales',
                templateUrl : 'vistas/locales.html',
                controller: 'localesCtrl',
                resolve:{
                    test: function(loginS){
                            loginS.checkLogin();
                          }
                }
            })

      .state('estadisticas', {
                url : '/estadisticas',
                templateUrl : 'vistas/estadisticas.html',
                controller: 'estadisticasCtrl',
                resolve:{
                    test: function(loginS){
                            loginS.checkLogin();
                          }
                }
            })

      .state('navbar', {
                url : '/navbar/:id',
                abtract: true, 
                templateUrl : 'vistas/navbarLocal.html',
                controller: 'navbarCtrl', 
                resolve:{
                    test: function(loginS){
                            loginS.checkLogin();
                          }
                }               
            })
  
      .state('navbar.pedidos', {
                url: '/pedidos',
                views: {
                    'contenido': {
                        templateUrl: 'vistas/pedidos.html',
                        controller: 'pedidosCtrl'
                    }
                }
            })  
      .state('navbar.ofertas', {
                url: '/ofertas',
                views: {
                    'contenido': {
                        templateUrl: 'vistas/ofertas.html',
                        controller: 'ofertasCtrl'
                    }
                }
            })

      .state('navbar.productos', {
                url: '/productos',
                views: {
                    'contenido': {
                        templateUrl: 'vistas/productos.html',
                        controller: 'productosCtrl'
                    }
                }
            })

      .state('navbar.usuarios', {
                url: '/usuarios',
                views: {
                    'contenido': {
                        templateUrl: 'vistas/usuarios.html',
                        controller: 'usuariosCtrl'
                    }
                }
            })

      .state('navbar.infoLocal', {
                url: '/infoLocal',
                views: {
                    'contenido': {
                        templateUrl: 'vistas/infoLocal.html',
                        controller: 'infoLocalCtrl'
                    }
                }
            })
   
   $urlRouterProvider.otherwise('/inicio');
})

.controller('localesCtrl',function($scope,localS,loginS){
    $scope.locales = {};
    $scope.acceso = loginS.acceso();
    $scope.uploader = localS.retornarUploader();
    listadoLocales();

    function listadoLocales(){
     localS.listado().then(function(res){
        $scope.locales = res;
        console.info('locales',$scope.locales);
     });   
    }

    $scope.altaLocal = function (objectLocal){
        localS.altaMod(objectLocal).then(function(idLocal){
            localS.subirFotos(idLocal);
            $('#altaLocal').modal('hide');
        });
    }

    $scope.uploader.onCompleteAll = function(){
        listadoLocales();
        $scope.uploader.clearQueue();
        $scope.localForm = {};
    }

    $scope.logout = function(){
        loginS.logout();
    }

    
})

.controller('productosCtrl',function($scope,prodS,loginS){ 

    $scope.acceso = loginS.acceso();
    $scope.productoForm = {};
    $scope.uploader = prodS.retornarUploader();
    listadoProd();

    function listadoProd(){
        prodS.listado().then(function(res){
            $scope.productos = res;
        });
    }

    $scope.eliminarProd = function (idProd){
        prodS.eliminar(idProd).then(function(res){
                listadoProd();
            });
    }

    $scope.altaMod = function (objectProd){

        prodS.altaMod(objectProd).then(function(idProd){
            prodS.subirFotos(idProd);
            $scope.productoForm = {};
            $scope.tituloForm = "Alta";
        });    
    }

    $scope.modoMod = function(producto){
        $scope.productoForm = producto;
        $scope.tituloForm = "Producto Modificacion";
    }

    $scope.uploader.onCompleteAll = function(){
        listadoProd();
        $scope.uploader.clearQueue();
    } 

})

.controller('ofertasCtrl',function($scope,loginS,prodS,oferS){

    $scope.acceso = loginS.acceso();
    $scope.ofertaForm = {};

     function ListadOfertas(){
       oferS.listado().then(function(res){
            console.info('oferta',res);
            $scope.ofertas = res;
       });
     }

     function cargarProductos(){
        prodS.listado().then(function(res){
            $scope.productos = res;
        });
     }

     $scope.altaMod = function(ofertaForm){
        console.info('ofertaForm',ofertaForm);
        oferS.altaMod(ofertaForm).then(function(res){
            ListadOfertas();
            $scope.productoForm = {};
            $scope.tituloForm = "Alta";
        });
     }

    $scope.modoMod = function(oferta){
        $scope.ofertaForm = oferta;
        $scope.tituloForm = "Oferta Modificacion";
    }

     $scope.eliminarOfer = function(idOferta){
        oferS.eliminar(idOferta).then(function(res){
            ListadOfertas();
        });
     }

     ListadOfertas();
     cargarProductos();
})

.controller('pedidosCtrl',function($scope,prodS,oferS,pedS,usuS,loginS){

    $scope.acceso = loginS.acceso();
    $scope.pedidoForm = {};
    $scope.encuestaForm = {};
    $scope.pedidoForm.total = 0;
    $scope.date = pedS.fechaLimite();
    cargarInfo();

    $scope.altaEnc = function(encuesta){
        console.info('encuesta',encuesta);
        pedS.altaMod(encuesta).then(function(res){
            $('#myModal').modal('hide');
            console.info('respuesta encuesta',res);
        });
    }

    $scope.altaMod = function(pedidoForm){

        pedidoForm.estado = "no entregado";
        console.info(pedidoForm);

        if(!$scope.acceso.emp){
            pedidoForm.idCliente = $scope.acceso.id;
        }
        else{
            pedidoForm.idCliente = $scope.pedidoForm.idCliente;
        }

        console.info(pedidoForm);

        pedS.altaMod(pedidoForm).then(function(res){
            cargarInfo();
            $scope.pedidoForm = {};
            $scope.tituloForm = "Alta";
            console.info(res);
        });
    }

    $scope.cambiarEstado = function(pedido){
        pedS.cambiarEstado(pedido).then(function(res){
            console.info('cambio estado',res);
            cargarInfo();
        });
    }

    $scope.eliminarPed = function(idPedido){
        pedS.eliminar(idPedido).then(function(res){
            cargarInfo();
        });
    }

    $scope.calcularTotal = function(pedidoForm){
        $scope.pedidoForm.total = pedS.calcularTotal(pedidoForm);
    }

    function cargarInfo(){
        $scope.tituloForm = "Alta";
        prodS.listado().then(function(res){
            $scope.productos = res;
        });
        oferS.listado().then(function(res){
            $scope.ofertas = res;
       });
       pedS.listado().then(function(res){
            console.info('pedidos',res);
            $scope.pedidos = res;
        });
       usuS.listado().then(function(res){
            $scope.clientes = res;
       });
    }

})

.controller('infoLocalCtrl',function($scope,$state,localS,loginS){
    $scope.acceso = loginS.acceso();
    $scope.local = {};
    $scope.localForm = {};
    $scope.uploader = localS.retornarUploader();
    cargarLocal();

    if(navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position){
            $scope.$apply(function(){

                var coords = {       
                        lat: position.coords.latitude, 
                        lng: position.coords.longitude
                    }
                $scope.coordenadasUsu = coords;
            });
        });
    }

    function cargarLocal(){
        localS.cargarLocal().then(function(local){
            $scope.local = local;
        });
    }

    $scope.modLocal = function(localForm){
        localS.altaMod(localForm).then(function(res){
            localS.subirFotos(localForm.idLocal);
        });
    }

    $scope.eliminarLocal = function(){
        localS.eliminar().then(function(res){
            console.info('eliminarLocal',res);
            $state.go('locales');
        });
    }

    $scope.uploader.onCompleteAll = function(){
        $scope.uploader.clearQueue();
        $('#infoLocalMod').modal('hide');
    }

    $scope.modoMod = function(local){
        $scope.localForm = local;
    }

})

.controller('usuariosCtrl',function($scope,usuS,loginS){
    $scope.acceso = loginS.acceso();
    $scope.usuarioForm = {};

    cargarUsuarios();

    function cargarUsuarios(){
        usuS.listado().then(function(res){
            $scope.usuarios = res;
        });
    }

    $scope.altaMod = function(usuarioForm){
        usuS.altaMod(usuarioForm).then(function(res){
            cargarUsuarios();
        });
    }

    $scope.eliminarUsu = function(idUsuario){
        usuS.eliminar(idUsuario).then(function(res){
            cargarUsuarios();
        });
    }


})

.controller('loginCtrl',function($scope,loginS,usuS){

    $scope.loginForm={};

    $scope.login = function (loginForm){
        loginS.login(loginForm);        
    }

    $scope.altaCliente = function(clienteForm){
        clienteForm.nivel = 'cliente';
        clienteForm.estado = 'habilitado';
        clienteForm.idLocal = 0;
        console.info('clienteForm',clienteForm);

        usuS.altaMod(clienteForm).then(function(res){
             $('#myModal').modal('hide');
            console.info('respuesta registro',res);
        });
    }

    $scope.cargarAdmin = function(){
        $scope.loginForm.email= "demian@gmail.com";
        $scope.loginForm.password= "123";

    };
    $scope.cargarEncargado = function(){
        $scope.loginForm.email= "juana@gmail.com";
        $scope.loginForm.password= "123";

    };
    $scope.cargarEmpleado = function(){
        $scope.loginForm.email= "ariel@gmail.com";
        $scope.loginForm.password= "123";

    };
    $scope.cargarCliente= function(){
        $scope.loginForm.email= "pedro@gmail.com";
        $scope.loginForm.password= "123";

    };


})

.controller('navbarCtrl',function($scope,loginS){

    $scope.acceso = loginS.acceso();
})

.controller('estadisticasCtrl',function($scope,estaS){

    traerEstadisticas();

    function traerEstadisticas(){
        estaS.traerEstadisticas().then(function(estadisticas){

            console.info('estadisticas',estadisticas);
            $scope.options = estadisticas.options;
            $scope.ventalocales = estadisticas.ventalocales;
            $scope.comprausuarios = estadisticas.comprausuarios;
            $scope.cs = estadisticas.cs;
            $scope.volver = estadisticas.volver;
        })
    }


});


