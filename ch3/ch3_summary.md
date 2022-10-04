# 3 리터럴과 변수, 상수, 데이터 타입


---


## 3.1 변수와 상수
변수(variable)란 간단히 말해 이름이 붙은 값으로, 변수라는 이름이 암시하듯 값은 언제나 바뀔 수 있다. 예를 들어 날씨에 관한 프로그램을 만든다면 currentTempC라는 변수를 사용할 수 있다.

```JavaScript
let currentTempC = 22; // 섭씨 온도
```

이 문장은 변수 currentTempC를 선언(생성)하고 초깃값을 할당하는 두 가지 일을 한다. currentTempC의 값은 언제든 바꿀 수 있다.

```JavaScript
currentTempC = 22.5;
```

이번에는 let을 사용하지 않았다. let은 **변수 선언**에만 쓰이고, 각 변수는 단 한 번만 선언할 수 있다.

참고로 초깃값을 할당하지 않으면 암시적으로 특별한 값 undefined가 할당된다.

```JavaScript
let currentTempC; // let currentTempC = undefined;와 같다.
```

let 문 하나로 변수 여러 개를 선언할 수도 있다.

```JavaScript
let targetTempC, room1 = "conference_room_a", room2 = "lobby";
```

targetTempC는 초깃값을 할당하지 않았기 때문에 임시적으로 undefined를 받게 된다.

상수도 변수와 마찬가지로 값을 할당받을 수 있지만, **한 번 할당한 갑을 바꿀 수는 없다.** 상수는 관용적으로 보통 대문자와 밑줄만 사용한다.

```JavaScript
const ROOM_TEMP_C = 21.5, MAX_TEMP_C = 30;
```

변수와 상수는 쓰임새에 맞게 사용하면 되나, 상수를 주로 쓰는 습관을 들이면 생각보다 변수가 필요한 상황이 적은 것을 알 수 있게 된다.


---


## 식별자 이름
변수와 상수, 함수 이름을 식별자(identifier)로 부른다. 그리고 식별자에는 규칙이 있다.

* 식별자는 반드시 글자나 달러 기호($), 밑줄(_)로 시작해야 한다.(또한 클래스를 제외하고는 대문자로 시작해서는 안 된다.) (밑줄로 시작하는 식별자는 보통 아주 특별한 상황이나, '내부' 변수에 사용된다.)

* 식별자는 글자나 숫자, 달러 기호, 밑줄만을 쓸 수 있다.

* 글자 중간에는 유니코드 문자도 쓸 수 있다.

* 예약어는 식별자로 쓸 수 없다.(예를 들어 let은 식별자로 만들 수 없다.)

다른 언어는 달러 기호를 특수 문자로 사용하지만 자바스크립트는 그렇지 않다. a나 z 같은 글자와 마찬가지로 식별자 이름으로 사용할 수 있다. jQuery와 같은 라이브러리는 이런 장점을 활용해 달러 기호 자체를 식별자로 사용한다. 따라서 제이쿼리를 사용하는 경우 $로 시작하는 식별자는 보통 제이쿼리 객체다.

식별자 표기법은 크게 두 가지로 나눌 수 있다.

* 카멜 케이스(camel case): currentTempC, anIdentifierName과 같이 중간중간을 대문자로 표기.(더 많이 쓰인다.)

* 스네이크 케이스(snake case): current_temp_c, an_identifier_name과 같이 중간중간을 언더바로 구분한 표기.

표기법은 일관성을 지키는 것이 중요하다. 팀에서 일하거나 프로젝트를 커뮤니티에 공유할 생각이라면, 어떤 표기법을 선호하는지 알아두는 것이 중요하다.


---


## 리터럴
앞에서 currentTempC에 값을 할당할 때 우변에 있었던 22와 22.5가 숫자형 리터럴이다. 마찬가지로 room1을 초기화할 때 문자열 리터럴인 "conference_room_a"를 할당했다. 리터럴이란 값을 프로그램 안에서 직접 지정한다는 의미다. **자바스크립트는 따옴표를 통해 리터럴과 식별자를 구분한다.**

