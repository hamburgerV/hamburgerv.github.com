//随机数 rnd
function rnd(m,n){
	return parseInt(Math.random()*(m-n)+n);
}
//补零 todou
function todou(n){
	return n<10? '0'+n : ''+n;
}
//找重 findInArr
function findInArr(n,arr){
	for(var i = 0; i<arr.length; i++){
		if(n == arr[i]){
			return true;
		}
	}
	return false;
}
//求和 sum
function sum(){
	var res = 0;
	for(var i = 0; i<arguments.length; i++){
		res+=arguments[i];
	}
	return res;
}
//通过className获取元素 getByClass
function getByClass(obj,oClass){
	if(obj.getElementsByClassName){
		return obj.getElementsByClassName(oClass);
	}else{
		var aEle = obj.getElementsByTagName('*');
		var arr = [];
		for(var i = star; i<aEle.length; i++){
			var tmp = aEle[i].className.split(' ');
			if(findInArr(oClass,tmp)){
				arr.push(aEle[i]);
			}
		}
		return arr;
	}
}
//模拟sort排序小到大 findInMin
function findInMin(arr,star){
	var iMin = arr[star];
	var iMinIndex = star;
	for(var i = star; i<arr.length; i++){
		if(iMin>arr[i]){
			iMin = arr[i]
			iMinIndex = i
		}
	}
	return iMinIndex;
}
//json2str 
function json2str(json){
	var arr = [];
	for(var name in json){
		arr.push(name +'='+json[name]);
	}
	return arr.join('&');
}
//str2json ? 未验证
function str2json(str){
	var arr = str.split('&');
	var json = {}
	for(var i = 0; i<arr.length; i++){
		var arr1 = arr[i].split('=');
		json[arr1[0]] = arr1[1]
	}
	return json;
}
//绝对距离 getPos
function getPos(obj){
	var l = 0;
	var t = 0;
	while(obj){
		l+= obj.offsetLeft;
		t+= obj.offsetTop;
		obj = obj.offsetParent;
	}
	return {"left":l,"top":t}
}
//获取非行间样式 getStyle
function getStyle(obj,name){
	if(obj.currentStyle){
		return obj.currentStyle[name];
	}else{
		return getComputedStyle(obj,false)[name];
	}
}
//事件绑定 addEvent
function addEvent(obj,sEv,fn){
	if(obj.addEventListener){
		obj.addEventListener(sEv,fn,false);
	}else{
		obj.attachEvent('on'+sEv,fn);
	}
}
//事件绑定解除 removeEvent
function removeEvent(obj,sEv,fn){
	if(obj.removeEventListener){
		obj.removeEventListener(sEv,fn,false)
	}else{
		obj.detachEvent('on'+sEv,fn)
	}
}
//加载事件  DOMReady
function DOMReady(fn){
	if(document.addEventListener){
		document.addEventListener('DOMContentLoaded',function(){
			fn && fn()
		},false)
	}else{
		document.attachEvent('onreadystatechange',function(){
			if(document.readyState == 'complete'){
				fn && fn();
			}
		});
	}
}
//滚轮事件 addWheel
function addWheel(obj,fn){
	function wheel(ev){
		var oEvent = ev || event;
		var bDown = true;
		bDown = oEvent.wheelDelta? oEvent.wheelDelta>0 : oEvent.detail<0;
		fn && fn(bDown);
		oEvent.preventDefault && oEvent.preventDefault();
		return false;
	}
	if(window.navigator.userAgent.toLowerCase().indexOf('firefox') != -1){
		obj.addEventListener('DOMMouseScroll',wheel,false);
	}else{
		addEvent(obj,'mousewheel',wheel)
	}
}
//运动框架 move
function move(obj,json,complete){
	clearInterval(obj.timer);
	complete = complete || {};
	complete.time = complete.time || 1000;
	complete.easeing = complete.easeing ||'linear';
	var star = {};
	var dis = {};
	for(var name in json){
		star[name] = parseFloat(getStyle(obj,name));
		dis[name] = json[name] - star[name];
	}
	var count = parseInt(complete.time/30);
	var n = 0;
	obj.timer = setInterval(function(){
		n++;
		for(var name in json){
			switch(complete.easeing){
				case 'linear':
					var a = n/count;
					var cur = star[name] + dis[name]*a;
				break;
				case 'ease-in':
					var a = n/count;
					var cur = star[name] + dis[name]*a*a;
				break;
				case 'ease-out':
					var a = 1 - n/count;
					var cur = star[name] + dis[name]*(1-a*a);
				break;
			}
			if(name == 'opacity'){
				obj.style.opacity = cur;
				obj.style.filter = 'alpha(opacity:'+cur*100+')';
			}else{
				obj.style[name] = cur +'px';
			}
		}
		if(n == count){
			clearInterval(obj.timer);
			complete.fn && complete.fn();
		}
	},30);
}



















