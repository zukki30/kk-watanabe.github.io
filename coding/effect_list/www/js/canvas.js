(function() {
	var requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
	window.requestAnimationFrame = requestAnimationFrame;
})();

$(function () {
	elementSet();
	sphereDraw();
	// dustDraw();
	// window.requestAnimationFrame(dustMove);
	// $(window).resize(function() {
	// 	sphereDraw();
	// 	for(var i=0; i<dustNum; i++){
	// 		boxReSet(i);
	// 	}
	// 	boxRange = boxStatus.length;
	// 	dustReDraw();
	// });
});

//振幅
var swing = 0.1;
//数
var dustNum =100;
var dustMaxSize=2;
var dustMinSize=1;
//要素の各属性設定
var boxStatus = [];
for(var i=0; i<dustNum; i++){
	boxStatus[i] = [];
	boxSet(i);
}
var boxRange = boxStatus.length;

function boxSet(i){
	boxStatus[i].color = '#fff';
	boxStatus[i].speed = randomNum(dustMinSize,dustMaxSize);
	boxStatus[i].directive = Math.floor(randomNum(-1, 1));
	boxStatus[i].size = boxStatus[i].speed;
	boxStatus[i].angle = 0;
	boxStatus[i].angleX = 0.25;
	boxReSet(i);
}
function boxReSet(i){
	var cW = window.innerWidth,cH = window.innerHeight;
	boxStatus[i].position = {
		x: randomNum(0,cW+cW/10*2)-cW/10,
		y: randomNum(0,cH+cH/10)
	}
}

function boxReSet2(i){
	var cW = window.innerWidth,cH = window.innerHeight;
	boxStatus[i].position = {
		x: randomNum(0,cW+cW/10*2)-cW/10,
		y: randomNum(cH,cH+cH/10)
	}
}

var sphere;
var liner;
function elementSet() {
	// bodyを親とするノード内で、新しくcanvasとdivを作る
	var bodyNode = document.getElementsByTagName('body').item(0);
	var containerNode = document.getElementById('container');
	var newCanvas = document.createElement('canvas');
	var newDiv = document.createElement('div');
	// 新しく作ったdivのidの指定
	newCanvas.id = 'canvasBg';
	newDiv.id = 'wrapper';
	// 新しく作ったdivの中にcanvasを入れる
	newDiv.appendChild(newCanvas);
	// 新しく作ったdivを#containerの前に挿入する
	bodyNode.insertBefore(newDiv, containerNode);
	var targetCanvas=document.getElementById('canvasBg');
	// canvasへの描画
	sphere = targetCanvas.getContext('2d');

	newDiv = document.createElement('div');
	// 新しく作ったdivのidの指定
	newDiv.id = 'wrapper2';
	// 新しく作ったdivを#containerの前に挿入する
	bodyNode.insertBefore(newDiv, containerNode);

	newCanvas = document.createElement('canvas');
	newDiv = document.createElement('div');

	// 新しく作ったdivのidの指定
	newCanvas.id = 'canvasBg3';
	newDiv.id = 'wrapper3';
	// 新しく作ったdivの中にcanvasを入れる
	newDiv.appendChild(newCanvas);
	// 新しく作ったdivを#containerの前に挿入する
	bodyNode.insertBefore(newDiv, containerNode);
	targetCanvas=document.getElementById('canvasBg3');
	// canvasへの描画
	liner = targetCanvas.getContext('2d');
};

function sphereDraw() {
	// canvasのサイズを新しいdivからもらう
	//$('#canvasBg').attr({width:$('#wrapper').width()});
	//$('#canvasBg').attr({height:$('#wrapper').height()});
	$('#canvasBg').attr({width: window.innerWidth});
	$('#canvasBg').attr({height: window.innerHeight});
	var cW = window.innerWidth, //canvasの幅
	cH = window.innerHeight; //canvasの高さ

	// ランダムなカラーの円を複数描く
	var a = 0 - cW;
	var b = 0 - cH;
	var spR = Math.sqrt(Math.pow(a,2) + Math.pow(b,2))/4;
	var startA=0;
	var endA=Math.PI*2;
	var spNum=16;

	var parentNode = document.getElementById('canvasBg');

	sphere.globalCompositeOperation = 'lighter';
	sphere.beginPath();
	sphere.clearRect(-cW/20,-cH/20,cW+cW/20,cH+cH/20);
	for (i=0; i<spNum; i++){
		var spX = Math.round(Math.random()*cW),
		spY = Math.round(Math.random()*cH),
		r = Math.round(Math.random()*255),
		g = Math.round(Math.random()*255),
		b = Math.round(Math.random()*255);

		console.log(spX, spY, r, g, b)

		sphere.beginPath();
		var grad=sphere.createRadialGradient(spX,spY,0,spX,spY,spR);
		grad.addColorStop(0,'rgba('+r+','+g+','+b+',0.75)');
		grad.addColorStop(1,'rgba('+r+','+g+','+b+',0)');
		sphere.fillStyle = grad;
		sphere.arc(spX, spY, spR, startA, endA, false);
		sphere.fill();
	}

	cW = null;
	cH = null;
	a = null;
	b = null;
	spR = null;
	startA = null;
	endA = null;
	spNum = null;
	parentNode = null;
	spX = null;
	spY = null;
	grad = null;
};

