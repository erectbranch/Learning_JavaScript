# 제어문


---


## 제어문의 기초
주사위 게임 크라운 앤 앵커(Crown and Anchor)를 제어문으로 구현해 보자

![Crown and Ancher](Krone_und_Anker.jpg)

게임은 평평한 면 위에 여섯 개의 사각형이 있고, 각 사각형에는 크라운, 앵커, 하트, 클럽, 스페이드, 다이아몬드를 나타내는 그림이 있다. 게임을 하는 선원은 그 사각형에 마음대로 돈을 걸 수 있다. 돈을 건 다음에는 (평면에 있는 사각형 숫자와 일치하는) 6면체 주사위 세 개를 굴린다. 주사위가 사각형 번호에 일치하는 숫자에 멈추면, 선원은 건 만큼의 돈을 따게 된다. 

예를 들어 크라운에 5 펜스를 걸었는데, 주사위 3번이 모두 크라운이 나오면 15 펜스를 얻는다. 만약 3번의 주사위 결과가 크라운, 하트, 스페이드라면 5펜스만 얻는다.

게임을 위한 기본 조건을 만든다.(시작 조건과 끝 조건) 토마스는 크라운 앤 앵커 게임을 하기 위해 50 펜스를 준비했다. 운이 좋아서 100 펜스를 번다면 즐겁게 게임을 마칠 것이다. 하지만 그 전까지는 전부 잃지 않는 이상 계속 게임을 진행할 것이다.

![Crown and Anchor simulation](crown_and_anchor_simulation.jpg)

위는 토마스가 어떻게 행동할지를 그린 시뮬레이션 순서도다. 마름모는 예/아니오 결정이며, 사각형은 행동을 나타낸다. 우리는 이 순서도를 컴퓨터가 이해하도록 설계해야 한다.

* 변수 할당: funds = 50, bets = {}, hand = []
* m 이상, n 이하의 무작위 정수: rand(1, 6)
* 하트, 크라운 등을 결정한 무작위 문자열 randFace()

* 객체 프로퍼티 할당: bets["heart"] = 5, bets[randFace()] = 5
* 배열에 요소 추가: hand.push(randFace())
* 간단한 사칙연산: funds - totalBet, funds + winnings
* 증가: roll++

순서도의 결정 부분(마름모)는 다음과 같이 제한한다.

* 숫자 비교: funds > 0, funds < 100
* 일치 비교: totalBet === 7
* 논리 연산자: funds > 0 && funds > 100


---


### while 루프

```JavaScript
let funds = 50;    // 시작 조건

while(funds > 1 && funds < 100) {
    // 돈을 건다

    // 주사위를 굴린다.

    // 맞췄다면 돈을 가져온다.
}
```

### 블록 문
블록 문(block statement)은 엄밀히 말해 제어문은 아니지만 제어문과 함께 쓰인다.(복합문이라고도 한다.) 블록 문은 문(statement) 여러 개를 중괄호로 묶은 것이며 자바스크립트는 이들을 하나의 단위로 취급한다.


```JavaScript
{    // 블록 문을 시작한다.
    console.log("statement 1");
    console.log("statement 2");
}    // 블록 문을 끝낸다.
```

위 예시를 보면 두 console.log는 블록 안에 있다. 문법 자체는 유효하지만 무의미한 코드다. **블록 문이 유용해지는 것은 제어문과 함께 쓸 때**다. 

아래는 2보 전진 1보 후퇴를 조건으로 한 코드다.


```JavaScript
let funds = 50;    // 시작 조건

while(funds > 1 && funds < 100) {
    funds = funds + 2;    // 2보 전진
    funts = funds - 1;    // 1보 후퇴
}
```

위 루프는 100이 되고 끝날 것이다. 제어문에 블록을 쓰는 것이 일반적이나 꼭 그래야 하는 것은 아니다. 예를 들어 100이 될 때까지 2만 더하기만 한다면 블록문을 쓰지 않아도 된다.


```JavaScript
let funds = 50;

while(funds > 1 && funds < 100)
    funds = funds + 2;
```


### 공백
대부분의 경우 자바스크립트는 줄바꿈 문자를 포함해, 추가 공백을 신경 쓰지 않는다.(다만 return문 뒤에 줄바꿈 문자를 쓰면 문제가 생긴다.) 스페이스 하나건 스페이스 열 개건 마찬가지고, 스페이스 10개나 빈 줄 10개나 마찬가지다. 예를 들자면 앞의 예제는 아래 코드와 같다.

```JavaScript
while(funds > 1 && funds < 100)


funds = funds + 2;
```

하지만 이 코드는 두 문 사이에 어떤 연관이 있다는 느낌을 받을 수 없으므로, 이렇게 코드를 작성해서는 오해의 소지가 다분하므로 피해야 한다.

만약 아래와 같은 코드가 있다면 자바스크립트는 어떻게 받아들일까?

```JavaScript
while(funds > 1 && funds < 100)
    funds = funds + 2;
    funds = funds - 1;
```

위 코드를 얼핏 보면 while 루프의 바디에서 2개 문(2보 전진, 1보 후퇴)를 하는 것으로 보인다. 하지만 여기에는 블록이 없으므로 자바스크립트는 코드를 다음과 같이 해석한다.

```JavaScript
while(funds > 1 && funds < 100)
    funds = funds + 2;    // while 루프 바디


funds = funds - 1;    // while 루프가 끝난 뒤 실행된다.
```

또한 코드를 작성한다면 아래와 같이 같은 if 문 안에서 블록 문과 블록이 없는 문을 섞어서 쓰면 안 된다.

