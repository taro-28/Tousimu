
const config = {
  "particles": {
    //--シェイプの設定----------
    "number": {
      "value": 20, //シェイプの数
      "density": {
        "enable": true, //シェイプの密集度を変更するか否か
        "value_area": 200 //シェイプの密集度
      }
    },
    "shape": {
      "type": "circle" //シェイプの形（circle:丸、edge:四角、triangle:三角、polygon:多角形、star:星型、image:画像）
    },
    "color": {
      "value": "#87A2DB" //シェイプの色
    },
    "opacity": {
      "value": 0.7 //シェイプの透明度
    },
    "size": {
      "value": 2, //シェイプの大きさ
      "random": true, //シェイプの大きさをランダムにするか否か
      "anim": {
        "enable": true, //シェイプの大きさをアニメーションさせるか否か
        "speed": 20, //アニメーションのスピード
        "size_min": 1, //大きさの最小値
        "sync": false //全てのシェイプを同時にアニメーションさせるか否か
      }
    },
    //--------------------

    //--線の設定----------
    "line_linked": {
      "enable": true, //線を表示するか否か
      "distance": 150, //線をつなぐシェイプの間隔
      "color": "#87A2DB", //線の色
      "opacity": 0.5, //線の透明度
      "width": 1 //線の太さ
    },
    //--------------------

    //--動きの設定----------
    "move": {
      "speed": 4, //シェイプの動くスピード
      "straight": false, //個々のシェイプの動きを止めるか否か
      "direction": "none", //エリア全体の動き(none、top、top-right、right、bottom-right、bottom、bottom-left、left、top-leftより選択)
      "out_mode": "out" //エリア外に出たシェイプの動き(out、bounceより選択)
    }
    //--------------------

  },

  "interactivity": {
    "detect_on": "canvas",
    "events": {

      //--マウスオーバー時の処理----------
      "onhover": {
        "enable": false, //マウスオーバーが有効か否か
      },
      "onclick": {
        "enable": false,
      }
      //--------------------
    },
  },
  "retina_detect": true, //Retina Displayを対応するか否か
  "resize": true //canvasのサイズ変更にわせて拡大縮小するか否か
}

particlesJS('particles-js', config);
