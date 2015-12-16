# Zepto-FastClick

## 설치방법

```
bower install zepto-fastclick
```

## 사용방법

### FastClick 이벤트

fastclick 이라는 이벤트명을 사용하는 것만으로 간단하게 사용 할 수 있습니다.

```js
$('#id').on('fastclick', function(evt) {
	
});
```

이벤트 Delegation 에도 활용 할 수 있습니다.

```js
$(document).on('fastclick', 'div', function(evt) {
	
});
```

fastclick 이벤트이 preventDefault 함수를 호출하면 click 이벤트가 중단됩니다.

```js
$('a[href]').on('fastclick', function(evt) {
	evt.preventDefault();
});
```

연속으로 fastclick 을 했는지 알 수 있도록 연속 발생 횟수를 얻을 수 있습니다.

```js
$('#id').on('fastclick', function(evt) {
	switch (evt.detail) {
	case 2:
		console.log('double taps');
		break;

	case 3:
		console.log('triple taps');
		break;
	}
});
```

연속 fastclick 인지 판단할 수 있는 interval 를 지정 할 수 있습니다.

```js
$.fastClick.consecutiveInterval = 100; // default: 500
```

### TapHold 이벤트

추가로 taphold 이벤트도 제공하고 있습니다.

```js
$('button').on('taphold', function(evt) {
	
});
```

TapHold 인지에 사용되는 duration 을 지정할 수 있습니다.

```js
$.fastClick.tapHoldDuration = 500; // default: 1000
```

### 기타 기능들

fastclick 가능한 엘리먼트가 active 상태가 되었을때 특정한 CSS 클래스명이 추가되도록
설정을 통해 지정 할 수 있습니다.

```css
button { border-style:outset; }
button.actived { border-style:inset; }
```

```js
$.fastClick.activedClassName = 'actived'; // default: 'actived'
$.fastClick.activableSelector = 'button'; // default: 'button a'
```

--------------

## Installation

```
bower install zepto-fastclick
```

## Usage

### FastClick event

You can use fastclick event if you just replace event name with fastclick.

```js
$('#id').on('fastclick', function(evt) {
	
});
```

You can also use with event delegation.

```js
$(document).on('fastclick', 'div', function(evt) {
	
});
```

If you call preventDefault of fastclick, the click event will be prevented.
```js
$('a[href]').on('fastclick', function(evt) {
	evt.preventDefault();
});
```

You can get a count of consecutive fast-clicks that happened in a short interval.

```js
$('#id').on('fastclick', function(evt) {
	switch (evt.detail) {
	case 2:
		console.log('double taps');
		break;

	case 3:
		console.log('triple taps');
		break;
	}
});
```

Change the interval be used to detect whether is consecutive or not.

```js
$.fastClick.config.consecutiveInterval = 100; // default: 500
```

### TapHold event

In addition, Zepto-FastClick implements taphold event.

```js
$('button').on('taphold', function(evt) {
	
});
```

Set the duration of tap-hold.

```js
$.fastClick.config.tapHoldDuration = 500; // default: 1000
```

### Other functions

When the fast-clickable elements are actived, the elements can have specific CSS className.
And you can configure about that.

```css
button { border-style:outset; }
button.actived { border-style:inset; }
```

```js
$.fastClick.config.activedClassName = 'actived'; // default: 'actived'
$.fastClick.config.activableSelector = 'button'; // default: 'button a'
```