```JavaScript
// 잘못된 예시
if(funds > 1) {    // 블록이 있는 문
    console.log("There's money left!");
    console.log("That means keep playing!");
} else    // 블록이 없는 문
    console.log("I'm broke! Time to quit.");)
```


---


### if...else문
그렇다면 이제 순서도에서 '돈을 거는' 행동을 만들 것이다.

* 주머니에서 손을 집어넣고 잡히는 대로 돈을 꺼낸다. 그렇다면 동전이 한 개만 나올 때도 있고, 가진 돈 전체가 나올 때도 있을 것이다.

* 하지만 7개를 뽑으면 행운이 따른다는 미신을 가진 토마스는, 7개가 나오면 가진 돈 전부를 하트에 걸 것이다.

* 그렇지 않다면 아무렇게나 돈을 건다.

```JavaScript
// 돈 걸기
const bets = { crown:0, anchor:0, heart:0, spade:0, club:0, diamond:0 };

let totalBet = rand(1, funds);

if(totalBet === 7) {
    totalBet = funds;
    bets.heart = totalBet;
} else {
    // 그 판에 걸 돈을 분배한다.
}

funds = funds - totalBets;    // 가진 금액에서 건 돈을 제외
```


### do...while 루프
토마스가 우연히 7펜스를 꺼내지 않았다면 무작위로 사각형에 돈을 걸 것이다. 여러 사각형에 랜덤한 만큼 판돈을 나눠서 넣을 것이다.

randFace() 함수는 문자열을 도출해 주는 함수로 아래에서 제대로 보일 것이다.

```JavaScript
let remaining = totalBet;    // 그 판에 걸 돈

do {
    let bet = rand(1, remaining);    // 걸 돈을 랜덤하게 도출
    let face = randFace();           // 무작위 문자열을 도출할 함수(걸 사각형)
    bets[face] = bets[face] + bet;   // 랜덤으로 나온 사각형에 돈을 건다.
    remaining = remaining - bet;     // 건 돈 만큼 남은 돈을 제외
} while(remaining > 0);    // 남은 돈이 있으면 계속 반복
```


### for 루프
토마스는 이번 판에 걸 돈을 모두 걸었다. 그렇다면 이제 주사위를 굴릴 시간이다. 

for 루프는 대단히 유연하며, while 루프나 do...while 루프는 모두 for 루프로 고쳐 쓸 수 있다. 하지만 for 루프가 가장 어울리는 경우는 어떤 일을 정해진 숫자만큼 반복하려 할 때, 특히 그 일을 지금 몇 번째 하는지 알아야 할 때다.

지금은 주사위를 정해진 숫자만큼 굴리는 상황이므로, 따라서 for 루프가 가장 알맞다. 

for 루프는 초기화, 조건, 표현식 세 부분으로 나뉜다.

```JavaScript
const hand = [];

for(let roll = 0; roll < 3; roll++){    // 주사위 횟수를 0부터 2로 생각
    hand.push(randFace());    // 문자열을 hand 리스트에 넣는다.
}
```


### if 문
이제 남은 일은 주사위 결과와 배팅을 비교해서 돈을 정산하는 일이다. hand 배열에는 무작위로 선택된 그림(face)가 세 개 있다. 이를 비교해서 배팅이 일치하면 돈을 따고, 아니면 돈을 잃게 된다.

```JavaScript
let winnings = 0;

for(let die = 0; die < hand.length; die++) {
    let face = hand[die];    // hand 배열 안에 있는 결과 문자열
    if(bets[face] > 0) winnings = winnings + bets[face];    // 만약 그 문자열(그림)에 배팅이 되어 있다면, 건 만큼 돈을 얻는다.
}
```


### 하나로 합치기

```JavaScript
// m 이상 n 이하의 무작위 정수를 반환
function rand(m, n) {
    return m + Math.floor((n - m + 1)*Math.random());
}

// 크라운 앤 앵커 게임의 여섯 그림 중 하나에 해당하는 문자열을 무작위로 반환하는 함수
function randFace() {
    return ["crown", "anchor", "heart", "spade", "club", "diamond"][rand(0,5)];
}

// 시작 조건
let funds = 50;
let round = 0;

while(funds > 1 && funds < 100) {
    round++;
    
    console.log(`round ${round}:`);
    console.log(`\tstarting funds: ${funds}p`);

    // 돈을 건다.
    let bets = { crown: 0, anchor: 0, heart: 0, spade: 0, club: 0, diamond: 0 };
    let totalBet = rand(1, funds);
    
    if(totalBet === 7) {
        totalBet = funds;
        bets.heart = totalBet;
    } else {
        // 판돈을 나눈다
        let remaining = totalBet;
        do {
            let bet = rand(1, remaining);
            let face = randFace();
            bets[face] = bets[face] + bet;
            remaining = remaining - bet;
        } while(remaining > 0)
    }

    funds = funds - totalBet;
    
    console.log('\tbets: '+
        Object.keys(bets).map(face => `${bets[face]} pence`).join(', ') +
        `(total: ${totalBet} pence)`);


    // 주사위를 굴린다
    const hand = [];

    for(let roll = 0; roll < 3; roll ++) {
        hand.push(randFace());
    }
    console.log(`\thand: ${hand.join(', ')}`);


    // 딴 돈을 가져온다.
    let winnings = 0;
    
    for(let die = 0; die < hand.length; die++) {
        let face = hand[die];
        if(bets[face] > 0) winnings = winnings + bets[face];
    }

    funds = funds + winnings;

    console.log(`\twinnings: ${winnings}`);
}

console.log(`\tending funds: ${funds}`);
```