이는 다음 예시를 보면 더 확연하게 알 수 있다.

```JavaScript
let room1 = "conference_room_a"; // 문자열 리터럴 "conference_room_a"를 할당

let currentRoom = room1; // currentRoom 값은 room1의 값과 동일하게 된다.

// 만약 따옴표를 쓰지 않는다면
currentRoom = conference_room_a; // => 에러가 발생한다.
```


---


## 원시 타입과 객체
자바스크립트의 값은 원시 값(primitive)나 객체(object)다. 문자열과 숫자 같은 원시 타입(기본 타입)은 불변이다. 숫자 5는 항상 숫자 5다. 문자열 "alpha"도 항상 문자열 "alpha"다. 다만 문자열은 혼동하기 쉬운데 다음 사례를 보자.

"alpha" + "omega"처럼 문자열을 병합한다면, 같은 문자열을 수정한 것처럼 보이지만 이는 다른 문자열이다. "alpha"와 "alphaomega"는 서로 다른 문자열이란 것이다.

원시 타입에는 6가지가 있다.

* 숫자

* 문자열

* 불

* 심벌

* null

* undefined 

다만 불변성이라는 말이 변수의 값이 바뀔 수 없다는 말을 의미하는 것이 아니다.

```JavaScript
let str = "hello";
str = "world";
```

str은 우선 불변의 값 "hello" 문자열 리터럴을 할당해 초기화했고, 다시 새로운 불변값 "world"를 할당 받았다. 중요한 것은 "hello"와 "world"가 서로 다른 문자열이란 것이다.

원시 타입과 달리 여러 가지 형태과 값을 가질 수 있는 객체 타입도 있다.

* Array

* Date

* RegExp

* Map과 WeakMap

* Set과 WeakSet


---


## 숫자, 문자열, 특수문자, 불리언, null, undefined
JSTDG_7th 정리 노트를 참고.

### 템플릿 리터럴
문자열 안에 값을 써야 하는 경우는 굉장히 많다. 이때 ES6에서 추가된 문자열 템플릿(Template)을 사용하면 간편하게 채울 수 있다. **문자열 템플릿은 큰따옴표나 작은따옴표를 쓰지 않고 백틱을 사용**한다.

```JavaScript
let currentTemp = 19.5;
const message = `The current temperature is ${currentTemp}\u00b0C`;
```

문자열 템플릿 안에서는 달러 기호가 특수 문자가 된다. 달러 기호 다음에 중괗로호 감싼 값을 쓰면 그 값이 문자열에 삽입된다.(문자열 템플릿 안에 달러 기호를 써야하는 경우 역슬래시로 이스케이프하면 된다.)


### 여러 줄 문자열
소스 코드의 각 행 마지막에서 줄바꿈 문자를 이스케이프할 수 있도록 정의했지만, 브라우저의 지원이 형편 없어서 이 기능을 사용하는 걸 권장하지 않는다. 아래는 줄바꿈 문자를 이스케이프한 예제다.

```JavaScript
const multiline = "line1\
line2";
```

위 코드는 첫 행 마지막에 역슬래시가 줄바꿈 문자를 이스케이프하기는 하지만, 문자열에 줄바꿈 문자를 삽입하지는 않는다. 따라서 결과는 line1line2가 된다. 반대로 줄바꿈 문자가 들어가게 하고 싶다면 다음과 같이 써야 한다.

```JavaScript
const multiline = "line1\n\
line2";
```

템플릿 리터럴로 백틱을 사용하면 좀 더 직관적으로 구현할 수 있다.

```JavaScript
const multiline = `line1
line2`;
```

위 코드 결과에는 줄바꿈 문자가 포함되어 있다. 하지만 아래와 같은 경우 들여쓰기가 문자열에 포함되게 된다. 

```JavaScript
const multiline = `line1
    line2
    line3`;
```

