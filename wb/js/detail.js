function Detail(){
	
	this.h4=document.getElementsByTagName("h4")[0];
	this.h5=document.getElementsByTagName("h5")[0];
	this.box=document.getElementsByClassName("box")[0];
	this.price=document.getElementsByClassName("price")[0];
	this.buy=document.getElementById("buy");
	this.addCart=document.getElementById("addCart");
	this.input=document.getElementsByTagName("input")[0];
	this.no=document.getElementById("no");
	this.num=document.getElementsByTagName("input")[0].value;
	this.add=document.getElementById("add");
	this.sub=document.getElementById("sub");
	this.buyNow=0;
	this.flag=0;
	this.getData();
	this.user=getCookie("log");
	
}
Detail.prototype.init=function(){
	
	if(this.user==null){
		
		location.href="login.html"
	}
	
}


Detail.prototype.getData=function(){
	console.log("getdata")
	this.data=JSON.parse(getCookie("detail"));
	console.log(this.data);
	this.h4.innerHTML=`<i>商品名称:</i><span>${this.data.h4}</span>`
	this.h5.innerHTML=`<i>商品详情:</i><span>${this.data.h5}</span>`
	this.price.innerHTML=`<i>商品价格:</i><span>$${this.data.price}</span>`
	this.box.innerHTML=`<img src="${this.data.img}" />`
	this.no.innerHTML=`<span>商品编号：</span><i>${this.data.no}</i>`
	this.addEvent()
}
Detail.prototype.addEvent=function(){

	console.log(this.add)
	this.add.addEventListener("click",()=>{
		this.input.value=parseInt(this.num)+1
		this.num=this.input.value
			console.log("num:"+this.num)
	})
	this.sub.addEventListener("click",()=>{
		if(this.num==1){
			this.input.value=1
			this.num=this.input.value
		}
		else{
			this.input.value=parseInt(this.num)-1
			this.num=this.input.value
		}
	})
	
	
	this.addCart.addEventListener("click",()=>{
		if(this.user==null){
			
			location.href="login.html"
		}
		else{
			this.flag=0;
			this.saveData()
		}
		
	})
	this.buy.addEventListener("click",()=>{
		if(this.user==null){
			
			location.href="login.html"
		}else{
			this.buyNow=1;
			this.saveData();
		}
		
	})
}

 Detail.prototype.saveData=function(){
	console.log("saveData");

	this.newData={
		"name":this.data.h4,
		"price":this.data.price,
		"num":this.num,
		"no":this.data.no						
	};
	this.userN=JSON.parse(this.user)[0].userName;
	this.arr=getCookie(this.userN)
	if(this.arr==null){ this.arrs=[this.newData];}
	else{
		 this.arrs=JSON.parse(getCookie(this.userN));
		 
		 for(var i in this.arrs){
			 if(this.arrs[i].no==this.newData.no){
				  this.arrs[i].num=parseInt(this.arrs[i].num)+parseInt(this.num);
					this.flag=1;
			 }
		 }
		if(this.flag==0) this.arrs.push(this.newData);
	}

	 setCookie(this.userN,JSON.stringify(this.arrs),10);
	 if(this.buyNow==1){ 
 		 setTimeout(()=>{
 			 location.href="cart.html"
 		 },100)
	 }
	 
}

new Detail()



