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
    const canvas = $("#brain-training-box")[0];

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

      // 線の成形
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

      // 線の成形
      update() {
        this.draw();
        this.x = this.x + this.velocity.x
        this.y = this.y + this.velocity.y
      }
    }

    // 破壊された際の破片が飛び散る速度
    const friction = 0.99

    // パーシャルクラス
    class Particle {

      // クラスが呼ばれた際に引数の値に初期化する
      constructor(x, y, radius, color, velocity) {
        this.x = x
        this.y = y
        this.radius = radius
        this.color = color
        this.velocity = velocity
        this.alpha = 1
      }

      // 円の成形
      draw() {
        c.save()
        c.globalAlpha = this.alpha
        c.beginPath()
        c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        c.fillStyle = this.color
        c.fill()
        c.restore()
      }

      // 線の成形
      update() {
        this.draw();
        this.velocity.x *= friction // velocity.xにfrictionの値を掛ける
        this.velocity.y *= friction // velocity.yにfrictionの値を掛ける
        this.x = this.x + this.velocity.x // さらにxにvelocity.xを足す
        this.y = this.y + this.velocity.y // さらにyにvelocity.yを足す
        this.alpha -= 0.01 // 破片が表示される時間を減らす
      }
    }

    // プレイヤークラスの座標を設定
    const x = canvas.width / 2; // X座標の指定
    const y = canvas.height / 2; // Y座標の指定

    // プレイヤークラスの作成
    const player = new Player(x, y, 10, 'white');

    // プロジェクターズ要素に配列を代入
    const projectiles = [];

    // エネミーズ要素に配列を代入
    const enemies = [];

    // パーシャルズ要素に配列を代入
    const particles = [];

    // エネミーを生成する関数
    function spawnEnemies() {
      // 1000ミリ秒のうちに
      setInterval(function() {

        // ランダムで10以上、30以下の大きさのみ
        const radius = Math.random() * (50 - 5) + 5

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

        // ランダムでカラーをつける
        const color = `hsl(${Math.random() * 360}, 50%, 50%)`

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

    // アニメーションのリクエストが入る変数
    let animationId;

    // アニメーション関数
    function animate() {

      // アニメーションを動かすリクエストを変数に入れる
      animationId = requestAnimationFrame(animate);

      // キャンバスの背景色の指定
      c.fillStyle = 'rgba(0, 0, 0, 0.1)'

      // 上で指定した背景色をキャンバスに適用
      c.fillRect(0, 0, canvas.width, canvas.height);

      // プレイヤークラスのdraw関数の呼び出し
      player.draw();

      // particlesの配列分繰り返す
      particles.forEach((particle, particleIndex) => {

        if (particle.alpha <= 0) {
          particles.splice(particleIndex, 1)
        } else {
          particle.update();
        }
      });

      // projectilesの配列分繰り返す
      projectiles.forEach((projectile, projectileIndex) => {
        // projectileのupdate関数の呼び出し
        projectile.update();

        // 弾丸がcanvas要素の外に出てしまったら
        if (projectile.x + projectile.radius < 0 ||
            projectile.x - projectile.radius > canvas.width ||
            projectile.y + projectile.radius < 0 ||
            projectile.y - projectile.radius > canvas.height
        ) {
          setTimeout(function() {
            // projectilesからprojectileIndex番目の要素を1つ削除する
            projectiles.splice(projectileIndex, 1);
          }, 0)
        }
      });

      // enemiesの配列分繰り返す
      enemies.forEach((enemy, enemyIndex) => {
        enemy.update();

        // プレイヤーと敵の二点間の距離を計算
        const dist = Math.hypot(player.x - enemy.x, player.y - enemy.y);

        // プレイヤーの距離と敵の距離が1以下になったとき
        if (dist - player.radius - enemy.radius < 1) {

          // アニメーションを止める
          cancelAnimationFrame(animationId);
        }

        // projectileの配列分繰り返す
        projectiles.forEach((projectile, projectileIndex) => {

          // 弾丸と敵の二点間の距離を計算
          const dist = Math.hypot(projectile.x - enemy.x, projectile.y - enemy.y);

          // 弾丸の距離と敵の距離が1以下になったとき
          if (dist - enemy.radius - projectile.radius < 1) {

            // 敵の大きさの数だけ繰り返す
            for (let i = 0; i < enemy.radius * 2; i++) {
              particles.push(new Particle(
                projectile.x,
                projectile.y,
                Math.random() * 2,
                enemy.color, {
                  x: (Math.random() - 0.5) * (Math.random() * 6),
                  y: (Math.random() - 0.5) * (Math.random() * 6)
                }))
            }

            // もし敵の大きさが15以上だったら
            if (enemy.radius - 10 > 5) {
              gsap.to(enemy, {
                // 敵の大きさを-10する
                radius: enemy.radius - 10
              });
              // 0秒後に処理を行う
              setTimeout(function() {
                // projectilesからprojectileIndex番目の要素を1つ削除する
                projectiles.splice(projectileIndex, 1);
              }, 0)
            } else {
              // 0秒後に処理を行う
              setTimeout(function() {
                // enemiesからenemyIndex番目の要素を1つ削除する
                enemies.splice(enemyIndex, 1);
                // projectilesからprojectileIndex番目の要素を1つ削除する
                projectiles.splice(projectileIndex, 1);
              }, 0)
            }
          }
        });
      });
    }

    // 画面をクリックした際の挙動
    $(canvas).on('click', function(e) {
      // クリックされた位置が中心からみて、どの角度にあるかを計算
      const angle = Math.atan2(e.offsetY - canvas.height / 2, e.offsetX - canvas.width / 2);

      // 角度をX,Y座標に代入
      const velocity = {
        x: Math.cos(angle) * 6,
        y: Math.sin(angle) * 6
      }

      // projectiles要素に作成したprojectileクラスを代入
      projectiles.push(new Projectile(
        canvas.width / 2,
        canvas.height / 2,
        5,
        'white',
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
