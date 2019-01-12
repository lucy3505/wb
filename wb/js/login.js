var reg={
	user:document.getElementsByName("userName")[0],
	pwd:document.getElementsByName("pwd")[0],
	
	regBtn:document.getElementById("regBtn"),
	inputs:document.getElementsByTagName("input")
}
function Reg(option){
	this.user=option.user,
	this.pwd=option.pwd,
	this.regBtn=option.regBtn,
	
	this.inputs=option.inputs,
	this.error="false",

	this.event()
	
}
Reg.prototype.event=function(){
	
// 	this.user.onblur=()=>{
// 		this.checkUser()
// 	}
// 	this.pwd.onblur=()=>{
// 		this.checkPwd()
// 	}
	
	this.regBtn.onclick=()=>{
		this.userflag=0;
		this.pwdflag=0;
		this.saveData()
	}
	
}




   
 Reg.prototype.saveData=function(){
	console.log("saveData");
	this.userV=this.user.value;
	this.pwdV=this.pwd.value;
	this.data={
		"userName":this.userV,
		"pwd":this.pwdV,
									
	};

	
	this.arrs=getCookie("user")
	console.log(this.arrs)
	if(this.arrs==null){checknError(this.user.parentNode,"用户名不存在"); }
	else{
		

		 this.arrs=JSON.parse(getCookie("user"));
		 for(var i in this.arrs){
			 if(this.arrs[i].userName==this.userV){
				  this.userflag=1;
			 }
			 if(this.arrs[i].pwd==this.pwdV){
			 	this.pwdflag=1;
			 }
		 }
	}

	this.check();
}
 Reg.prototype.check=function(){
	 if(this.userflag==1&&this.pwdflag==1){
		 
		 setCookie("log",JSON.stringify([this.data]),10)
		  window.location.href="index.html"
	 }
	 else{
	
	 checknError(this.user.parentNode,"用户名或密码错误");
	 }
	 this.event()
	 
 }
new Reg(reg);




function checknError(ele,txt){
	
	
    if(ele.nextElementSibling!=null){
		ele.nextElementSibling.remove();
	}
	var div=document.createElement("div")
	 	div.className="nError";
	 	div.innerHTML=`<i></i>${txt}`;
		div.style.display="block"
		if(txt==""){
			div.style.display="none"
		}
	 	ele.parentNode.appendChild(div);
		
		
}