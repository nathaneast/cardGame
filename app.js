const contents = document.querySelector(".contents");
const contentsList = contents.querySelectorAll("div");
const startBtn = document.querySelector(".startBtn");
const realLife = document.querySelector(".realLife");
const realMessage = document.querySelector(".realMessage");
// console.log(contentsList);

const imgKeyStorage = {};
let clearImgCount = 0;
let beforeImgKey;
// 인덱스, 키
let life;

// function createNode(key) {
//     const node = {};

//     node.key = key;
//     node.hasComplete = null;

//     return node;
// }

function endGame() {
    startBtn.addEventListener("click", startGame);
    // 게임시작 버튼 누르게 만들어줘야함
    imgEventHandler(false);
    imgViewHandler();
    // 초기값 셋팅  => 모든 사진0, 이벤트 제거
    
}


function matchingImg(event) {
    console.log("이미지 크릭 이벤트 실행");
    let currentTargetIndex;
    //contentsList.indexOf(event.target.parentNode)
    // 위 실행 안됨, 유사배열 indexOf 안되는지 ?

    // 클릭한 div가 컨텐츠의 몇번째 요소인지 인덱스 찾기
    for (let i = 0; i < contentsList.length; i++) {
        if (contentsList[i] === event.target.parentNode) {
            currentTargetIndex = i;
            // +1 이유는 키저장소 키값은 1부터시작이라서
        }
    }
    // console.log(currentTargetIndex);

    if (beforeImgKey) {
        console.log("이전 이미지 있다", beforeImgKey);

        if (imgKeyStorage[currentTargetIndex + 1] === beforeImgKey[1]) {
            clearImgCount++;
            //이전키 , 현재 누른 이미지 키 같으면
            contentsList[currentTargetIndex].firstChild.removeEventListener("click", matchingImg);
            // 현재 이미지의 이벤트 지움
            contentsList[currentTargetIndex].firstChild.src = `img/${imgKeyStorage[currentTargetIndex + 1]}.png`;
            //현재 키 화면에 보여주기
            
            beforeImgKey = null;
            //비포 이미지 키 비우고
            console.log("이전 이미지 키, 비포키 같다", life, clearImgCount);

            if (clearImgCount === 6) {
                endGame();
            }

        } else {
            
            //이미지 있지만, 비포 키값과 다르다
            life -= 1;
            realLife.innerText = life;

            console.log("이전 이미지와 다르다", life, clearImgCount);

            contentsList[currentTargetIndex].firstChild.src = `img/${imgKeyStorage[currentTargetIndex + 1]}.png`;
            contentsList[currentTargetIndex].firstChild.removeEventListener("click", matchingImg);
            imgEventHandler(false);
            //이벤트제거 , 해당키 이미지 보여주기

            if (!life) {
                alert("겜끝");
                endGame();
            }

            setTimeout(() => {
                //비포 이미지, 현재이미지 이벤트 추가해주고, 

                // 이미지 0
                //비포이미지 인덱스도 있어야 그림 맞추기 틀리면 1번쨰 인덱스 사진0 바꾸고

                // 비포인덱스 널
                contentsList[beforeImgKey[0]].firstChild.src = `img/${0}.png`;
                contentsList[beforeImgKey[0]].addEventListener("click", matchingImg);

                contentsList[currentTargetIndex].firstChild.src = `img/${0}.png`;
                contentsList[currentTargetIndex].addEventListener("click", matchingImg);
                
                beforeImgKey = null;

            }, 3000);
            // 누른것 사진 키값이 3초동안 나오고, 2개 사진 모두 0으로 만들어줘야함
            console.log("이전 이미지와 키값 다름", life);
            
            // 게임끝
        }


    } else {
        // 이전 이미지가 없으면
        console.log("이전 이미지 없다 비포키 담김", beforeImgKey);
        beforeImgKey = [currentTargetIndex, imgKeyStorage[currentTargetIndex + 1]];
        //비포키에 키저장소의 현재 인덱스 키값 들어감 => 이미지생성 당시 이미지 번호 
        event.target.removeEventListener("click", matchingImg);
        //이벤트 제거
        event.target.src = `img/${imgKeyStorage[currentTargetIndex + 1]}.png`;
        //현재 인덱스 이미지로 변경

    }
}

function imgEventHandler(hasEventCheck) {
    if (hasEventCheck) {
        contentsList.forEach(ele => {
            ele.firstChild.addEventListener("click", matchingImg);
        });
    } else {
        contentsList.forEach(ele => {
            ele.firstChild.removeEventListener("click", matchingImg);
        });
    }
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



function viewEveryImg() {
    // randomNumArr.forEach((key, index) => {
    //     contentsList[index].firstChild.src = `img/${key}.png`;
    //     // imgKeyStorage[index + 1] = createNode(key);
    //     imgKeyStorage[index + 1] = key;
    // });

    for (let i = 1; i <= 3; i++) {
        setTimeout(() => {
            console.log(i);
            if (i === 3) {
                contentsList.forEach( ele => {
                    ele.firstChild.src = `img/${0}.png`;
                });
                imgEventHandler(true);
            }

        }, i * 1000);
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
    life = 3;
    realLife.innerText = life;
    const randomNumArr = selectRandomNum();

    startBtn.removeEventListener("click", startGame);
    imgViewHandler(randomNumArr);
    viewEveryImg();
}

function init() {
    startBtn.addEventListener("click", startGame);
}
init();
