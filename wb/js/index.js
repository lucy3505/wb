

	


	
	function log(){
		this.log=document.getElementById("login");
		this.cart=document.getElementById("cart");
		this.getC();
		
	}
log.prototype.getC=function(){
	console.log("login:"+this.cart)
	this.user=getCookie("log")
	if(this.user!=null){
		this.user=JSON.parse(this.user)
		this. userN=this.user[0].userName;
		this.log.innerHTML=`
			<span>欢迎${this.userN}!!</span>
			<a href="index.html">退出</a> 
		`
		
		this.exit=this.log.children[1];
		this.cart.href="cart.html";
		this.extEvent();
	}
	else{
		this.log.innerHTML=`<a href="login.html">请登录</a>`
		this.cart.href="login.html"
	}
}
log.prototype.extEvent=function(){
	this.exit.onclick=function(){
		setCookie("log","",-5);
		
	}
	
	
}

new log();


function sData(option){
	this.ele=option.ele,
	this.num=option.num,
	this.wrap=this.ele.children[0],
	this.slide=this.wrap.children;
	this.url=option.url,
	this.lunName=option.lunName,
	this.getData()
}
sData.prototype.getData=function(){
	
	var that=this;
	ajaxGet(this.url).then(function(res){
		that.data=JSON.parse(res);
		console.log(that.data)
		that.showData();
	},function(error){console.log("error:"+error)})
	
}
sData.prototype.showData=function(){
	var name=this.lunName;
	console.log(name);
 	for(var i=0;i<this.data[this.lunName].length;i++){
 		console.log(this.data[this.lunName].length)
 		console.log(this.wrap)
		
		this.slide[i+1].innerHTML=`
					<a href="#">
						<img src="${this.data[this.lunName][i]}">
					</a>
		
		`;
 	}
	
}
//banner swiper
var banD={
	ele:document.getElementById("banSwiper"),
	num:6,
	url:"json/lun.json",
	lunName:"banner"
}
var banner=new sData(banD);

//limit_r SWIPER
var limit_r={
	ele:document.getElementById("topSwiper"),
	num:6,
	url:"json/lun.json",
	lunName:"limitR"
}
var limitR=new sData(limit_r)
//limit_c swiper
var limit_c={
	ele:document.getElementById("cSwiper"),
	num:6,
	url:"json/lun.json",
	lunName:"limitC"
}
var limitC=new sData(limit_c)



//top_list数据传输

function Data(option){
	this.ele=option.ele,
	this.num=option.num,
	this.url=option.url,
	
	this.getData()
}
Data.prototype.getData=function(){
	var that=this;
	ajaxGet(this.url).then(function(res){
		that.data=JSON.parse(res);
		console.log(that.data)
		that.showData();
	},function(error){console.log("error:"+error)})
	
}
Data.prototype.showData=function(){
	str="<ul>"
 	for(var i=0;i<this.data.length;i++){
 		str+=`<li>
							<a >
								<img src="${this.data[i].url}" alt="">
							</a>
							<h4>
								<p>${this.data[i].h4}</p>
								<p>${this.data[i].h5}</p>
							</h4>
						</li>` 	
 	}
	str+="</ul>"
	this.ele.innerHTML=str;
	this.list=this.ele.children[0].children;
	
	this.listEvent();
}
Data.prototype.listEvent=function(){
		console.log("aaaaaaaaaaa")
		for(let i=0;i<this.list.length;i++){
			this.list[i].addEventListener("click",()=>{
				this.dataD={"h4":this.data[i].h4,
										"h5":this.data[i].h5,
										"img":this.data[i].url,
										"price":this.data[i].price
										},
							
				setCookie("detail",JSON.stringify(this.dataD),10)
				location.href="detail.html";
			})
			
			
		}
	
		
	}
	
	

var top_list={
	num:4,
	ele:document.getElementsByClassName("top_list")[0],
	url:"json/toplist.json",
	
}



var ser_list={
	num:4,
	ele:document.getElementsByClassName("ser_list")[0],
	url:"json/serlist.json"
}

var topList=new Data(top_list);
var serList=new Data(ser_list);


var cSwiper=new Swiper('#cSwiper', {
	autoplay: true,
	effect : 'fade',
	  navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
	loop : true,
		})
cSwiper.el.onmouseover = function(){
  cSwiper.autoplay.stop();
}
cSwiper.el.onmouseout = function(){
  cSwiper.autoplay.start();
}





var topSwiper=new Swiper('#topSwiper', {
	autoplay: true,
	effect : 'fade',
	  navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
	loop : true,
	 pagination: {
    el: '.swiper-pagination',
    type: 'bullets',
		},
		clickable: true,
		})
