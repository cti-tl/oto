function sound() {
  // 対象となるID名
  var id = 'sound-file';

  // 初回以外だったら音声ファイルを巻き戻す
  if (typeof document.getElementById(id).currentTime != 'undefined') {
    document.getElementById(id).currentTime = 0;
  }

  // [ID:sound-file]の音声ファイルを再生[play()]する
  document.getElementById(id).play();
}
document.body.addEventListener('keypress', onKeyPress);
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

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker
      .register('sw.js')
      .then((reg) => {
        console.log(
          'サービスワーカーの登録が以下のスコープで完了! ',
          reg.scope
        );
      })
      .catch((err) => {
        return console.log('サービスワーカーの登録が失敗: ', err);
      });
  });
}
