// スライドが画面に必ず収まるよう、#topics の文字サイズをページごとに自動調整する。
// - 16:9 の PC でもスマホでも、本文と英語字幕 (.en) が画面内に全部表示されること
// - ただし小さくしすぎない (MIN 未満が必要なスライドは data-fit-ok="0" になる → check-layout.js で検出)
// presen5 本体は他のトークと共用なので触らず、このトークだけで読み込む。
(function () {
  "use strict";

  function isMobile() {
    return window.matchMedia("(pointer: coarse), (max-width: 700px)").matches;
  }

  // 読める下限。プロジェクタでは画面の高さに比例、スマホは絶対値で。
  function minSize() {
    return isMobile() ? 16 : Math.max(28, window.innerHeight * 0.035);
  }
  // 文字サイズの上限（元の presen5 は 1280x720 で 68px 相当）
  function maxSize() {
    var w = window.innerWidth, h = window.innerHeight;
    return isMobile() ? Math.min(h * 0.08, w * 0.075) : Math.min(h * 0.095, w * 0.055);
  }

  function navHeight() {
    var nav = document.getElementById("presen_nav");
    if (!nav || window.getComputedStyle(nav).display === "none") return 0;
    return nav.getBoundingClientRect().height;
  }

  function fit() {
    var t = document.getElementById("topics");
    if (!t) return;
    var nav = navHeight();
    var en = t.querySelector(".en");
    if (en) {
      en.style.bottom = nav + "px";
      en.style.fontSize = (isMobile() ? Math.max(12, Math.min(15, window.innerWidth * 0.035))
                                      : Math.max(16, Math.min(32, window.innerHeight * 0.03))) + "px";
    }
    var enH = en ? en.getBoundingClientRect().height : 0;
    var top = t.getBoundingClientRect().top;
    var availH = window.innerHeight - top - enH - nav - 8;
    var availW = t.clientWidth;

    var min = minSize();
    var media = t.querySelectorAll("iframe, img");
    if (media.length) {
      // 画像・デモの iframe があるページは文字サイズを固定し、メディアを残りの高さいっぱいにする
      t.style.fontSize = Math.max(min, Math.min(maxSize(), 0.6 * maxSize())) + "px";
      media.forEach(function (m) { m.style.maxHeight = "40px"; if (m.tagName === "IFRAME") m.style.height = "40px"; });
      var rest = availH - (t.scrollHeight - 40 * media.length) - 4;
      media.forEach(function (m) {
        var h = Math.max(80, rest / media.length);
        m.style.maxHeight = h + "px";
        m.style.maxWidth = "100%";
        if (m.tagName === "IFRAME") m.style.height = h + "px";
      });
      var fits = !(t.scrollHeight > availH + 1 || t.scrollWidth > availW + 1);
      t.dataset.fitSize = parseFloat(t.style.fontSize).toFixed(1);
      t.dataset.fitMin = min.toFixed(1);
      t.dataset.fitOk = fits ? "1" : "0";
      return;
    }

    var size = maxSize();
    var tooBig = function () {
      return t.scrollHeight > availH + 1 || t.scrollWidth > availW + 1;
    };
    t.style.fontSize = size + "px";
    while (size > min && tooBig()) {
      size = Math.max(min, size * 0.94);
      t.style.fontSize = size + "px";
    }
    t.dataset.fitSize = size.toFixed(1);
    t.dataset.fitMin = min.toFixed(1);
    t.dataset.fitOk = tooBig() ? "0" : "1";
  }

  var scheduled = false;
  function schedule() {
    if (scheduled) return;
    scheduled = true;
    window.requestAnimationFrame(function () {
      scheduled = false;
      fit();
    });
  }
  window.presenFit = fit;

  document.addEventListener("DOMContentLoaded", function () {
    var t = document.getElementById("topics");
    new MutationObserver(schedule).observe(t, { childList: true });
    t.addEventListener("load", schedule, true); // 画像の読み込み後に測り直す
    window.addEventListener("resize", schedule);
    schedule();
  });
})();
