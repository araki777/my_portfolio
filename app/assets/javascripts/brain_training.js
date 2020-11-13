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

    // キャンバス要素を取得
    const canvas = document.querySelector('#brain-training-box');

    // キャンバスに記載するコンテキストを取得(二次元グラフィックの描画のため、2d指定)
    const c = canvas.getContext('2d');

    // 横幅と高さにキャンバス要素の横幅と高さを代入
    canvas.width = c.canvas.width; // 横幅
    canvas.height = c.canvas.height; // 高さ

    // プレイヤークラス
    class Player {

      // クラスが呼ばれた際に引数の値に初期化する
      constructor(x, y, radius, color) {
        this.x = x
        this.y = y
        this.radius = radius
        this.color = color
      }

      // 円の成形
      draw() {
        c.beginPath()
        c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        c.fillStyle = this.color
        c.fill()
      }
    }

    // プロジェクタークラス(プレイヤーが出す弾丸)
    class Projectile {

      // クラスが呼ばれた際に引数の値に初期化する
      constructor(x, y, radius, color, velocity) {
        this.x = x
        this.y = y
        this.radius = radius
        this.color = color
        this.velocity = velocity
      }

      // 円の成形
      draw() {
        c.beginPath()
        c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        c.fillStyle = this.color
        c.fill()
      }

      // 線の成形(弾丸としての関数)
      update() {
        this.draw();
        this.x = this.x + this.velocity.x
        this.y = this.y + this.velocity.y
      }
    }

    // エネミークラス
    class Enemy {

      // クラスが呼ばれた際に引数の値に初期化する
      constructor(x, y, radius, color, velocity) {
        this.x = x
        this.y = y
        this.radius = radius
        this.color = color
        this.velocity = velocity
      }

      // 円の成形
      draw() {
        c.beginPath()
        c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        c.fillStyle = this.color
        c.fill()
      }

      // 線の成形(弾丸としての関数)
      update() {
        this.draw();
        this.x = this.x + this.velocity.x
        this.y = this.y + this.velocity.y
      }
    }

    // プレイヤークラスの座標を設定
    const x = canvas.width / 2; // X座標の指定
    const y = canvas.height / 2; // Y座標の指定

    // プレイヤークラスの作成
    const player = new Player(x, y, 30, 'blue');

    // プロジェクターズ要素に配列を代入
    const projectiles = [];

    // エネミーズ要素に配列を代入
    const enemies = [];

    // エネミーを生成する関数
    function spawnEnemies() {
      // 1000ミリ秒のうちに
      setInterval(() => {

        // ランダムで10以上、30以下の大きさのみ
        const radius = Math.random() * (30 - 10) + 10

        let x
        let y

        // もしランダム値が0.5よりも小さかったら(0以上1未満の数字になるため2分の1)
        if (Math.random() < 0.5) {
          // キャンバスの左端 - radius,キャンバスの右端 + radiusの値をxに代入
          x = Math.random() < 0.5 ? 0 - radius : canvas.width + radius

          // yにキャンバス要素の高さ内の値を代入
          y = Math.random() * canvas.height
        } else {
          // xにキャンバス要素の横幅内の値を代入
          x = Math.random() * canvas.width

          // キャンバスの上端 - radius, キャンバスの下端 + radiusの値をyに代入
          y = Math.random() < 0.5 ? 0 - radius : canvas.height + radius
        }

        const color = 'green'

        // x軸とy軸から角度を測定
        const angle = Math.atan2(canvas.height / 2 - y, canvas.width / 2 - x);

        // 角度をX,Y座標に代入
        const velocity = {
          x: Math.cos(angle),
          y: Math.sin(angle)
        }

        enemies.push(new Enemy(x, y, radius, color, velocity));
      }, 1000);
    }

    // アニメーション関数
    function animate() {

      // 画面にアニメーションの再描画リクエスト
      requestAnimationFrame(animate);

      // キャンバス要素をクリアする
      c.clearRect(0, 0, canvas.width, canvas.height);

      // プレイヤークラスのdraw関数の呼び出し
      player.draw();

      // projectilesの配列分繰り返す
      projectiles.forEach((projectile) => {

        // projectileのupdate関数の呼び出し
        projectile.update();
      });

      // enemiesの配列分繰り返す
      enemies.forEach((enemy) => {
        enemy.update();
      });
    }

    // 画面をクリックした際の挙動
    addEventListener('click', (event) => {

      // クリックされた位置が中心からみて、どの角度にあるかを計算
      const angle = Math.atan2(event.clientY - canvas.height / 2, event.clientX - canvas.width / 2);

      // 角度をX,Y座標に代入
      const velocity = {
        x: Math.cos(angle),
        y: Math.sin(angle)
      }

      // projectiles要素に作成したprojectileクラスを代入
      projectiles.push(new Projectile(
        canvas.width / 2,
        canvas.height / 2,
        5,
        'red',
        velocity
      ));
    });

    // spawnEnemies関数の呼び出し
    spawnEnemies();

    // アニメーション関数の呼び出し
    animate();
  }

  brainTrainingQuestion5 = function() {

  }
});
