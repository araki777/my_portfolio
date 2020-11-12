$(function() {

  // 配列をランダムに並び変えて取得する
  function getRandomArray(arr) {
    for (var cnt = arr.length - 1; cnt >= 0; cnt--) {
      var rnd = Math.floor(Math.random() * (cnt + 1));
      var tmp = arr[cnt];
      arr[cnt] = arr[rnd];
      arr[rnd] = tmp;
    }
    return arr;
  }

  brainTrainingQuestion1 = function() {
    var clickCount = 1; // クリックすると値が増える

    setPanel1();

    // パネルを押した際の挙動
    $(document).on("click", ".question-1", function() {
      var elm = $(this).attr("class").split(" "); // クリックしたクラス名を取得
      var num = elm[1].replace(/^question-1-/, ''); // クラス名の中からquestion-1-?の末尾の数字を取得

      // クリックした要素の値と配列内の値が同じ値だったら
      if (num == clickCount) {
        clickCount += 1;

        $(this).css({
          "pointer-events": "none",
          "background": "red"
        });

        // もし要素の値が10だったら
        if (clickCount == 11) {
          alert("クリアー！！");
        }
      } else {
        clickCount = 1;
        $(".question-1").remove();
        setPanel1();
      }
    });

    function setPanel1() {

      // パネルの格納用配列の初期化
      var panel = new Array();
      panel.length = 0;

      // ランダム配置するパネルの枚数分の番号を配列に格納
      for(i = 1; i < 11; i++) {
        panel.push(i)
      };

      getRandomArray(panel);

      // tr要素の何列かを判定する値
      var tr = 1;

      // 10枚のパネル生成
      for (i = 0; i < 10; i++) {

        // 二列目だったら
        if (i > 4) {
          tr = 2 || (tr == 1);
        }

        $(".tr-question-1-" + tr).append("<td class='question-1 question-1-" + panel[i] + "'><img src='images/brain_training/" + panel[i] + ".png'></td>");
      }
    }
  }

  brainTrainingQuestion2 = function() {

    // 背景色と文字が同じものの数を入れる変数
    var colorSomeCount = 0;

    // 決定ボタンを押した際の判定
    $(".question-2-decision-button").on("click", function() {
      var count = $("#number").val();
      if (count == colorSomeCount) {
        alert("クリアー！！！");
      } else {
        colorSomeCount = 0; // 初期化
        $(".question-2").remove();
        setPanel2();
      }
    });

    setPanel2();

    function setPanel2() {

      // 配列に色の名前を格納
      var panel = ["red", "blue", "yellow", "green", "orange", "purple", "gray", "brown", "pink", "white"];

      getRandomArray(panel);

      // tr要素の何列かを判定する値
      var tr = 1;

      // ランダム値
      var randomPoint = Math.floor(Math.random() * panel.length);

      // 10枚のパネル生成
      for (i = 0; i < 10; i++) {

        // 二列目だったら
        if (i > 4) {
          tr = 2 || (tr == 1);
        }
        $(".tr-question-2-" + tr).append("<td class='question-2 question-color-" + panel[i] + "'>" + panel[i] + "</td>");

        // もしランダム値と同じだった場合 (答えに背景色と文字が同じものを一つ以上作る必要があるため)
        if (i == randomPoint) {
          // パネル名と同じ背景色をつける
          $(".question-color-" + panel[i]).css({
            "background": panel[i]
          })

          colorSomeCount += 1;
        } else {
          var randomBg = panel[Math.floor(Math.random() * panel.length)]
          $(".question-color-" + panel[i]).css({
            "background": randomBg
          });

          // ランダムで選んだ名前の背景色ともともとの名前が同じだった場合
          if (randomBg == panel[i]) {
            colorSomeCount += 1;
          }
        }
      }
    }
  }

  brainTrainingQuestion3 = function() {

    var parent = $(".brain-training-contents-item-3"); // 親要素を取得

    var parentWidth = parent.width(); // 親要素の横幅
    var parentHeight = parent.height(); // 親要素の高さ

    var W = 3; // パネルの横の個数
    var H = 3; // パネルの縦の個数

    var starX; // スターパネルのleft値の変数
    var starY; // スターパネルのtop値の変数

    var clear = 0; // クリアー判定用

    setPanel3();

    //クリアー判定
    function question3GameClear(){
      for(i = 0; i < 9; i++) {
        if (i == 0) {
          var x = parseInt($('.panel-star').css('left')) / (parentHeight / W);
          var y = parseInt($('.panel-star').css('top')) / (parentWidth / H);
        } else {
          var x = parseInt($('.panel-' + i).css('left')) / (parentHeight / W);
          var y = parseInt($('.panel-' + i).css('top')) / (parentWidth / H);
        }

        var clearX = i % 3;
        var clearY = Math.floor(i / 3);
        if((clearX == x)&&(clearY == y)) { //0～9のパネルが正しい位置にあるかを確認
          clear ++; //OKならclearに+1
        }
      }
      if(9 <= clear) { //9枚のパネルが全て正しい位置にあれば
        alert("クリアー！");
      } else {
        clear = 0;
      }
    }

    // パネルクリック時の処理
    $(document).on("click", ".panel", function() {
      var idX = parseInt($(this).css('left')); //クリックしたパネルのleft値を保存
      var idY = parseInt($(this).css('top')); //クリックしたパネルのtop値を保存

      //クリックしたパネルとスターパネルが隣接していたら
      if (((idX == starX) && ((idY == starY - (parentHeight / H)) || (idY == starY + (parentHeight / H)))) || ((idY == starY) && ((idX == starX - (parentWidth / W)) || (idX == starX + (parentWidth / W))))) {
        $(this).css({'left': starX, 'top': starY}); //クリックしたパネルをスターパネルの位置に移動
        $(".panel-star").css({'left': idX, 'top': idY}); //スターパネルをクリックしたパネルの位置に移動
        starX = idX; //変数に保存していたスターパネルのleft値を現在の値に更新
        starY = idY; //変数に保存していたスターパネルのtop値を現在の値に更新
      }

      question3GameClear(); //クリアー判定の関数を実行
    });

    function setPanel3() {

      var panel = ["star", "1", "2", "3", "4", "5", "6", "7", "8"]

      panel = getRandomArray(panel);

      // パネルを生成
      for (i = 0; i < 9; i++) {
        $(".brain-training-contents-item-3").append("<div class='panel panel-" + panel[i] + "'><img src='images/brain_training/" + panel[i] + ".png'>");
        $(".panel-" + panel[i]).css({
          "width": parentWidth / W,
          "height": parentHeight / H,
          "top": Math.floor(i / 3) * (parentHeight / W),
          "left": (i % 3) * (parentWidth / H)
        });

        if (panel[i] == "star") {
          starX = parseInt($(".panel-" + panel[i]).css("left")); // スターパネルの初期left値を代入
          starY = parseInt($(".panel-" + panel[i]).css("top")); // スターパネルの初期top値を代入
        }
      }
    }
  }
  brainTrainingQuestion4 = function() {
    var stage = new createjs.Stage("brain-training-left-box"); // ステージの作成
    var circles = []; // サークルを入れる配列

    // サークル作成関数の呼び出し
    for (i = 0; i < 500; i++) {
      var circle = new Circle();
      circles.push(circle); // サークル配列にサークルを入れる
      stage.addChild(circle.shape); // サークルの中からオブジェクトを取り出し、ステージにセット
    }

    // サークルの作成
    function Circle() {

      // サークルの初期値を入れる
      var defaults = {
        color: "#fff",
        borderColor: "#000",
        defaultX: Math.random() * (stage.canvas.width - 20),
        defaultY: Math.random() * (stage.canvas.height - 9),
      };

      this.shape = new createjs.Shape(); // オブジェクトの生成
      this.shape.graphics.beginFill(defaults.color); // オブジェクトの背景色を指定
      this.shape.graphics.beginStroke(defaults.borderColor); // オブジェクトの線の色を指定
      this.shape.graphics.drawEllipse(0, 0, 20, 9); // 横半径20px,縦半径9pxの楕円 (画面で見ると円形のためこのような書き方にしている)
      this.shape.x = defaults.defaultX; // オブジェクトにX座標を代入
      this.shape.y = defaults.defaultY; // オブジェクトにY座標を代入
    }

    // サークルの挙動
    Circle.prototype.update = function(mouseX, mouseY) {
      if (this.shape.x >= stage.canvas.width - 20) {
        this.shape.x = stage.canvas.width - 20;
      } else if (this.shape.x <= 0) {
        this.shape.x = 0;
      }

      if (this.shape.y >= stage.canvas.height - 9) {
        this.shape.y = stage.canvas.height - 9;
      } else if (this.shape.y <= 0) {
        this.shape.y = 0;
      }

      if (((this.shape.x + 100) > mouseX) || ((this.shape.x - 100) < mouseX)) {
        var angle = Math.atan2(this.shape.y - mouseY, this.shape.x - mouseX);
        this.shape.x += Math.cos(angle) * 3;
        this.shape.y += Math.sin(angle) * 3;
      }
    }

    createjs.Ticker.addEventListener("tick", handleTick); // Tickイベントを監視
    function handleTick(event) {
      for (var i = 0; i < 500; i++) {
        circles[i].update(stage.mouseX, stage.mouseY); // 必要な要素を取り出してupdate関数を掛ける
      }
      stage.update(); // ステージの再描画
    }
  }

  brainTrainingQuestion5 = function() {

  }
});
