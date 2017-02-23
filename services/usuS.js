angular.module('proyecto')
	.service('usuS',function(abmS){

			var api = "/ws1/usuarios";

			this.listado = function(){

				return abmS.listado(api);
	  		}

	  		this.altaMod = function(objectUsu){

	  			if(typeof objectUsu.idUsuario == "undefined")
	  				return	abmS.alta(api,objectUsu);
	  			else
	  				return	abmS.modificar(api,objectUsu);

	  		}

		    this.eliminar = function(idUsu){

		    	return abmS.eliminar(api,idUsu); 
		    }
	})