topSwiper.params.pagination.clickable = true ;
topSwiper.pagination.destroy()
topSwiper.pagination.init()
topSwiper.pagination.bullets.eq(0).addClass('swiper-pagination-bullet-active');
topSwiper.el.onmouseover = function(){
  topSwiper.autoplay.stop();
}
topSwiper.el.onmouseout = function(){
  topSwiper.autoplay.start();
}

//banner swiper
var banSwiper = new Swiper('#banSwiper', {
	autoplay: true,
	effect : 'fade',
	  navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
	loop : true,
	 pagination: {
    el: '.swiper-pagination',
    type: 'bullets',
	
    //type: 'fraction',
    //type : 'progressbar',
    //type : 'custom',
  },
   clickable: true,
   
  //可选选项，自动滑动
})
banSwiper.params.pagination.clickable = true ;
banSwiper.pagination.destroy()
banSwiper.pagination.init()
banSwiper.pagination.bullets.eq(0).addClass('swiper-pagination-bullet-active');
banSwiper.el.onmouseover = function(){
  banSwiper.autoplay.stop();

}
banSwiper.el.onmouseout = function(){
  banSwiper.autoplay.start();
}

//choice 
function Choice(option){
	this.ele=option.ele,
	this.title=this.ele.children[0],
	this.url=option.url,
	this.tit=option.tit,
	this.index=0,
	this.more=option.more,
	//this.acttitle();
	//this.event()
	this.content=this.ele.children[1]
	this.getData();
	this.showData=option.showD
}
Choice.prototype.event=function(){
	var that=this;
	for(let i=0;i<this.titles.length;i++){
		this.index=i;
		this.titles[i].onmouseover=function(){
			//that.getData()
		}
	}
	
}

Choice.prototype.getData=function(){
	var that=this;
	ajaxGet(this.url).then(function(res){
		that.data=JSON.parse(res);
		that.dataL=that.data.length;
		//console.log("data:"+that.data["choice1"]["data"][1]);
		//console.log(that.data)
		that.showData();
		that.showTitle();
	},function(error){console.log("error:"+error)})
	
}


Choice.prototype.showData=function(){
	console.log(this.index)

	
}
Choice.prototype.showTitle=function(){
	//console.log(this.more());
	var str=`<h4>${this.tit}</h4><ul>`;
	for(var i=0;i<this.dataL;i++){
		str+=`
		
		<li><a href="#" >${this.data[i].title}</a>
							<i></i>
							
			`
	}
	str+=`</ul> `
	if(this.more()){str=str+`</ul> `+this.more()}
	this.title.innerHTML=str;

	this.titles=this.title.getElementsByTagName("ul")[0].children	;
	console.log(this.titles);
	this.event();
	this.acttitle();
}
Choice.prototype.event=function(){
	var that=this;
	
	console.log("event")
	for(let k=0;k<this.dataL;k++){
		this.titles[k].onmouseover=function(){
			that.index=k;
			console.log("aaaaaa");
			that.showData()
			that.acttitle();
		}
		this.lBtn.onclick=function(){
			console.log("index:"+that.index)
		that.index==0?that.index=that.dataL-1:that.index--;
			that.showData()
			that.showTitle();

		}
		this.rBtn.onclick=function(){
			that.index==that.dataL-1?(that.index=0):that.index++;
			that.showData()
			that.showTitle();
		}
		
	}
	
	
}

Choice.prototype.acttitle=function(){
	console.log("act")
	for(var i=0;i<this.dataL;i++){
		this.titles[i].className=""
	}
	this.titles[this.index].className="active"
	this.event();
}

