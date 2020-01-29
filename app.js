const contents = document.querySelector(".contents");
const contentsList = contents.querySelectorAll("div");
const startBtn = document.querySelector(".startBtn");
const realLife = document.querySelector(".realLife");
const realMessage = document.querySelector(".realMessage");


function viewEveryImg(randomNumArr) {
    randomNumArr.forEach( (num, index) => {
        console.log(contentsList[index]);
        contentsList[index].firstChild.src = `img/${num}.png`;
        // 돔요소 차례대로 넣어주기
    });
}

function selectRandomNum() {
    let count = 0;
    let hasCountinue = true;
    const numArr = [];
    const numUse = {
        1: 0,
        2: 0,
        3: 0,
        4: 0,
        5: 0,
        6: 0
    }

    while (hasCountinue) {
        const n = Math.floor(Math.random() * 6) + 1;

        if (numUse[n] < 2) {
            numUse[n] += 1;
            numArr.push(n);
            count++;
        }

        if (count === 12) {
            hasCountinue = false;
        }
    }

    return numArr;
}

function startGame() {
    startBtn.removeEventListener("click", startGame);
    const randomNumArr = selectRandomNum();
    viewEveryImg(randomNumArr);

    for (let i = 1; i <= 3; i++) {
        setTimeout(() => {
            console.log(i + "초");
        }, i * 1000);
    }
    
}

function init() {
    startBtn.addEventListener("click", startGame);
}
init();

// const c = contentsList[0].firstChild.src = "img/2.png";
// console.log(c);