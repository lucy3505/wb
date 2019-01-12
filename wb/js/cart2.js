function Cart(){
	this.table=document.getElementById("table_data"),
	
	this.user=getCookie("log");
	this.userN=JSON.parse(this.user)[0].userName;
	this.getData()
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
			<td class="text-center"><h5>${this.data[i].name}</h5></td>
			<td class="text-center"><h5>${this.data[i].price}</h5></td>
			<td class="text-center" style="width:150px">
			<div class="input-group">
				<span class="input-group-addon input-sm jian">-</span>
				<input type="text" class="form-control" placeholder="Amount" value="${this.data[i].num}">
				<span class="input-group-addon input-sm""add">+</span>
			</div>
			</td>
			<td class="text-center"><h5>$${parseFloat(this.data[i].price)*this.data[i].num}</h5></td>
			<td class="text-center">
			<button class="btn btn-danger btn-sm del" href="#" role="delete">删除</button>
			</td>
	`
	this.table.appendChild(this.newData)
	}
	this.del=document.getElementsByClassName("del")
	console.log(this.del[1])
	this.addEvent();
}
Cart.prototype.addEvent=function(){
	this.table.addEventListener("click",(e)=>{
		var e=e||event;
		var target=e.target||e.srcElement;
		console.log(target);
		if(target.className.indexOf("del")!=-1){
			target.parentNode.parentNode.remove();
			this.name=target.parentNode.parentNode.children[0].children[0].innerHTML;
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
			this.name=target.parentNode.parentNode.parentNode.children[0].children[0].innerHTML;
			console.log(this.name)
			for(let k=0;k<this.data.length;k++){
				if(this.data[k].name==this.name){
					console.log("bbbbbb")
					this.data[k].num=target.nextElementSibling.value;
					console.log(this.data)
					setCookie(this.userN,JSON.stringify(this.data),10)
					target.parentNode.parentNode.nextElementSibling.children[0].innerHTML=`<h5>$${parseFloat(this.data[k].price)*this.data[k].num}</h5>`
				}
			
			}
		}
		else if(target.className.indexOf("add")!=-1){
			console.log("aaaaaaaaaaaaaaaaaaaad")
			this.addV=parseInt(target.previousElementSibling.value)
			this.addV+=1;
			target.previousElementSibling.value=this.addV
			this.name=target.parentNode.parentNode.parentNode.children[0].children[0].innerHTML;
			console.log(this.name)
			for(let k=0;k<this.data.length;k++){
				if(this.data[k].name==this.name){
					console.log("bbbbbb")
					this.data[k].num=this.addV;
					console.log(this.data)
					setCookie(this.userN,JSON.stringify(this.data),10)
					target.parentNode.parentNode.nextElementSibling.children[0].innerHTML=`<h5>$${parseFloat(this.data[k].price)*this.data[k].num}</h5>`
				}
			
			}
		}
		
	})
}

new Cart()