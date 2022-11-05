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


---


## 제어문

제어문은 크게 조건문과 반복문 두 가지 범주로 나뉜다. 

* 조건문에는 if와 if..else 문이 있고, 그 외에 switch문이 있다. 조건문은 말하자면 갈림길과 같다. 선택할 수 있는 길이 몇 가지 있으면 그중 하나를 택할 뿐, 다른 곳에는 갈 수 없다.

* 반복문에는 while과 do...while, for 루프가 있다. 이들은 조건이 맞는 동안 바디를 계속 반복한다.


### 제어문의 예외

제어문의 일반적인 실행 방식을 바꾸는 네 가지 문이 있다. 이들은 일종의 조커라고 봐도 무방하다.

* break: 루프 중간에 빠져나간다.

* continue: 루프에서 바로 다음 단계로 건너뛴다.

* return: 제어문을 무시하고 현재 함수를 즉시 빠져나간다.

* throw: 예외 핸들러에서 반드시 처리해야 할 예외(exception)을 일으킨다. 예외 핸들러는 현재 제어문 바깥에 있어도 상관 없다.


### if... else문을 체인으로 연결하기

아래는 토마스가 자신이 수요일에는 운이 나쁘다는 미신을 믿고 있어서 딱 1펜스만 건다고 할 때의 예제다.

```JavaScript
if(new Date().getDay() === 3) {    // 현재 요일에 해당하는 숫자를 반환하는 함수. 0은 일요일이다.
    totalBet = 1;
} else if(funds === 7) {
    totalBet = funds;
} else {
    console.log("No superstition here!");
}
```

사실 위는 블록 아닌 문과 블록 문을 섞어 쓴 코드이지만, 이는 널리 쓰이는 패턴이고 혼란을 초래하지 않는다. 반대로 위 예제에서 블록 문을 엄격하게 지킨다면 코드가 혼란스럽게 보일 수 있다.

```JavaScript
if(new Date().getDay() === 3) {
    totalBet = 1;
} else {
    if(funds === 7) {
        totalBet = funds;
    } else {
    console.log("No superstition here!");
    }
}
```

블록문을 엄격하게 지켰더니 오히려 함수의 의미를 알기 어려워졌다.


### 메타 문법
메타 문법은 다른 문법을 설명하는 문법이다.

* 대괄호([])로 감싼 것은 옵션이다.

* 생략 부호(...)는 '여기 들어갈 내용이 더 있다.'는 뜻이다.

아래는 예제다.

```JavaScript
// while문
while(condition)
    statement
```

condition 값이 true면 statement를 실행한다.

```JavaScript
// if...else문
if(condition)
    statement1
[else
    statement2]
```

condition 값이 true면 statement1을 싱행하고, 그렇지 않고 else 부분이 있다면 statement2를 실행한다.

```JavaScript
// do...while문
do
    statement
while(condition);
```

statement는 최소 한 번 실행하고, condition 값이 true인 동안 반복해서 실행한다.

```JavaScript
// for문
for([initialization]; [condition]; [final-expression]) 
    statement
```

루프에 들어가기 전 initialization을 실행한다. condition 값이 true인 동안 statement를 실행하고, final-expression을 실행한 뒤 condition을 다시 체크한다.


## for 루프의 다른 패턴

쉼표 연산자를 쓰면 초기화와 마지막 표현식에 여러 문을 결합할 수 있다.

```JavaScript
for(let temp, i=0, j=1; j<30; temp = i, i = j, j = i + temp)
    console.log(j);
```

이 예제는 초기화를 하면서 변수 temp와 i, j를 동시에 선언했고, 마지막 표현식에서 세 변수를 동시에 조작했다. for 루프의 제어부에 아것도 쓰지 않으면 무한 루프가 만들어진다.

```JavaScript
for(;;)   console.log("I will repeat forever");
```

위는 for 루프에서 조건을 생략했으므로 항상 true다. 즉, 무한 루프에 빠진다.

for 루프는 꼭 정수 인덱스를 사용해야 하지는 않는다. 아래는 다양한 예시다.

```JavaScript
let s = '3';    // 숫자가 들어있는 문자열
for(; s.length < 10; s = ' ' + s);    // 문자열의 길이를 조건으로 쓴다.
                                      // 여기서 사용한 for 루프 마지막에 세미콜론이 없으면 에러가 일어난다.

for(let x = 0.2; x < 3.0; x += 0.2)   // 제어 변수가 정수가 아닌 실수인 경우
    console.log(x);

for(; !player.isBroke;)               // 조건으로 객체 프로퍼티를 사용
    console.log("Still playing!");
```

for 루프는 모두 while 루프로 고쳐 쓸 수 있다. 다만 고쳐쓸 수 있다는 말이지 그렇게 해야 한다는 말은 아니다. for 루프의 장점은 루프의 제어부가 첫 번째 행에 모여 있어서 일목요연하게 파악할 수 있다는 점이다. 또한 for 루프에서는 let으로 초기화한 변수가 for 루프에서만 유효하다는 장점이 있다.

