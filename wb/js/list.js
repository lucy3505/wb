function List(){

	this.layer=document.getElementsByClassName("layer")[0]

this.user=JSON.parse(getCookie("log"));
	this.num=1;
	this.url="json/lists.json";
	this.buyNow=0;
	this.flag=0;
	this.getData();
	
	
}
List.prototype.add=function(){
	console.log("hhhhhhhhhhhh")
}


List.prototype.getData=function(){
	console.log("aa")
	var that=this;
	ajaxGet(this.url).then(function(res){
								that.data=JSON.parse(res);
								that.showData();
								},
						function(error){console.log("error:"+error)
	})
	
console.log(this.add())
}


List.prototype.showData=function(){
	var str="";
	for(var i=0;i<this.data.length;i++){
		str+=`
						
						
						
							<li>
								<div class="box">
									<img src="${this.data[i].url}" />
									<b>查看详情</b>
								</div>
								<div class="listN">
									<h4><i>商品名称:</i><span>${this.data[i].h4}</span>
									</h4>
									
									<h5 class="price"><i>商品价格:</i><span>$${this.data[i].price}</span></h5>
										<span class="No">商品编号:</span>
										<span>${this.data[i].no}</span>
										<a href="cart.html" class="car"></a>
								</div>
								<div class="choice">
										<button class="buy">立即购买</button>
										<button class="addCart">加入购物车</button>
								</div>
							</li>
						
					`
	}
	this.layer.innerHTML=str;
	this.buy=document.getElementsByClassName("buy");
	this.addCart=document.getElementsByClassName("addCart");
	this.addEvent();
	
}
List.prototype.addEvent=function(){
	
	var that=this;
	this.layer.addEventListener("click",(e)=>{
		var e=e||event;
		var target=e.target||e.srcElement;
		this.buyNow=0;
		this.flag=0;
		console.log(target)
		if(target.className=="addCart"||target.className=="buy"){
			if(this.user==null){location.href="login.html"}
				else{that.shopCar(target);
					if(target.className=="buy"){
						setTimeout(()=>{
							location.href="cart.html"
						},100)
					}
				}
		}
		if(target.nodeName=="IMG"||target.nodeName=="B"){
			this.no=parseInt(target.parentNode.parentNode.children[1].children[3].innerHTML)
			this.detailData={"h4":this.data[this.no].h4,
									"h5":this.data[this.no].h5,
									"img":this.data[this.no].url,
									"price":this.data[this.no].price,
									"no":this.no
									},
			setCookie("detail",JSON.stringify(this.detailData),10)
			location.href="detail.html";
		}
		
	})
}	

List.prototype.shopCar=function(target){
		if(this.user==null){location.href="login.html"};
			this.userN=this.user[0].userName;
			this.buyNow=1;
			this.no=target.parentNode.previousElementSibling.children[3].innerHTML;
			console.log(target)
			console.log(this.no)
			this.newData={
					"name":this.data[this.no].h4,
					"price":this.data[this.no].price,
					"num":this.num	,
					"no":this.no
				};
				this.arr=getCookie(this.userN)
				if(this.arr==null){ this.arrs=[this.newData];}
				else{
					this.arrs=JSON.parse(getCookie(this.userN));
					for(var i in this.arrs){
						if(this.arrs[i].no==this.newData.no){
								this.arrs[i].num=parseInt(this.arrs[i].num)+parseInt(this.newData.num);
								this.flag=1;
						}
					}
					if(this.flag==0) this.arrs.push(this.newData);
				}
				setCookie(this.userN,JSON.stringify(this.arrs),10);
				
		
		
	}

	
	
	
	

		
		
	
	
	
	
	
	
	
 
new List()



