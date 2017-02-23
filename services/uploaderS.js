angular.module('proyecto')
	.service('uploaderS',function(FileUploader){

		var options = {

			url:'/ws1/fotos',
			queueLimit: 3,
			filters: [{
				name: 'filtroLoco',
				fn: function(item) {
    					if(item.type == 'image/jpeg')
    						return true;
    					else
    						return false;
				}
			}]		
    	};

    	var uploader = new FileUploader(options);

    	this.retornarUploader = function(){ 
    		return uploader;
    	}
			
		this.subirFotos = function(tipoFoto,idElemento){

	    	var idElemento = (String(idElemento)).trim();
        	var cont = 1;
        	angular.forEach(uploader.queue,function(value,key){
                value.file.name = tipoFoto + idElemento + String(cont) + ".jpg";
                cont++;
        	});

			uploader.uploadAll();
		}

		this.fuenteFotos = function(tipoFoto,object){

			var id = 0;

			if(tipoFoto == 'P'){
				angular.forEach(object,function(value,key){
				var id = value.idProducto;
	            var imageArray = [
		                { src:'P' + id + '1' + '.jpg'},
		                { src:'P' + id + '2' + '.jpg'},
		                { src:'P' + id + '3' + '.jpg'}
	            ]
	                value.imageArray = imageArray;  
	    		});
	    		return object;
			}
			else{
				angular.forEach(object,function(value,key){
				var id = value.idLocal;
	            var imageArray = [
		                { src:'L' + id + '1' + '.jpg'},
		                { src:'L' + id + '2' + '.jpg'},
		                { src:'L' + id + '3' + '.jpg'}
	            ]
	                value.imageArray = imageArray;  
	    		});
	    		return object;
			}
		}
		
	})