/* 제이쿼리를 이용할 때 자바스크립트 코드를 실행한다면 기본이 되는 구조
$(document).ready(function(){ }); */
$(document).ready(function(){
  'use strict';
  paper.install(window); // Paper.js를 전역 스코프에 설치
  paper.setup(document.getElementById('mainCanvas')); // Paper.js를 캔버스에 연결하고 Paper.js가 그림을 그릴 수 있도록 준비
  // 위처럼 어떤 일을 하기 전에 항상 먼저 실행해야 하는 코드를 보통 템플릿, 또는 보일러플레이트(boilerplate)라고 한다.

  // 그림을 그리는 코드
  /* 중앙에 반지름 80의 원을 생성
  var c = Shape.Circle(200,200,80);  // 원(x,y,반지름)
  c.fillColor = 'orange'; // 색
  */

  /* 루프를 통해 원을 채우는 코드
  var c;
  for(var x = 25; x < 400; x += 50) {
    for(var y = 25; y < 400; y += 50) { // x축과 y축 각각 반복해야 하므로 루프는 두 개
      c = Shape.Circle(x, y, 20)
      c.fillColor = 'green';
    }
  }
  */

  var tool = new Tool(); // Paper.js는 툴(tool) 객체를 통해 사용자 입력을 처리한다.

  // onMouseDown 이벤트 핸들러: 사용자가 마우스를 클릭할 때마다 이 핸들러에 연결된 함수가 호출됨
  /* 이벤트 호출러는 두 가지 일을 함.
     1. 마우스를 클릭할 때 코드를 실행,
     2. 어디를 클릭했는지 보고한다.(위치는 매개변수의 event.point 프로퍼티에 저장된다.)
  */
  tool.onMouseDown = function(event) {
    var c = Shape.Circle(event.point.x, event.point.y, 20);
    // x,y 좌표를 각각 지정하지 않고 클릭한 위치를 바로 넘길 수도 있음
    // var c = Shape.Circle(event.point, 20);
    c.fillColor = 'orange';
  }

  // Paper.js가 실제로 화면에 그림을 그리라는 명령
  paper.view.draw();

});
