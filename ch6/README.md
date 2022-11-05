# 함수

모든 함수에는 바디가 있다. 함수 바디는 함수를 구성하는 문의 모음이다.

```JavaScript
function sayHello() {
    // 함수 바디는 여는 중괄호로 시작하고

    console.log("Hello, world!");
    console.log("안녕하세요!");

    // 닫는 중괄호로 끝난다.
}
```

위는 함수 선언(function declaration)의 한 예다. 이 선언만으로는 함수 바디의 문들이 실행되지 않는다. 실행을 하기 위해서는 함수를 호출해야 한다. 함수 호출은 이름 다음에 괄호를 쓴다.

```JavaScript
sayHello();
```


---


## 반환 값

함수 호출도 표현식이고, 따라서 값이 된다. 그 값을 반환 값이라고 한다. 함수 바디 안에 return 키워드를 사용하면 **함수를 즉시 종료하고 값을 반환**한다.

```JavaScript
function getGreeting() {
    return "Hello, world";
}
```

이제 함수를 호출하면 함수 호출은 반환 값이 된다.

```JavaScript
getGreeting();    // => "Hello, world"
```

return을 명시적으로 호출하지 않으면 반환 값은 undefined가 된다.


## 호출과 참조

자바스크립트에서는 함수도 객체다. 따라서 다른 객체와 마찬가지고 넘기거나 할당할 수 있다. 여기서 함수 호출과 참조의 차이를 이해하는 것이 중요하다. 함수 식별자 뒤에 <U>괄호를 쓰면</U> 자바스크립트는 **함수를 호출**하려 한다고 이해하고, 함수 바디를 실행한다. 그리고 함수를 호출한 표현식은 반환 값이 된다. <U>괄호를 쓰지 않으면</U> 자바스크립트는 **함수를 참조**한다고 이해하며, 그 함수는 실행되지 않는다. 

```JavaScript
getGreeting();    // => "Hello, world"
getGreeting;      // => function getGreeting()
```

이때 함수를 호출하지 않고 다른 값들과 마찬가지로 참조하기만 할 수 있다는 특징은 자바스크립트를 매우 유연한 언어로 만든다. 예를 들어 함수를 변수에 할당하면 다른 이름으로 함수를 호출할 수 있다.

```JavaScript
const f = getGreeting;

f();    // => "Hello, world"
```

함수를 객체 프로퍼티에 할당할 수도 있다.

```JavaScript
const o = {};

o.f = getGreeting;
o.f();              // => "Hello, world"
```

배열 요소로도 할당할 수 있다.

```JavaScript
const arr = [1, 2, 3];

arr[1]  = getGreeting;    // arr은 이제 [1, function getGreeting(), 2]이다.
arr[1]();                 // "Hello, world"
```

> 참고로 함수가 아닌 값 뒤에 괄호를 붙이면 에러가 일어난다. 예를 들어 "whoops"()는 TypeError: "whoops" is not a functuon 에러를 일으킨다.



## 매개변수
함수를 호출하면서 정보를 전달하기 위해서는 함수 매개변수(**argument parameter**)를 이용한다. **매개변수는 함수가 호출되기 전에는 존재하지 않는다**는 점만 제외하면 일반적인 변수와 마찬가지다.

> 수학에서 2차 함수 $f(x,y) = x^2 + y^2$가 있다고 하면, 이 함수는 두 개의 argument를 갖는다, 바로 x와 y다. 

```JavaScript
// 숫자형 매개변수 두 개를 받고 평균을 반환하는 함수
function avg(a, b) {
    return (a + b)/2;
}
```

위 함수에서 a와 b를 정해진 매개변수(formal argument)라고 한다. 함수가 호출되면 정해진 매개변수는 값을 받아 실제 매개변수(actual argument)가 된다.

```JavaScript
avg(5, 10);    // => 7.5
```

