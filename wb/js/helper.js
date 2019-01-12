//打印九九乘法表
function printMultiplicationTable(){
	for(var i=1; i<=9; i++){
		document.write("<p>");
		for(var j=1; j<=i; j++){
			document.write(i+"x"+j+"="+i*j + "&nbsp;&nbsp;&nbsp;");
		}
		document.write("</p>");
	}
}

//获取指定的数字，的某一位上的数字
function getSingleNumber(num, n){
	//(num/1)%10
	//(num/10)%10
	//(num/100)%10
	//num除以10的n-1次方对10求余
	return parseInt(num / Math.pow(10, n-1))%10; 
	
}

//获取制定范围的质数
function getPrimeNumber(start, end){
	//求1~100之间的素数
	for(var i=start; i<=end; i++){
		var flag = true;  //假定这个数字是素数
		//遍历从2到i-1，如果找到了任意数字，能整除
		for(var j=2; j<i; j++){
			//如果可以整除，表示它不是素数
			if(i%j == 0){
				flag = false; //改为不是
				break; //循环终止
			}
		}
		//如果是，则打印
		if(flag){
			console.log(i);
		}
	}
}

//将日期对象转换为字符串
function date2string(d, time){
	var str = d.getFullYear()+"/"+(d.getMonth()+1)+"/"+d.getDate();
	if(time){
		str += " "+d.getHours()+":"+d.getMinutes()+":"+d.getSeconds();
	}
	return str;
}

//比较两个日期大小
function compare(d1, d2){
	//console.log(d1);
	var cha = d1.getTime() - d2.getTime();
	/*
	if(cha>0) {
		cha = 1;
	} else if(cha <0) {
		cha = -1;
	}
	*/
	return cha > 0 ? 1 : (cha < 0 ? -1 : cha);
	
	//如果等于0，表示两个日期对象是一样的
	//如果大于0，d1大于d2
	//如果小于0，d1小于d2
}

//计算两个日期的差值
function between(d1, d2){
	var dis = d1.getTime() - d2.getTime();
	return Math.round( Math.abs(dis/1000/3600/24) );
}


//计算N天以后是什么日期
function getDateByAfterDays(n){
	var now = new Date();
	now.setDate( now.getDate()+n );
	return date2string(now);
}

//获得指定范围的随机数：  25~80
function randomInt(min, max){
	return Math.round( Math.random()*(max-min) + min);
}

//获取随机颜色的函数
function randomColor(num){
	if(num==16){
		var r = randomInt(0,255).toString(16);
		var g = randomInt(0,255).toString(16);
		var b = randomInt(0,255).toString(16);
		r = r.length<2?"0"+r:r;
		g = g.length<2?"0"+g:g;
		b = b.length<2?"0"+b:b;
		return "#"+ r + g + b;
	}
	return "rgb("+randomInt(0,255)+","+randomInt(0,255)+","+randomInt(0,255)+")";
}

function setCookie(key, value, days){
	var now = new Date();
	now.setDate( now.getDate()+days );
	document.cookie = key+"="+value+"; expires="+now;
}

function getCookie(key){
	var str = document.cookie;
	var arr = str.split("; ");
	for(var i in arr){
		var kv = arr[i].split("=");   // username=zhangsan
		if(kv[0]==key) {
			return kv[1];
		}
	}
	return null;
}

function getPageXY(ele){
	if(!ele) {
		return {
			x : 0,
			y : 0
		};
	}
	return {
		x : ele.offsetLeft + getPageXY(ele.offsetParent).x,
		y : ele.offsetTop + getPageXY(ele.offsetParent).y
	}
}


function getPageX(ele){
	if(!ele) return 0;
	return ele.offsetLeft + getPageX(ele.offsetParent);
}

function getPageY(ele){
	if(!ele) return 0;
	return ele.offsetTop + getPageY(ele.offsetParent);
}



 function setCookie(name,obj,time){
	 
	
	var d=new Date();
	d.setDate(d.getDate()+time);
	document.cookie=name+"="+obj+"; expires="+d;
	 
 	
 }
 function getCookie(name){
	
 	var datas=document.cookie;

	var arr=datas.split("; ")

	for(var i in arr){
		var k=arr[i].split("=")
		if(k[0]==name) return k[1]
	}
	return null
 }