function Cart(){
	this.table=document.getElementById("table_data"),
	this.tprice=0;
	this.total=document.getElementById("total");
	this.user=getCookie("log");
	this.userN=JSON.parse(this.user)[0].userName;
	this.selAll=document.getElementById("selAll")
	this.getData();
}
Cart.prototype.getData=function(){
	console.log(this.userN)
	this.datas=getCookie(this.userN);
	this.data=JSON.parse(this.datas)

	console.log(this.datas)
	
	this.showData()
}

Cart.prototype.showData=function(){
	
	for(let i=0;i<this.data.length;i++){
	this.newData=document.createElement("tr");
	
	this.newData.innerHTML=`
			<td class="text-center"><input type="checkbox" class="chk" /><span>${this.data[i].name}</span></td>
			<td class="text-center"><h5>${this.data[i].price}</h5></td>
			<td class="text-center" style="width:150px">
			<div class="input-group">
				<span class="input-group-addon input-sm jian">-</span>
				<input type="text" class="form-control" placeholder="Amount" value="${this.data[i].num}">
				<span class="input-group-addon input-sm add">+</span>
			</div>
			</td>
			<td class="text-center tot"><h5>${parseFloat(this.data[i].price)*this.data[i].num}</h5></td>
			<td class="text-center">
			<button class="btn btn-danger btn-sm del" href="#" role="delete">删除</button>
			</td>
	`
	this.table.appendChild(this.newData)
	}
	this.tot=document.getElementsByClassName("tot");
	this.del=document.getElementsByClassName("del")
	this.chk=document.getElementsByClassName("chk");
	
	
	if(this.selAll.checked==true){
			for(var p=0;p<this.chk.length;p++){
			this.chk[p].checked=true;
		}
	}
	this.addEvent();
	this.calTotal();
}


Cart.prototype.calTotal=function(){
	this.tprice=0;
	for(let i=0;i<this.tot.length;i++){
		console.log(this.tot[i].children[0].innerHTML)
		if(this.tot[i].parentNode.children[0].children[0].checked==true){
			this.tprice+=parseInt(this.tot[i].children[0].innerHTML);
		}
	}
	this.total.innerHTML=this.tprice;
	
	
}
Cart.prototype.addEvent=function(){
	var that=this;
	
	this.selAll.onchange=function(){
		
		console.log(that.chk)
		if(that.selAll.checked==true){
				for(var p=0;p<that.chk.length;p++){
				that.chk[p].checked=true;
			}
		}
		else if(that.selAll.checked==false){
				for(var p=0;p<that.chk.length;p++){
						console.log("oooouttttttttt")
							that.chk[p].checked=false;
						}
		}
		that.calTotal();
	}
	
	
	
	this.table.addEventListener("click",(e)=>{
		var e=e||event;
		var target=e.target||e.srcElement;
		console.log(target);
		if(target.className.indexOf("del")!=-1){
			target.parentNode.parentNode.remove();
			this.name=target.parentNode.parentNode.children[0].children[1].innerHTML;
			for(let i=0;i<this.data.length;i++){
				if(this.data[i].name==this.name){
					console.log("bbbbbb")
					this.data.splice(i,1);
					console.log(this.data)
					setCookie(this.userN,JSON.stringify(this.data),10)
				}
			}
		}
		else if(target.className.indexOf("jian")!=-1){
			target.nextElementSibling.value==1?target.nextElementSibling.value=1:target.nextElementSibling.value-=1;
			this.name=target.parentNode.parentNode.parentNode.children[0].children[1].innerHTML;
			console.log(this.name)
			for(let k=0;k<this.data.length;k++){
				if(this.data[k].name==this.name){
					this.data[k].num=target.nextElementSibling.value;
					setCookie(this.userN,JSON.stringify(this.data),10)
					target.parentNode.parentNode.nextElementSibling.children[0].innerHTML=`${parseFloat(this.data[k].price)*this.data[k].num}`
				}
			
			}
		}
		else if(target.className.indexOf("add")!=-1){
		
			this.addV=parseInt(target.previousElementSibling.value)
			this.addV+=1;
			target.previousElementSibling.value=this.addV
			this.name=target.parentNode.parentNode.parentNode.children[0].children[1].innerHTML;
			for(let k=0;k<this.data.length;k++){
				if(this.data[k].name==this.name){
					this.data[k].num=this.addV;
					setCookie(this.userN,JSON.stringify(this.data),10)
					target.parentNode.parentNode.nextElementSibling.children[0].innerHTML=`${parseInt(this.data[k].price)*this.data[k].num}`
				}
			
			}	
		}
	this.calTotal();
	})
}

new Cart()