위는 formal argument a,b에 각각 값 5와 10을 받아 actual argument가 된다. 실제 매개변수는 변수와 매우 비슷하지만, 함수 바디 안에서만 존재한다.

```JavaScript
const a = 5, b = 10;

avg(a, b);
```

첫 행의 변수 a, b는 함수 avg의 매개변수인 a, b와 <U>같은 이름이지만, 엄연히 다른 변수</U>다. 함수를 호출하면 함수 매개변수는 변수 자체가 아니라 그 값을 전달받는다. 

```JavaScript
function f(x) {
    console.log(`f 내부: x=${x}`);
    x = 5;
    console.log(`f 내부: x=${x} (할당 후)`);
}


let x = 3;
console.log(`f를 호출하기 전: x=f{x}`);    // => f를 호출하기 전: x=3
f(x);                                   // => f 내부: x=3
                                        // => f 내부: x=5 (할당 후)
console.log(`f를 호출한 후: x=f{x}`);      // => f를 호출한 후: x=3
```

위 예제를 잘 보면 함수 안에서 x의 값을 할당하더라도, 함수 바깥의 이름이 같은 변수인 x에는 아무런 영향이 없는 것을 볼 수 있다. 이름만 같고 둘은 완전히 다른 개체인 것이다.

이처럼 함수 안에서 매개변수 값을 할당해도 함수 바깥에 있는 어떤 변수에도 영향이 미치지 않는다. 다만 **함수 안에서 객체 자체를 변경하면 그 객체는 함수 바깥에서도 바뀐 점이 반영된다.**

```JavaScript
function f(o) {
    o.message = `f 안에서 수정함 (이전 값: '${o.message}')`;
}

let o = {
    message: "초기 값"
};

console.log(`f를 호출하기 전: o.message="${o.message}"`);    // => o.message="초기 값"

f(o);

console.log(`f를 호출한 후: o.message="${o.message}"`);      // => o.message="f 안에서 수정함 (이전 값: '초기 값')"
```

**이것이 원시 값과 객체의 핵심적인 차이다.** 원시 값은 불변이므로 수정할 수 없다.(물론 원시 값을 담은 변수를 다른 값으로 대체는 가능하다.) 반면 객체는 바뀔 수 있다.

또한 함수 안의 o와 함수 바깥의 o는 서로 다른 개체다. 하지만 그 둘은 같은 객체를 가리키고 있다. 아래 코드를 보자.

```JavaScript
function f(o) = {
    o.message = "f에서 수정함";
    
    o = {
        message: "새로운 객체!"
    };
    
    console.log(`f 내부: o.message="${o.message}" (할당 후)`);
}

let o = {
    message = '초기 값'
};

console.log(`f를 호출하기 전: o.message="${o.message}"`);    // => f를 호출하기 전: o.message='초기 값'

f(o);                                                     // => f 내부: o.message="새로운 객체!" (할당 후)

console.log(`f를 호출한 후: o.message="${o.message}"`);      // => f를 호출한 후: o.message="f에서 수정함"
```

이 예제를 이해하려면 함수 내부의 매개변수 o와 함수 바깥의 변수 o가 다르다는 점을 명심하면 된다. f를 호출하면 둘은 같은 객체를 가리키지만, f 내부에서 o에 할당한 객체는 <U>새로운, 전혀 다른</U> 객체다. 반면 함수 밖의 o는 그대로 원래 객체를 가리키고 있다.

> 컴퓨터 과학에서 자바스크립트의 원시 값을 value type(값 타입)이라고 한다. 원시 값을 전달할 때 value가 복사되기 때문이다. 반면 객체는 reference type(참조 타입)이라고 한다. 객체를 전달할 때 두 변수는 같은 객체를 가리키기 때문이다.


