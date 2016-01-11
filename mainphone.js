var board = new Array();//格子
var score = 0;//初始化分数

var startx = 0;
var starty = 0;
var endx = 0;
var endy = 0;
var newgamebutton = document.getElementById('newgamebutton');
console.log(newgamebutton)
window.onload = function(){
	//调用移动端尺寸
	prepareForMobile();
	newgame();//加载完成开始新的游戏
};
//适配移动端
function prepareForMobile(){
	//判断屏幕宽度
	if(documentWidth > 500){
		gridContainerWidth = 500;
		cellSpace = 20;
		cellSideLenth = 100;
	}
	//设置大方格部分
	$('#grid-container').css('width',gridContainerWidth - 2*cellSpace);
	$('#grid-container').css('height',gridContainerWidth - 2*cellSpace);
	$('#grid-container').css('padding',cellSpace);
	$('#grid-container').css('border-radius',0.02*gridContainerWidth);

	//设置小方格部分
	$('.grid-cell').css('width',cellSideLenth);
	$('.grid-cell').css('height',cellSideLenth);
	$('.grid-cell').css('border-radius',0.02*cellSideLenth)
}

function newgame(){
	//初始化棋盘格
	init();//初始化函数获取所有的格子
	//在随机两个格子生成数字
	generateOneNumber();//随机找一个空闲格子生成一个数字
	generateOneNumber();
}

newgamebutton.onclick = function(){
	newgame();
}

function init(){
	//获取每个格子 并为其指定位置
	for(var i = 0; i < 4; i++){
		for(var j = 0; j < 4; j++){
			var gridCell = $('#grid-cell-'+i+'-'+j);
			gridCell.css('top',getPosTop(i,j));
			gridCell.css('left',getPosLeft(i,j));
		}
	}
	//创建二维数组
	for(var i = 0; i < 4; i++){
		//每个board[i]再次被声明成为一个数组
		board[i] = new Array();
		//初始化每个board的值 初始值为0
			for(var j = 0; j < 4; j++){
				board[i][j] = 0;
			}
	}
	updateBoardView();

	score = 0;
}

function updateBoardView(){
	//如果有了number-cell 删除
	$('.number-cell').remove();
	//根据board值添加新的number-cell
	//双循环遍历board元素
	for(var i = 0; i < 4; i++){
		for(var j = 0; j < 4; j++){
			//为grid-container添加相应的number-cell
			$('#grid-container').append('<div class="number-cell" id="number-cell-'+i+'-'+j+'"></div>');
			var theNumberCell = $('#number-cell-'+i+'-'+j);
			if(board[i][j] == 0){//board[i][j]为0时
				theNumberCell.css('width','0px');
				theNumberCell.css('height','0px');
				theNumberCell.css('top',getPosTop(i,j) + cellSideLenth/2);
				theNumberCell.css('left',getPosLeft(i,j) + cellSideLenth/2);

			}else{//board[i][j]不为0时 
				theNumberCell.css('width',cellSideLenth);
				theNumberCell.css('height',cellSideLenth);
				theNumberCell.css('top',getPosTop(i,j));
				theNumberCell.css('left',getPosLeft(i,j));
				theNumberCell.css('background-color',getNumberBackgroundColor(board[i][j]));
				theNumberCell.css('color',getNumberColor(board[i][j]));
				theNumberCell.text(board[i][j]);
			}
		}
	}
	$('.number-cell').css('line-height',cellSideLenth+'px');
	$('.number-cell').css('font-size',0.6*cellSideLenth+'px');
}

function generateOneNumber(){
	//nospace函数确定是否还有空闲格子 false为无
	if(nospace(board)){
		return false;
	}
	
	//随机一个位置
	var randx = parseInt(Math.floor(Math.random() * 4 ) );
	var randy = parseInt(Math.floor(Math.random() * 4 ) );
	while(true){
		if(board[randx][randy] == 0){
			break;
		}
		randx = parseInt(Math.floor(Math.random() * 4 ) );
		randy = parseInt(Math.floor(Math.random() * 4 ) );
	}
	//随机一个数字
	var randNumber = Math.random() < 0.5 ? 2 : 4;
	showNumberWithAnimation(randx,randy,randNumber);
	return true;
	
}

