class Card {
    constructor(name, rarity) {
        this.name = name;
        this.rarity = rarity;
    }
    
    toString() {
        return `${this.rarity} 稀有度的 ${this.name} 卡牌`;
    }
}

const commonCards = [
    new Card("+5mins", "R"),
    new Card("+10mins", "R"),
    new Card("+15mins", "R"),
];

const rareCards = [
    new Card("100", "SR"),
    new Card("50", "SR"),
];

const legendaryCards = [
    new Card("1000!!!!", "SSR"),
];

//機率
const probabilities = {
    common: 70,
    rare: 25,
    legendary: 5,
};

let remainingDraws = 0; // 設定初始可抽卡次數
let prizeList = []; // 儲存抽到的獎項


// 獲取　輸入框數值、顯示值數值文字、煙火容器、重置按鈕
const drawCount = document.getElementById("drawCount");
const displayValue = document.getElementById("displayValue");
const container = document.querySelector('.fireworks-container');
const resetButton = document.getElementById("resetList");
const InputSet = document.getElementById("InputSet");
const color = document.querySelector('.color');

//更新輸入框
function updateText() {
    const inputValue = drawCount.value; // 获取输入框的值
    displayValue.textContent = inputValue; // 将输入框的值更新到显示值的元素中
    remainingDraws = drawCount.value;
}

//抽獎
function drawCard() {
   
   
   
    if( drawCount.value == 0 || drawCount.value == "" || isNaN(drawCount.value)   ){
        alert("抽卡次數無效！");
        return;
    }
    //重置
    if(remainingDraws < 1  ){
        resetList(); 
        alert("你已用完所有抽卡次數！");
        return;      
    }
    // 隐藏 label 文字内容 , 輸入框
   
   InputSet.style.display = "none"; 

    remainingDraws--; // 減少剩餘抽卡次數

    const randomNum = Math.random(0,100) * 100;
    let drawnCard;
    //R .SR .SSR 機率
    if (randomNum < probabilities.common) {
        drawnCard = commonCards[Math.floor(Math.random() * commonCards.length)];
    } else if (randomNum < probabilities.common + probabilities.rare) {
        drawnCard = rareCards[Math.floor(Math.random() * rareCards.length)];
    } else {
        drawnCard = legendaryCards[Math.floor(Math.random() * legendaryCards.length)];
    }
    // 將抽到的卡牌添加到獎項列表
    prizeList.push(drawnCard);


    ///顯示結果
    const resultElement = document.getElementById("result");
    resultElement.innerHTML = `你抽到了一張卡牌：${drawnCard}`;

    // 更新剩餘抽卡次數
    const remainingDrawsElement = document.getElementById("remainingDraws");
    remainingDrawsElement.textContent = remainingDraws;

    // 更新List列表
    const prizeListElement = document.getElementById("prizes");
    prizeListElement.innerHTML = "";

    // 列表數字初始化1
    let counter = 1;
    for (const prize of prizeList) {        
        const li = document.createElement("li");
         // 使用counter显示数字，并在列表项中添加<span>元素
        li.innerHTML = `<span>${counter}.</span> ${prize.toString()}`;
       //li.textContent = prize.toString();
         // 将新的节点插入到列表的顶部
        if (prizeListElement.firstChild) {
            //指定節點之前插入
            prizeListElement.insertBefore(li, prizeListElement.firstChild);
        }else{
            prizeListElement.appendChild(li);
        }
        // 增加计数器以显示下一个数字
        counter++;
        
    }
    
   
}
//重置
function resetList(){
    // 显示输入框和抽奖按钮
    InputSet.style.display = "inline-block";
   

    drawCount.value = 0; // 重置輸入框的值
    displayValue.textContent = drawCount.value; 
    remainingDraws = drawCount.value;
    const remainingDrawsElement = document.getElementById("remainingDraws");
    remainingDrawsElement.textContent = remainingDraws;
    //結果顯示
    const resultElement = document.getElementById("result");
    resultElement.innerHTML = ``;
    //列表重置
    prizeList=[];
    const prizeListElement = document.getElementById("prizes");
    prizeListElement.innerHTML = "";
    // 增加计数器以显示下一个数字
    counter = 1;

}

function generateRandomCode() {
    var myRandomColor = '#'+Math.floor(Math.random()*16777215).toString(16);
     return myRandomColor;
  }

// 隨機生成煙花
function createFirework() {

    const firework = document.createElement('div');
    firework.classList.add('firework');

    // 生成随机大小，例如在 10px 到 50px 之间
    const size = Math.random() * (100 - 10) + 10;
    firework.style.width = size + 'px';
    firework.style.height = size + 'px';

    // 生成随机位置，但不超出窗口边界
    const maxX = window.innerWidth - size;
    const maxY = window.innerHeight - size;    
    const x = Math.random(1,100) * maxX;
    const y = Math.random(1,100) * maxY;
    firework.style.left = x + 'px';
    firework.style.top = y + 'px';
    firework.style.backgroundColor = generateRandomCode();
    // 将烟火添加到容器
    container.appendChild(firework);

    // 在烟火动画结束后移除烟火元素
    firework.addEventListener('animationend', () => {
        container.removeChild(firework);
    });
}

// 每隔一段時間創建煙花
setInterval(createFirework, 1000);
