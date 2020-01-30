const contents = document.querySelector(".contents");
const contentsList = contents.querySelectorAll("div");
const startBtn = document.querySelector(".startBtn");
const life = document.querySelector(".life");
const clearImgCount = document.querySelector(".clearImgCount");
const statusMessage = document.querySelector(".statusMessage");

const KeyStorage = {};
let beforeKey;
let realLife = 1;
let realClearCount = 0;

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
            clearImgCount.innerText = `Clear: ${realClearCount}`;

            target.src = `img/${currentKey}.png`;
            target.classList.remove("haveImgEvt");

            delete KeyStorage[beforeKey[0]];
            delete KeyStorage[targetIndex];

            beforeKey = null;

            if (realClearCount === contentsList.length / 2) {
                console.log("game clear");
            }
        } else {
            realLife--;
            life.innerText = `life: ${realLife}`;

            if (!realLife) {
                console.log("game over");
            }

            target.src = `img/${currentKey}.png`;
            // console.log(KeyStorage);
            Object.keys(KeyStorage).forEach(div => {
                contentsList[div].firstChild.classList.remove("haveImgEvt");
            });
            
            setTimeout(() => {
                Object.keys(KeyStorage).forEach(div => {
                    contentsList[div].firstChild.classList.add("haveImgEvt");
                });

                target.src = `img/${0}.png`;
                contentsList[beforeKey[0]].firstChild.src = `img/${0}.png`;

                beforeKey = null;
            }, 3000);



 


        }
    } else {
        beforeKey = [targetIndex, currentKey];
        target.src = `img/${currentKey}.png`;
        target.classList.remove("haveImgEvt");
    }


    // 처음누름 => 비포키에 인덱스 ,키 담기
    // 이미지변경, 이벤트 제거
    

    // 두번쨰누름 
    // 맞음
    // 클리어카운트 +
    // 클리어카운트 = 컨텐츠리스트 길이 같으면 => 게임클리어
    // 타겟키 저장소 키값으로 사진 바꾸고
    // 키저장소에서 비포키 인덱스값 키 , 타겟키 지우기
    // 비포키 null
    // 이벤트지우기
    
    //틀림
    // 리얼라이프 -1
    // 리얼라이프 0 => 게임오버
    // 타겟인덱스 => 키값 이미지로 바꾸기
    // 모든 이벤트제거
    // 1초후에 타겟키 모든이벤트 생성
    // 비포키 null
    // 타겟키, 비포키 0 화면ㅇ로 바꾸기

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

function viewImgDefault() {
    return new Promise( resolve => {
        setTimeout(() => {
            contentsList.forEach( item => {
                item.firstChild.src = `img/${0}.png`;
            });
            resolve();
        } ,1000);
    });
}

function viewEveryImg(ranNum) {
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
        2: 0
        // 3: 0,
        // 4: 0,
        // 5: 0,
        // 6: 0
    }

    while (hasCountinue) {
        const randomNum = Math.floor(Math.random() * 2) + 1;

        if (numUse[randomNum] < 2) {
            numUse[randomNum] += 1;
            numArr.push(randomNum);
            count++;
        }

        if (count === 4) {
            hasCountinue = false;
        }
    }

    return numArr;
}

function startGame() {
    const randomNumArr = selectRandomNum();
    startBtn.removeEventListener("click", startGame);
    
    // realLife = 1;
    // realClearCount = 0;
    life.innerText = `life: ${realLife}`;
    clearImgCount.innerText = `Clear: ${realClearCount}`;

    viewEveryImg(randomNumArr);
    pushKeyStorage(randomNumArr);
    viewImgDefault()
    .then(() =>{
        addEventImg();
    });
}

function init() {
    startBtn.addEventListener("click", startGame);
}
init();
