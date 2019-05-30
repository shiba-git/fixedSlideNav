
# fixedSlideNav 1.0.1

<img src="https://user-images.githubusercontent.com/17083627/58647473-9b69e780-8342-11e9-8489-a0ea86d318de.gif" width="600">

### Merit to use fixedSlideNav
* ポートフォリオや、シングルページアプリケーションで見るナビボタンが簡単に構築できます
* レスポンシブ対応、リサイズ後もボタンは制動作します。
* 対応ブラウザ: Firefox, Chrome, IE11 (safari未確認)
* 開発者モードあり

Written by: Shibayama Hiroki ( Japanese )

### License
Released under the MIT license - http://opensource.org/licenses/MIT

## Installation

### Step 1: Link required files

jQuery.jsとfixedSlideNav.jsを呼び出してください。順番は、jQueryが先になるようにしてください。
```html
<!-- jQuery library (served from Google) -->
<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.12.2/jquery.min.js"></script>
<!-- fixedSlideNav Javascript file -->
<script src="fixedSlideNav.js"></script>
```
### Step 2: Create HTML markup

エリア化したいセクションに同じクラス名を設定してください。
クラスの数分だけ、ボタンが表示されます。(最大7個)
```html
<section class="fixedSlideNav"></section>
<section class="fixedSlideNav"></section>
<section class="fixedSlideNav"></section>
<section class="fixedSlideNav"></section>
```

### Step 3: Call the fixedSlideNav

各セクションに設定したクラスによって、fixedSlideNavが呼びだされます。

```javascript
$(document).ready(function(){
  $('.fixedSlideNav').fixedSlideNav();
});
```

## Configuration options ( 設定 / オプション )

### Button Setting

**btColor**

ボタンの色 ( デフォルトはグレー )
```
default: "#ccc"
example: btColor: "#ff0"
```

**btColorHover**

マウスポインタが、上に置いた時のボタンの色 ( デフォルトは黒 )
```
default: "#000"
example: btColorHover: "#f0f"
```

**btIcon**

ボタンの形を設定できます。
丸(circle)か、四角(square)
```
default: "circle"
example: btIcon: "square"
```

**pcScall**

ボタンの大きさ(PC)
```
default: "17px"
example: pcScall: "20px"
```

**spScall**

ボタンの大きさ(SP)
```
default: "25px"
example: spScall: "30px"
```

**pcMargin**

ボタン間の距離や、左右のほかの要素との距離が設定できます。(PC)
```
default: "100% 0"
example: pcMargin: "120% 20%"
```

**spMargin**

ボタン間の距離や、左右のほかの要素との距離が設定できます。(SP)
```
default: "40% 0"
example: spMargin: "60% 10%"
```

### Animation

**scrollAnimationSpeed**

ボタン押した後、自動スクロールのスピードが設定できます。
値が高いほど、スピードが遅くなります。
```
default: 500
example: scrollAnimationSpeed: 250
```

### For developers

**developMood**

デベロッパーモードをオンにすると、
各セクションに背景色、境目にラインが付きます。
```
default: false
example: developMood: true
```

**bgColor [ developMood ]**

各セクションの背景色をカラーコードで設定できます。※developMoodがtrueになっていること前提です。  
bgColorの後ろに数字を入れると、各セクションの特定セクションが指定できます。
```
default:  bgColor1: '#f0f8ff',
          bgColor2: '#f5f5dc',
          bgColor3: '#f0ffff',
          bgColor4: '#ffffe0',
          bgColor5: '#e0ffff',
          bgColor6: '#fffff0',
          bgColor7: '#f5f5f5'
          
example: bgColor2: '#fff000'
```

**developBorder [ developMood ]**

境目のラインを表示するか、非表示か設定することができます。※developMoodがtrueになっていること前提です。
```
default: true
example: developBorder: false
```

### Error

**parsonWarn**

コンソールのアラートを消すことができます。
警報内容は、機能制限をご覧ください。
```
default: true　// 警報あり
example: parsonWarn: false　//警報非表示
```

## 機能制限

**sectionFilter**  
  
デザイン、レイアウトの都合上、ボタンの数は最大7個になっています。  
クラス名を7個以上設定しても、上7個が設定され、それ以外は削除されます。  
```
The maximum number of sections is 7
```

**characterizationFilter**   
  
metaタグで、文字コードを指定してください。ボタンが文字化けをする恐れがあります。  
```
Specify a character code, which must be a character code.
```

**parsonWarn**  
  
設定したクラス名のセクションが同階層にない場合、コンソールに警報が出ます。  
レイアウトが、崩れやすいためです。デザイン上、セクションを別階層にしたい場合は、  
オプションのparsonWarnをfalseにすることで、警報を非表示にできます。
```
The layout may be destroyed.
```


## Changelog

### Version 1.1
* release
* 公開




