$(function() {

  brainTrainingQuestion1 = function() {
    var panel = []; // ランダムに数字を入れるようの配列
    var count = 1; // クリックすると値が増える
    var clearCount = 0 // クリアしたものの判定

    setPanel1();

    // パネルを押した際の挙動
    $(document).on("click", ".question-1", function() {
      var elm = $(this).attr("class").split(" "); // クリックしたクラス名を取得
      var num = elm[1].replace(/^question-1-/, ''); // クラス名の中からquestion-1-?の末尾の数字を取得

      // クリックした要素の値と配列内の値が同じ値だったら
      if (num == count) {
        count += 1;

        $(this).css({
          "pointer-events": "none",
          "background": "red"
        });

        // もし要素の値が10だったら
        if (count == 11) {
          alert("クリアー！！");
        }
      } else {
        count = 1;
        $(".question-1").remove();
        setPanel1();
      }
    });

    function setPanel1() {
      // パネルをリセットする際に、配列を再代入
      panel = [];

      // ランダム配置するパネルの枚数分の番号を配列に格納
      for(i = 1; i < 11; i++) {
        panel.push(i)
      };

      //配列の中身0~9をランダムに並び替え
      panel.sort(function() {
        return Math.random() - Math.random();
      });

      // tr要素の何列かを判定する値
      var a = 1;

      // 10枚のパネル生成
      for (i = 0; i < 10; i++) {
        if (i > 4) {
          a = 2;
        }
        $(".tr-question-1-" + a).append("<td class='question-1 question-1-" + panel[i] + "'><img src='images/brain_training/" + panel[i] + ".png'></td>");
      }
    }
  }

  brainTrainingQuestion2 = function() {
    var panel = []; // ランダムに数字を入れるようの配列
    var clearCount = 0 // クリアしたものの判定

    setPanel2();

    function setPanel2() {
      // パネルをリセットする際に、配列を再代入
      panel = [];

      // 配列に色の名前を格納
      panel = ["red", "blue", "yellow", "green", "orange", "purple", "gray", "brown", "pink", "white"];

      //配列の色名をランダムに並び替え
      panel.sort(function() {
        return Math.random() - Math.random();
      });

      // tr要素の何列かを判定する値
      var a = 1;

      // ランダムポイント
      var randomPoint = Math.floor(Math.random() * panel.length)

      // 背景色と文字が同じだった物の数を入れる
      var colorSomeCount = 0;

      // 10枚のパネル生成
      for (i = 0; i < 10; i++) {
        if (i > 4) {
          a = 2;
        }
        $(".tr-question-2-" + a).append("<td class='question-2 question-color-" + panel[i] + "'>" + panel[i] + "</td>");

        // もしランダム値と同じだった場合
        if (i == randomPoint) {
          // パネル名と同じ背景色をつける
          $(".question-color-" + panel[i]).css({
            "background": panel[i]
          })

          colorSomeCount += 1;
        } else {
          // 配列の中からランダムで選んだ名前の背景色をつける
          var randomCountAAA = panel[Math.floor(Math.random() * panel.length)]
          $(".question-color-" + panel[i]).css({
            "background": randomCountAAA
          });

          // ランダムで選んだ名前の背景色ともともとの名前が同じだった場合
          if (randomCountAAA == panel[i]) {
            colorSomeCount += 1;
          }
        }
      }

      // 決定ボタンを押した際の判定
      $(".question-2-decision-button").on("click", function() {
        var count = $("#number").val();
        if (count == colorSomeCount) {
          alert("クリアー！！！");
        } else {
          $(".question-2").remove();
          setPanel2();
        }
      });
    }
  }
  brainTrainingQuestion3 = function() {

  }
  brainTrainingQuestion4 = function() {

  }
  brainTrainingQuestion5 = function() {

  }
});
