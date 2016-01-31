# 2048
a code learn

mainphone.js
prepareForMobile();
这个方法为了适应pc端与移动端 通过window.screen对象中的availWidth属性获得可用宽度，利用获取到的可用宽度来设置盒子的宽高，内边距等；

newgame();
这个方法中包含init()方法与generateOneNumber()方法，newgame()是一个用来初始化游戏的方法，这个方法可以在所有代码加载完成后触发或者在点击newgame按钮触发;

init();
这是一个为游戏进行初始化的方法，这个方法主要负责获取每个小格子并确定位置。并且负责生成初始化的二维数组，初始值为0，这个方法包含一个updateBoardView()方法;

updateBoardView();
这个方法是用来确定每个格子的数值的并且设定每个格子不同数值的不同状态，更新每个格子的最新状态;

generateOneNumber();
这是生成随机位置随机数字的方法，每当游戏有一次滑动，符合条件的情况下就会触发这个方法。

moveLeft();
包含canMoveLeft()与noBlockHorizontal();
这是向左移动的方法，当格子要向左移动时，需要满足以下条件:左边的格子是空的或者左边的格子数值与当前要移动的格子数值相同,满足这两个条件其中之一就可以向左移动。

moveRight/Up/Down...


-------------------------我是分割线-------------------------------------------------------------------------------

supportphone.js
这个文件主要负责获取一些必要的数据并支持mainphone.js的运行;

getPosTop();
这个方法负责计算每个小格子相应的纵坐标值并返回;

getPosLeft();
这个方法负责计算每个小格子的横坐标值并返回;

nospace();
这个方法负责检测是否还有空闲的格子 有空闲格子返回false,否则返回true;

canMoveLeft();
这个方法负责检测要向左移动的格子的左边是否有符合条件的格子 如果有返回true 没有返回false;

canMoveRight()..
canMoveTop()...
canMoveDown()...

noBlockHorizontal();
这个方法负责检测水平方向上是否有阻挡，如果有返回false; 没有返回true;
noBlockVertical();...

nomove();
这个方法负责检测是否还可以移动；不可以返回false; 可以返回true;

updateScore();
这个方法负责更新分数;