$(document).keydown(function(e){
	switch(e.keyCode){
		case 37://left
		console.log('ok')
			if(moveLeft()){
				console.log('ook')
				generateOneNumber();
				isgameover();
			}
			break;
		case 38://up
		e.preventDefault();
			if(moveUp()){
				generateOneNumber();
				isgameover();
			}
			break;
		case 39://rigth
		e.preventDefault();
			if(moveRight()){
				generateOneNumber();
				isgameover();
			}
			break;
		case 40://down
		e.preventDefault();
			if(moveDown()){
				generateOneNumber();
				isgameover();
			}
			break;
		default:break;
	}
})

function moveLeft(){

	if(!canMoveLeft(board)){
		console.log(1)
		return false;
	}

	for(var i = 0;i < 4; i++){
		for(var j = 1; j < 4; j++){
			if(board[i][j]!=0){
				//是不是board[i][j]可能的落脚点board[i][k]
				for(var k = 0; k < j; k++){
					if(board[i][k] == 0 && noBlockHori(i,k,j,board)){//某一行的某一个是空的并且之前/后没有阻挡（移动）
						console.log('当前b i j');
						showMoveAnimation(i,j,i,k);
						board[i][k] = board[i][j];
						board[i][j] = 0;
						continue;
					}else if(board[i][k] == board[i][j] && noBlockHori(i,k,j,board)){//某一行的某一个等于当前这行的当前的board并且没有阻挡(相加)
						showMoveAnimation(i,j,i,k);
						board[i][k] += board[i][j];
						board[i][j] = 0;
						//分数
						score += board[i][k];
						//更新分数
						updateScore(score);
						continue;
					}
				}
			}
		}
	}
	setTimeout('updateBoardView()',200);
	return true
}

function moveRight(){
	if(!canMoveRight(board)){
		return false;
	}

	for(var i = 0; i < 4;i++){
		for(var j = 1; j < 4 ; j++){
			//board有数字
			if(board[i][j]!=0){
				for(var k = 0; k < j;k++){
					if(board[i][k] == 0 && noBlockHori(i,k,j,board)){
						showMoveAnimation(i,j,i,k);
						board[i][k] = board[i][j];
						board[i][j] = 0;
						continue;
					}else if(board[i][k] == board[i][j] && noBlockHori(i,k,j,board)){
						showMoveAnimation(i,j,i,k);
						board[i][k] += board[i][j];
						board[i][j] = 0;
						score += board[i][k];
						updateScore();
						continue;
					}
				}
			}
		}
	}
	setTimeout('updateBoardView()',200);
	return true
}

	

document.addEventListener('touchstart',function(e){
	//e.touches 触摸时捕获的位置的数组 多个手指捕获多个信息 
	startx = e.touches[0].pageX;
	starty = e.touches[0].pageY;//触摸开始时的手指的位置
});
document.addEventListener('touchend',function(e){
	endx = e.changedTouches[0].pageX;
	endy = e.changedTouches[0].pageY;//触摸结束时手指的位置

	var deltax = endx - startx;
	var deltay = endy - starty;

	if(Math.abs(deltax)<0.3*documentWidth && Math.abs(deltay)<0.3*documentWidth){
		return;
	}

	if(Math.abs(deltax)>=Math.abs(deltay)){
		//x
		if(deltax>0){
			//右
			if(moveRight()){
				generateOneNumber();
				isgameover();
			}
		}else{
			//左
			if(moveLeft()){
				generateOneNumber();
				isgameover();
			}
		}
	}else{
		//y
		if(deltay>0){
			//下
			if(moveDown()){
				generateOneNumber();
				isgameover();
			}
		}else{
			//上
			if(moveUp ()){
				generateOneNumber();
				isgameover();
			}
		}
	}
});

document.addEventListener('touchmove',function(e){
	e.preventDefault;
})

function isgameover() {
	if(nospace(board) && nomove(board)){
		gameover();
	}
}

function gameover(){
	alert('gameover')
}

function updateScore(){
	$('#score').text(score);
}