따라서 원하지 않는 공백이 line2와 line3 앞에 포함된다. 따라서 이 책은 여러 줄 문자열을 쓰는 것을 권장하지 않는다. 소스 코드에서 문자열을 여러 행에 나눠 써야 할 때는 문자열 병합을 권장한다.

```JavaScript
const multiline = "line1\n" +
    "line2\n" +
    "line3";
```

이러면 코드도 읽기 쉽고, 문자열도 원하는 형태로 만들어진다. 물론 템플릿 리터럴을 섞어서도 가능하다.

```JavaScript
const multiline = `Current temperature:\n`+
    `\t${currentTemp}\u00b0C\n`+
    "Don't worry...the heat is on!";
```


### 숫자와 문자열

```JavaScript
const result1 = 3 + '30';  // => 3이 문자열로 바뀌며 결과는 문자열 '330'이 나온다.
const result2 = 3 * '30';  // => '30'이 숫자로 바뀌며 결과는 숫자 '90'이 나온다.
```

위와 같이 숫자와 문자열을 같이 사용하는 경우 혼란할 수 있으니 최대한 숫자는 숫자끼리, 문자열은 문자열끼리 다뤄야 한다. 즉, 숫자가 필요할 땐 따옴표를 쓰지 말아야 한다. 다만 모호한 경우라면 사용자 입력을 받을 때가 있겠는데, 이 경우 대체로 사용자 입력이 문자열로 들어오므로, 숫자가 필요할 경우 숫자로 바뀔 수 있도록 조정이 필요하다.


### 심볼
심볼(symbol)은 유일한 토큰을 나타내기 위해 ES6에서 새로 도입한 데이터 타입이다. 심볼은 항상 유일하며, 다른 어떤 심볼과도 일치하지 않는다. 이런 면에서는 심볼은 객체와 유사하다.(객체도 모두 유일하다) 항상 유일하다는 점을 제외하면 원시 값의 특징을 모두 가지고 있으므로 확장성 있는 코드를 만들 수 있다.

아래는 심볼을 만든 예시다. 심볼은 Symbol() 생성자로 만든다.

```JavaScript
const RED = Symbol("The color of a sunset!");
const ORANGE = Symbol("The color of a sunset!");

RED === ORANGE // => false: 심볼은 모두 서로 다르다.
```


---


## 객체
원시 타입이 단 하나의 값만 나타낼 수 있고 불변이라면, 이와 달리 개게는 여러 가지 값이나 복잡한 값을 나타낼 수 있으며 변할 수도 있다. 객체의 본질은 컨테이너다. 컨테이너의 내용물은 시간이 지나면서 바뀔 수 있지만, 내용물이 바뀐다고 컨테이너가 바뀌지는 않는다. 즉, 여전히 같은 객체다. 

객체에도 중괄호({})를 사용하는 리터럴 문법이 있다.

```JavaScript
const obj = {};
```

객체의 콘텐츠는 프로퍼티(property) 또는 멤버(member)라고 부른다. 프로퍼티는 Key(이름)와 Value(값)으로 구성된다. 프로퍼티 이름은 반드시 문자열이나 심볼이어야 하며, 값은 어떤 타입이든 상관 없고 다른 객체여도 괜찮다.

아래는 obj 객체에 color 프로퍼티를 추가한 것이다.

```JavaScript
obj.color = "yellow";
```

프로퍼티 key에 유효한(존재하는) 식별자를 쓸 때만 '멤버 접근 연산자(member access operator)'**(.)** 를 사용할 수 있다. 프로퍼티 key에 유효하지 않은 key를 쓴다면 '계산된 멤버 접근 연산자(computed member access operator)'**([])**를 써야 한다. 참고로 계산된 멤버 접근자는 key가 유효한 식별자여도 접근할 수 있다.

```JavaScript
obj["not an identifier"] = 3;// 유효한 식별자가 아닌 문자열 "not an identifier"이므로 대괄호 []를 사용
obj["not an identifier"];    // => 3
obj["color"];                // => "yellow"
```

