# 2 자바스크립트 개발 도구

* 깃(Git)

* 노드(Node): 브라우저 밖에서 자바스크립트를 실행할 수 있게 해주는 도구이다. 노드와 함께 설치되는 npm은 이 리스트의 다른 도구를 설치할 때 필요하다.

* 걸프(Gulp): 반복적인 개발 작업을 자동화하는 빌드 도구다. (걸프 대신 그런트(Grunt)도 널리 쓰인다.)

* 바벨(Babel): ES6 코드를 ES5 코드로 변환하는 트랜스컴파일러.

* ES린트(ESLint): 자주 하는 실수를 찾아주는 린트 프로그램


---


## 패키지 관리 도구 npm

노드 개발에서는 npm이 필수라고 해도 과언은 아니다. 실제로 노드 앱을 개발하든, 아니면 브라우저 앱만 개발하든, npm을 사용하면 작업을 편하게 진행할 수 있다.

npm은 패키지를 설치할 때 전역(globally), 또는 로컬(locally)로 설치할 수 있다.

로컬로 설치하는 경우 모듈이 프로젝트 디렉터리에 설치된다.

```
$ npm install underscore
```

프로젝트 루트를 보면 node_modules 디렉터리가 생긴 것을 알 수 있다.

설치하는 모듈이 늘어나면 모듈을 추적하고 관리할 방법이 필요하다. 프로젝트에 설치하고 사용하는 모듈을 의존성(dependency)라고 부르는데, npm은 package.json을 통해 dependency를 관리한다.

package.json은 npm.init 명령을 내리면 알아서 생성된다.(아래는 질문 절차를 대강 넘기기 위해 --y를 추가했다. )

```
$ npm.init --y
```

dependency는 일반 dependency와 개발 dependency로 나뉜다.

* 개발 dependency: 앱을 실행할 때는 필요 없지만, 프로젝트를 개발할 때 필요하거나 도움이 되는 패키지

지금부터는 로컬 패키지를 설치할 때 --save 또는 --save-dev 플래그를 사용할 것이다. 이 플래그를 사용해야 package.json 파일에 등록된다.

아래는 --save 플래그를 써서 언더스코어를 설치하는 코드다.

```
$ npm install --save underscore
```

이렇게 설치가 끝난 경우 package.json 파일 속 dependency 리스트에 언더스코어가 있는 걸 확인할 수 있다.

```
"dependencies": {
  "underscore": "^1.13.6"
},
```

이렇게 package.json 파일에 등록이 됐을 경우 npm install 명령만 하면 패키지를 모두 설치할 수 있다. 원격 저장소에서 패키지 리스트가 저장된 package.json을 동료가 받는 것만으로 모두 동일한 패키지 작업 환경을 구축할 수 있는 것이다.

```
$ npm install
```


---


## 빌드 도구: 걸프
개발 과정에서 피할 수 없는 반복 작업을 자동화해주는 도구가 있다. 걸프와 그런트가 대표적이나 이 책에서는 걸프를 다룰 것이다.

```
$ npm install -g gulp
```

걸프가 설치되면 다음과 같이 gulpfile.js를 만든다.

```JavaScript
const gulp = require('gulp');
   // dependency를 여기 쓴다.

gulp.task('default', function() {
   // 걸프 작업을 여기 쓴다.

});
```


---


## 트랜스컴파일러
대표적인 트랜스컴파일러로 바벨과 트레이서가 있다. 이 책에서는 바벨을 다룬다. 바벨은 ES5를 ES6로 바꾸는 트랜스컴파일러로 시작했고, 프로젝트가 성장하면서 ES6과 리액트(React), ES7 등 여러 가지를 지원하는 범용 트랜스컴파일러가 됐다.

이번 설정은 이 프로젝트에만 적용되게(로컬) 만들 것이다. 아래는 ES6 프리셋 설치다.(질문 여러 개를 물어본다.)

```
$ npm install --save-dev babel-preset-es2015
```

설치가 끝나면 프로젝트 루트에 .babelrc 파일을 만든다.(파일 이름 없이 확장자만 쓰면 숨긴 파일이 된다.) 이 파일의 내용은 다음과 같다.

```
{ "presets": ["es2015"] }
```

이 파일이 있으면 프로젝트에서 바벨을 사용할 때 ES6을 사용한다는 것을 인식하게 된다.

---


## 빌드 도구 걸프로 트랜스컴파일러를 자동화하기
걸프를 이용해서 ES6 코드를 ES5 코드로 바꾸는 일을 하도록 설계한다. 우선 걸프-바벨 패키지를 로컬로 설치할 것이다.

```
$ npm install --save-dev gulp-babel
```

그 다음 gulpfile.js를 수정한다.

```JavaScript
const gulp = require('gulp');
const babel = require('gulp-babel');

gulp.task('default', fuction() {
   // 노드 소스
  gulp.src("es6/**/*.js") // 변환한 파일 지정
  .pipe(babel()) // 바벨에 파이프로 연결
  .pipe(gulp.dest("dist")); // 변환된 파일을 dist 디렉터리에 저장

  // 브라우저 소스
  gulp.sec("puplic/es6/**/*.js") // 위와 마찬가지의 작업
  .pipe(babel())
  .pipe(gulp.dest("dist"));
});
```

걸프는 파이프라인 개념으로 작업을 처리한다. 참고로 걸프는 소스 파일 이름과 디렉터리 구조를 그대로 유지한다. 예를 들어 es6/a.js 파일은 dist/a.js 파일로 컴파일되고, es6/a/b/c.js 파일은 dist/a/b/c.js 파일로 컴파일된다.


---


## 린트
린트 프로그램은 코드를 세심히 검토해서 자주 발생하는 실수를 찾아준다. 이 책에서는 ESLint를 추천한다.

아래는 ESLint를 전역으로 설치하는 코드다.

```
$ npm install -g eslint
```

ESLint를 사용하기 전에 프로젝트에 쓸 설정 파일 .eslintrc을 만들어야 한다. 프로젝트마다 다른 표준이나 규칙에 따라 작업해야 할 수도 있으므로, 그 때마다 알맞게 .eslintrc 파일을 만들어 린트 규칙을 적용할 수 있다.


eslint --init 명령을 내리고 몇 가지 질문에 답하면 기본 .eslintrc 파일이 만들어진다.


ESLint를 사용하는 방법은 여러 가지다. 아래 코드처럼 직접 실행할 수도 있고, 프에디터에 통합하거나 Gulpfile에 추가할 수 있다.

```
eslint es6/test.js
```

만약 gulpfile.js에 추가한다면, 우선 다음을 설치한 뒤 코드를 변경하면 된다.

```
$ npm install --save-dev gulp-eslint
```

```JavaScript
const gulp = require('gulp');
const babel = require('gulp-babel');
const eslint = require('gulp-eslint');

gulp.task('default', fuction() {
  // ESLint를 실행
  gulp.src(["es6/**/*.js", "public/es6/**/*.js"])
  .pipe(eslint())
  .pipe(eslint.format());

  // 노드 소스
  gulp.src("es6/**/*.js") // 변환한 파일 지정
  .pipe(babel()) // 바벨에 파이프로 연결
  .pipe(gulp.dest("dist")); // 변환된 파일을 dist 디렉터리에 저장

  // 브라우저 소스
  gulp.sec("puplic/es6/**/*.js") // 위와 마찬가지의 작업
  .pipe(babel())
  .pipe(gulp.dest("dist"));
});
```

---
