document.body.onload = function (){
	document.getElementById("preloader").style.display = "none";
	

	document.getElementById("content").style.opacity = "1";
	background("1");
	resize();


	document.getElementById("exterior").style.transform = 'rotate('+ 0 + 'deg)';
	document.getElementById("butons").style.transform = 'rotate('+ 0 + 'deg)';

	//
	var push=false;
	var pos=1;
	var actisize=true;
	var acabat=true;
	
	/*document.getElementById("FletxaDreta").onmousedown = function (){
		if (acabat){
			canviBotoDreta();
		}
	}
	document.getElementById("FletxaEsquerra").onmousedown = function (){
		if (acabat){
			canviBotoEsquerra();
		}
	}*/
	document.getElementById("MapDreta").onmousedown = function (){
		if (acabat){
		canviBotoDreta();
		}
	}
	document.getElementById("MapEsquerre").onmousedown = function (){
		if (acabat){
		canviBotoEsquerra();
		}
	}
	/*document.getElementById("MapInferior").onmousedown = function (){
		if (acabat){
			canviBotoDreta();
			setTimeout(Segon, 1400);
			acabat=false
			function Segon(){
				canviBotoDreta();
			}
		}
	}*/
	document.getElementById("MapButo").onmousedown = function (){
		if (actisize){
			actisize=false;
			//Colocar el boto a dalt a l'esquerra
			document.getElementById("buto").classList.add("transitionbuto");
			document.body.style.overflowY= "auto";
			document.getElementById("content").classList.add("transition");
			document.getElementById("buto").style.transform = "scale("+0.9+")";
			document.getElementById("buto").style.marginLeft = "8px";
			document.getElementById("buto").style.marginTop = "5px";

			//Funcions que s'executaran 0.3s després (bola)
			setTimeout(Bola, 300);
			function Bola(){
			document.getElementById("buto").style.transform = "scale("+1+")";
			document.getElementById("content").style.transform = "scale("+0.15+")";
			document.getElementById("content").style.marginLeft = "10%";
			}
			setTimeout(Mostrar, 1500);
			function Mostrar(){
				push=true;
				//Mostrar Content Selecccionat
				if (pos==1){
					mostrarContent("Content3D");
				} else if (pos==2){
					mostrarContent("ContentAnimacio");
				} else if (pos==3){
					mostrarContent("ContentWeb");
				} else{
					mostrarContent("ContentDibuix");
				}
			}
			
		} else{ //Quan fas clic dins d'un content activat
			actisize=true;
			document.body.style.overflowY= "hidden";
			resize();
			amagarContents();
		}
	}
	function mostrarContent(id){
		document.getElementById(id).style.paddingTop = "20px";
		document.getElementById(id).style.maxHeight = "5000px";
		if (push==false){
			if (pos == 1){
				document.getElementById("ContentInfo").appendChild(document.getElementById("ContentWeb"));
				document.getElementById("ContentInfo").appendChild(document.getElementById("Content3D"));
			} else if (pos == 2){
				document.getElementById("ContentInfo").appendChild(document.getElementById("ContentDibuix"));
				document.getElementById("ContentInfo").appendChild(document.getElementById("ContentAnimacio"));
			} else if (pos == 3){
				document.getElementById("ContentInfo").appendChild(document.getElementById("Content3D"));
				document.getElementById("ContentInfo").appendChild(document.getElementById("ContentWeb"));
			} else{
				document.getElementById("ContentInfo").appendChild(document.getElementById("ContentAnimacio"));
				document.getElementById("ContentInfo").appendChild(document.getElementById("ContentDibuix"));
			}
		}
	}
	function amagarContents (){
			document.getElementById("Content3D").style.maxHeight = "0px";
			document.getElementById("ContentAnimacio").style.maxHeight = "0px";
			document.getElementById("ContentWeb").style.maxHeight = "0px";
			document.getElementById("ContentDibuix").style.maxHeight = "0px";
		//
			document.getElementById("Content3D").style.paddingTop = "0px";
			document.getElementById("ContentAnimacio").style.paddingTop = "0px";
			document.getElementById("ContentWeb").style.paddingTop = "0px";
			document.getElementById("ContentDibuix").style.paddingTop = "0px";
	}
	
	window.onresize = function (){
		if (actisize){
		resize();
		}
	}
	function resize (){
		var widthtotal= window.innerWidth;
		document.getElementById("content").style.transform = 'scale('+ (window.innerWidth+500)/4800 +')';
		var margin;
		margin= document.getElementById("exterior").offsetWidth*((window.innerWidth+500)/4800);
		margin= margin/widthtotal;
		margin= margin*100;
		margin= 100-margin;
		margin= margin/2;
		

		document.getElementById("content").style.marginLeft = margin+"%";
		document.getElementById("content").style.marginTop = 40+margin*1.8+"px";
	}
	function canviBotoDreta (){
		push=false;
		pos++;
		if(pos>=5){
			pos=1;
		}
		var rotacioExterior=conversor(document.getElementById("exterior").style.transform);
		rotacioExterior=parseInt(rotacioExterior);
		document.getElementById("interior").classList.add("roda");
		document.getElementById("buto").classList.add("roda");
		acabat=false;
		var rotacioExteriorFinal = rotacioExterior+90;
		var id = setInterval(frame, 15);
		function frame() {
			if (rotacioExterior == rotacioExteriorFinal) {
				clearInterval(id);
				document.getElementById("buto").classList.remove("roda");
				document.getElementById("interior").classList.remove("roda");
				acabat=true;
			} else {
				rotacioExterior++;
				document.getElementById("exterior").style.transform = 'rotate('+ rotacioExterior + 'deg)';
				document.getElementById("butons").style.transform = 'rotate('+ -rotacioExterior + 'deg)';
				
			}
		}
		background(pos);
		if (actisize){ // Si la bola esta gran
			
		} else{ //Si un content està obert
			amagarContents();
			if (pos == 1){
				mostrarContent("Content3D");
			} else if (pos == 2){
				mostrarContent("ContentAnimacio");
			} else if (pos == 3){
				mostrarContent("ContentWeb")
			} else{
				mostrarContent("ContentDibuix");
			}
		}
	}
	function canviBotoEsquerra (){
		push=false;
		pos--;
		if(pos<=0){
			pos=4;
		}
		var rotacioExterior=conversor(document.getElementById("exterior").style.transform);
		rotacioExterior=parseInt(rotacioExterior);
		document.getElementById("interior").classList.add("rodareves");
		document.getElementById("buto").classList.add("rodareves");
		acabat=false;
		var rotacioExteriorFinal = rotacioExterior-90;
		var id = setInterval(frame, 15);
		function frame() {
			if (rotacioExterior == rotacioExteriorFinal) {
				clearInterval(id);
				document.getElementById("interior").classList.remove("rodareves");
				document.getElementById("buto").classList.remove("rodareves");
				acabat=true;
			} else {
				rotacioExterior--;
				document.getElementById("exterior").style.transform = 'rotate('+ rotacioExterior + 'deg)';
				document.getElementById("butons").style.transform = 'rotate('+ -rotacioExterior + 'deg)';
			}
		}
		background(pos);
		if (actisize){ // Si la bola esta gran
			
		} else{ //Si un content està obert
			amagarContents();
			if (pos == 1){
				mostrarContent("Content3D");
			} else if (pos == 2){
				mostrarContent("ContentAnimacio");
			} else if (pos == 3){
				mostrarContent("ContentWeb")
			} else{
				mostrarContent("ContentDibuix");
			}
		}
	}

	
	function background(pos){
		if (pos==1){
			document.body.style.backgroundImage = "url('./img/Background3D.jpg')";
		} else if (pos==2){
			document.body.style.backgroundImage = "url('./img/BackgroundAnimacio.jpg')";
		} else if (pos==3){
			document.body.style.backgroundImage = "url('./img/BackgroundWeb.png')";
		} else {
			document.body.style.backgroundImage = "url('./img/BackgroundDibuix.jpg')";
		}
	}
	
	function conversor (rot){
		var rot=rot.substr(7);
		rot = rot.substring(0,rot.length-4);
		return rot;
	}
}