심볼 프로퍼티에 접근할 때도 대괄호를 사용한다.

```JavaScript
const SIZE = Symbol();

obj[SIZE] = 8;
obj[SIZE];              // => 8
```

이제 obj 객체에는 "color"(유효한 식별자 문자열), "not an identifier"(유효하지 않은 식별자 문자열), SIZE(심볼) 세 가지 프로퍼티가 있다. 다만 주의할 것은 프로퍼티 SIZE는 문자열 SIZE가 아니라 심볼 SIZE인 것이다. 예를 들어 obj.SIZE = 0을 입력하고 obj[SIZE]와 obj["SIZE"]를 입력해 보면 이 사실을 확인할 수 있다. 

> 자바스크립트 콘솔에서 이 예제를 실행해 보면 콘솔에서는 SIZE를 obj의 프로퍼티로 나열하지 않는다.(심볼 프로퍼티는 다르게 처리되며 기본적으로 표시되지 않는다.)

다시 상기하면 위 섹션에서 변수 obj에 저장된 객체를 수정했지만, obj는 항상 같은 객체를 가리키고 있었다. 반대로 obj에 저장된 것이 문자열이나 숫자, 기타 다른 원시 타입이었으면 수정할 때마다 다른 값을 가리켰을 것이다. 달리 말하면 obj는 계속 같은 객체를 가리키고 있었으며, 바뀐 것은 객체의 프로퍼티다.

객체 리터럴 문법에서는 객체를 만드는 동시에 프로퍼티를 만들 수 있다. **중괄호 안에서 '각 프로퍼티는 쉼표로 구분'하고, '프로퍼티의 key와 value는 콜론으로 구분'한다.**

```JavaScript
const sam1 = {
    name: "Sam",
    age: 4,
};

const sam2 = { name: 'Sam', age: 4 }; // 한 줄로 선언한 버전

const sam3 = {
    name: 'Sam',
    age: 4,
    classification: {                 // 프로퍼티로 또 다른 객체를 사용할 수도 있다.
       kingdom: 'Anamalia',
       phylum: 'Chordata',
       class: 'Mamalia',
       order: 'Carnivoria',
       family: 'Felidae',
       subfamily: 'Felinae',
       genus: 'Felis',
       species: 'catus',
    },                                // 프로퍼티이므로 쉼표로 구분한다.
};
```

아래는 sam3의 family에 접근하는 방법들이다.

```JavaScript
sam3.classification.family;    // => "Felidae"
sam3["classification"].family; // => "Felidae"
sam3.classification["family"]; // => "Felidae"
sam3["classification"]["family"]; // => "Felidae"
```

객체에 함수를 담을 수도 있다. 

```JavaScript
sam3.speak = function() { return "Meow!"; };
```

이제 함수 뒤에 괄호를 붙여 함수를 호출할 수 있다.

```JavaScript
sam3.speak()    // => "Meow!"
```

마지막으로 객체에서 프로퍼티를 삭제할 때는 delete 연산자를 사용한다.

```JavaScript
delete sam3.classification;    // classfication 트리 전체가 삭제된다.
delete sam3.speak;             // Speak 함수가 삭제된다.
```


---


## 배열
자바스크립트 배열은 특수한 객체다. 일반적인 객체와 달리 배열 콘텐츠에는 항상 순서가 있고, key는 순차적인 숫자로 구성된다. 다른 언어와 비교하면 자바스크립트의 배열이 C 언어의 indexed array와 더 강력한 동적 배열, linked list를 혼압한 것임을 알 수 있다. 자바스크립트 배열에는 다음과 같은 특징이 있다.

* 배열 크기는 고정되지 않는다. 즉, 언제든 요소를 추가하거나 제거할 수 있다.

* 요소의 데이터 타입을 가리지 않는다. 즉, 문자열만 써야하는 배열이라든지 숫자만 쓸 수 있는 배열 같은 개념이 아예 없다.(다만 혼란스럽지 않도록 통일을 권장한다.)

* 배열 index는 0으로 시작한다.

