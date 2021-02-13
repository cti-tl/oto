let i = -1;
let t = null;

function sound() {
  // 対象となるID名
  var id = "sound-file";

  // 初回以外だったら音声ファイルを巻き戻す
  if (typeof document.getElementById(id).currentTime != "undefined") {
    document.getElementById(id).currentTime = 0;
  }

  // [ID:sound-file]の音声ファイルを再生[play()]する
  document.getElementById(id).play();
}
document.body.addEventListener("keypress", onKeyPress);
function onKeyPress(e) {
  if (
    e.keyCode === 13 ||
    (e.keyCode === 13 &&
      e.shiftKey === false &&
      e.ctrlKey === false &&
      e.altKey === false)
  ) {
    // Enterキー除外
  } else if (
    e.keyCode === 32 ||
    (e.keyCode === 32 &&
      e.shiftKey === false &&
      e.ctrlKey === false &&
      e.altKey === false)
  ) {
    // Enterキー除外
  } else {
    return false;
  }
  // ここに処理をかく
  sound();
}

function sos_on() {
  document.body.style.backgroundColor = "white";
}
function sos_off() {
  document.body.style.backgroundColor = "black";
}

function sos() {
  let e = document.querySelectorAll("main a");
  if (i >= 0 && i < 99) {
    i = -1;
    sos_off();
    clearInterval(t);
    [].forEach.call(e, function (elem) {
      elem.className = "btn-square";
    });
    return 0;
  } else {
    i = 0;
  }
  [].forEach.call(e, function (elem) {
    elem.className = "btn-square-white";
  });
  t = setInterval(function () {
    console.log(i);
    switch (i) {
      case 1:
      case 3:
      case 5:
      case 7:
      case 12:
      case 17:
      case 22:
      case 24:
      case 26:
        sos_on();
        break;
      case 2:
      case 4:
      case 6:
      case 11:
      case 16:
      case 21:
      case 23:
      case 25:
      case 27:
        sos_off();
        break;
      case 30:
        i = 0;
        break;
      case -1:
        sos_off();
        clearInterval(t);
        [].forEach.call(e, function (elem) {
          elem.className = "btn-square";
        });
        break;
      default:
    }
    i += 1;
  }, 200);
}

function sleep(waitSec, callbackFunc) {
  var spanedSec = 0;

  var waitFunc = function () {
    spanedSec++;

    if (spanedSec >= waitSec) {
      if (callbackFunc) callbackFunc();
      return;
    }

    clearTimeout(id);
    id = setTimeout(waitFunc, 1000);
  };

  var id = setTimeout(waitFunc, 1000);
}

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("sw.js")
      .then((reg) => {
        console.log(
          "サービスワーカーの登録が以下のスコープで完了! ",
          reg.scope
        );
      })
      .catch((err) => {
        return console.log("サービスワーカーの登録が失敗: ", err);
      });
  });
}