function dustDraw() {
	//矩形の描画
	var containerNode = document.getElementById('wrapper2');
	var newCanvas;
	var targetCanvas;
	var duster;
	var size;
	for(var i=0; i<dustNum; i++){
		newCanvas = document.createElement('canvas');
		// 新しく作ったdivのidの指定
		newCanvas.id = 'canDust'+i;
		// 新しく作ったdivの中にcanvasを入れる
		containerNode.appendChild(newCanvas);
		newCanvas.style.position = 'absolute';
		targetCanvas=document.getElementById('canDust'+i);
		size=Math.ceil(boxStatus[i].size*2);
		$('#'+targetCanvas.id).attr('width', size);
		$('#'+targetCanvas.id).attr('height', size);
		// canvasへの描画
		duster = targetCanvas.getContext('2d');
		duster.globalCompositeOperation = 'lighter';
		duster.beginPath();
		duster.fillStyle = boxStatus[i].color;
		duster.arc(boxStatus[i].size,boxStatus[i].size,boxStatus[i].size,0, Math.PI * 2, false);
		duster.fill();

	}
	dustReDraw();

	containerNode = null;
	newCanvas = null;
	targetCanvas = null;
	duster = null;
	size = null;
};

function dustReDraw() {
	var targetCanvas;
	for(var i=0; i<dustNum; i++){
		targetCanvas=document.getElementById('canDust'+i);
		targetCanvas.style.left = boxStatus[i].position.x+'px';
		targetCanvas.style.top  = boxStatus[i].position.y+'px';
	}

	targetCanvas=null;
};

function dustMove() {
	var cW = window.innerWidth, //canvasの幅
	cH = window.innerHeight; //canvasの高さ
	var targetCanvas;

	for(var i=0; i<dustNum; i++){
		targetCanvas=document.getElementById('canDust'+i);
		//canvas外に出た矩形を再配置
		if(boxStatus[i].position.y < -cH/10){
			boxReSet2(i);
		}

		//矩形の移動
		boxStatus[i].position.y = boxStatus[i].position.y - boxStatus[i].speed;
		boxStatus[i].position.x = boxStatus[i].position.x + Math.sin(boxStatus[i].angle) *swing*boxStatus[i].directive;
		boxStatus[i].angle += boxStatus[i].angleX;
		targetCanvas.style.left = boxStatus[i].position.x+'px';
		targetCanvas.style.top  = boxStatus[i].position.y+'px';
	}
	dustLineDraw();

	window.requestAnimationFrame(dustMove);

	cW = null;
	cH = null;
	targetCanvas=null;
	i=null;
}

function dustLineDraw() {
	// canvasのサイズを新しいdivからもらう
	//$('#canvasBg3').attr({width:$('#wrapper3').width()});
	//$('#canvasBg3').attr({height:$('#wrapper3').height()});
	$('#canvasBg3').attr({width:window.innerWidth});
	$('#canvasBg3').attr({height:window.innerHeight});
	var dX1;
	var dX2;
	var dY1;
	var dY2;
	var dis1;
	var dis2;
	var a;
	var b;
	var disA;
	var disB;
	var alpD;

	var cW = window.innerWidth, //canvasの幅
	cH = window.innerHeight; //canvasの高さ
	//矩形の描画
	liner.globalCompositeOperation = 'lighter';
	liner.beginPath();
	liner.clearRect(-cW/10,-cH/10,cW+cW/10,cH+cH/10);
	for(var i=0; i<dustNum; i++){
		for(var j=0; j<dustNum; j++){
			dX1=boxStatus[i].position.x;
			dX2=boxStatus[j].position.x;
			dY1=boxStatus[i].position.y;
			dY2=boxStatus[j].position.y;
			dis1=boxStatus[i].size/2;
			dis2=boxStatus[j].size/2;
			a = 0 - cW;
			b = 0 - cH;
			disA = Math.sqrt(Math.pow(a,2) + Math.pow(b,2))/10;

			a = dX1 - dX2;
			b = dY1 - dY2;
			disB = Math.sqrt(Math.pow(a,2) + Math.pow(b,2));
			if(disA>=disB){
				alpD=1-(disB/disA);
				liner.beginPath();
				liner.lineWidth=0.5;
				liner.strokeStyle = 'rgba('+255+','+255+','+255+','+alpD+')'
				liner.moveTo(dX1+dis1,dY1+dis1);
				liner.lineTo(dX2+dis2,dY2+dis2);
				liner.stroke();
			}
		}
	}
	cW = null;
	cH = null;
	i=null;
	j=null;
	dX1=null;
	dX2=null;
	dY1=null;
	dY2=null;
	dis1=null;
	dis2=null;
	a=null;
	b=null;
	disA=null;
	disB=null;
	alpD=null;
};


//ランダム関数
function randomNum (minNum,maxNum) {
	if(minNum){
		var randomNum = (Math.random()*(maxNum-minNum+1))+minNum;
		return randomNum;
	}else{
		var randomNum = (Math.random()*maxNum) + 1;
		return randomNum;
	}
}
