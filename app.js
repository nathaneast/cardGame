const contents = document.querySelector(".contents");
const contentsList = contents.querySelectorAll("div");
const startBtn = document.querySelector(".startBtn");
const life = document.querySelector(".life");
const clearCount = document.querySelector(".clearCount");
const statusMessage = document.querySelector(".statusMessage");

const KeyStorage = {};
let beforeKey;
let realLife = 3;
let realClearCount = 0;

function endGame(endStatus) {
    const endPromise = new Promise(resolve => {
        setTimeout(() => {
            if (endStatus) {
                alert("GAME CLEAR");

            } else {
                alert("GAME OVER");
                keyStorEvtHandler(false);
                beforeKey = null;
            }
            resolve();
        }, 1);
    });

    endPromise.then(() => {
        realLife = 3;
        realClearCount = 0;
        life.innerText = `life: ${realLife}`;
        clearCount.innerText = `Clear: ${realClearCount}`;
        statusMessage.innerText = "시작 버튼을 누르세요 ! ";

        startBtn.addEventListener("click", startGame);
        viewImgDefault(false);
    });
}

function matchingImg(target) {
    let currentKey;
    let targetIndex;

    for (let i = 0; i < contentsList.length; i++) {
        if (contentsList[i].firstChild === target) {
            targetIndex = i;
            currentKey = KeyStorage[i];
            break;
        }
    }

    if (beforeKey) {
        if (currentKey === beforeKey[1]) {
            realClearCount++;
            statusMessage.innerText = "정답 입니다 !";

            clearCount.innerText = `Clear: ${realClearCount}`;

            target.src = `img/${currentKey}.png`;
            target.classList.remove("haveImgEvt");

            delete KeyStorage[beforeKey[0]];
            delete KeyStorage[targetIndex];

            beforeKey = null;

            if (realClearCount === contentsList.length / 2) {
                console.log("game clear");
                endGame(true);
            }
        } else {
            realLife--;
            statusMessage.innerText = "틀렸습니다 ! -1";
            life.innerText = `life: ${realLife}`;
            console.log(target);
            target.src = `img/${currentKey}.png`;
            keyStorEvtHandler(false);

            if (!realLife) {
                console.log("game over");
                endGame(false);
                return;
            }

            setTimeout(() => {
                keyStorEvtHandler(true);

                target.src = `img/${0}.png`;
                contentsList[beforeKey[0]].firstChild.src = `img/${0}.png`;
                beforeKey = null;
                statusMessage.innerText = "똑같은 카드를 고르세요 !";

            }, 1000);

        }
    } else {
        statusMessage.innerText = "똑같은 카드를 고르세요 !";

        beforeKey = [targetIndex, currentKey];
        target.src = `img/${currentKey}.png`;
        target.classList.remove("haveImgEvt");
    }
}

function keyStorEvtHandler(hasStatus) {
    if (hasStatus) {
        Object.keys(KeyStorage).forEach(div => {
            contentsList[div].firstChild.classList.add("haveImgEvt");
        });
    } else {
        Object.keys(KeyStorage).forEach(div => {
            contentsList[div].firstChild.classList.remove("haveImgEvt");
        });
    }
}

function addEventImg() {
    contentsList.forEach( item => {
        item.firstChild.classList.add("haveImgEvt");
    });

    contents.addEventListener("click", function(e) {
        const target = e.target

        if (target.tagName === "IMG" && target.classList.contains("haveImgEvt")){
            matchingImg(target);
        }
    });
}

function viewImgDefault(hasStart) {
    if (hasStart) {
        return new Promise(resolve => {
            setTimeout(() => {
                statusMessage.innerText = "게임 시작 !";
                contentsList.forEach(div => {
                    div.firstChild.src = "img/0.png";
                });
                resolve();
            }, 3000);
        });
    } else {
        contentsList.forEach(div => {
            div.firstChild.src = "img/0.png";
        });
    }
}

function viewEveryImg(ranNum) {
    statusMessage.innerText = "3초만 보여집니다 !";
    ranNum.forEach( (item, index) => {
        contentsList[index].firstChild.src = `img/${item}.png`;
    });
}

function pushKeyStorage(ranNum) {
    ranNum.forEach( (item, index) => {
        KeyStorage[index] = item;
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
        const randomNum = Math.floor(Math.random() * 6) + 1;

        if (numUse[randomNum] < 2) {
            numUse[randomNum] += 1;
            numArr.push(randomNum);
            count++;
        }

        if (count === 12) {
            hasCountinue = false;
        }
    }

    return numArr;
}

function startGame() {
    const randomNumArr = selectRandomNum();
    startBtn.removeEventListener("click", startGame);
    
    life.innerText = `life: ${realLife}`;
    clearCount.innerText = `Clear: ${realClearCount}`;

    viewEveryImg(randomNumArr);
    pushKeyStorage(randomNumArr);
    viewImgDefault(true)
    .then(() =>{
        addEventImg();
    });
}

function init() {
    startBtn.addEventListener("click", startGame);
}
init();
