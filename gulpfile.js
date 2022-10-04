const gulp = require('gulp');
// 걸프 의존성(프로젝트에 설치하고 사용하는 모듈)을 작성
const babel = require('gulp-babel');

gulp.task('default', function() {
    // 걸프 작업을 여기 작성한다.
    // 노드 소스
    gulp.src("es6/**/*.js") // ES5로 변환할 ES6 코드가 있는 디렉터리(와일드카드 **를 써서 하위 모든 js 파일을 호출)
      .pipe(babel()) // 소스 파일을 바벨에 파이프로 연결(바벨은 ES6를 ES5로 변형한다.)
      .pipe(gulp.dest("dist")); // ES5로 컴파일된 코드를 dist 디렉터리에 저장한다.(참고로 소스 파일 이름과 디렉터리 구조는 그대로 유지된다.)

    // 브라우저 소스
    gulp.src("public/es6/**/*.js")
      .pipe(babel())
      .pipe(gulp.dest("public/dist"));
});