자바스크립트의 배열 리터럴은 다음과 같이 대괄호 안에 배열 요소를 쉼표로 구분해서 쓴다.

```JavaScript
const a1 = [1, 2, 3, 4];
const a2 = [1, 'two', 3, null];    // 여러 타입으로 구성된 배열
const a3 = [
    "What the hammer? What the chain?",
    "In what furnace was thy brain?",
    "What the anvil? What dread grasp",
    "Dare its deadly terrors clasp?",
];

const a4 = [                        // 객체가 든 배열
    { name: "Ruby", hardness: 9 },
    { name: "Diamond", hardness: 10 },
    { name: "Topaz", hardness: 8 },
];

const a5 = [                        // 배열이 든 배열
    [1, 3, 5],
    [2, 4, 6],
];
```

배열에는 요소 수를 반환하는 length 프로퍼티가 있다.

```JavaScript
const arr = ['a', 'b', 'c'];
arr.length;                          // => 3
```

배열 요소에 접근할 때는 대괄호 안에 요소의 index 숫자를 넣는다.

```JavaScript
const arr = ['a', 'b', 'c'];

arr[0];                 // => 'a'
arr[arr.length - 1];    // => 'c': 배열의 마지막 요소 인덱스
```

배열 요소의 값을 덮어쓸 떄는 새 값을 할당하면 된다.

```JavaScript
const arr = [1, 2, 'c', 4, 5];

arr[2] = 3;    // 이제 arr은 [1, 2, 3, 4, 5]이다.
```

참고로 객체의 배열 요소를 여러 행에 나눠 썼을 때 마지막에 있는 쉼표를 trailing comma, danging comma, terminal comma라고 부른다. 객체를 잘라내서 붙여넣는 일이 많고, 객체 마지막에 프로퍼티를 추가하는 경우가 많으므로 쓰는 것을 권장한다. 상식으로 여기는 프로그래머도 많다. 다만 언제나 팀의 스타일에 맞게 코드를 구현하는 것이 중요하다.


---


## 날짜
JSTDG_7th 정리 참조


## 정규표현식
(regex 또는 regexp로도 쓰는) 정규표현식(regular expression)은 자바스크립트의 부속 언어에 가깝다. 정규표현식은 여러 가지 프로그래밍 언어에서 일종의 확장으로 제공하며, 문자열에서 필요한 복잡한 검색과 교체 작업을 비교적 단순하게 만든다. 자바스크립트의 정규표현식은 RegExp 객체를 사용한다. 슬래시 한 쌍(/.../) 사이에 심볼을 넣는 리터럴 문법도 있다.

```JavaScript
// 극히 간단한 이메일 정규표현식
const email = /\b[a-z0-9._-]+@[a-z_-]+(?:\.[a-z]+)\b/; // 슬래시 한 쌍

// 미국 전화번호 정규표현식
const number = /(:?\+1)?(:?\(\d{3}\)\s?|\d{3}[\s-]?)\d{3}[\s-]?\d{4}/;
```


---


## 데이터 타입 변환

### 숫자로 바꾸기
문자열을 숫자로 바꿔야 할 경우가 많다. 주로 사용자에게 받은 입력을 숫자로 바꾸는 경우가 많다. 자바스크립트에는 문자열을 숫자로 바꾸는 방법이 여럿 있다.

1. Number 객체 생성자를 사용한다. 숫자로 바꿀 수 없는 문자열은 NaN을 반환한다.

```JavaScript
const numStr = "33.3";
const num = Number(numStr);
```

2. 내장 함수인 parseInt나 parseFloat 함수를 사용한다. 이들은 Number 객체 생성자와 비슷하지만 몇 가지 다른 점이 있다.

parseInt를 사용할 때는 기수(radix)를 넘길 수 있다. 기수는 변환할 문자열이 몇 진수 표현인지 지정한다. 예를 들어 16진수를 변환할 때는 기수를 16진수를 넘긴다.(기본값은 10이며, 기수를 쓰지 않는다면 자연스럽게 10진수로 된다.) 기수는 항상 쓰는 것을 권장한다.(parseInt(string, radix))

