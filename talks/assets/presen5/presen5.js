(function () {
    "use strict";
    /*global document, setInterval, clearInterval, location, window, alert */
    
    var Presen = {
        start_time: new Date(),
        init: function (formatter, data) {
            this.formatter = formatter;
            this.step = 0;
            this.steps = 0;
            this.data = data;
    
            this.init_sections();
            this.init_title();
            this.init_page();
            this.format_cache = [];
            this.rewrite();
    
            document.getElementById("total_page").innerHTML = Presen.sections.length;
    
            var self = this;
    
            setInterval(function () { self.cron(); }, 500);
        },
        init_page: function () {
            if (location.hash === "") {
                this.page = 0;
            } else {
                this.page = Number(location.hash.substr(1)) || 0;
            }
        },
        init_sections: function() {
            this.sections = this.data.split('\n----\n');
        },
        init_title: function() {
            var title = this.sections[0].split(/\n/)[0];
            document.title = title;
            document.getElementById("title").innerHTML = title;
        },
        has_next: function () {
            return this.page < this.sections.length - 1;
        },
        next: function () {
            if (!this.sections) {
                return;
            }
            // ページ内に未表示の → 行があれば先にそれを1行ずつ出す
            if (this.step < this.steps) {
                this.step++;
                this.apply_step();
                return;
            }
            if (!this.has_next()) {
                return;
            }
            this.page++;
            this.step = 0;
            this.rewrite();
        },
        has_prev: function () {
            return this.page > 0;
        },
        prev: function(){
            if (!this.sections) {
                return;
            }
            if (this.step > 0) {
                this.step--;
                this.apply_step();
                return;
            }
            if (!this.has_prev()) {
                return; // nop.
            }
            this.page--;
            this.step = -1; // 前のページに戻るときは → 行を全部出した状態にする
            this.rewrite();
        },
        cron: function () {
            var now = new Date();
            document.getElementById("time").innerHTML = now.hms();
    
            document.getElementById("current_page").innerHTML = (Presen.page + 1);
    
            var used_time = parseInt((now - Presen.start_time) / 1000, 10);
            var used_min = parseInt(used_time / 60.0, 10);
            var used_sec = parseInt(used_time - (used_min * 60.0), 10);
            document.getElementById('used_time').innerHTML = '' + Presen.two_column(used_min) + ':' + Presen.two_column(used_sec);
    
            var body = document.documentElement;
            var topic = document.getElementById('topics');
            if (topic.offsetWidth > body.clientWidth) {
                topic.innerHTML = ' ' + topic.offsetWidth + " " + body.clientWidth;
            }
    
            Presen.formatter.render(Presen.page_info);
        },
        rewrite: function() {
            var p = this.page;
            if (!this.format_cache[p]) {
                this.format_cache[p] = this.formatter.format(this.sections[p]);
            }
            var topics = document.getElementById("topics");
            topics.innerHTML = this.format_cache[p][0];
            this.page_info = this.format_cache[p];
            this.steps = topics.querySelectorAll(".step").length;
            if (this.step === -1 || this.step > this.steps) {
                this.step = this.steps;
            }
            this.apply_step();
            location.hash = "#" + p;
        },
        apply_step: function () {
            var step = this.step;
            document.querySelectorAll("#topics .step").forEach(function (el, i) {
                el.classList.toggle("step_hidden", i >= step);
            });
        },
        two_column: function (i) {
            var m = "" + i;
            if (m.length === 1) { m = "0" + m; }
            return m;
        },
        change_font_size: function (selector, factor) {
            var element = document.querySelector(selector);
            var px = window.getComputedStyle(element).fontSize;
            px = parseInt(px.replace('px', ''), 10) + factor;
            px = "" + px + "px";
            element.style.fontSize = px;
        }
    };
    
    Presen.Formatter = {
        'Takahashi': {
            format: function (src) {
                var lines = src.split(/\n/);
    
                var context = lines.map(function (v) {
                    return '<span>' + v.replace(/`(.*?)`/g, '<code>$1</code>') + "</span><br>";
                });
    
                var w = Math.max(...lines.map(v => v.length));
                var h = lines.length;
    
                var font_size = (
                    '' + Math.min(
                        parseInt(window.innerWidth / w + 10, 10),
                        parseInt(window.innerHeight / h - 30, 10)
                    ) + "px"
                );
                return [context.join("\n"), font_size];
            },
            render: function (page_info) {
                document.getElementById("topics").style.fontSize = page_info[1];
            }
        },
        'Hatena': {
            format_text: function (text) {
                return text.replace(/\\p\{WHITE FROWNING FACE\}/, '&#x2639;')
                    .replace(/\\p\{WHITE SMILING FACE\}/g, '&#x263a;')
                    .replace(/\\p\{BLACK SMILING FACE\}/g, '&#x263b;')
                    .replace(/`(.*?)`/g, '<code>$1</code>')
                    .replace(/\[([^\]]+)\]\(([^)\s]+)\)/g, '<a href="$2" target="_blank" rel="noopener">$1</a>')
                    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
            },
            format: function (text) {
                var lines = text.split(/\n/);
                var context = [];
                var mode = "p";
                var pre_max = 0;
                lines.forEach(function (v) {
                    if (/^(\*\s)/.test(v)) {
                        context.push(v.replace(/^\*+/, "").tag("h2"));
                        return;
                    }
                    if (/^(\*+)/.test(v)) {
                        context.push(v.replace(/^\*+/, "").tag("h3"));
                        return;
                    }
                    if (/^\-\-/.test(v)) {
                        context.push(Presen.Formatter.Hatena.format_text(v.replace(/^--/, '')).tag("div", "list_child"));
                        return;
                    }
                    if (/^\-/.test(v)) {
                        context.push(Presen.Formatter.Hatena.format_text(v.replace(/^-/, '')).tag("div", "list"));
                        return;
                    }
                    
                    if (/^\>\|\|/.test(v)) { // >||
                        mode = "pre";
                        context.push("<pre>");
                        return;
                    }
                    if (/^\|\|</.test(v)) { // ||<
                        mode = "p";
                        context.push("</pre>");
                        return;
                    }
                    
                    if (mode === "pre") {
                        pre_max = Math.max(v.length, pre_max);
                        context.push(v.replace(/&lt;B&gt;/g, "<B>").replace(/&lt;\/B&gt;/g, "</B>").tag("span") + "\n");
                    } else if (/^→/.test(v)) {
                        // → で始まる行は next で1行ずつ表示する
                        context.push((Presen.Formatter.Hatena.format_text(v).tag("span") + "<br>").tag("span", "step"));
                    } else {
                        context.push(Presen.Formatter.Hatena.format_text(v).tag("span") + "<br>");
                    }
                });
                var pre_font_size = '' + parseInt(window.innerWidth / pre_max + 10, 10) + "px";
                return [context.join(""), pre_font_size];
            },
            render: function (page_info) {
                var pre = document.querySelector("#topics pre");
                if (pre) {
                    pre.style.fontSize = page_info[1];
                }
            }
        }
    };
    
    Date.prototype.hms = function () {
        return '' + Presen.two_column(this.getHours()) + ":" + Presen.two_column(this.getMinutes()) + ":" + Presen.two_column(this.getSeconds());
    };
    
    String.prototype.tag = function(tag, classname){
        return ['<', tag, (classname ? " class='" + classname + "'" : ""), '>', this, '</', tag, '>'].join("");
    };
    
    Presen.observe_key_event = function () {
        document.addEventListener("keydown", function(e) {
            switch(e.keyCode){
                case 82: // r
                    location.reload();
                    break;
                
                case 80: // p
                case 75: // k
                case 38: Presen.prev();e.stopPropagation();break;
                
                case 78: // n
                case 74: // j
                case 40: Presen.next();e.stopPropagation();break;
    
                case 70: // f
                    var footer = document.getElementById('footer');
                    if (footer) {
                        footer.style.display = footer.style.display === "none" ? "block" : "none";
                    }
                    e.stopPropagation();
                    break;
    
                case 190: // > and .
                    Presen.change_font_size('#topics', +10);
                    break;
                case 188: // < and ,
                    Presen.change_font_size('#topics', -10);
                    break;
            }
        });
    };
    
    // スマホ向け: スワイプ・タップ・画面下のボタンでページ遷移できるようにする
    Presen.observe_touch_event = function () {
        var start = null;
        var SWIPE_MIN = 40; // px

        document.addEventListener("touchstart", function (e) {
            if (e.touches.length !== 1) {
                start = null;
                return;
            }
            start = { x: e.touches[0].clientX, y: e.touches[0].clientY };
        }, { passive: true });

        document.addEventListener("touchend", function (e) {
            if (!start) {
                return;
            }
            var t = e.changedTouches[0];
            var dx = t.clientX - start.x;
            var dy = t.clientY - start.y;
            start = null;
            // 縦スクロール・ピンチ等は邪魔しない
            if (Math.abs(dx) < SWIPE_MIN || Math.abs(dx) < Math.abs(dy) * 1.5) {
                return;
            }
            if (dx < 0) {
                Presen.next();
            } else {
                Presen.prev();
            }
        }, { passive: true });

        // 画面の左1/3タップで戻る、それ以外で進む（リンク・ボタン・テキスト選択中は除く）
        document.addEventListener("click", function (e) {
            if (e.target.closest("a, button, pre, #header")) {
                return;
            }
            var sel = window.getSelection && window.getSelection();
            if (sel && String(sel).length > 0) {
                return;
            }
            if (e.clientX < window.innerWidth / 3) {
                Presen.prev();
            } else {
                Presen.next();
            }
        });

        var nav = document.createElement("div");
        nav.id = "presen_nav";
        [["prev", "\u2039", "前のページ"], ["next", "\u203a", "次のページ"]].forEach(function (b) {
            var button = document.createElement("button");
            button.type = "button";
            button.className = "presen_nav_" + b[0];
            button.textContent = b[1];
            button.setAttribute("aria-label", b[2]);
            button.addEventListener("click", function (e) {
                e.stopPropagation();
                Presen[b[0]]();
            });
            nav.appendChild(button);
        });
        document.body.appendChild(nav);

        // ブラウザの戻る/進むや手動での #N 変更に追従する
        window.addEventListener("hashchange", function () {
            var p = Number(location.hash.substr(1));
            if (!Presen.sections || isNaN(p) || p === Presen.page || p < 0 || p >= Presen.sections.length) {
                return;
            }
            Presen.page = p;
            Presen.step = 0;
            Presen.rewrite();
        });
    };

    // PDF出力: 印刷直前に全スライドを1ページ1枚で並べた要素を作り、
    // ブラウザの印刷ダイアログから「PDFとして保存」してもらう。
    // → 行は全部表示した状態で出す。
    Presen.build_print = function () {
        Presen.clear_print();
        if (!Presen.sections) {
            return;
        }
        var container = document.createElement("div");
        container.id = "print_slides";
        document.body.appendChild(container);

        var takahashi = Presen.formatter === Presen.Formatter.Takahashi;
        Presen.sections.forEach(function (section, i) {
            var slide = document.createElement("div");
            slide.className = "print_slide";
            var topics = document.createElement("div");
            topics.className = "print_topics";
            topics.innerHTML = Presen.formatter.format(section)[0];
            slide.appendChild(topics);
            var num = document.createElement("div");
            num.className = "print_page_number";
            num.textContent = (i + 1) + " / " + Presen.sections.length;
            slide.appendChild(num);
            container.appendChild(slide);

            // ページに収まるまで文字を小さくする
            var cs = window.getComputedStyle(slide);
            var max_w = slide.clientWidth - parseFloat(cs.paddingLeft) - parseFloat(cs.paddingRight);
            var max_h = slide.clientHeight - parseFloat(cs.paddingTop) - parseFloat(cs.paddingBottom);
            var size = takahashi ? 200 : 68;
            topics.style.fontSize = size + "px";
            while (size > 10 && (topics.scrollHeight > max_h || topics.scrollWidth > max_w)) {
                size = Math.floor(size * 0.92);
                topics.style.fontSize = size + "px";
            }
        });
    };
    Presen.clear_print = function () {
        var old = document.getElementById("print_slides");
        if (old) {
            old.parentNode.removeChild(old);
        }
    };
    Presen.observe_print_event = function () {
        // ボタン以外(Ctrl+P やブラウザメニュー)からの印刷にも対応する
        window.addEventListener("beforeprint", Presen.build_print);
        window.addEventListener("afterprint", Presen.clear_print);

        var button = document.createElement("button");
        button.type = "button";
        button.id = "pdf_button";
        button.textContent = "PDF";
        button.title = "印刷ダイアログから「PDFとして保存」で全スライドをPDFにできます";
        button.addEventListener("click", function (e) {
            e.stopPropagation();
            Presen.build_print();
            window.print();
        });
        var page_info = document.getElementById("page_info");
        page_info.insertBefore(button, page_info.firstChild);
    };

    // -------------------------------------------------------------------------
    
    document.addEventListener("DOMContentLoaded", function () {
        fetch('main.txt')
            .then(response => response.text())
            .then(text => {
                try {
                    var formatter = Presen.Formatter.Hatena;
                    var matched = text.match(/^Format: \s*(.*)\n/);
                    if (matched) {
                        var format = matched[1];
                        formatter = Presen.Formatter[format];
                        if (!formatter) {
                            alert("Unknown format: " + format);
                        }
                        text = text.substr(matched[0].length);
                    }
                    Presen.init(formatter, text);
                } catch(e) {
                    alert(e);
                }
            });
    
        document.body.classList.add('takahashi');
    
        Presen.observe_key_event();
        Presen.observe_touch_event();
        Presen.observe_print_event();
    });
    
})();
