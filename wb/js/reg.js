var reg={
	user:document.getElementsByName("userName")[0],
	pwd:document.getElementsByName("pwd")[0],
	pwd2:document.getElementsByName("pwd2")[0],
	regBtn:document.getElementById("regBtn"),
	inputs:document.getElementsByTagName("input")
}
function Reg(option){
	this.user=option.user,
	this.pwd=option.pwd,
	this.regBtn=option.regBtn,
	this.pwd2=option.pwd2,
	this.inputs=option.inputs,
	this.error="false",

	this.event()
	
}
Reg.prototype.event=function(){
	console.log(this.pwd2)
	this.user.onblur=()=>{
		this.checkUser()
	}
	this.pwd.onblur=()=>{
		this.checkPwd()
	}
	this.pwd2.onblur=()=>{
		this.checkPwd2()
	}
	this.regBtn.onclick=()=>{
		this.checkBtn()
	}
	
}
 Reg.prototype.checkUser=function(){
	 var li=this.user.parentNode;
	
	 if(this.user.value==""){
			checknError(li,"请输入用户名");
			
		}
	else{checknError(li,"")}
	
 }
 Reg.prototype.checkPwd=function(){
	 var li=this.pwd.parentNode;
	 if(this.pwd.value==""){	 
	 	checknError(li,"请输入密码")
	 }
	else{checknError(li,"")}
	 
	 
 }
 Reg.prototype.checkPwd2=function(){
	 console.log("222")
 	var li=this.pwd2.parentNode;
 	if(this.pwd2.value==""){	 
 	checknError(li,"请输入密码2")
 	}	
 	else if(this.pwd.value!=this.pwd2.value){
		checknError(li,"两次密码不一致")
	}
	else if(this.pwd.value==this.pwd2.value){
		checknError(li,"")
	}
	
 	
 }
  Reg.prototype.checkBtn=function(){
 	 var nErrors=document.getElementsByClassName("nError");
	 
  	 for(let i=0;i<nErrors.length;i++){
  		 if(nErrors[i].style.display!="none"){
			 return console.log("pp")
		 }
		}
		
			for(let k=0;k<this.inputs.length;k++){
				if(this.inputs[k].value==""){
					console.log("fff")
					return this.inputs[k].onblur();
				}
			}
		this.saveData();
   }
   
 Reg.prototype.saveData=function(){
	console.log("saveData");
	this.userV=this.user.value;
	this.pwdV=this.pwd.value;
	this.data={
		"userName":this.userV,
		"pwd":this.pwdV,
									
	};

	this.flag=0;
	console.log("cookie:"+document.cookie)
	this.arr=getCookie("user")
	console.log("this.arr:"+getCookie("user"))
	if(this.arr==null){ this.arrs=[this.data];}
	else{
		 this.arrs=JSON.parse(getCookie("user"));
		 
		 for(var i in this.arrs){
			 if(this.arrs[i].userName==this.userV){
				  this.flag=1;
			 }
		 }
		this.arrs.push(this.data);
	}
	console.log("flag:"+this.flag)
	 this.check();
}
 Reg.prototype.check=function(){
	 if(this.flag==1){
		 checknError(this.user.parentNode,"用户名已存在");
	 }
	 else{
		console.log("success");
	 
	 setCookie("user",JSON.stringify(this.arrs),10);
	 window.location.href="login.html";
	 }
	 
	 
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