```JavaScript
const a = parseInt("16 volts", 10);    // => 10진수 16: "volts"는 무시된다. 

const b = parseInt("3a", 10);          // => 58: 16진수 3a가 10진수로 바뀐다.

const c = parseFloat("15.5kph");       // => 15.5: 기수가 없으므로 기본값인 10진수로 계산된다.
```

3. Date 객체를 숫자로 바꿀 때는 valueOf() 메서드를 사용한다. 이 숫자는 UTC 1970년 1월 1일 자정부터 몇 밀리 초가 지났는지 나타낸다.

```JavaScript
const d = new Date();
const ts = d.valueOf();
```

4. 불리언 값을 1(true)나 0(false)로 바꿔야 할 때도 있다. 이럴 때는 조건 연산자를 사용한다.

```JavaScript
const b = true;
const n = b ? 1 : 0;
```


### 문자열로 바꾸기
자바스크립트의 모든 객체에는 문자열 표현을 반환하는 toString() 메서드가 있다. 사실 문자열 병합에서 자동으로 숫자를 문자열로 바꿔주기 때문에 toString() 메서드는 대체로 사용되지 않는 편이다. 


```JavaScript
const n = 33.5;
n;                       // => 33.5: 숫자

const s = n.toString();
s;                       // => "33.5": 문자열
```

### 불리언으로 바꾸기
보통 부정 연산자(!)를 써서 모든 값을 불리언으로 바꿀 수 있다.

```JavaScript
const n = 0;   // 거짓 같은 값

const b1 = !!n;    // => false

const b2 = Boolean(n);    // => false
```


---


## 참조형과 원시형

* 원시 값은 불변이고, 원시 값을 복사/전달할 때는 값 자체를 복사/전달한다. 따라서 '원본'의 값이 바뀌더라도 '사본' 값이 따라서 바뀌지는 않는다.

```JavaScript
let a = 1;    // 원본
let b = a;    // 사본. b=1이지만 a가 아니다.

a = 2;        // 원본의 값을 바꿔도
console.log(b)// b의 값은 여전히 1이다.
```

또한, 값 자체를 복사했으므로 변수와 값은 일치한다.

```JavaScript
a === 2       // => true
```

값 자체를 전달하므로 함수 안에서 변수의 값이 바뀌어도 함수 외부는 바뀌지 않는 상태로 남는다.


```JavaScript
function change (a) {
    a = 5;         // 함수 안에서 값을 바꿔도
}

a = 3;             // a = 3
change(a);         // 함수를 적용했지만
console.log(a);    // => 3: 함수 외부는 바뀌지 않는다.
```

* 반면 원시 값과 달리 객체는 가변이고, 객체를 복사/전달할 때는 객체가 아니라 **그 객체를 참조하고 있다는 사실**을 복사/전달한다.

```JavaScript
let o = {a: 1};
let p = o;
o.a = 2;
console.log(p)    // => {a:2}
```

다음 예제는 주의할 점을 보여준다.

```JavaScript
let o = {a: 1};
let p = o;

p === o           // => true

o = {a: 2};       // 이제 o는 다른 것을 가리킨다. 즉, {a: 1}을 수정한 것이 아니다.

p === o           // => false
console.log(p)    // => {a: 1}
```

객체를 가리키는 **변수는 그 객체를 가리키고 있을 뿐, 객체 그 자체가 아니다.** 따라서 변수와 객체는 결코 일치하지 않는다.


```JavaScript
let q = {a: 1};
q === {a: 1}        // => false
```

참조를 전달하므로 함수 안에서 객체를 변경하면 함수 외부에서도 바뀐다.


```JavaScript
function change_o {
    o.a = 999;
};

let o.a = {a: 1};    // o의 프로퍼티를 정의
change_o(o);         // o의 프로퍼티를 변경하는 함수
console.log(o)       // {a: 999}
```


---