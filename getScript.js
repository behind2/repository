	function getScript_cds(src,callback){
		var head=document.getElementsByTagName("head")[0];
		var js=document.createElement("script");
		js.setAttribute("src",src);
		js.onload=js.onreadystatechange=function(){
			if(!this.readyState||this.readyState=="loaded"||this.readyState=="complete"){
				head.removeChild(js);
				if(callback) callback();
			}
		}
		head.appendChild(js);
	}