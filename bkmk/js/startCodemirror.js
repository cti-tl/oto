var editor = CodeMirror.fromTextArea(document.getElementById("code"), {
  lineWrapping: true,
  lineNumbers: true,
  mode: "javascript",
  direction: "ltr",
  matchBrackets: true,
  continueComments: "Enter",
  extraKeys: { "Ctrl-Q": "toggleComment" },
});
editor.setSize("100%", "100%");
var doc = editor.getDoc();
doc.setValue(`javascript: (function(d){
let ById = (id) => d.getElementById(id);
let ByNames = (name, index = 0) => d.getElementsByName(name)[index];
let q = (selector, index = 0) => d.querySelectorAll(selector)[index];
alert('test');
})(document);`);
editor.on("blur", function () {
  jscompCM();
});
editor.on("drop", function (e) {
  // e.preventDefault();
  // 移動された要素の id を取得して、その要素を target の DOM に追加する
  var dt = event.dataTransfer;
  var files = dt.files;
  var count = files.length;
  for (var i = 0; i < files.length; i++) {
    alert("Drop File : " + files[i].name);
  }
});