### 매개변수가 함수를 결정하는가?
여러 언어에서 함수의 시그니처(signature)에는 매개변수가 포함된다. 예를 들어 C 언어에서 매개변수 없는 함수 f()는 매개변수가 하나인 함수 f(x)와 다르고, f(x)는 매개변수가 두 개인 함수 f(x,y)와 다르다. 하지만 **자바스크립트에는 그런 차이가 없다.** 함수 f가 있다면 호출할 때 <U>매개변수를 한 개 전달하든, 열 개를 전달하든 같은 함수를 호출하는 것</U>이다.

다시 말해, 어떤 함수를 호출하든 그 함수에서 정해진 매개변수 숫자와 관계없이 몇 개의 매개변수를 전달하든 상관 없다.(정해진 매개변수에 값을 제공하지 않으면 임시적으로 undefined가 할당된다.)

```JavaScript
function f(x) {
    return `in f: x=${x}`;
}

f();    // => "in f: x=undefined"
```


### 매개변수 해체
매개변수도 해체할 수 있다.

```JavaScript
function getSentence({ subject, verb, object }) {
    return `${subject} ${verb} ${object}`;
}

const o = {
    subject: "I",
    verb: "love",
    object: "JavaScript",
};

getSentence(o);    // => "I love JavaScript"
```

해체 할당과 마찬가지로 프로퍼티 이름은 반드시 유효한 식별자여야 하며, 들어오는 객체에 해당하는 프로퍼티가 없는 변수는 undefined를 할당받는다.

아래는 배열을 해체한 예시다.

```JavaScript
function getSentence([ subject, verb, object ]) {
    return `${subject} ${verb} ${object}`;
}

const arr = [ "I", "love", "JavaScript" ];

getSentence(arr);   // => "I love JavaScript"
```

확산 연산자(...)를 써서 남는 매개변수를 이용할 수도 있다.

```JavaScript
// 이후 더 좋은 방법을 배울 것이다.
function addPrefix(prefix, ...words) {
    
    const prefixedWords = [];

    for(let i = 0; i < words.length; i++) {
        prefixedWords[i] = prefix + words[i];    // 매개변수로 받은 문자열을 합친다.
    }

    return prefixedWords;
}

addPrefix("con", "verse", "vex");    // => ["converse", "convex"]
```

함수를 선언할 때 **확산 연산자는 반드시 마지막 매개변수여야 한다.** 만약 뒤에 다른 매개변수가 있다면, 어디까지를 확산 매개변수에 할당해야 할지 판단할 수 없기 때문에 에러가 일어난다.


### 매개변수 기본값

ES6부터 매개변수에 기본값(default value)를 지정하는 기능도 추가됐다.(일반적으로 매개변수에 값을 제공하지 않으면 undefined가 할당된다.)

```JavaScript
function f(a, b = "default", c = 3) {
    return `${a} - ${b} - ${c}`;
}

f(5, 6, 7);    //=> "5 - 6 - 7"
f(5, 6);       //=> "5 - 6 - 3": 값을 제공받지 않은 c는 기본값이 들어간다.
f(5);          //=> "5 - default - 3"
f();           //=> "default - default - 3"
```


### 객체의 프로퍼티인 함수

객체의 프로퍼티인 함수를 **메서드(method)**라고 부르며 일반적인 함수와 구분한다.

```JavaScript
const o = {
    name: 'Wallace',                        // 원시 값 프로퍼티
    bark: function() { return 'Woof!';},    // 함수 프로퍼티(메서드)
}
```

ES6부터는 간단히 메서드를 추가할 수 있는 기능이 생겼다.

```JavaScript
const o = {
    name: 'Wallace',
    bark() { return 'Woof!'; },
}
```


### this 키워드

함수 바디 안에는 특별한 읽기 전용 값인 this가 있다. this는 객체지향 프로그래밍 개념과 밀접한 연관이 있다. 다양한 활용법이 있지만 일반적으로 this는 객체의 프로퍼티인 함수, 즉 메서드에서 의미가 있다. 메서드를 호출하면 this는 호출한 메서드를 소유하는 객체가 된다.

