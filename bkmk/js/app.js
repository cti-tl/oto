function jscomp() {
  const e = document.querySelector("#test");
  e.value = js_beautify(e.value);
  change();
}

function change() {
  const e = document.querySelector("#test");
  const bk = document.querySelector("#bk");
  var t = e.value.replace(/\s+/g, " ");
  t = t.replace(/^ ?(\S.*)/, "$1").replace(/(.*\S) ?$/, "$1");
  t = t.indexOf("javascript:") < 0 ? "javascript:" + t : t;
  t = t.replace(/\"/g, "\\x22");
  t = t.replace(/(\W) /g, "$1").replace(/(\w) (\W)/g, "$1$2");
  //	link.href = t;
  //	count.innerHTML = ' ('+ t.length + ' chars)';
  bk.href = t;
}
