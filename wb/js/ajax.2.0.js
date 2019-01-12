function ajaxGet(url,data){
	var p = new Promise(function(success,error){
		var str = "";
		for(var i in data){
			str = str + i + "=" + data[i] + "&";
		}
		var d = new Date()
		url = url + "?" + str + "_t="+d.getTime();
	
		var ajax = new XMLHttpRequest();
		ajax.open("GET",url,true)
		ajax.onreadystatechange = function(){
			if(ajax.readyState == 4 && ajax.status == 200){
				success(ajax.responseText);
			}
			
			if(ajax.readyState == 4 && ajax.status != 200){
				error(ajax.status);
			}
		}
		ajax.send(null);
	})
	return p;
}

function ajaxPost(url,callback,data){
	var str= ""
	for(var i in data){
		str = str + i + "=" + data[i] + "&"
	}
	
	var ajax = new XMLHttpRequest();
	ajax.open("POST",url,true);
	ajax.onreadystatechange = function(){
		if(ajax.readyState == 4 && ajax.status == 200){
			callback(ajax.responseText)
		}
	}
	ajax.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
	ajax.send(str);
}

function jsonp(url,callback,data){
	var str = "";
	for(var i in data){
		str = str + i + "=" + data[i] + "&";
	}
	url = url + "?" + str.slice(0,str.length-1);
	var script = document.createElement("script")
	script.src = url;
	document.body.appendChild(script);
	window[data[data._fnName]] = function(res){
		callback(res)
	}
}