```JavaScript
const o = {
    name = 'Wallace',
    speak() { return `My name is ${this.name}!`; },    // 메서드 안에서 this가 o에 묶인다.
}
```

위 메서드를 호출하면

```JavaScript
o.speak();    // => "My name is Wallace!"
```

this는 함수를 어떻게 선언했는가가 아니라, 어떻게 호출했느냐에 따라 달라진다. 즉, this가 o에 묶인 이유는 <U>speak가 o의 프로퍼티여서가 아니라, **o에서 speak를 호출했기 때문이다.**</U>

그렇다면 o에서 호출하지 않으면 어떻게 될까? 아래는 같은 함수를 변수에 할당했을 경우다.

```JavaScript
const speak = o.speak;

speak === o.speak;    //=> True: 두 변수는 같은 함수를 가리킨다.

speak();              //=> "My name is undefined!"
```

함수를 이렇게 호출하면 자바스크립트는 이 함수가 어디에 속하는지 알 수 없으므로 this는 undefined에 묶인다.

메서드라는 용어는 원래 객체지향 프로그래밍의 개념이지만, 이 책에서는 객체의 프로퍼티며, o.speak()처럼 <U>객체 인스턴스에서 호출할 의도로 만든 함수</U>라는 의미로 사용할 것이다. 반대로 함수에서 this를 사용하지 않는다면 어디에서 선언했든 관계없이 함수라 부를 것이다.

이런 성격 때문에 중첩된 함수 안에서 this를 사용하면 혼란스러울 때가 많다.

```JavaScript
const o = {
    
    name: 'Julie',
    
    greetBackwards: function() {
        
        function getReverseName() {            
            let nameBackwards = '';

            for(let i = this.name.length - 1; i >= 0; i--) {    // name의 인덱스를 거꾸로 진행하는 i.
                nameBackwards += this.name[i];                  // 각 인덱스의 철자를 맨 뒤부터 차례로 문자열에 넣는다.
            }

            return nameBackwards;
        }
        
        return `${getReverseName()} si enam ym, olleH`;

    },

};

o.greetBackwards();    //=> 동작하지 않는다.
```

위 예제는 Julie라는 이름을 거꾸로 쓰고자 중첩된 함수 getReverseName를 만들었다. 하지만 getReverseName은 의도대로 작동하지 않는다.

o.greetBackwards()를 호출하는 시점에서 사용했다면 자바스크립트는 this를 의도대도 o에 연결했겠지만, 안의 중첩된 함수인 getReverseName에서 this를 호출했기 때문에 this는 o가 아닌 다른 것에 묶인다.(스트릭트 모드인지 아닌지에 따라 undefined가 되기도 하고, 전역 객체에 묶이기도 한다. 물론 이런 상황 자체를 피해야 하는 게 정답이다.) 

이런 불상사를 피하는 방법으로 '다른 변수에 this를 할당하기'가 있다.

```JavaScript
const o = {

    name = 'Julie',

    greetBackwards: function() {
        const self = this;           // this를 self 변수에 할당한다.

        function getReverseName() {
            let nameBackwards = '';

            for(let i = self.name.length - 1; i >= 0; i--) {
                nameBackwards += self.name[i];
            };

            return nameBackwards;
        }

        return `${getReverseName()} si eman ym ,olleH`;

    },
};

o.greetBackwards();
```

이처럼 다른 변수에 this를 할당하는 방법은 널리 쓰이며, this를 self나 that에 할당하는 코드를 자주 볼 것이다. 추후 설명할 화살표 함수를 사용해도 이 문제를 해결할 수 있다.


---


## 함수 표현식과 익명 함수

