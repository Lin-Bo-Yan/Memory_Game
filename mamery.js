let card = document.getElementsByClassName('card')
let cards = [...card]
var myCards = document.getElementById('myCards')
var openCards = [];
var hour = 0, minute = 0, second = 0;
// let timer = 60000
var timeFlag
let moves = 0;

// <span class="moves">0</span> Move(s)
// 印出class="moves"的全部東西
let counter = document.querySelector(".moves");

//HTMLCollection []
//印出 matched陣列
let matchedCard = document.getElementsByClassName("matched");

console.log(counter)


function shuffle(shu) {
    var currentIndex = shu.length;
    while (currentIndex !== 0) {
        var randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        var temporaryValue = shu[currentIndex];
        shu[currentIndex] = shu[randomIndex];
        shu[randomIndex] = temporaryValue;
        console.log(shu)
    }
    return shu;
}

// console.log(shuffle(shu))


//開始點
document.body.onload = startGame();

function startGame() {
    // 清空openCards數組
    openedCards = [];
    // 洗牌 myCards ，shuffle() 亂數排序演算法
    cards = shuffle(cards);
    // 從每張卡中刪除所有現有的類 總共 16 個
    for (var i = 0; i < cards.length; i++) {
        myCards.innerHTML = "";
        // Array.prototype.forEach.call()縮寫，透過[]去訪問陣列的屬性
        //把 cards 洗牌完之後 用陣列尋訪myCards 再一張一張appendChild()搬移進去 (顯示出來)
        [].forEach.call(cards, function (temp) {
            myCards.appendChild(temp)
        });
        cards[i].classList.remove("show", "open", "matched", "unmatched", "disabled");
    }
    //reset timer
    hour = 0, minute = 0, second = 0;
    clearInterval(timeFlag);
    document.getElementById('timer').innerText = `${hour} 時 ${minute} 分 ${second} 秒`
    // reset moves
    moves = 0;
    counter.innerHTML = moves;
}

// cardOpen函數在每次單擊卡時都會運行
function openCard() {
    //在卡片陣列裡面放一個玩家開的"那張"卡片
    openCards.push(this)
    //當玩家打開第一張才計算步數
    var open = openCards.length
    //紀錄移動次數
    countMoves()
    //判定長度 2 的時候才進來，1有值所以不能當成判別對象
    if (open === 2) {
        //判斷陣列[0]裡面的值是否等於陣列[1]
        if (openCards[0].type === openCards[1].type) {
            //如果正確就到 
            matched()
        } else {
            //如果錯就到 
            unmatched()
        }
    }
}


function countMoves() {
    moves++;
    counter.innerHTML = moves;
    //start timer on first click
    if (moves == 1) {
        second = 0;
        minute = 0;
        hour = 0;
        startTimer();
    }
}


function startTimer() {

    timeFlag = setInterval(function () {
        second += 1
        document.getElementById('timer').innerText = `${hour} 時 ${minute} 分 ${second} 秒`
        if (second == 60) {
            second = 0
            minute += 1
            document.getElementById('timer').innerText = `${hour} 時 ${minute} 分 ${second} 秒`
        }
        if (minute == 60) {
            minute = 0
            hour += 1
            document.getElementById('timer').innerText = `${hour} 時 ${minute} 分 ${second} 秒`
        }
    }, 1000)
}
// setInterval(timeCounter,125)

// function timeCounter() {
//     if (timer < 0) {
//         clearInterval();
//     } else {
//         timer -= 125
//         document.getElementById('timer') = timer + "%"
//     }

// }


//用特效告訴玩家是matche還是unmatched
function matched() {
    openCards[0].classList.add('matched')
    openCards[1].classList.add('matched')
    openCards[0].classList.remove('open', 'show')//移除 open show 留下 disabled
    openCards[1].classList.remove('open', 'show')
    //清空陣列
    openCards = [];
    
}


function unmatched() {
    openCards[0].classList.add('unmatched')
    openCards[1].classList.add('unmatched')
    lock()
    //延遲 1 秒，再做移除的動作
    setTimeout(function () {
        openCards[0].classList.remove('open', 'show', 'unmatched')
        openCards[1].classList.remove('open', 'show', 'unmatched')
        openCards = [];
        enable()
    }, 1000)

}

//在點選的卡片上增加卡片監聽者、按鍵功能
for (var i = 0; i < cards.length; i++) {
    card = cards[i]
    card.addEventListener('click', disPlatCard)
    card.addEventListener('click', openCard)
    card.addEventListener("click", congratulations);
}
// 說明切換打開並顯示班級以顯示卡 第一種寫法
// var disPlatCard = function () {
//     this.classList.toggle('open')
//     this.classList.toggle('show')
//     this.classList.toggle('disabled')
// }


function disPlatCard() { //第二種寫法，在卡片上面放三種css特效
    this.classList.toggle('open')
    this.classList.toggle('show')
    this.classList.toggle('disabled')
}
//翻牌之後不能再點一次，防止卡片被點第二次
//尋找卡片上是不是有叫做'disabled'的東西，答案是true 就會被保留
function lock() {
    Array.prototype.filter.call(cards, function (card) {
        card.classList.add('disabled')
    })
}
//尋找卡片上是不是有叫做'disabled'的東西，答案是true 就會被移除
function enable() {
    Array.prototype.filter.call(cards, function (card) {
        card.classList.remove('disabled')
    })
}

//當全部配對完成，暫停時間
function congratulations() {
    if (matchedCard.length == 16) {
        clearInterval(timeFlag);
    };
}