const contents = document.querySelector(".contents");
const contentsList = contents.querySelectorAll("div");
const startBtn = document.querySelector(".startBtn");
const realLife = document.querySelector(".realLife");
const realMessage = document.querySelector(".realMessage");

const imgKeyStorage = {};
let clearImgCount = 0;
let beforeImgKey;
let life = 1;

function endGame(hasEnding) {
    // debugger;
    if (hasEnding) {
        alert("GAME CLEAR !");
        // 모든 이벤트가 제거 됫을것
        // 이벤트 조작필요 X
    } else {
        alert("GMAE OVER");
        // console.log("GMAE OVER");
        imgEventRemove(Object.keys(imgKeyStorage));
        // 키에 있는 이벤트를만 모두 삭제
        // imgViewHandler();

    }
    startBtn.addEventListener("click", startGame);

    beforeImgKey = null;
    clearImgCount = 0;
    life = 1;

    // setTimeout( () => {
    //     imgViewHandler();
    // }, .5);

    // console.log(imgKeyStorage);
    // imgEveryEventRemove();
    // 초기값 셋팅  => 모든 사진0, 이벤트 제거
}


function matchingImg(event) {
    // debugger;

    console.log("이미지 크릭 이벤트 실행");
    let currentTargetIndex;

    for (let i = 0; i < contentsList.length; i++) {
        if (contentsList[i] === event.target.parentNode) {
            currentTargetIndex = i;
            break;
        }
    }

    if (beforeImgKey) {
        // 비포 이미지 키가 있다 => 선택된 카드 맞춰야하는 상태
        // debugger;

        console.log("이전 이미지 있다", beforeImgKey);

        if (imgKeyStorage[currentTargetIndex + 1] === beforeImgKey[1]) {
            clearImgCount++;

            //비포키 , 현재 누른 이미지 키 같으면
            contentsList[currentTargetIndex].firstChild.removeEventListener("click", matchingImg);
            // 현재 이미지의 이벤트 지움
            contentsList[currentTargetIndex].firstChild.src = `img/${imgKeyStorage[currentTargetIndex + 1]}.png`;
            //현재 키 화면에 보여주기
            delete imgKeyStorage[beforeImgKey[0]];
            delete imgKeyStorage[currentTargetIndex + 1];
            //맞췃으니 키삭제
            console.log("맞췃으니 키 삭제", imgKeyStorage);

            beforeImgKey = null;
            //비포 이미지 키 비우고
            console.log("두 값 같다", beforeImgKey, "맞춘숫자", clearImgCount);

            if (clearImgCount === 6) {
            console.log("6개 모두 맞춤", "맞춘숫자", clearImgCount);
                endGame(true);
                return;
            }

        } else {
            //이미지 있지만, 비포 키값과 다르다 => 못맞춤
            // debugger;
            life -= 1;
            realLife.innerText = life;
            // alert("테스트");
            
            // 비포키랑 현재누른 키랑 다른 상태
            // 코드 전 ,후 무엇을 비교해야 하는지
            
            console.log("현재누른 사진 인덱스, 저장소키값",currentTargetIndex, imgKeyStorage[currentTargetIndex + 1]);
            contentsList[currentTargetIndex].firstChild.src = `img/${imgKeyStorage[currentTargetIndex + 1]}.png`;
            //FIXME:  얼럿코드는 아래에 있는데 얼럿코드 이후에 이 코드가 실행됨 왜 ?
           
            
            // 현재 누른 사진 키 사진으로 바꾸고
            
            // 목숨이 0이되면 게임 끝내기
            if (!life) {
                // debugger;
                endGame(false);
                return;
            }
            
            imgEventRemove(Object.keys(imgKeyStorage));
            // 저장소 키값들 모두 이벤트 제거
            
            setTimeout(() => {
                //2초후 비포키, 선택이미지 모두 이벤트 추가, 
                // 이미지 0
                // 비포 이미지 비우고
                
                contentsList[beforeImgKey[0]].firstChild.src = `img/${0}.png`;
                contentsList[currentTargetIndex].firstChild.src = `img/${0}.png`;
                beforeImgKey = null;
                imgEventAdd(Object.keys(imgKeyStorage));
                // 저장소 키값들 이미지 추가

                // contentsList[beforeImgKey[0]].addEventListener("click", matchingImg);
                // contentsList[currentTargetIndex].addEventListener("click", matchingImg);
                
            }, 2000);
            
            // 게임끝
        }


    } else {
        // 이전 이미지가 없으면
        beforeImgKey = [currentTargetIndex, imgKeyStorage[currentTargetIndex + 1]];
        console.log("이전 이미지 없다 비포키 담김", beforeImgKey);
        //비포키에 키저장소의 현재 인덱스 키값 들어감 => 이미지생성 당시 이미지 번호 
        event.target.removeEventListener("click", matchingImg);
        // 처음 누른 사진 => 이벤트 제거
        event.target.src = `img/${imgKeyStorage[currentTargetIndex + 1]}.png`;
        //현재 누른사진 => 인덱스 이미지로 변경

    }
}

// function imgEveryEventRemove() {
//     contesntsList.forEach(item => {
//         item.firstChild.removeEventListener("click", matchingImg);
//     });
// }

function imgEventRemove(keyItems) {
    // debugger;
    keyItems.forEach(ele => {
        contentsList[ele - 1].firstChild.removeEventListener("click", matchingImg);
    });
}

function imgEventAdd(everyItem) {

    everyItem.forEach(ele => {
        contentsList[ele - 1].firstChild.addEventListener("click", matchingImg);
        //키 저장소의 키값 -1 0 ~11까지 클릭 이벤트 추가
    });
}

// 이미지 12개 보여주고, 3초후 내리기
// imgKeyStorage 객체에 각 노드 추가
// 해당 이미지 이벤트 추가

function imgViewHandler(randomNumArr) {

    //인자 받았을떄

    if (randomNumArr) {
        randomNumArr.forEach((key, index) => {
            contentsList[index].firstChild.src = `img/${key}.png`;
            // imgKeyStorage[index + 1] = createNode(key);
            imgKeyStorage[index + 1] = key;
        });
    } else {
        // 인자 없을때
        contentsList.forEach( ele => {
            ele.firstChild.src = `img/${0}.png`;
            // imgKeyStorage[index + 1] = createNode(key);
        });
    }
}



function initSeting() {

    for (let i = 1; i <= 1; i++) {
        setTimeout(() => {
            console.log(i);
            if (i === 1) {
                imgViewHandler();
                // 모든 사진 0
                imgEventAdd(Object.keys(imgKeyStorage));
                //모든 이미지 이벤트주기
            }

        }, i * 5000);
    }

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

    const randomNumArr = selectRandomNum();

    realLife.innerText = life;
    startBtn.removeEventListener("click", startGame);

    imgViewHandler(randomNumArr);
    //TODO: 전체 다른 이미지 보여주거나 , 0 바꾸기 함수 2개로 나누기
    initSeting();
}

function init() {

    startBtn.addEventListener("click", startGame);
}
init();