반면 for문을 while문으로 바꾸면, 컨트롤 변수는 루프 밖에서도 볼 수 있게 된다.

```JavaScript
for([initialization], [condition], [final-expression])
    statement
```

위 코드를 while 루프로 고쳐 쓰면

```JavaScript
[initialization]
while([condition]) {
    statement
    [final-expression]
}
```


### switch 문
if...else 문은 두 가지 중 하나를 선택하지만, switch 문은 조건 하나로 여러 가지 중 하나를 선택할 수 있다. 따라서 참/거짓 같은 값보다는 다양하게 나뉘는 조건을 사용한다.

```JavaScript
switch(expression) {
    case value1:
        // expression을 평과한 결과가 value1일 때 실행된다.
        [break;]
    case value2:
        // expression을 평과한 결과가 value2일 때 실행된다.
        [break;]
        ...
    case valueN:
        // expression을 평과한 결과가 valueN일 때 실행된다.
        [break;]
    default:
        // expression을 평과한 결과에 맞는 것이 없을 때 실행된다.
        [break;]
}
```

자바스크립트는 expression을 평가하고 그에 일치하는 첫 번째 case를 찾아서 break, return, continue, throw를 만나거나 switch 문이 끝날 때까지 문을 실행한다. 다만 switch 문은 특유의 복잡성 때문에 실수를 초래하기 쉬우며, 따라서 적재적소에만 쓰는 것을 권장한다.

아래는 토마스 예제를 switch 문으로 처리한 것이다.

```JavaScript
switch(totalBet) {
    case 7:
        totalBet = funds;
        break;
    case 11:
        totalBet = 0;
        break;
    case 13:
        totalBet = 0;
        break;
    case 21:
        totalBet = 21;
        break;
}
```

위 예제에서 주머니에서 꺼낸 돈이 11이나 13펜스일 때는 똑같은 행동을 한다. 이런 경우 break 없는 case절(all-through execution)을 활용할 수 있다.(switch문은 break 문을 만날 때까지 계속 실행된다.)

```JavaScript
switch(totalBet) {
    case 7:
        totalBet = funds;
        break;
    case 11:
    case 13:
        totalBet = 0;
        break;
    case 21:
        totalBet = 21;
        break;
}
```

만약 여기서 13펜스가 나왔을 때 1펜스를 기부해야 한다고 상황을 바꾸면 어떻게 코드를 변경해야 할까?

```JavaScript
switch(totalBet) {
    case 7:
        totalBet = funds;
        break;
    case 13:
        funds = funds - 1; // 1펜스를 잃는다.
    case 11:
        totalBet = 0;
        break;
    case 21:
        totalBet = 21;
        break;
}
```

totalBet이 13이 나왔을 때 1펜스를 잃는 것을 볼 수 있다. 그리고 break 문이 없으므로 다음 case(11)로 넘어가서 totalBet을 0으로 만든다. 이 코드는 유효한 자바스크립트이며, 원하는 일을 정확하게 수행하고 있다. 하지만 이러한 코드의 약점이 있는데, 바로 코드가 정확하지만 그냥 값을 안 넣은 실수처럼 보인다는 것이다. 만약 동료가 break 문을 잊어버린 것이라 생각하고 이 부분에 break 문을 넣는다면 코드가 동작하지 않을 수 있다.(따라서 이렇게 설계할 경우 주석을 꼭 남기도록 하자)

아래는 default 절을 추가한 것이다. default 절은 일치하는 case 절이 없을 때 실행된다. 필수는 아니지만, 보통 맨 마지막에 사용한다.

```JavaScript
switch(totalBet) {
    case 7:
        totalBet = funds;
        break;
    case 13:
        funds = funds - 1; // 1펜스를 잃는다.
    case 11:
        totalBet = 0;
        break;
    case 21:
        totalBet = 21;
        break;
    default:
        console.log("No superstition here!");
        break;
}
```

default 뒤에는 case가 없으므로 break 문이 없어도 되지만, 항상 break 문을 쓰는 습관을 들이는 편이 좋다.

이 규칙의 예외로 switch 문을 '함수 안에서 쓸 때'가 있다. return 문이 함수를 즉시 빠져나가기 때문이다.

```JavaScript
function adjustBet(totalBet, funds) {
    switch(totalBet) {
        case 7:
            return funds;
        case 13:
            return 0;
        default:
            return totalBet;
    }
}
```

자바스크립트는 공백이 몇 칸이든 신경을 쓰지 않으므로 다음과 같이 공백을 사용해 switch 문을 더 간결하게 표현할 수 있다.

```JavaScript
switch(totalBet) {
    case 7: totalBet = funds; break;
    case 11: totalBet = 0;    break;
    case 13: totalBet = 0;    break;
    case 21: totalBet = 21;   break;
}
```

11펜스일 때와 13펜스일 때 같은 일을 하지만, 여기서는 break 없는 case 절을 쓰지 않았다. 이렇게 switch 문을 줄바꿈 없이 쓸 때는 case마다 실행문이 하나씩 있어야 의도가 명확히 드러난다.


### for...in 루프