> [함수 표현식과 함수 선언식](https://joshua1988.github.io/web-development/javascript/function-expressions-vs-declarations/)

* 함수 선언식(function declarations)

```JavaScript
function 함수명() {
    // 구현 로직
}

// 예시
function funcDeclarations() {
    return 'A function Declaration';
}

funcDeclarations();    //=> 'A function Declaration'
```

* 함수 표현식(function expressions)

```JavaScript
var 함수명 = function() {
    // 구현 로직
};

// 예시
var funcExpression = function() {
    return 'A function expression';
}

funcExpression();    //=> 'A function expression'
```

> [익명 함수](https://velog.io/@blackb0x/%EC%9D%B5%EB%AA%85%ED%95%A8%EC%88%98Anonymous-function)

* 익명 함수(anonymous function): 함수명 대신 변수명에 함수 코드를 저장하는 구현 방식

```JavaScript
var 함수명 = function () {
    // 구현 로직
};
```

함수를 선언하면 함수 바디와 식별자가 모두 주어진다. 그런데 자바스크립트는 익명 함수(anonymous function)도 지원한다. 익명 함수에서는 함수에 식별자가 주어지지 않는다.

그렇다면 식별자가 없다면 어떻게 함수를 호출해야 할까? 답은 함수 표현식(function expression)에 있다. 이미 표현식은 값이고, 함수 역시 값이 된다는 것을 배웠다. 함수 표현식은 함수를 선언하는 한 가지 방법일 뿐이며, 그 함수가 익명이 될 수도 있을 뿐이다.

함수 표현식은 함수 이름을 생략할 수 있다는 점을 제외하면 함수 선언과 문법적으로 완전히 동일하다.

```JavaScript
const f = function() {
    // ...
};
```

위 코드는 원래 함수를 선언했던 것과 마찬가지로 식별자 f가 함수를 가리킨다. 따라서 f()로 이 함수를 호출할 수 있다. 차이점은 먼저 함수 표현식으로 익명 함수를 만들고 그 함수를 변수에 할당했다는 것이다.

익명 함수는 어디든지 쓸 수 있다. 다른 함수나 메서드의 매개변수로 넘길 수도 있고, 객체의 함수 프로퍼티가 될 수도 있다. 

앞서 함수 표현식에서는 함수 이름을 생략할 수 있다고 했다. 그렇다면 함수에 이름을 정하고 다시 변수에 할당하면 어떻게 될까?

```JavaScript
const g = function f() {
    // ...
};
```

이런 식으로 함수를 만들면 이름 g에 우선순위가 있다. 그리고 함수 바깥에서 함수에 접근할 때는 g를 써야 하며, f로 접근하려 하면 변수가 정의되지 않았다는 에러가 뜬다. 

그렇다면 위와 같은 코드를 왜 만드는 것일까? 이유는 재귀(recursion)를 위해서다.

```JavaScript
const g = function f(stop) {
    if(stop) console.log('f stopped');
    
    f(true); // 함수 안에서는 f를 써서 자기 자신을 참조한다.
};

g(false);    // 함수 바깥에서는 g를 써서 함수를 호출한다.
```

함수에 두 가지 이름을 붙이는 것이 좋을 이유는 없지만, 여기서 그리 한 이유는 이름 붙은 함수 표현식이 어떻게 동작하는지 명확하기 보기 위해서다.

함수 선언과 함수 표현식이 완전히 똑같이 보인다면, 자바스크립트는 둘을 어떻게 구분할까? 답은 컨텍스트다. 함수 선언이 표현식으로 사용됐다면, 그건 함수 표현식이다. 표현식으로 사용되지 않았다면 함수 선언이다.

복잡하게 생각할 필요는 없다. 나중에 호출할 생각으로 함수를 만든다면 함수 선언을 사용하면 되고, 다른 곳에 할당하거나 다른 함수에 넘길 목적으로 함수를 만든다면 함수 표현식을 사용하면 된다.


---


## 화살표 표기법

ES6에서 새로 만든 화살표 표기법(arrow notation)은 간단히 말해 function이라는 단어와 중괄호 숫자를 줄이기 위해 고안된 문법이다. 

화살표 함수에는 세 가지 단축 문법이 있다.

* function을 생략해도 된다.

* 함수에 매개변수가 단 하나 뿐이라면, 괄호(())도 생략할 수 있다.

* 함수 바디가 표현식 하나라면 중괄호와 return 문도 생략할 수 있다.

화살표 함수는 항상 익명이다. 화살표 함수도 변수에 할당할 수는 있지만, function 키워드처럼 이름 붙은 함수를 만들 수는 없다.

아래 예제에 있는 표현식은 동등한 한 쌍이다.

```JavaScript
const f1 = function() { return 'Hello!'; }

const f1 = () => "hello!";    // function을 생략, 중괄호와 return 문도 생략했다.
```

```JavaScript
// 매개변수가 단 하나인 경우
const f2 = function(name) { return `Hello, ${name}!`;}

const f2 = name => `Hello, ${name}!`;    // function과 괄호(매개변수가 단 하나이므로) 생략, 중괄호와 return 문도 생략했다. 
```

```JavaScript
const f3 = function(a, b) { return a + b; }

const f3 = (a, b) => a + b;
```

위 예제는 다분히 인위적이다. 이름 붙은 함수가 필요하다면 그냥 일반적인 함수 선언을 사용하면 된다. 화살표 함수는 **익명 함수를 만들어 다른 곳에 전달하려 할 때 가장 유용**하다.

화살표 함수에는 일반적인 함수와 다른 중요한 차이점을 가진다. this가 다른 변수처럼 정적으로(lexically) 묶인다는 것이다. 아래는 예전에 살펴본 greetBackwards 예제를 화살표 함수를 사용한 것이다. 화살표 함수를 사용하면 내부 함수 안에서 this를 사용할 수 있다.

> [lexical scoping이란?](https://www.zerocho.com/category/JavaScript/post/5740531574288ebc5f2ba97e)

```JavaScript
const o = {

    name = 'Julie'

    getBackwards = function () {
        
        const getReverseName = () => {    // 화살표 함수
            
            let nameBackwards = '';

            for(let i = this.name.length - 1; i >= 0; i--) {
                nameBackwards += this.name[i];
            }

            return nameBackwards;
        };

        return `${getReverseName()} si eman ym, olleH`;
    },

};

o.greetBackwards();
```

화살표 함수에는 일반적인 함수와 다른 점이 두 가지 더 있다. 추후 설명할 객체 생성자로 사용할 수 없고, arguments 변수도 사용할 수 없다. 하지만 ES6에서 확산 연산자가 생겼으니 arguments 변수는 필요 없긴 하다.


---


## call과 apply.bind

this를 사용하는 일반적인 방법은 이미 살펴보았다. 다른 객체지향 언어에서도 this를 이런 식으로 사용한다. 자바스크립트에서는 일반적인 방법 외에도, 함수를 어디서, 어떻게 호출했느냐와 관계없이 this가 무엇인지 지정할 수 있다. 

먼저 call 메서드를 보자. call 메서드는 모든 함수에서 사용할 수 있으며, this를 특정 값으로 지정할 수 있다.

```JavaScript
const bruce = { name: "Bruce" };
const madeline = { name: "Madeline" };

// 이 함수는 어떤 객체에도 연결되지 않았지만 this를 사용한다.
function greet() {
    return `Hello, I'm ${this.name}!`;
}

greet();                //=> "Hello, I'm undefined"
greet.call(bruce)       //=> "Hello, I'm Bruce"
greet.call(madeline)    //=> "Hello, I'm Madeline"
```

함수를 호출하면서 call 메서드를 사용해 this에 할당할 객체를 넘겼다. call의 첫 번째 매개변수는 this로 사용할 값이고, 매개변수가 더 있다면 그 매개변수는 호출하는 함수로 전달된다.

```JavaScript
function update(birthYear, occupation) {
    this.birthYear = birthYear;
    this.occupation = occupation;
}

update.call(bruce, 1949, 'singer');
    // bruce는 이제 { name: "Bruce", birthYear: 1949, occupation: "singer" }이다.

update.call(madeline, 1942, 'actress');
    // madeline은 이제 { name: "Madeline", birthYear: 1942, occupation: "actress" }이다.
```

apply는 함수 매개변수를 처리하는 방법을 제외하면 call과 완전히 같다. call은 일반적인 함수와 마찬가지로 매개변수를 직접 받지만, <U>apply는 매개변수를 배열로 받는다.</U>

```JavaScript
update.apply(bruce, [1955, 'actor']);
    // bruce는 이제 { name: "Bruce", birthYear: 1955, occupation: "actor" }이다.

update.apply(madeline, [1918, 'writer']);
    // madeline은 이제 { name: "Madeline", birthYear: 1918, occupation: "writer" }이다.
```

이런 특성 때문에 **apply는 배열 요소를 함수 매개변수로 사용해야 할 때 유용**하다. apply를 설명할 때 흔히 사용하는 예제는 배열의 최솟값과 최댓값을 구하는 것이다. 자바스크립트의 내장 함수인 Math.min과 Math.max는 매개변수를 받아 그중 최솟값과 최댓값을 각각 반환한다. apply를 사용하면 기존 배열을 이들 함수에 바로 넘길 수 있다.

```JavaScript
const arr = [2, 3, -5, 15, 7];

Math.min.apply(null, arr);    //=> -5
Math.max.apply(null, arr);    //=> 15
```

위 예제에서 this 값에 null을 넣은 이유는 Math.min과 Math.max가 this와 관계없이 동작하기 때문이다.(즉, 무엇을 넘기든 관계없다.)

참고로 ES6의 확산 연산자(...)를 사용해도 apply와 마찬가지의 결과를 얻을 수 있다. 

```JavaScript
const = newBruce = [1940, "martial artist"];

update.call(bruce, ...newBruce);    // 배열을 받는 apply(bruce, newBruce)와 동일하다.

Math.min(...arr);    //=> -5
Math.max(...arr);    //=> 15
```

this 값을 바꿀 수 있는 마지막 함수는 bind다. bind를 사용하면 함수의 this 값을 영구히 바꿀 수 있다. update 메서드를 이리저리 옮기면서 호출할 때 this의 값이 항상 bruce가 되게끔(call이나 apply, 다른 bind와 함께 호출하더라도) 할 수 있다.

```JavaScript
const updateBruce = update.bind(bruce);

updateBruce(1904, "actor");
    // bruce는 이제 { name: "Bruce", birthYear: 1904, occupation: "actor" }이다.

updateBruce.call(madeline, 1274, "king");
    // bruce는 이제 { name: "Bruce", birthYear: 1274, occupation: "king" }이다.
    // bind로 인해 bruce는 변하지 않았다.
```

다만 bind는 함수의 동작을 영구적으로 고정하기 때문에 찾기 힘든 버그의 원인이 될 수 있다. 사실 bind를 사용한 함수는 call이나 apply, 다른 bind와 함께 사용할 수 없는 것과 마찬가지다. bind는 유용하지만 <u>어디에 함수의 this가 묶이는지를 정확하게 파악하고 사용해야 한다.</U>

다시 정리하면 bind에 매개변수를 넘기면 항상 그 매개변수를 받으며 호출되는 새 함수를 만드는 효과가 있다. 예를 들어 bruce가 태어난 해를 항상 1949로 고정하면서, 직업은 자유롭게 바꿀 수 ㅣ있는 것이다.

```JavaScript
const updateBruce1949 = update.bind(bruce, 1949);

updateBruce1949("singer, songwriter");
    // bruce는 이제 { name: "Bruce", birthYear: 1949, occupation: "singer, songwriter" }이다.
```


---