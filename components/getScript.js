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



  static loadScript(url, callback) {
    var head = document.getElementsByTagName('head')[0];
    var script = document.createElement('script');
        script.type = 'text/javascript';

    if (script.readyState) {
      script.onreadystatechange = function() {
        if (this.readyState === 'loaded' || this.readyState === 'complete') {
          this.onreadystatechange = null;
          this.setAttribute('src', null); /*删除src属性, 防止内存泄露*/
          head.removeChild(this);
          if (callback && typeof callback === 'function') {
            callback();
          }
        }
      };
    } else {
      script.onload = function() {
        this.onload = null;
        this.setAttribute('src', null); /*删除src属性, 防止内存泄露*/
        head.removeChild(this);
        if (callback && typeof callback === 'function') {
          callback();
        }
      };
    }

    script.setAttribute('src', url);
    head.appendChild(script);
  }
