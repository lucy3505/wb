function Detail(){
// 	this.h4=document.getElementsByTagName("h4")[0];
// 	this.h5=document.getElementsByTagName("h5")[0];
// 	this.box=document.getElementsByClassName("box")[0];
// 	this.price=document.getElementsByClassName("price")[0];
// 	this.buy=document.getElementById("buy");
// 	this.addCart=document.getElementById("addCart");
// 	this.input=document.getElementsByTagName("input")[0];
// 	this.num=document.getElementsByTagName("input")[0].value;
	this.layer=document.getElementsByClassName("layer")[0]
// 	this.add=document.getElementById("add");
// 	this.sub=document.getElementById("sub");
	this.userN=JSON.parse(getCookie("log"))[0].userName;
	this.url="json/lists.json";
	this.buyNow=0;
	this.flag=0;
	this.getData();
	
	
}
Detail.prototype.init=function(){
	
	if(this.user==null){
		
		location.href="login.html"
	}
	
}


Detail.prototype.getData=function(){
	console.log("aa")
	var that=this;
	ajaxGet(this.url).then(function(res){
								that.data=JSON.parse(res);
								that.showData();
								},
						function(error){console.log("error:"+error)
	})
	

}


Detail.prototype.showData=function(){
	var str="";
	for(var i=0;i<this.data.length;i++){
		str+=`<div class="margin clear">
						<div class="box"><img src="${this.data[i].url}" /></div>
						<section>
						
						<h4><i>商品名称:</i><span>${this.data[i].h4}</span></h4>
						<h5><i>商品详情:</i><span>${this.data[i].h5}</span></h5>
						<h5 class="price"><i>商品价格:</i><span>$${this.data[i].price}</span></h5>
						
						<ul>
							
							<li><span>商品编号:</span><span>${this.data[i].no}</span></li>
							<li>
								<div id="num">
									<span id="sub">-</span>
									<input type="text" value="1">
									<span id="add">+</span>
									<a href="cart.html"></a>
								</div>
							</li>
							
							
							<li class="choice">
								
								<button class="buy">立即购买</button>
								<button class="addCart">加入购物车</button>
							</li>
						</ul>
					
						</section>
					</div>`
	}
	this.layer.innerHTML=str;
	this.buy=document.getElementsByClassName("buy");
	this.addCart=document.getElementsByClassName("addCart");
	this.add=document.getElementsByClassName("addCart");
	this.sub=document.getElementsByClassName("sub");
	this.addEvent();
	
}
Detail.prototype.addEvent=function(){
	this.layer.addEventListener("click",(e)=>{
		var e=e||event;
		var target=e.target||e.srcElement;
		this.buyNow=0;
		this.flag=0;
		console.log(target)
		if(target.className=="addCart"){
			this.no=target.parentNode.parentNode.children[0].children[1].innerHTML;
			console.log(this.no)
			this.newData={
					"name":this.data[this.no].h4,
					"price":this.data[this.no].price,
					"num":target.parentNode.parentNode.children[1].children[0].children[1].value
												
				};
				console.log(this.newData)
				this.userN="cart";
				this.arr=getCookie(this.userN)
				if(this.arr==null){ this.arrs=[this.newData];}
				else{
					 this.arrs=JSON.parse(getCookie(this.userN));
					 
					 for(var i in this.arrs){
						 if(this.arrs[i].name==this.newData.name){
							  this.arrs[i].num=parseInt(this.arrs[i].num)+parseInt(this.newData.num);
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
		else if(target.className=="buy"){
			this.buyNow=1;
			this.no=target.parentNode.parentNode.children[0].children[1].innerHTML;
			this.newData={
					"name":this.data[this.no].h4,
					"price":this.data[this.no].price,
					"num":target.parentNode.parentNode.children[1].children[0].children[1].value
												
				};
				console.log(this.newData)
				this.userN="cart";
				this.arr=getCookie(this.userN)
				if(this.arr==null){ this.arrs=[this.newData];}
				else{
					this.arrs=JSON.parse(getCookie(this.userN));
					
					for(var i in this.arrs){
						if(this.arrs[i].name==this.newData.name){
								this.arrs[i].num=parseInt(this.arrs[i].num)+parseInt(this.newData.num);
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
		
		
		
	})
	}
	
	
 
new Detail()