for...in 루프는 객체의 프로퍼티에 루프를 실행하도록 설계된 루프다.

```JavaScript
for(variable in object)
    statement
```

아래 예제는 추후 공부할 요소들이 담긴 것이다.

```JavaScript
const player = { name: 'Thomas', rank: 'Midshipman', age: '25' };

for(let prop in player) {
    if(!player.hasOwnProperty(prop)) continue;
    console.log(prop + '; ' + player[prop]);
}
```


### for...of 루프
ES6에서 새로 생긴 반복문이며, 컬렉션의 요소에 루프를 실행하는 다른 방법이다.

```JavaScript
for(variable of object)
     statement
```

for...of 루프는 배열은 물론 이터러블(iterable) 객체에 모두 사용할 수 있는 범용적인 루프다.

```JavaScript
const hand = [randFace(), randFace(), randFace()];

for(let face of hand)
    console.log(`You rolled...%{face}!`);
```

for...of는 배열에 루프를 실행해야 하지만, 각 요소의 인덱스를 알 필요가 없을 때 알맞다.(인덱스를 알아야 한다면 일반적인 for 루프를 사용한다.) 아래는 일반적인 for 루프 예제다.

```JavaScript
const hand = [randFace(), randFace(), randFace()];

for(let i=0; i < hand.length; i++)
   console.log(`Roll ${i+1}: ${hand[i]}`);
```


---


## 유용한 제어문 패턴


### continue 문을 사용해 조건 중첩 줄이기

특정 조건이 맞을 때만 루프 바디를 실행해야 할 때가 많다. 다시 말해 반복문 안에 조건문을 사용하는 경우다.

```JavaScript
while(funds > 1 && funds < 100) {
    let totalBet = rand(1, funds);
    
    if(totalBet === 13) {
        console.log("Unlucky! Skip this round...");
    } else {
        // 플레이...
    }
}
```

이런 경우를 **제어문 중첩**(nested control flow)라고 부른다. while 루프 바디에서 할 일은 대부분 else 절에 들어있고, if 절이 하는 일은 console.log를 호출하는 일뿐이다. 이를 continue 문을 써서 더 간단하게 만들 수 있다.

```JavaScript
while(funds > 1 && funds < 100) {
    let totalBet = rand(1, funds);
    
    if(totalBet === 13) {
        console.log("Unlucky! Skip this round...");
        continue;
    }
    // 플레이...
}
```

만약 루프 바디가 20행 정도 됐다면 이 정도 수정만으로도 굉장히 코드가 이해하기 쉬워졌을 것이다.


### break나 return 문을 써서 불필요한 연산 줄이기

뭔가를 찾기 위해 루프를 실행했고, 그것을 찾았다면 루프 바디를 더 실행할 필요가 없다.

아래는 소수를 판단하는 코드다. 얼청나게 많이 숫자가 들어있는 배열에서 소수를 찾으면 우리는 루프를 더 실행하고 싶지 않다고 하자.

```JavaScript
let firstPrime = null;

for(let n of bigArrayOfNumbers) {
    if(isPrime(n) && firstPrime == null) firstPrime = n;
}
```

위 코드는 엄청나게 큰 배열의 length만큼 for 문 루프를 반복할 것이다. 이런 불필요한 루프가 더 진행되지 않도록 코드를 바꾸면 아래와 같다.

```JavaScript
let firstPrime = null;

for(let n of bigArrayOfNumbers) {
    if(isPrime(n)) {
        firstPrime = n;
        break;
    }
}
```

이 루프가 함수 안에 있었다면 break 대신 return 문을 써도 된다.


### 루프를 완료한 뒤 인덱스 값 사용하기

break 문을 써서 루프를 일찍 종료했을 때 인덱스 변수 값이 필요할 때가 있다. 


```JavaScript
let i = 0;

for(; i < bigArrayOfNumbers.length; i++) {
    if(isPrime(bigArrayOfNumbers[i])) break;
}

if(i === bigArrayOfNumbers.length) console.log("No prime numbers!");    // 만약 배열 끝까지 갔지만 없다면
else console.log(`First prime number found at position ${i}`);
```


### 배열을 수정할 때 감소하는 인덱스 사용하기

배열에 루프를 실행하면서 그 루프 바디에서 배열을 수정하는 것은 위험할 수 있다. 뜻하게 종료 조건을 바꿀 수도 있기 때문이다. 운이 나쁘면 무한 루프가 발생한다. 이런 경우 널리 쓰이는 방지책으로 감소하는 인덱스를 써서, 배열 마지막 요소부터 루프를 시작하는 방법이다. 이렇게 하면 배열에 요소를 추가하거나 제거해도 종료 조건이 바뀌는 일이 없다.

예를 들어 bigArrayOfNumbers에서 찾은 모든 소수를 제거하고 싶다고 가정하자.

```JavaScript
for(let i=bigArrayOfNumbers.length - 1; i >= 0; i--) {
    if(isPrime(bigArrayOfNumbers[i])) bigArrayOfNumbers.splice(i, 1);    // 소수면 그 인덱스 위치에 해당하는 숫자를 삭제한다.
}
```