//choice
var cho={
	
	ele:document.getElementsByClassName("choice")[0],
	url:"json/choice.json",
	tit:"达人甄选",
	content:document.getElementsByClassName("choice")[0].children[1],
	more:function(){
		return undefined
	},
	showD:function(){
		this.content.innerHTML=`
			<div class="left">
				<a href="#">
					<img src="${this.data[this.index].data[0]}" alt="">
				</a>
				<h4>
					<p>${this.data[this.index].h4}</p>
					<p>${this.data[this.index].h5}</p>
				</h4>
			</div>
			<ul>
				
				<li><a href="#"><img src="${this.data[this.index].data[1]}" alt=""></a></li>
				<li><a href="#"><img src="${this.data[this.index].data[2]}" alt=""></a></li>
				<li><a href="#"><img src="${this.data[this.index].data[3]}" alt=""></a></li>
				<li><a href="#"><img src="${this.data[this.index].data[4]}" alt=""></a></li>
			</ul>
			
		<div class="leftBtn"></div>
		<div class="rightBtn"></div>
		
		`
		this.lBtn=this.ele.getElementsByClassName("leftBtn")[0];
		this.rBtn=this.ele.getElementsByClassName("rightBtn")[0];
	}
}

 var order={
 	ele:document.getElementsByClassName("order")[0],
	content:document.getElementsByClassName("order")[0].children[1],
 	url:"json/order.json",
	tit:"排行榜",
	more:function(){
		return `<a class="more" href=#>查看更多>></a>`
	},
 	showD:function(){
		this.content.innerHTML=`
		<div class="left">
			<a href="#">
				<img src="${this.data[this.index].data[0]}" alt="">
			</a>
			<h4>
				<p>${this.data[this.index].h4}</p>
				<p>${this.data[this.index].h5}</p>
			</h4>
		</div>
		<div class="left0">
			<a href="#">
				<img src="${this.data[this.index].data[1]}" alt="">
			</a>
		</div>
		<ul>
			
			<li><a href="#"><img src="${this.data[this.index].data[2]}" alt=""></a></li>
			<li><a href="#"><img src="${this.data[this.index].data[3]}" alt=""></a></li>
			<li><a href="#"><img src="${this.data[this.index].data[4]}" alt=""></a></li>
			<li><a href="#"><img src="${this.data[this.index].data[5]}" alt=""></a></li>
		
		</ul>
		
		<div class="leftBtn"></div>
		<div class="rightBtn"></div>
		`
		this.lBtn=this.ele.getElementsByClassName("leftBtn")[0];
		this.rBtn=this.ele.getElementsByClassName("rightBtn")[0];
	}
 }
 var brand={
 ele:document.getElementsByClassName("brand")[0],
 content:document.getElementsByClassName("brand")[0].children[1],
 url:"json/brand.json",
 tit:"品牌馆",
 more:function(){
 	return `<a class="more" href=#>查看更多>></a>`
 },
 showD:function(){
 	this.content.innerHTML=`
 <ul class="big">
 	
 	<li><a href="#"><img src="${this.data[this.index].data[0]}" alt=""></a>
 	<div class="hideImg">
 		<a href="#"><img src="${this.data[this.index].datah[0]}"></a>
 	</div>
 	</li>
 	<li><a href="#"><img src="${this.data[this.index].data[1]}" alt=""></a>
 	<div class="hideImg">
 		<a href="#"><img src="${this.data[this.index].datah[1]}"></a>
 	</div>
 	</li>
	<li><a href="#"><img src="${this.data[this.index].data[2]}" alt=""></a>
	<div class="hideImg">
		<a href="#"><img src="${this.data[this.index].datah[2]}"></a>
	</div>
	</li>
	<li><a href="#"><img src="${this.data[this.index].data[3]}" alt=""></a>
	<div class="hideImg">
		<a href="#"><img src="${this.data[this.index].datah[3]}"></a>
	</div>
	</li><div class="leftBtn"></div>
 <div class="rightBtn"></div>
 </ul>
 
 <ul class="small">
 	
 	<li><a href="#"><img src="${this.data[this.index].dataS[0]}" alt=""></a>
	<a href="#" class="sHide">${this.data[this.index].dataSt[0]}</a>
	</li>
 	<li><a href="#"><img src="${this.data[this.index].dataS[1]}" alt=""></a>
 	<a href="#" class="sHide">${this.data[this.index].dataSt[0]}</a>
 	</li>
	<li><a href="#"><img src="${this.data[this.index].dataS[2]}" alt=""></a>
	<a href="#" class="sHide">${this.data[this.index].dataSt[2]}</a>
	</li>
	<li><a href="#"><img src="${this.data[this.index].dataS[3]}" alt=""></a>
	<a href="#" class="sHide">${this.data[this.index].dataSt[3]}</a>
	</li>
	<li><a href="#"><img src="${this.data[this.index].dataS[4]}" alt=""></a>
	<a href="#" class="sHide">${this.data[this.index].dataSt[4]}</a>
	</li>
	<li><a href="#"><img src="${this.data[this.index].dataS[5]}" alt=""></a>
	<a href="#" class="sHide">${this.data[this.index].dataSt[5]}</a>
	</li>
 </ul>
 	
 
 	`
 	this.lBtn=this.ele.getElementsByClassName("leftBtn")[0];
 	this.rBtn=this.ele.getElementsByClassName("rightBtn")[0];
 }
 }
new Choice(cho); 
new Choice(order);
new Choice(brand)